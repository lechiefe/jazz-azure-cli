const homedir = require('os').homedir();
const fs = require('fs');
const azureProfile = JSON.parse(fs.readFileSync(`${homedir}/.azure/azureProfile.json`, 'utf8').trim());




async function get(name) {
    if (name == null || name == '' || name == 'undefined') {
        return await getDefault();
    }
    else {
        var subscriptions = azureProfile.subscriptions;
        var result = null;
        for (const subscription of subscriptions) {
            if (subscription.name == name) {
                return subscription;
            }
            console.log("ERROR: Subscription \"" + name + "\" not found!");
        }
    }
}


async function getDefault(name) {
    // console.log("subscription name was not provided, getting the default subscription");
    var subscriptions = azureProfile.subscriptions;
    var result = null;
    for (const subscription of subscriptions) {
        if (subscription.isDefault) {
            return subscription;
        }
        console.log("ERROR: Subscription \"" + name + "\" not found!");
    }
}


module.exports = {
get,
getDefault
}
