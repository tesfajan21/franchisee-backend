exports = async function getTotalSales(arg) {
  let userId = arg;
  try {
    let salesReportCollection = context.services
      .get("mongodb-atlas")
      .db("impacc-db-production")
      .collection("retailersalesreport");
    // const result = salesReportCollection.aggregate([
    //   {
    //     $match: { userId: userId },
    //   },
    //   { $sum: "$numberOfProducts" },
    // ]);
    const salesreports = salesReportCollection.find({userId:userId},{numberOfProducts:1}).toArray();
    return salesreports.map(x=>x.numberOfProducts).reduce((partialSum, a) => partialSum + a, 0);

  } catch (error) {
    console.error(`getTotalSales Error : ${error}`);
  }
};
