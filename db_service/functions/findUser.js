exports = function(arg){
  
   let _UserId = arg;
   try {
     
        let userCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("user");
        const UserQuery = { "_id":BSON.ObjectId(_UserId)};
        console.log(arg);
         const data =  userCollection.findOne(UserQuery);
         return {isSuccess:true, content:data, message:"success"}
   
  
   }
   catch (error) {
    console.error(`Couldn't find user ${_UserId}: ${error}`);
    return {isSuccess:false, content:error, message:error.message}
   }
};