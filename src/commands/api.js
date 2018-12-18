const axios = require('axios');
var escapeJSON = require('escape-json-node');

const fs = require('fs');



/**
 * 
 * 
*/
module.exports = {
    createApi,
    deleteApi
}

function createApi(token, subscriptionId, resourceGroups, service, apiName, serviceUrl, swaggerUrl) {
    console.log("Trying to create or update a new API gateway");
    var bodyParameters;
    if (swaggerUrl != null && swaggerUrl != '' && swaggerUrl != 'undefined') {
        var swaggerString = JSON.stringify(JSON.parse(fs.readFileSync(swaggerUrl, 'utf8').trim()));
        console.log("swagger url provided, using it");
        bodyParameters = {
            "properties": {
              "contentFormat": "swagger-json",
              "contentValue":swaggerString,
              "path": "testApiSwaggernew"
            }
          }
    }
    else
    {
        bodyParameters = {
            "properties": {
                "description": "test api description",
                "displayName": "testApi",
                "serviceUrl": serviceUrl,
                "path": "newapiPath",
                "protocols": [
                    "https",
                    "http"
                ]
            }
        }
    }
    var config = {
        headers: {
            'Authorization': "Bearer " + token,
            "Content-type": "application/json"
        }
    };

    
    var url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroups}/providers/Microsoft.ApiManagement/service/${service}/apis/${apiName}?api-version=2018-06-01-preview`;
    console.log("contacting: " + url);
    // console.log(bodyParameters);
    axios.put(
        url,
        bodyParameters,
        config
    ).then((response) => {
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.data);
    }).catch((error) => {
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.data.error);
    });

}

function deleteApi(token, subscriptionId, resourceGroups, service, apiName) {
    console.log("Trying to delete an API gateway");
    var config = {
        headers: {
            'Authorization': "Bearer " + token,
            "Content-type": "application/json",
            "If-Match": "*"
        }
    };

    axios.delete(
        `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroups}/providers/Microsoft.ApiManagement/service/${service}/apis/${apiName}?api-version=2018-06-01-preview`,
        config
    ).then((response) => {
        if (response.status == 204) {
            console.log("Nothing to delete")

        }
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.data);
    }).catch((error) => {
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.data);
        console.log(error.response.data.error);
    });
}