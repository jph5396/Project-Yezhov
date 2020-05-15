//service responsible for sending messages TO groupme. 
//this service is not responsible for receiving messages from group me. 
const axios = require('axios');

class GroupMeService {

    constructor(){} 

    async sendMsg(msg) {
        axios.post("https://api.groupme.com/v3/bots/post",{
            "bot_id": process.env.GROUPME_ID,
            "text": msg
        })
        .then( res => {})
        .catch(err => console.log(err));
    }
}

module.exports = GroupMeService;