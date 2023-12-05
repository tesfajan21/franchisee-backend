exports = async function createRetailer(retailer) {
  
   const currentUser = context.user
    console.log("currentUser id : ",currentUser.id)
    console.log('retailer input ', retailer)
    const cluster = context.services.get("mongodb-atlas");
    const retailers = cluster.db("impacc-db-production").collection("retailer");
    const retailerVisits = cluster.db("impacc-db-production").collection("retailervisit");
    
    const session = cluster.startSession();
    try{
      await session.withTransaction(async () => {
        const newRetailer = retailers.insertOne({
          shopName: retailer.shopName,
          address: retailer.address,
          contactNumber: retailer.contactNumber,
          contactPerson:retailer.contactPerson,
          lastVisitedDate: retailer.lastVisitedDate,
          offerAccepted: retailer.offerAccepted,
          userId: retailer.userId,
          _partition: `user=${retailer.userId}`
        }, {session});
        
          const newVisit = retailerVisits.insertOne({
            retailerId: newRetailer.insertedId,
            offerPlaced:retailer.offerPlaced,
            remarks: retailer.remarks,
            offerAccepted: retailer.offerAccepted,
            fullPrice: retailer.fullPrice,
            numberOfProducts: retailer.numberOfProducts,
            priceGiven: retailer.priceGiven,
            visitDate:  retailer.lastVisitedDate,
          }, {session})
        
      });
      
      
      
    }
    catch (error) {
      console.error(`createRetailer Error: ${error}`);
      await session.abortTransaction();
    }
    finally {
      await session.endSession();
    }
    

};