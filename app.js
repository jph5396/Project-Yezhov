require('dotenv').config();


// real app logic will be placed here. 
const BungieService = require('./BungieService');
bungieService = new BungieService();
bungieService.getXurInventory()
.then(data => console.log(data))
.catch(err => console.log(err));

