var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var SavedSchema = new Schema({
      grade: {type: String},
      name: {type: String},
      password: {type: String},
      user:Boolean,
      savedItems:Array
  });

var Saved = mongoose.model("Saved", SavedSchema);


module.exports = Saved;

