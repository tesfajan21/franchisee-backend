exports = function(userId,pageNumber,nPerPage,isOfferAccepted){
  
  // let _UserId = userId;
   
   try {
     
        let userCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("user");
        let retailerCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("retailer");
        
        const UserQuery = { "_id":BSON.ObjectId(userId)};
        const user = userCollection.findOne(UserQuery);
        
        let _UserId = user.userId;
        if(!isOfferAccepted)
        {
         const retailerQuery = { "userId": _UserId,"offerAccepted" : false};
         const data = {data: retailerCollection.find(retailerQuery).sort({ lastVisitedDate: 1 })
         .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage: 0)
            .limit(nPerPage)
            .toArray(), count :retailerCollection.count(retailerQuery)}
            return {isSuccess:true, content:data, message:"Success"}
        }
        else
        {
           const retailerQuery = { "userId": _UserId,"offerAccepted" : true};
           const data = {data:retailerCollection.find(retailerQuery).sort({ offerAcceptedDate: 1 })
           .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage: 0)
            .limit(nPerPage)
            .toArray(), count:retailerCollection.count(retailerQuery)};
            return {isSuccess:true, content:data, message:"Success"}
        }
        
   
  
   }
   catch (error) {
    console.error(`Couldn't find retialers by user  ${userId}: ${error}`);
    return {isSuccess:false, content:error, message:error.message}
   }
};


