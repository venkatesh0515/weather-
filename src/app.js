const path=require('path');
const getCodes=require('./utils/getCodes');
const getforecast=require('./utils/getforecast')
const express=require('express');
var exphbs  = require('express-handlebars');
const hbs=require('hbs');
console.log(hbs);
const app=express();
app.engine('.hbs', exphbs({extname: '.hbs',defaultLayout:null,partialsDir  : [
    //  path to your partials
    path.join(__dirname, '../templates/partials'),
]}));

const static=path.join(__dirname,'../public');
const temppath=path.join(__dirname,'../templates/views');
// const partialPath=path.join(__dirname,'../templates/partials');

app.set('view engine','.hbs');
app.set('views',temppath);
// hbs.registerPartials(partialPath)

app.use(express.static(static));



app.get('',(req,res)=>{
   res.render('index',{title:"welcome to weather app",
   name:"developed by venkatesh"}
)
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:"vekatesh gangavarapu",
        title:"Senior ui developer"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must provide the address term"
        })

    }
    getCodes(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error:"somthing hapend"
            })
        }
     
        getforecast(data.longitude,data.latitude,(error,forcaseData)=>{
         if(error){
            //  return console.log("something unexpected hapend")
            return res.send({
                error:"somthing unexpected happend"
            })
         }
        //  console.log(data.location);
        //  console.log(`It's currently ${forcaseData.temp} degrees out, There is a ${forcaseData.precipProbability}% chnace of rain`);
       res.send({
           location:data.location,
           temparature:forcaseData.temp,
           precipitation:forcaseData.precipProbability
       })

     })
     })
    // res.send({
    //     address:req.query.address
    // })
 })
 




app.listen('3000',()=>{
    console.log("expresss server running")
})