const { error, log } = require('console');
const {MongoClient, ObjectId} = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-app';
const collectionName = 'users';

const client = new MongoClient(uri);

async function connectMongodb(){
    
    try{
        await client.connect();
        let database = client.db(databaseName);
        
        console.log('db connected');         
        //const users = database.collection(collectionName);

        // const user_data = {
        //     name: 'jack',
        //     age: 22,
        //     department: 'IT'
        // }

        // const result = await users.insertOne(user_data);

        }

        catch(err){
            console.log(err);
    }
}

async function insertManyUsers(){
    
    let database = client.db(databaseName);

    let users_data = [
        {
            name: 'jim',
            age: 21,
            department: 'Maintances'
        },
        {
            name: 'joe',
            age: 22,
            department: 'Building'
        },
        {
            name: 'Martin',
            age: 33,
            department: 'Healthcare'
        },
        {
            name: 'Hulk',
            age: 54,
            department: 'Mac'
        },
        {
            name: 'jack',
            age: 22,
            department: 'IT'
        },
        {
            name: 'jack',
            age: 22,
            department: 'IT'
        },
        {
            name: 'jack',
            age: 22,
            department: 'IT'
        },
    ]
    
    let result = await database.collection(collectionName).insertMany(users_data);
    console.log('inserted',result);
}

async function findUser(){
    let database = client.db(databaseName);

    // show all users
    // let result = await database.collection(collectionName).find().toArray();

    // whose age is greater then 5 and less then 25.
    let result = await database.collection(collectionName).find({ age: { $gt: 5, $lt: 25 }}).toArray();
    console.log('Users:', result);

    //also use find one - using objectId
}

async function updateUser(){
    let database = client.db(databaseName);

    let existing_value = {name:'joe'};
    let new_value = { $set:{name:'JACKIE CHAIN', address:'china'}};

    let result = await database.collection(collectionName).updateOne(existing_value, new_value);
    
    console.log('updated value:', result);
    
    /* 
        updated value: {
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
        }
    */

    //  update using ObjectID 
    //  name: martin, _id:'65a8d509ca132fe92e663322'

    let data = await database.collection(collectionName).updateOne(
        {
        _id: new ObjectId('65a8d509ca132fe92e663322')
        },{
            $set:{
                name:'MARTIN MILLER'
            }
        }
    );
    console.log('data:', data);

}

// Update user using Promise
let databaseConn = client.db(databaseName);
const updateUserPromise = databaseConn.collection(collectionName).updateOne(
    {
    _id: new ObjectId('65a8d509ca132fe92e663322')
    },{
        $set:{
            name:'MARTIN MILLER updated'
        }
    }
);

updateUserPromise.then((result)=>{
    console.log(result);
    /*
        {
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
        }
    */
}).catch((error)=>{
    console.log(error);
});

async function deleteUser(){

}   

async function run(){
   
    /*
    Given that async functions always return a promise, you can also deal with unhandled 
    errors as you would normally using a catch statement.
    */

    await connectMongodb().catch(error);
    await insertManyUsers().catch(error);
    //  await findUser().catch(error);
    //  await updateUser().catch(error);
    //  await deleteUser().catch(error);
}

run();
