exports = async function createNewUserDocument({user}) {
  
   console.log('log:',JSON.stringify(user));
  
   try {
  const cluster = context.services.get("mongodb-atlas");
  const users = cluster.db("impacc-db-production").collection("user");
  return users.insertOne({
    _id: user.id,
    _partition: `user=${user.id}`,
     email: user.data.email,
     firstName: user.data.firstName,
     lastName: user.data.lastName,
     gender: user.data.gender,
     addressLine1: user.data.addressLine1,
     addressLine2: user.data.addressLine2,
     city: user.data.city,
     country: user.data.country,
     dob: user.data.dob,
     primaryMobile: user.data.primaryMobile,
     secondryMobile: user.data.secondryMobile,
     zipCode: user.data.zipCode,
     createdOn: new Date() 
    
  });
   }
   catch (error) {
    console.error(`Couldn't find user ${user}: ${error}`);
   }
};


