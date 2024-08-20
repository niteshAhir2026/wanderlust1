const Listing=require("../models/listing");
const Review = require("../models/review");

module.exports.createReview=async (req, res) => {
    console.log("create review runnig 1")
    const listing = await Listing.findById(req.params.id);
    console.log("listing",listing)
    console.log("crete review running 2")
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    console.log("crete review running 3")
    const newReview = new Review(req.body.review);
    console.log("crete review running 4")
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    console.log("crete review running 5")
    await newReview.save();
    console.log("new review saved")
    await listing.save();
    console.log("crete review running 6")
    req.flash("success","New review created")
    console.log("crete review running 7")
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!")
    res.redirect(`/listings/${id}`);
}