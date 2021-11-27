var hive = require('@hiveio/hive-js');
const fs = require("fs");
var functions=require('./functions')


const wif="put your posting key"


/*
functions.getAccounts(a,function(user){
    doFoo(user)
});

function doFoo(response){
    console.log(response)
}



hive.api.lookupAccountNames(a, function(err, result) {
    console.log(err, result);
  });
  */
  hive.api.getBlog("firedream", -1, 1, function(err, data) {
	console.log(err, data);
});

    
      

var release = hive.api.streamTransactions('head', function(err, result) {
    if ((result.operations["0"]["0"] == 'vote')&&((result.operations["0"]["1"].weight / 100)>0)&&(result.operations["0"]["1"].permlink=="3b9dka-trial-post")) {
        var ind = result.operations["0"]["1"].author
        console.log("the_user"+ ind ,"\n" +
                    " IS UPVOTED BY: " + result.operations["0"]["1"].voter ,"\n" + 
                    " WITH WEIGHT % : " + result.operations["0"]["1"].weight / 100 ,"\n"+
                    " ON POST: https://hive.blog/@" + result.operations["0"]["1"].author +"/" + result.operations["0"]["1"].permlink ,"\n" +
                    " AT TIME (UTC): " + result.expiration ,"\n");
                    functions.getRandomLine("./fortunes.txt",function(line){

                        const permlink = Math.random()
                        .toString(36)
                        .substring(2);
                        let message=(
                            "Dear @"+result.operations["0"]["1"].voter+"\n"+
                            "Thank you for your %"+result.operations["0"]["1"].weight / 100+" upvote"+"\n"+
                            "Here is your fortune cookie below"+"\n"+
                            "****************************************************"+"\n"+                           
                            line+"\n"+
                            "****************************************************"+"\n"
                        )
                        console.log(message)
                        
                        hive.broadcast.comment(wif, "firedream","3b9dka-trial-post" , "firedream",permlink, "", message, "", function(err, result) {
                            console.log(err, result);
                          });
                        console.log(permlink)    
                        
                    });

                    
                }
                if ((result.operations["0"]["0"] == 'vote')&&((result.operations["0"]["1"].weight / 100)<0)&&(result.operations["0"]["1"].permlink=="3b9dka-trial-post")) {
                    var ind = result.operations["0"]["1"].author
                    console.log("the_user"+ ind ,"\n" +
                                " IS UPVOTED BY: " + result.operations["0"]["1"].voter ,"\n" + 
                                " WITH WEIGHT % : " + result.operations["0"]["1"].weight / 100 ,"\n"+
                                " ON POST: https://hive.blog/@" + result.operations["0"]["1"].author +"/" + result.operations["0"]["1"].permlink ,"\n" +
                                " AT TIME (UTC): " + result.expiration ,"\n");
                                functions.getRandomLine("./fortunes.txt",function(line){
            
                                    const permlink = Math.random()
                                    .toString(36)
                                    .substring(2);
                                    let message=(
                                        "Dear @"+result.operations["0"]["1"].voter+"\n"+
                                        "Sorry for your %"+result.operations["0"]["1"].weight / 100+" downvote"+"\n"+
                                        "It seems you don't like fortune cookies"+"\n"+
                                        "Anyway I send you a fortune cookie below"+"\n"+
                                        "****************************************************"+"\n"+                           
                                        line+"\n"+
                                        "****************************************************"+"\n"
                                    )
                                    console.log(message)
                                    
                                    hive.broadcast.comment(wif, "firedream","3b9dka-trial-post" , "firedream",permlink, "", message, "", function(err, result) {
                                        console.log(err, result);
                                      });
                                    console.log(permlink)    
                                    
                                });
            
                                
                            }                          

})


    



