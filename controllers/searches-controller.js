const UserLogs = require("../models/user-logs");
const axios = require('axios');

let searchCtrl = {};

searchCtrl.fetchCustomerData = async(req,res,next) => {
    try{
        let reqBody = JSON.parse(JSON.stringify(req.query));
        let size = reqBody.size
        let page = reqBody.page;
        let fetchUrl = `https://aws.amazon.com/api/dirs/items/search?item.directoryId=customer-references&sort_by=item.additionalFields.sortDate&sort_order=desc&size=${size}&item.locale=en_US&tags.id=GLOBAL%23industry%23financial-services%7Ccustomer-references%23industry%23financial-services&page=${page}`;
        
        let headers =  { 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8', 
            'cache-control': 'max-age=0', 
            'cookie': 'aws-priv=eyJ2IjoxLCJldSI6MCwic3QiOjB9; aws-priv=eyJ2IjoxLCJldSI6MCwic3QiOjB9', 
            'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"', 
            'sec-ch-ua-mobile': '?0', 
            'sec-ch-ua-platform': '"Linux"', 
            'sec-fetch-dest': 'document', 
            'sec-fetch-mode': 'navigate', 
            'sec-fetch-site': 'none', 
            'sec-fetch-user': '?1', 
            'upgrade-insecure-requests': '1', 
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
          }

        let config = {
            method: 'get',
            url: fetchUrl,
            headers: headers
        };

        axios(config).then(async(response) => {
            if(response.data && response.data.items.length > 0){
                let finalData;
                if(reqBody.from_ui){
                    finalData = await getDisplayData(response.data.items);
                }else{
                    finalData = response.data.items;
                }               return res.status(200).json({status: 'success', data: finalData});
            }
        }).catch((error) => {
            console.log('error1')
            return res.status(400).json({status: 'failed', message: "Error fetching customer data"});
        });

    }catch(error){
        console.log('error2')
        next(error)
        res.status(400).send({message: "Error fetching customer data"});
    }
}

function getDisplayData(items){
    let displayArray = []
    for(let val of items){
        let dataObj = {
            customer_logo: val.item.additionalFields.imageSrcUrl,
            customer_name: val.item.additionalFields['customer-name'],
            headline: val.item.additionalFields.headline,
            url: val.item.additionalFields.headlineUrl,
            description_summary: val.item.additionalFields.descriptionSummary,
            page_url: val.item.additionalFields.headlineUrl,
            location: val.item.additionalFields.displayLocation,
            industry: val.item.additionalFields.industry,
        }
        displayArray.push(dataObj);
    }
    return displayArray;
}


module.exports = {
    searchCtrl
};