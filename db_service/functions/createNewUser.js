exports = async function createNewUser(user) {
  try {
    const cluster = context.services.get("mongodb-atlas");
    const userCollection = cluster.db("impacc-db-production").collection("user");

    const result = await userCollection.insertOne({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      primaryMobile:user.primaryMobile,
      createdOn: new Date(),
      isSalesTutorialWatched:user.isSalesTutorialWatched,
      isAppTutorialWatched:user.isAppTutorialWatched
    });
    return({isSuccess:true, content:result, message:"success"});
  } catch (error) {
    return({isSuccess:false, content:JSON.stringify(error), message:eroor.message});
  }
};
