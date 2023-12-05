## Get Started
First, create a Realm app in the Realm UI and link a cluster (Mongo atlas cluster should available ).

## Enable authentication
Under "Users" on the Realm UI, go to the Providers tab and enable the email/password provider.

Select "automatically confirm users"
Select "run a password reset function"
Click "create new" for the reset function and use the default that is created. This reset function always denies password reset requests, but you can change that later.
Collections
Under "Rules" on the Realm UI, add the following collections:

- user
- retailer
- retailervisit
- retailersalesreport

## Schemas
Define the schemas for each collection as follows. 

export const userSchema = {
  name: 'user',
  properties: {
    _id: 'string',
    _partition: 'string',
    addressLine1: 'string?',
    addressLine2: 'string?',
    city: 'string?',
    country: 'string?',
    createdOn: 'date?',
    dob: 'string?',
    email: 'string',
    firstName: 'string',
    gender: 'string?',
    insertDate: 'string?',
    lastName: 'string?',
    primaryMobile: 'string?',
    secondryMobile: 'string?',
    updateDate: 'string?',
    zipCode: 'string?',
  },
  primaryKey: '_id',
};

export const retailerSchema = {
  name: 'retailer',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    address: 'string?',
    contactNumber: 'string?',
    contactPerson: 'string?',
    isActiveAccount: 'bool?',
    lastVisitNo: 'int?',
    lastVisitedDate: 'date?',
    offerAccepted: 'bool?',
    offerAcceptedDate: 'date?',
    shopName: 'string',
    userId: 'string?',
  },
  primaryKey: '_id',
};

export const retailersalesreportSchema = {
  name: 'retailersalesreport',
  properties: {
    _id: 'string',
    _partition: 'string',
    isFullPrice: 'bool?',
    numberOfProducts: 'int?',
    offerAcceptedDate: 'date?',
    offerPlaced: 'bool',
    priceGiven: 'decimal128?',
    remarks: 'string?',
    retailerId: 'string?',
    totalOrderAmount: 'decimal128?',
    userId: 'string?',
    visitDate: 'date',
    visitNo: 'int',
  },
  primaryKey: '_id',
};

export const retailervistSchema = {
  name: 'retailervist',
          properties: {
            _id: 'string',
            _partition: 'string',
            fullPrice: 'bool?',
            numberOfProducts: 'int?',
            offerAccepted: 'bool',
            offerAcceptedDate: 'date?',
            offerPlaced: 'bool',
            priceGiven: 'decimal128?',
            remarks: 'string?',
            retailerId: 'retailer',
            userId: 'string?',
            visitDate: 'date',
            visitNo: 'int',
      },
  primaryKey: '_id',
};

## Add Triggers
Add authenitication trigger for on user creations.
Add schedule  every 4 hours to trigger function -onUpdateRetailerStatus 

## Enable Sync
On the Sync tab, enable Sync.

## Partition
Set the partition key to _partition (string)

## Troubleshooting
The most common issue is schema mismatch due to frequent little tweaks to the schema as you develop your app.
- Be sure to check the logs in Realm UI for more information as well as the console in your app.
- Delete the app from the simulator to purge local data.
- Restart Sync in the Realm UI by clicking "Delete Synced Data" on the Sync page.
- Be sure to deploy your changes in the Realm UI.
- If your schema does not match the server, compare the class definitions from the SDKs tab in the Realm UI with those in the client code.
- When creating objects, make sure the partition value of your new object matches the partition value you opened the Realm with.

## Mongo Atlas cluster
- You can connect to the cluster from Atlas tab and browse the collection
- add the search key index from user collection , fileds such as email, first name , last name , primary conatc,  country

