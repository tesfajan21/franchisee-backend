exports = async function linkRegisteredUser({user}) {
  try {
    // console.log(user);
    // console.log({user});
    // // console.log(JSON.parse(user));
    // console.log(JSON.stringify({user}));
    const cluster = context.services.get("mongodb-atlas");
    const userCollection = cluster.db("impacc-db-production").collection("user");

    const query = { email: user.data.email };
    const update = {
      $set: {
        userId: user.id,
        _partition:"user="+user.id
      },
    };
    const options = { upsert: false };
    const updateUser = await userCollection.updateOne(query, update, options);
  } catch (error) {
    console.log("linkRegisteredUser error : ", error);
  }
};