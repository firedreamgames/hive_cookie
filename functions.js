var hive = require('@hiveio/hive-js');
const fs = require("fs")
module.exports={
    
    getAccounts:function(user,cb){
        hive.api.getAccounts(user, function(err, response){
         cb(response) 
            
        })
    },
    getRandomLine:function (filename, callback){
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
      }
   

}

