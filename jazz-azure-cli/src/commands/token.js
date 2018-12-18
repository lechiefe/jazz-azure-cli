const axios = require('axios');
const homedir = require('os').homedir();
const fs = require('fs');
const azureProfile = JSON.parse(fs.readFileSync(`${homedir}/.azure/azureProfile.json`, 'utf8').trim());


module.exports = {
    getToken
}


async function getToken(tenantId) {
    var config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    var client_id = process.env.AZURE_CLIENT_ID;
    var client_secret = process.env.AZURE_CLIENT_SECRET;
    var grant_type = "client_credentials";
    var body = `grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&resource=https://management.azure.com/`;
    
    var url = `https://login.microsoftonline.com/${tenantId}/oauth2/token`;

    console.log("contacting " + url + " for an authentication token")
    try {
        return await axios.post(
            url,
            body,
            config
        ).then(console.log("Success: Retreived authentication token"));
    } catch (error) {
        console.error(error.response.status);
        console.error(error.response.data);
    }
}