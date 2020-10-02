const BungieService = require('./BungieService');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const axios = require('axios');
bungieService = new BungieService();
const port = process.env.PORT || 8080; 

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/', (req, res) => {

    res.status(202).end();
    if(req.body.text.toLowerCase() === "%xur") {

        bungieService.getXurInventory()
        .then( data => {
            sendInventory(data);
        })
        .catch(err => {
            sendErrorMsg(err);
            console.log("An error has occured." + err)
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