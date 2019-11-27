console.log("client side javascript loaded");

function loadData(location){
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
           const temprature=data.temparature;
           console.log(temprature)
           let ele=document.getElementById('temp');
           ele.innerHTML=temprature;

    
        })
    })
}

function getTemp(event){
    event.preventDefault();
    var location=document.getElementById('location').value;
    console.log(location)

    loadData(location);
}