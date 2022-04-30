const axios = require('axios');

// GET request
async function getRequest(url) {
    try {
        let response = await axios({
             url: url,
             method: 'get',
         })
         
         // If successful, return response.         
         return response;
     }
     // If not successful, print error message and return null.
     catch(error) {
         console.log('Error: ' + error);
         return null;
     }
}

module.exports = { getRequest }