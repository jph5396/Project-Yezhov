const CustomCommandServiceLocator = require("./CustomCommandServiceLocator");

class CommandServiceLocator {
    
    constructor(){
        this.customCommandServiceLocator = new CustomCommandServiceLocator(); 
    }

    async locateCommand(cmdBase) {
        if(this.customCommandServiceLocator.Cmds.includes(cmdBase.major)) {
            cmd = await this.customCommandServiceLocator.getCommand(cmdBase);
            return Promise.resolve(cmd); 
        }
        else {
            return Promise.reject(`command '${cmdBase.major}' not found.`);
        }
    }
}

module.exports = CommandServiceLocator;