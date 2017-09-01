
var path = require("path");
var mongoose = require("mongoose");
var User = require("./models/user.js");
var Saved = require("./models/saved.js");
var WS = require("./models/WS.js");
var bigArray=[];

module.exports=function(app){
//////SAVE AN ITEM//////
app.post("/saved/:id", function(req, res) {
    Saved.find({name:req.user.google.name}).exec(function(error,data){
      console.log(data)
      var save= data[0].savedItems
      
      for(i=0;i<save.length;i++){
        if(save[i]===req.params.id){
          res.send("Already Saved")
          return false;
        }
      }

      if(data.length==0){
          console.log("NEWCOMER")
          console.log(req.user.google.name)
          var NewSaved = new Saved ({
          name:req.user.google.name,
          savedItems:[]
        });
       
       NewSaved.save(function(err,doc){
       console.log(doc)
       Saved.update({name:req.user.google.name},{$push:{savedItems:req.params.id}}).exec(function(error,data){
          if (error) {
             console.log(error)
          }
          else {
          res.send("Success")
          }
        })
       })

      }    
      else{
        console.log("USER")
        Saved.update({name:req.user.google.name},{$push:{savedItems:req.params.id}}).exec(function(error,data){
          if (error) {
             console.log(error)
          }
          else {
          res.send("Success")
          }
         })
      }
    })    
})

////////////END SAVE AN ITEM///////

/////////////RETRIEVE ALL SAVED ITEMS//////
app.get("/saved", function(req, res) {
  var callsCompleted=0;
    Saved.find({name:req.user.google.name}).exec(function(error,data){
                if (error) {console.log(error)}
                
                if(data.length==0){
                      res.send(bigArray)
                      bigArray=[];
                }
                else {
                     console.log("SAVE")
                     console.log(data)
                     var save= data[0].savedItems
                     console.log(save)
                     for(i=0;i<save.length;i++){
                        WS.find({_id:save[i]}).exec(function(error,doc){ 
                              var saver={
                                  chapter: doc[0].chapter,
                                  grade: doc[0].grade,
                                  link: doc[0].link,
                                 //message: doc[0].message,
                                  type: doc[0].type,
                                  concept: doc[0].concept,
                                  _id: doc[0]._id,
                                  user:req.user.google.name
                              } 
                              console.log(saver)
                              bigArray.push(saver);
                              callsCompleted++

                              if(callsCompleted==save.length){
                                res.send(bigArray)
                                bigArray=[];
                              }
                        });     
                       }
                }
      })
 
})
//////////END RETRIEVE ALLL/////

///////DELETE SAVED ITEM///
app.post("/deleteOne/:id", function(req, res) {
  var callsCompleted=0;
  console.log(req.params.id)
    Saved.update({name:req.user.google.name},{ $pull: { savedItems: req.params.id } } ).exec(function(error,data){
      Saved.find({name:req.user.google.name}).exec(function(error,data){ 
        if(error){
          res.send(error)
        }
            else{
              console.log(data[0].savedItems)
              var save= data[0].savedItems
                  if(save.length==0){
                      res.send(bigArray)
                      bigArray=[];
                  }
                      for(i=0;i<save.length;i++){
                          WS.find({_id:save[i]}).exec(function(error,doc){ 
                            var saver={
                              chapter: doc[0].chapter,
                              grade: doc[0].grade,
                              link: doc[0].link,
                              //message: doc[0].message,
                              type: doc[0].type,
                              concept: doc[0].concept,
                              _id: doc[0]._id
                            } 
                                console.log(saver)
                                bigArray.push(saver)
                                callsCompleted++

                                if(callsCompleted==save.length){
                                  res.send(bigArray)
                                  bigArray=[];
                                }
                          })
                      }
            } 
      })
    })
});
///////END DELETE SAVED ITEM///


////DELETE USERS SAVED ITEMS
// app.get("/deleteAll", function(req, res) {
//   console.log(req.user.google.name)
//   Saved.update({name: req.user.google.name}, {$set: {savedItems:[] }}).exec(function(error,data){
//     if ( error ) throw error;
//   Saved.find({name:req.user.google.name}).exec(function(error,data){ 
//     res.send(data)
//   })
//   })
// })
////END DELETE USERS SAVED ITEMS





/////DELETE EVERYONES SAVED ITEMS///
// app.get("/pull", function(req, res) {
//   console.log(req.user.google.name)
//   Saved.updateMany({name:req.user.google.name}, {$set: {savedItems: [] }}).exec(function(error,data){
//     if ( error ) throw error;
//     res.json(data)
//   })
// })

/////END DELETE ALLL////


//delete users and saved items
// app.get("/delete", function(req, res) {
//   Saved.remove().exec(function(error,data){
//      if(error){
//         res.send(error)
//       }
//       else{
//         res.send(data)
//       }
//    });
// })



//for testing
// app.get("/all", function(req, res) {
// Saved.find({name:req.user.google.name}).exec(function(error,data){
//       if(error){
//         res.send(error)
//       }
//       else{
//         res.send(data)
//       }
// })
// })



app.get('/show', function (req, res){
   User.find({}).exec(function(error,data){ 
    res.json(data)
   })   
});


}////MODULE END///////
