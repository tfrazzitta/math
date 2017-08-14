var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var WSSchema = new Schema({
      grade: {type: String},
      chapter: {type: String},
      type: {type: String},
      concept: {type: String},
      topic: {type: String}, 
      link: {type: String},
      message: {type: String},
      user: {type: String},
      // email: {type: String},
});

// Create the Model
var WS = mongoose.model("WS", WSSchema);

// Export it for use elsewhere
module.exports = WS;

