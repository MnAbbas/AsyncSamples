var request = require('request');
let club='arsenal'

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

async function asyncForEach(array, callback) {
    array.forEach(obj => {
        obj.matches.forEach(item =>{
            if (item.team1.key==club || item.team2.key==club){
                callback(item)
            }
        })
    })
 
}

const getitDone = async () => {
    await asyncForEach(rounds,  (elm) => {
        cnt +=(elm.team1.key==club) ? elm.score1 : elm.score2
    })
    console.log(cnt)
  }

getResponeReturn('https://raw.githubusercontent.com/openfootball/football.json/master/2014-15/en.1.json').
then(body =>{
  var rounds = JSON.parse(body).rounds
  var cnt =0
  getitDone()
}).catch(err => {
    console.log(err)
});