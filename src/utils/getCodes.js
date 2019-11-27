const request=require('request');
const getCodes=(location,callback)=>{
    // console.log(location);
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiZ3ZlbmthdGVzaDA1MTUiLCJhIjoiY2szNng2NmxyMDZlZzNqcXN4ejRuYmxmdiJ9.HgLerkydbDj7CFMYAIMRvw&limit=1';
 request({url,json:true},(error,response)=>{
     if(error){
         callback("service not found",undefined);
     } else if(response.body.features.length==0){
        callback("bad request",undefined);
     }else{
        //  console.log(response.body)
        const latitude=response.body.features[0].center[1];
         const longitude=response.body.features[0].center[0];
         const location=response.body.features[0].place_name;
         const data={
            latitude:latitude,
            longitude:longitude,
            location:location
         }
        callback(undefined,data);
     }

 })
}

module.exports=getCodes