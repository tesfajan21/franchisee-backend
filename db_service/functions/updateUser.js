exports = async function(user){
  // const query = { "email": "kasunth@gmail.com" };
  // const update = {
  //   "$set": {
  //     "firstName": "Kasunth",
  //     "lastName": "thilanka",
  //     "gender": "male",
  //     "dob":"02-03-1988",
  //     "primaryMobile": "+9477847225",
  //     "secondryMobile": "+9477847325",
  //     "addressLine1": "167,Galle Road",
  //     "addressLine2": "Colombo 02",
  //     "city": "Colombo",
  //     "zipCode": "0098",
  //     "country": "Sri Lanka"
  //   }
  // };
  
    const query = { "email": user.email };
    // const query = {_id:BSON.ObjectId(user.id)};
    // const query = {userId:user.id};
  const update = {
    "$set": {
      "firstName": user.firstName,
      "lastName": user.lastName,
      // "gender": user.gender,
      // "dob":user.dob,
      "primaryMobile": user.primaryMobile,
      // "secondryMobile": user.secondryMobile,
      // "addressLine1": user.addressLine1,
      // "addressLine2": user.addressLine2,
      // "city": user.city,
      // "zipCode": user.zipCode,
      // "country": user.country
    }
  };
  
  const options = { "upsert": false };
   try {
  const cluster = context.services.get("mongodb-atlas");
  const userCollection = cluster.db("impacc-db-production").collection("user");

  const updatedUser =  await userCollection.updateOne(query, update, options);
  // console.log("updatedUser : ",JSON.stringify(updatedUser))
  const { matchedCount, modifiedCount } = updatedUser;
  
  if(matchedCount && modifiedCount) {
    return {isSuccess:true, content:updatedUser, message:"Success"}
  }
  else{
    return {isSuccess:false, content:updatedUser, message:"Fail"}
  }

   }
   catch (error) {
    console.error(`Couldn't find user ${user.email}: ${error}`);
    return {isSuccess:false, content:error, message:JSON.stringify(error)}
   }
};

