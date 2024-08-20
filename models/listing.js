const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js")

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: { type: String },
    url: { type: String }
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  owner:{
    type: Schema.Types.ObjectId,
    ref: 'User'  // Assuming User is the User model with _id field
  },
 geometry:{
  type:{
    type:String,
    enum:['Point'],//location.type must be 'Point
    required:false
  },
  coordinates:{
    type:[Number],
    required:true
  }
 }



});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id :{$in:listing.reviews}})
  }
    
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;