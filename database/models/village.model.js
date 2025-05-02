import mongoose, { Types } from "mongoose";

const villageSchema = mongoose.Schema({
    name:String,
    img:String,
    description:String ,
    city:{
        type:Types.ObjectId,
        ref:"city",
        require:true
    }


}, { timestamps: true });



villageSchema.post("init",(doc)=>{
    doc.img=`${process.env.DOMAIN}/village/${doc.img}`
  })




export const villageModel = mongoose.model('village', villageSchema);
