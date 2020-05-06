// service class responsible for communicating with the Bungie.net API
// and returning data that is meaningful to us. 
const axios = require('axios');

class BungieService {
    
    constructor(){}

    async getXurInventory(){

        // Xur's ID, or hash as it is known to Bungie.net 
        let xurId = 2190858386; 
        let vendorData = await getActivePublicVendors(); 

        if (isXurActive(vendorData)){
            let saleList = Object.values(vendorData.data.Response.sales.data[xurId].saleItems);
            const promises = saleList.map(getItemListing);
            return await Promise.all(promises);
        }
        else {return Promise.reject("Xur is not active right now.");}
    }
}

//Instance of Axios used to call the Bungie API 
// config passed here is automatically appied to all 
// requests made using the instance
let httpReq = axios.create({
    baseURL: 'https://www.bungie.net/Platform',
    headers: {'x-api-key': process.env.BUNGIE_API_KEY}
});

// NOTE: this Bungie indicates this endpoint is in preview and is subject to change. 
const getActivePublicVendors = () => {
    return httpReq.get('/Destiny2//Vendors/?components=Vendors,VendorSales');
}

// returns a thenable axios response object with the item data from Bungie. 
const getInventoryItemDef= (itemId) => {
    return httpReq.get(`Destiny2/Manifest/DestinyInventoryItemDefinition/${String(itemId)}/`);
}

// Sees if Xur is active by checking if he is listed in the vendors 
const isXurActive = (data) => {
    let xurID = 2190858386;
    
    if (String(xurID) in data.data.Response.vendors){return true;}
    else {return false;}
}

// gets an item listing from bungie.net, then returns its name 
// and type. 
const getItemListing = (item) => {
    const itemId = item.itemHash; 
    return new Promise ((resolve, reject) => {
        getInventoryItemDef(itemId)
        .then( data => {
            resolve({
                name: data.data.Response.displayProperties.name,
                Type: data.data.Response.itemTypeAndTierDisplayName
            });
        })
        .catch(err => reject(err));
    });
}



module.exports = BungieService;
