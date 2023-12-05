exports = async function updateRetailer(retailer) {
  try {
    const cluster = context.services.get("mongodb-atlas");
    const retailers = cluster.db("impacc-db-production").collection("retailer");

    const query = { _id: BSON.ObjectId(retailer._id) };
    const update = {
      $set: {
        shopName: retailer.shopName,
        address: retailer.address,
        contactNumber: retailer.contactNumber,
        contactPerson: retailer.contactPerson,
      },
    };
    const options = { upsert: false };
    const updatedRetailer = await retailers.updateOne(query, update, options);
    const { matchedCount, modifiedCount } = updatedRetailer;
    if (matchedCount && modifiedCount) {
      return {
        isSuccess: true,
        message: `Successfully updated the item.`,
        content: null,
      };
    } else {
      return {
        isSuccess: false,
        message: `Failed to update the item`,
        content: null,
      };
    }
  } catch (error) {
    console.error(`updateRetailer Error: ${error}`);
  }
};