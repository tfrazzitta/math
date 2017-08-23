
var path = require("path");
var mongoose = require("mongoose");
// var WS = require("../models/WS.js");
var User = require("./models/user.js");
var WS = require("./models/WS.js");

module.exports=function(app){
////////////////////// UPLOAD/////////
  app.post("/upload",function(req,res){
    if(req.body.link2==="undefined"){
        var NewWS = new WS ({
          grade:req.body.grade,
          chapter: req.body.chapter,
          type: req.body.type,
          concept: req.body.topic,
          link: req.body.link,
          //message: req.body.message
        });
          NewWS.save(function(err,doc){
              if (err){
              console.log('err: ' + error);
              res.json('error: there was an error');
              }
              else{
                   if(doc.grade==="6"){
                   res.redirect("/sixth")
                  }
                   if(doc.grade==="7"){
                   res.redirect("/seventh")
                  }
                   if(doc.grade==="8"){
                   res.redirect("/eighth")
                  }
                   if(doc.grade==="algebra"){
                   res.redirect("/algebra")
                  }
              }
          })
    }

    else{
        var NewWS = new WS ({
          grade:req.body.grade,
          chapter: req.body.chapter,
          type: req.body.type,
          concept: req.body.topic,
          link: req.body.link,
         // message: req.body.message
        });

        var NewWS1 = new WS ({
          grade:req.body.grade,
          chapter: req.body.chapter,
          type: req.body.type,
          concept: req.body.topic,
          link: req.body.link2,
         // message: req.body.message
        });

          NewWS.save(function(err,data){
              if (err){
              console.log('err: ' + error);
              res.json('error: there was an error');
              }
              else{
               // console.log(data)
              }
          })

          NewWS1.save(function(err,doc){
              if (err){
              console.log('err: ' + error);
              res.json('error: there was an error');
              }
              else{
                  if(doc.grade==="6"){
                   res.redirect("/sixth")
                  }
                  if(doc.grade==="7"){
                   res.redirect("/seventh")
                  }
                  if(doc.grade==="8"){
                   res.redirect("/eighth")
                  }
                  if(doc.grade==="algebra"){
                   res.redirect("/algebra")
                  }
              }
          })
    }    
})
//////////////////////END OF UPLOAD/////////


//////RETRIEVE BY GRADE////
app.get("/grade/:id", function(req, res) {
    console.log(req.params.id)
    WS.find({grade:req.user._id}).exec(function(error,doc){
      if (error) {
       console.log(error)
      }
      else {
        res.send(doc);
      }
    })
})
//////END RETRIEVE BY GRADE////


//////RETRIEVE BY TOPIC////
app.post("/topic/:id", function(req, res) {
    console.log(req.params.id)
    WS.find({concept:req.params.id,grade:req.body.grade}).exec(function(error,doc){
      if (error) {
       console.log(error)
      }
      else {
        res.send(doc);
        console.log(doc)
      }
    })
})
//////END RETRIEVE BY TOPIC////


//////RETRIEVE BY CHAPTER////
app.post("/chapter/:id", function(req, res) {
  console.log(req.user.google.name)
    console.log(req.params.id)
    console.log(req.body.grade)
    WS.find({chapter:req.params.id, grade:req.body.grade}).exec(function(error,doc){
      if (error) {
       console.log(error)
      }
      else {
        //console.log(doc);
        res.send(doc);
      }
    })
})
//////END RETRIEVE BY CHAPTER////


//////RETRIEVE BY TYPE////
app.post("/type/:id", function(req, res) {
    console.log(req.params.id)
    WS.find({type:req.params.id,grade:req.body.grade,chapter:req.body.chapter}).exec(function(error,doc){
      if (error) {
       console.log(error)
      }
      else {
        console.log(doc);
        res.send(doc);
      }
    })
})
//////END RETRIEVE BY TYPE////


//////RETRIEVE BY TYPE////
app.post("/video/:id", function(req, res) {
    console.log(req.params.id)
    WS.find({_id:req.params.id}).exec(function(error,doc){
      if (error) {
       console.log(error)
      }
      else {
       res.redirect("/video")
      }
    })
})
//////END RETRIEVE BY TYPE////



////RETRIEVE BY TYPE////
app.post("/input/:id", function(req, res) {
    console.log(req.params.id)
    WS.find({grade:req.params.id}).exec(function(error,doc){
      if (error) {
       console.log(error)
      }
      else {
        //console.log(doc);
        res.send(doc);
      }
    })
})
//////END RETRIEVE BY TYPE////


////////DELETE ALL RESOURCES//////
// app.get("/del", function(req, res) {
//   WS.remove().exec(function(error,data){
//      if(error){
//         res.send(error)
//       }
//       else{
//         res.send(data)
//       }
//    });
// })
//////////////END OF DELETE/////


//delete users and saved items
app.post("/videoDel/:id", function(req, res) {
  WS.remove({_id:req.params.id}).exec(function(error,data){
     if(error){
        res.send(error)
      }
      else{
        console.log(data)
        res.send(data)
      }
   });
})


app.get("/hello", function(req, res) {
   res.send(req.user.google.name);
})




}////MODULE END///////



  