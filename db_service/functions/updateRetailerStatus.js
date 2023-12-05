exports = async function () {
  let retailerCollection = context.services
    .get("mongodb-atlas")
    .db("impacc-db-production")
    .collection("retailer");

  // await retailerCollection.updateMany({},  {"$set": { "isActiveAccount": false  }},   {"upsert": false} );

  console.log(JSON.stringify(retailerCollection));
  var strToDate = Date();
  var startDate = new Date(strToDate).toISOString();
  //2022-01-14T23:59:59Z

  var strPrevDate = new Date();
  var strFormatprevDate = strPrevDate.setDate(strPrevDate.getDate() - 14);
  var prevDate = new Date(strFormatprevDate).toISOString();

  const existingRetailerQuery = {
    offerAccepted: true,
    lastVisitedDate: { $gte: new Date(prevDate), $lte: new Date(startDate) },
  };
  let retailerList = retailerCollection
    .find(existingRetailerQuery)
    .sort({ lastVisitedDate: 1 })
    .toArray();

  if (retailerList.length <= 0) {
    const query = { offerAccepted: true };
    const update = { $set: { isActiveAccount: false } };
    const options = { upsert: false };

    return retailerCollection.updateMany(query, update, options);
    // .then(result => {
    //   const { matchedCount, modifiedCount } = result;
    //   console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} items.`)

    // })
    // .catch(err => console.error(`Failed to update retailers: ${err}`))
  } else {
    const query = {
      offerAccepted: true,
      lastVisitedDate: { $gte: new Date(prevDate), $lte: new Date(startDate) },
    };
    const update = { $set: { isActiveAccount: true } };
    const options = { upsert: false };

    return retailerCollection.updateMany(query, update, options);
    // .then(result => {
    //   const { matchedCount, modifiedCount } = result;
    //   console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} items.`)

    // })
    // .catch(err => console.error(`Failed to update retailers: ${err}`))
  }
};
