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
     // If not successful, return the error message.
     catch(error) {
         console.log('Error: ' + error);
         return error;
     }
}

module.exports = { getRequest }