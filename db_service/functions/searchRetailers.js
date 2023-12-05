exports = function (criteria) {
  console.log(' criteria ', JSON.stringify(criteria));
  try {
    const {filters, limit, skip, sort} = criteria;
    const {main, lookup} = filters;

    const lookupFilters = [{$eq: ['$visitDate', '$$lastVisited']}, {$eq: ['$retailerId', '$$retailer_id']}];
    const mainFilters = [];
    let mainMatch = {};
    if(main){
       if (Object.prototype.hasOwnProperty.call(main, 'userId') && main.userId != null) {
        mainFilters.push({$eq: ['$userId', main.userId]});
      }
      if (Object.prototype.hasOwnProperty.call(main, 'searchText') && main.searchText != null) {
        mainMatch = {...mainMatch,
          $text: { $search:  main.searchText } 
      }
        if (Object.prototype.hasOwnProperty.call(main, 'dateRange') && main.dateRange != null) {
        mainFilters.push({$gte: ['$lastVisitedDate', new Date(main.dateRange.firstDate)]});
        mainFilters.push({$lte: ['$lastVisitedDate', new Date(main.dateRange.secondDate)]});
      }
    }

    if (lookup) {
      if (Object.prototype.hasOwnProperty.call(lookup, 'offerPlaced') && lookup.offerPlaced != null) {
        lookupFilters.push({$eq: ['$offerPlaced', lookup.offerPlaced]});
      }
      if (Object.prototype.hasOwnProperty.call(lookup, 'fullPrice') && lookup.fullPrice != null) {
        lookupFilters.push({$eq: ['$fullPrice', lookup.fullPrice]});
      }
    }
   mainMatch = {
     ...mainMatch,
      $expr: {$and: mainFilters},
          };
          
console.log('main filter ', JSON.stringify(mainFilters))
    let retailerCollection = context.services
      .get('mongodb-atlas')
      .db('impacc-db-production')
      .collection('retailer');

    const retailerList = retailerCollection
      .aggregate([
        {
          $match: mainMatch
        },
        // {
        //   $lookup: {
        //     from: 'retailervisit',
        //     localField: '_id',
        //     foreignField: 'retailerId',
        //     as: 'retailervisitInfo',
        //   },
        // },
        {
          $lookup: {
            from: 'retailervisit',
            let: {lastVisited: '$lastVisitedDate', retailer_id: '$_id'},
            pipeline: [
              {
                $match: {
                  // $expr:{ $eq: [ "$visitDate",  "$$lastVisited" ] }
                  $expr: {$and: lookupFilters},
                },
              },
            ],
            localField: '_id',
            foreignField: 'retailerId',
            as: 'matchedVisits',
          },
        },
        {
          $match: {
            $and: [
              // {retailervisitInfo: {$exists: true, $not: {$size: 0}}},
              {matchedVisits: {$exists: true, $not: {$size: 0}}},
            ],
          },
        },
        {
          $sort: {
            lastVisitedDate: -1,
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
                   numberOfVisits: { $cond: { if: { $isArray: "$matchedVisits" }, then: { $size: "$matchedVisits" }, else: "NA"} }
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
      ])
      .toArray();

    console.log('data array ', JSON.stringify(retailerList));
    if (
      retailerList &&
      Array.isArray(retailerList) &&
      retailerList.length > 0
    ) {
      console.log('condition ');
      return retailerList[0];
    } else {
      console.log('undefined array ');
      return [];
    }
    return retailerList;
  } 
  }catch (error) {
    console.error(`Couldn't find retailers : ${error}`);
  }
};

/*

db.users.find().forEach(
function (object) {
    var commonInBoth=db.comments.findOne({ "uid": object.uid} );
    if (commonInBoth != null) {
        printjson(commonInBoth) ;
        printjson(object) ;
    }else {
        // did not match so we don't care in this case
    }
});
*/