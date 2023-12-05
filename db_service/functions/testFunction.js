exports = function(){
  
 
   try {
     
        let userCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("user");
      
       
         return userCollection.find();
   
  
   }
   catch (error) {
    console.error(`Couldn't find users: ${error}`);
   }
};