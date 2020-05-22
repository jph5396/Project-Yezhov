class CustomCustomCommandServiceLocator {
    constructor(){
        // the Cmds variable should be a list of cmds that this service locator is 
        // responsible for. 
        this.Cmds = ["tag", "tags", "newtag", "delete"]; 
    }
     
    async getCommand(cmdBase) {
        if (cmdBase.major === "tags") {
            return Promise.reject("Not yet implemented");
        }

        else if (cmdBase.major === "tag") {
            return Promise.reject("Not yet implemented");
        }

        else if ( cmdBase.major === "newtag") {
            return Promise.reject("Not yet implemented");
        }

        else if (cmdBase.major === "deletetag") {
            return Promise.reject("Not yet implemented");
        }

    }
}

module.exports = CustomCustomCommandServiceLocator;