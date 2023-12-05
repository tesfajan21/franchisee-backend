exports = function(retailerId,isNewRetailer){
  
   let _retailerId = retailerId;
   
   try {
     
        let retailerCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("retailer");
        //const retailerQuery = { "_id": _retailerId};
        const retailerQuery = { "_id":BSON.ObjectId(_retailerId) };
        const retailProfile=retailerCollection.findOne(retailerQuery);
        
          let visitCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("retailervisit");
          
        if(isNewRetailer)
        {
         
          const retailerVisitQuery = { "retailerId": BSON.ObjectId(_retailerId)};
          const retailVisitCount=visitCollection.count(retailerVisitQuery);
          
           const retailerOfferPlaceduery = { "retailerId": BSON.ObjectId(_retailerId),"offerPlaced" : true};
           const retailOfferPlacedCount=visitCollection.count(retailerOfferPlaceduery);
           
           const visitsCountQuery = { "retailerId": BSON.ObjectId(_retailerId)};
           const totalVisits=visitCollection.count(visitsCountQuery);
          
          
           
            return {retilerProfile :retailProfile,retailVisitCount :parseInt(retailVisitCount),offerPlacedCount :parseInt(retailOfferPlacedCount),totalVisits:parseInt(totalVisits)};
        }
        else
        {
            
          let salesCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("retailersalesreport");
          const salesOfferPlaceduery = { "retailerId": BSON.ObjectId(_retailerId),"offerPlaced" : true};
          const totalOrdersCount=salesCollection.count(salesOfferPlaceduery);
          
          let visitCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("retailervisit");
          const totalProductCount=    visitCollection.aggregate(
                                        [ { $match: { retailerId: BSON.ObjectId(_retailerId)} }, 
                                        { $group: { _id: "$retailerId", TotalnNoOfProductCount: { $sum: "$numberOfProducts" } } 
                                           
                                        } ]);
                                        
          const salesCountQuery = { "retailerId": BSON.ObjectId(_retailerId)};
          const totalSalesVisit=salesCollection.count(salesCountQuery);
          
          
           return {retilerProfile :retailProfile,totalOrdersCount :parseInt(totalOrdersCount),totalProductCount :totalProductCount,totalVisits: parseInt(totalSalesVisit)};
        }
        
        
       
        
      //  let visitCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("retailervisit");
       
        
        
   
      
   }
   catch (error) {
    console.error(`Couldn't find retialers by for  ${_retailerId}: ${error}`);
   }
};

//62127368b13e72f77fee20dc