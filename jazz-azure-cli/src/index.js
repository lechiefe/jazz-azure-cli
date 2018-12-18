const minimist = require('minimist');
const token = require('./commands/token');
const api = require('./commands/api');

const azureSubscriptions = require('./commands/azureProfile');

module.exports = async () => {
    const args = minimist(process.argv.slice(2), {
        alias: {
            r: 'resourceGroups',
            s: 'serviceName',
            a: 'apiName',
            surl: 'serviceUrl',
            swg: 'swagger'
        }
    });
    var cmd = args._[0];
    var resourceGroup = args['resourceGroups'];
    var service = args['serviceName'];
    var apiName = args['apiName'];
    var swaggerUrl = args['swagger'];
    var serviceUrl = args['serviceUrl'];

    try {
        var subscription = await azureSubscriptions.get(args['subname']);
        // console.log(subscription);
        var tenantId = subscription.tenantId;
        var subscriptionId = subscription.id;
        switch (cmd) {
            case 'create':
                var result = await token.getToken(tenantId);
                api.createApi(result.data.access_token, subscriptionId, resourceGroup, service, apiName, serviceUrl,  swaggerUrl);
                break
            case 'delete':
                var result = await token.getToken(tenantId);
                api.deleteApi(result.data.access_token, subscriptionId, resourceGroup, service, apiName);
                break
            case 'version':
                require('./commands/version')(args)
                break
            case 'help':
                require('./commands/help')(args)
                break
            default:
                console.error(`"${cmd}" is not a valid command!`)
                break
        }
    } catch (error) {
        console.error(error);
    }
}




