exports = function(){
 // sample criteria argumenet send from client  app
   const criteria= {
          skip: 0,
          limit: 10,
          filters: {
            gender: "male",
            firstName: { $eq: "Kasun" }
          },
          sort: {
            createdOn: 1,
          },
        }
     // {
    //       skip: 10, //(pagesize*pageNumber)
    //       limit: 10,
    //       filters: {
    //         firtName: { $ne: "completed" },
    //         email: { $ne: "completed" },
    //
    //       },
    //       sort: {
    //         orderDate: 1,
    //       },
    //     }
   try {
     const { filters, limit, skip, sort } = criteria;
      let userCollection = context.services.get("mongodb-atlas").db("impacc-db-production").collection("user");
      const userList =  userCollection
        .aggregate([
          {
            $match: {
              ...filters,
            },
          },
          {
            $sort: {
              createdOn: -1
              // ...sort,
            },
          },
          {
            $facet: {
              total: [
                {
                  $count: 'count',
                },
              ],
              data: [
                {
                  $addFields: {
                    _id: '$_id',
                  },
                },
              ],
            },
          },
          {
            $unwind: '$total',
          },
          {
            $project: {
              data: {
                $slice: [
                  '$data',
                  skip,
                  {
                    $ifNull: [limit, '$total.count'],
                  },
                ],
              },
              meta: {
                total: '$total.count',
                limit: {
                  $literal: limit,
                },
                page: {
                  $literal: skip / limit + 1,
                },
                pages: {
                  $ceil: {
                    $divide: ['$total.count', limit],
                  },
                },
              },
            },
          },
        ]).toArray()
         console.log('dat array ', JSON.stringify(userList));
        if (userList && Array.isArray(userList) && userList.length > 0) {
        return userList[0];
       } else {
        console.log('undefined array ');
        return [];
       }
        return userList;
   }
   catch (error) {
    console.error(`Couldn't find users : ${error}`);
   }
};