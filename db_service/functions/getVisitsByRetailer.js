

exports = async function getVisitsByRetailer(retailerId,pageNumber,nPerPage,isNewRetailer) {
  let _retailerId = retailerId;
  try {
    
    
    if(isNewRetailer)
    {
    let retailerVisitCollection = context.services
      .get("mongodb-atlas")
      .db("impacc-db-production")
      .collection("retailervisit");
      
    const retailerVisitQuery = { retailerId: BSON.ObjectId(_retailerId) };

    const data = {data:retailerVisitCollection
      .find(retailerVisitQuery)
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage: 0)
      .limit(nPerPage)
      .toArray(), count:retailerVisitCollection.count(retailerVisitQuery)}
      
    // return retailerVisitCollection
    //   .find(retailerVisitQuery)
    //   .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage: 0)
    //   .limit(nPerPage)
    //   .toArray();
    return {isSuccess:true, content:data, message:"Success"}
    }
    else
    {
    
    let retailerVisitCollection = context.services
      .get("mongodb-atlas")
      .db("impacc-db-production")
      .collection("retailersalesreport");
        const retailerVisitQuery = { retailerId: BSON.ObjectId(_retailerId) };
        
    // return retailerVisitCollection
    //   .find(retailerVisitQuery)
    //   .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage: 0)
    //   .limit(nPerPage)
    //   .toArray();
    const data = {data:retailerVisitCollection
      .find(retailerVisitQuery)
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage: 0)
      .limit(nPerPage)
      .toArray(), count:retailerVisitCollection
      .count(retailerVisitQuery)};
      return {isSuccess:true, content:data, message:"Success"}
    }
      
      
  } catch (error) {
    console.error(`getVisitsByRetailer Error : ${error}`);
    return {isSuccess:false, content:error, message:error.message}
  }
};