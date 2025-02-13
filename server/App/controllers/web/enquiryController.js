const enquiryModel = require("../../models/enquiry.model");

let enquiryInsert=(req,res)=>{
    let {name,email,phone,message}=req.body;
    let enquiry = new enquiryModel({
        name,
        email,
        phone,
        message
    });
    enquiry.save().then(()=>{
        res.send({status:1, message:"Enquiry Inserted"});
    }).catch((err)=>{
        res.send({status:0, message:'Error while saving enquiry',error:err});
    });
}
// View
let enquiryList=async (req,res)=>{
    let enquiry = await enquiryModel.find();
    res.send({status:1, enquiryList:enquiry});
}

// Delete
let enquiryDelete=async (req,res)=>{
    let enId=req.params.id;
    let enquiry = await enquiryModel.deleteOne({_id:enId});
    res.send({status:1, message:"Enquiry Deleted",enquiry});
}

// Edit
let enquirySingleRow=async (req,res)=>{
    let enId=req.params.id;
    let enquiry = await enquiryModel.findOne({_id:enId});
    res.send({status:1, enquiry});
}

// Update
let enquiryUpdate=async (req,res)=>{
    let enquiryId = req.params.id;
    let {name, email, phone, message} = req.body;
    let updateObj = {
        name,
        email,
        phone,
        message
    };
    let updateRes = await enquiryModel.updateOne({_id:enquiryId}, updateObj);
    res.send({status:1, message:"Enquiry Updated", updateRes});
}

module.exports = {enquiryInsert, enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdate};