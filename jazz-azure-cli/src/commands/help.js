const menus = {
    main: `
  jazz-azure-cli [command] <options>

    create.............. create or update an Api
    delete ............ delete an existing api
    help............... show help menu for a command
    version ............... show help menu for a command`,

    create: `
    create <options>

    --resourceGroups, -r ..... the resource group to use
    --serviceName, -s ........ the APIM service name
    --apiName, -a ............ the name of the api
    --swagger, -swg .......... <OPTIONAL> url of the swagger file`,

    create: `
    delete <options>

    --resourceGroups, -r ..... the resource group to use
    --serviceName, -s ........ the APIM service name
    --apiName, -a ............ the name of the api`,
}

module.exports = (args) => {
    const subCmd = args._[0] === 'help'
        ? args._[1]
        : args._[0]

    console.log(menus[subCmd] || menus.main)
}