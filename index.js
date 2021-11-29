var hive = require('@hiveio/hive-js');
const fs = require("fs");
var functions=require('./functions')


const wif="Your Posting Key"
//************************************************************************************ */
//check if any voter left without cookie
//************************************************************************************ */
let str;
let replied=[]

// TEST message send function
/*
functions.getRandomLine("./fortunes.txt",function(line){
    let message=functions.messageSend("firedream",-10000,line)
    console.log(message)
     
})
*/


hive.api.getContentReplies("firedream", "fortune-cookie-hive", function(err, result) {
    //console.log(result.length)
    
    for(let i=0; i<parseInt(result.length);i++){
        str=result[i].body   
        stralt=str.split('@').pop().split('\n')[0];
        replied.push(stralt)
        //console.log(replied)
    }
    hive.api.getActiveVotes("firedream", "fortune-cookie-hive", function(err, result) {
        
        for (let i = 0; i <parseInt(result.length); i++) {
            setTimeout(function timer() {
                if(!(replied.includes(result[i].voter))){
                    console.log(result[i].voter)
                    functions.getRandomLine("./fortunes.txt",function(line){
                        const permlin = Math.random()
                        .toString(36)
                        .substring(2);
                        let message=functions.messageSend(result[i].voter,result[i].percent,line)
                        console.log(message)
                        hive.broadcast.comment(wif, "firedream","fortune-cookie-hive" , "firedream",permlin, "", message, "", function(err, result) {
                        console.log(err, result);
                         });
                    })
                }       
            }, i * 3000);
        }
        })
})
//******************************************************************************************************* */       
/*  
hive.api.getBlog("firedream", -1, 1, function(err, data) {
	console.log(err, data);
});
*/
    
      

var release = hive.api.streamTransactions('head', function(err, result) {
    if ((result.operations["0"]["0"] == 'vote')&&(result.operations["0"]["1"].permlink=="fortune-cookie-hive")) {
        var ind = result.operations["0"]["1"].author
        console.log("the_user"+ ind ,"\n" +
                    " IS UPVOTED BY: " + result.operations["0"]["1"].voter ,"\n" + 
                    " WITH WEIGHT % : " + result.operations["0"]["1"].weight / 100 ,"\n"+
                    " ON POST: https://hive.blog/@" + result.operations["0"]["1"].author +"/" + result.operations["0"]["1"].permlink ,"\n" +
                    " AT TIME (UTC): " + result.expiration ,"\n");
                    const permlink = Math.random()
                        .toString(36)
                        .substring(2);
                    functions.getRandomLine("./fortunes.txt",function(line){
                        let message=functions.messageSend(result.operations["0"]["1"].voter,result.operations["0"]["1"].weight / 100,line)
                        console.log(message)
                        hive.broadcast.comment(wif, "firedream","fortune-cookie-hive" , "firedream",permlink, "", message, "", function(err, result) {
                        console.log(err, result);
                             });    
                        
                    });

                    
                }
                                
                                                      

})


    



