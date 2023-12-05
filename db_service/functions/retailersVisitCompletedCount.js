exports = function(userId,isNewRetailer)
{
  let _userId = userId;
   
  try 
    {
        
        if(isNewRetailer)
        {
        
         let visitCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("retailervisit");
         const query = { "userId": _userId};
         const totalVisitCompletedCount=visitCollection.count(query);
         
         return totalVisitCompletedCount;
        }
        else
        {
          let salesCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("retailersalesreport");
         const query = { "userId": _userId};
         const totalSalesVisitCompletedCount=salesCollection.count(query);
         
         return totalSalesVisitCompletedCount;
        }

       
  }
   catch (error) {
    console.error(`New Retailer visit completed results failed for user  ${0}: ${error}`);
   }
};