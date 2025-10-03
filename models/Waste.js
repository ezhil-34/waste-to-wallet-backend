import mongoose from "mongoose";

const wasteSchema = new mongoose.Schema({
    category: {type:String, required:true},
    type: {type:String},
    quantity: {type:Number, required:true},
    photoUrl:{type:String},
    location: {
        latitude: { type: Number },
        longitude: { type: Number}
    },
    address:{type:String},
    date:{ type: Date, default: Date.now }
});

export default mongoose.model("Waste",wasteSchema);