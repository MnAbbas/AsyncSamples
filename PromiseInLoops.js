   var request = require('request');

let club='arsenal'
var fn=function returnPromise(item){
    return new Promise(resolve => {
        for (let ind=0 ; ind < item.matches.length; ind++){
            if(item.matches[ind].team1.key == club || item.matches[ind].team2.key == club){
                resolve(item.matches[ind])
            }else{
                delete(item)
            }
        }
    })
}

var finalcla= function retprom(item){
    return new Promise(resolve =>{
        if (item.team1.key==club){
            resolve(item.score1)
        }else{
            resolve(item.score2)
        }
    })
}

function getResponeReturn(url){
    return new Promise(function(resolve , reject){
        request(url,    
    function (error, response, body) {
         if (error){
            reject(body)
         } else{
            resolve(body)
         }  
    })
    })
}

getResponeReturn('https://raw.githubusercontent.com/openfootball/football.json/master/2014-15/en.1.json').
then(body =>{
    var rounds = JSON.parse(body).rounds    
    var actions = rounds.map(fn); // run the function over all items
    var results = Promise.all(actions); // pass array of promises
    results.then(data =>{
        var calcaction =data.map(finalcla)
        var nmb= Promise.all(calcaction);
        nmb.then(d=>{
            const reducer = (accumulator , currentvalue) => accumulator+currentvalue ;
            console.log(d.reduce(reducer))
        })
    })
}).catch(err => {
    console.log(err)
})


