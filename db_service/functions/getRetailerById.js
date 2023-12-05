exports = function(retailerId){
console.log(retailerId)
  try{
    const retailerCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("retailer");
    const userCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("user");
    
    const retailerQuery = { "_id":BSON.ObjectId(retailerId) };
        const retailerProfile=retailerCollection.findOne(retailerQuery);
        const user = userCollection.findOne({"userId":retailerProfile.userId})
        return {isSuccess:true, content:{retailerProfile, user}, message:"Success"}
  }catch(error){
    return {isSuccess:false, content:error, message:error.message}
  }
};