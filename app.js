require('dotenv').config();
const BungieService = require('./services/BungieService');
const GroupMeService = require('./services/GroupMeService');
const CommandParser = require('./CommandParser');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const axios = require('axios');


const bungieService = new BungieService();
const groupMeService = new GroupMeService();
const port = process.env.PORT; 

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/', (req, res) => {

    res.status(202).end();

    // if(req.body.text.startsWith("%")){
    //     cmd = CommandParser.parse(req.body.text);
    //     // additional logic to execute command should go here. 
    // }

    // all old %xur stuff will be replaced when refactoring. 
    if(req.body.text.toLowerCase() === "%xur") {

        bungieService.getXurInventory()
        .then( data => {
            sendInventory(data);
        })
        .catch(err => {
            sendErrorMsg(err);
        })
    }
});

const sendInventory = (data) => {
    let msgString = "Xur's inventory is: \n";
    data.forEach((value) => {
        msgString = msgString + `${value.name} - ${value.type} \n`;
    })

    axios.post('https://api.groupme.com/v3/bots/post', {
        "bot_id": process.env.GROUPME_ID,
        "text": msgString
    });
}
const sendErrorMsg = (err) => {
    axios.post('https://api.groupme.com/v3/bots/post',{
        "bot_id": process.env.GROUPME_ID,
        "text": err
    });
}


const server = http.createServer(app);
server.listen(port, () => {
    console.log(`server up and running on port ${port}`);
});