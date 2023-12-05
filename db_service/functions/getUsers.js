exports = function(pageNumber,nPerPage,serachText,adavanceFilter)
{
  
  // need to be implemented search indexes
    try {
  
        let userCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("user");
      
       
    
      let userList; let usersCount;
      if(serachText.length >0 && adavanceFilter.length <=0)
      {
         userList= userCollection.find( { $text: { $search: serachText } } )
                              .sort({ createdOn: 1 })
                              .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
                              .limit( nPerPage )
                              .toArray();
                              
         usersList=    userCollection.find( { $text: { $search: serachText } } )
                              .sort({ createdOn: 1 })
                              .toArray();
          
          usersCount=usersList.length;
      }
    else if(serachText.length <=0 && adavanceFilter.length > 0)
      {
         strFromDate=adavanceFilter.fromDate;//"2022-01-14T23:59:59Z"
         strToDate==adavanceFilter.toDate; //"2022-02-28T23:59:59Z"
        
         userList= userCollection.find({"createdOn":{$gte:new Date(strFromDate),$lte:new Date(strToDate)}})
                              .sort({ createdOn: 1 })
                              .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
                              .limit( nPerPage )
                              .toArray();
                              
        usersList=    userCollection.find({"createdOn":{$gte:new Date(strFromDate),$lte:new Date(strToDate)}})
                              .sort({ createdOn: 1 })
                              .toArray();
          
          usersCount = usersList.length;
                              
           
      }
      else
      {
        
        userList=  userCollection.find()
                              .sort({ createdOn: 1 })
                              .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
                              .limit( nPerPage )
                              .toArray();
                              
         usersCount=  userCollection.count();
                             
      }
      
     
      
      
       return {count :parseInt(usersCount),users :userList};
    }
    catch (error) {
    console.error(`Couldn't find users  : ${error}`);
   }
            
};