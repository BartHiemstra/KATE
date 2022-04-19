//Import API Service functions.
const { getRequest } = require('../services/api_service.js');

//TODO: Put Base URLs in .env file.

async function getGeometry(buildingId, buildingCoordinates) {
    // Create BAG request URL with specified buildingId.
    const BAG_URL = "https://geodata.nationaalgeoregister.nl/bag/wfs/v1_1?service=WFS&version=2.0.0&request=GetFeature&typename=bag:pand&outputFormat=json&filter=%3Cfes:Filter%20xmlns:fes=%22http://www.opengis.net/fes/2.0%22%20xmlns:xsi=%22http://www.w3.org/2001/XMLSchema-instance%22%20xsi:schemaLocation=%22http://www.opengis.net/wfs/2.0%20http://schemas.opengis.net/wfs/2.0/wfs.xsd%22%3E%20%3Cfes:PropertyIsEqualTo%3E%3Cfes:PropertyName%3Eidentificatie%3C/fes:PropertyName%3E%3Cfes:Literal%3E" + buildingId + "%3C/fes:Literal%3E%3C/fes:PropertyIsEqualTo%3E%3C/fes:Filter%3E";
    
    // Perform GET request on BAG URL and extract polygon coordinates from its data.
    var response = await getRequest(BAG_URL);
    var polygon = response.data.features[0].geometry.coordinates[0];

    // Calculate length and area of all vertices of the polygon.
    var area = calcPolygonArea(polygon);
    var length = calcPolygonLength(polygon);

    // Create 3DBAG request URL with specified buildingCoorindates.
    const BAG3D_URL = "https://data.3dbag.nl/api/BAG3D_v2/wfs?service=wfs&version=1.3.0&crs=EPSG%3A28992&request=GetFeature&typeName=BAG3Gv_2%3Alod12&bbox=" + buildingCoordinates[0] + "%2C" + buildingCoordinates[1] + "%2C" + buildingCoordinates[0] + "%2C" + buildingCoordinates[1] + "&outputFormat=application%2Fjson"
    var response = await getRequest(BAG3D_URL);

    // Calculate the building height by subracting the ground height (h_maaiveld) from the average of the middle 70% of measured building height points (h_dak_70p).
    var totalHeight = response.data.features[0].properties.h_dak_70p;
    var groundHeight = response.data.features[0].properties.h_maaiveld;
    var height = totalHeight - groundHeight;

    // Return the geometry variables.
    var buildingGeometry = {
        area: area,
        length: length,
        height: height
    }
    return buildingGeometry;
}

function calcPolygonArea(vertices) {
    var total = 0;

    for (var i = 0, l = vertices.length; i < l; i++) {
      var addX = vertices[i][0];
      var addY = vertices[i == vertices.length - 1 ? 0 : i + 1][1];
      var subX = vertices[i == vertices.length - 1 ? 0 : i + 1][0];
      var subY = vertices[i][1];

      total += (addX * addY * 0.5);
      total -= (subX * subY * 0.5);
    }

    return Math.abs(total);
}

function calcPolygonLength(vertices) {
    var total = 0;

    for (var i = 0, l = vertices.length; i < l - 1; i++) {
      var a = Math.abs(vertices[i][0] - vertices[i + 1][0]);
      var b = Math.abs(vertices[i][1] - vertices[i + 1][1]);
      var c = Math.pow(a, 2) + Math.pow(b, 2);
      var length = Math.sqrt(c)

      total += length;
    }

    return total;
}

module.exports = { getGeometry }