const request=require('request');


const getforecast=(latitude,longitude,callback)=>{
  const url=`https://api.darksky.net/forecast/f5929042290599913df28240ac8617b1/${latitude},-${longitude}`;
  request({url:url,json:true},(error,response)=>{
     if(error){
         callback("server not found",undefined)
     } else if(response.body.error){
        callback("servise not found",undefined)
     }else{
        const temp=response.body.currently.temperature;
        const precipProbability=response.body.currently.precipProbability;
        const data={
            temp:temp,
            precipProbability:precipProbability
        }
                // console.log(`It's currently ${temp} degrees out, There is a ${precipProbability}% chnace of rain`);
       callback(undefined,data)
     }
  })
}

module.exports=getforecast