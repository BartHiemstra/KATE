const axios = require('axios');
require('dotenv').config();

// Get building address from the Kadaster BAG API based on postal code and house number.
async function getGeometry(buildingId) {
    try {
        let response = await axios({
             url: "https://geodata.nationaalgeoregister.nl/bag/wfs/v1_1?service=WFS&version=2.0.0&request=GetFeature&typename=bag:pand&outputFormat=json&filter=%3Cfes:Filter%20xmlns:fes=%22http://www.opengis.net/fes/2.0%22%20xmlns:xsi=%22http://www.w3.org/2001/XMLSchema-instance%22%20xsi:schemaLocation=%22http://www.opengis.net/wfs/2.0%20http://schemas.opengis.net/wfs/2.0/wfs.xsd%22%3E%20%3Cfes:PropertyIsEqualTo%3E%3Cfes:PropertyName%3Eidentificatie%3C/fes:PropertyName%3E%3Cfes:Literal%3E" + buildingId + "%3C/fes:Literal%3E%3C/fes:PropertyIsEqualTo%3E%3C/fes:Filter%3E",
             method: 'get',
         })
         // If successful, return addres info of the first object in the response data array.
         //return response.data;

         var polygon = response.data.features[0].geometry.coordinates[0];

         var area = calcPolygonArea(polygon);
         var length = calcPolygonLength(polygon);

         var buildingGeometry = {
             area: area,
             length: length
         }

         console.log(calcPolygonArea(polygon));
         console.log(calcPolygonLength(polygon));
         return buildingGeometry;


     }
     // If not successful, return the error message.
     catch(error) {
         console.log('Error: ' + error);
         return error;
     }
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