var hive = require('@hiveio/hive-js');
const fs = require("fs");
const { builtinModules } = require('module');




module.exports={
    getRandomLine:function(filename, callback){
        fs.readFile(filename, "utf-8", function(err, data){
          if(err) {
              throw err;
          }
      
          // note: this assumes `data` is a string - you may need
          //       to coerce it - see the comments for an approach
          var lines = data.split('\n');
          
          // choose one of the lines...
          var line = lines[Math.floor(Math.random()*lines.length)]
      
          // invoke the callback with our line
          callback(line);
       })
      },
    
    getAccounts:function(user,cb){
        hive.api.getAccounts(user, function(err, response){
         cb(response) 
            
        })
    },
    
    messageSend:function(voter,percent,line){
        
       
        if(percent>=0){
           
            return (
                "Dear @"+voter+"\n"+
                "Thank you for your %"+(percent/100)+" upvote"+"\n"+
                "Here is your fortune cookie below"+"\n"+
                "****************************************************"+"\n"+                           
                line+"\n"+
                "****************************************************"+"\n"
                )
                
        }else{
            return(
                "Dear @"+voter+"\n"+
                "Sorry for your %"+(percent/100)+" downvote"+"\n"+
                "It seems you don't like fortune cookies"+"\n"+
                "Anyway I send you a fortune cookie below"+"\n"+
                "****************************************************"+"\n"+                           
                line+"\n"+
                "****************************************************"+"\n"
            )

            }
        
    }
   

}


