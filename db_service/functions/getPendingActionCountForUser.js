exports = function(arg){
   let _UserId = arg;
   try {
        let  pendingAction=0;
        let retailerCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("retailer");
        const retailerQuery = { "userId": _UserId};
        let retailerCount= retailerCollection.count(retailerQuery);
         
         if(parseInt(retailerCount) > 0)
         {   pendingAction=0;
             var strToDate = Date();
             var startDate = new Date(strToDate).toISOString()
             //2022-01-14T23:59:59Z
             
             var strPrevDate = new Date();
             var strFormatprevDate=strPrevDate.setDate(strPrevDate.getDate() - 14);
             var prevDate = new Date(strFormatprevDate).toISOString()
             
             const existingRetailerQuery = { "userId": _UserId,"offerAccepted" : true,"lastVisitedDate":{$gte:new Date(prevDate),$lte:new Date(startDate)}};//,};
             let retailerList= retailerCollection.find(existingRetailerQuery).sort({ lastVisitedDate: 1 }).toArray();
          
             
             if(retailerList.length >0)
             { 
                  retailerCount=1;
                  pendingAction=0;
                
             }
             else
             { 
                retailerCount=0;
                 pendingAction=1;
             }
              
         }
         else
         {
           pendingAction=1;
         }
         
         return parseInt(pendingAction) ; // if retun count greater than zero  pending contract would be 0
   
  
   }
   catch (error) {
    console.error(`Couldn't find retialers by user  ${_UserId}: ${error}`);
   }
};