//show dbs;

//use DBtraningPHK;

db.createCollection("students")

db.students.insertOne({first_name:"John", last_name:"Doe"});

db.students.find().pretty()

db.students.insertMany([
    {first_name: "Steven", last_name:"Smith"},
    {first_name: "Joan", last_name:"Johnson", gender:"female"}
]);

db.students.find().pretty()

db.students.insertOne({
    first_name:"Jack",
    last_name:"Dawson",
    memberships:["mem1", "mem2"],
    address:{
        street:"4 main st",
        city:"Boston"},
    contacts:[
        {name:"brad", relationship:"friend"}
    ]
});

db.students.find().pretty()

db.students.updateOne({first_name:"John"},{$set:{first_name:"John",last_name:"Doe", gender:"male"}});

db.students.find().pretty()

db.students.updateOne({first_name:"Steven"}, {$set:{gender:"male"}});

db.students.updateOne({first_name:"Steven"}, {$set:{age:45}});

db.students.updateOne({first_name:"Steven"}, {$inc:{age:5}});

db.students.find().pretty()

db.students.updateOne({first_name:"Steven"}, {$unset:{"age":1}})

db.students.find().pretty()

db.students.updateOne({first_name:"Steven"},
    {
        $set:{
            certificates:[
                {name:"Web Dev1"},
                {name:"Web Dev2"},
                {name:"Flutter"},
            ]
        }
    }
);

db.students.updateOne({first_name:"Mary"},{$set:{first_name:"Mary", last_name:"Samson"}}, {upsert:true});

db.students.updateOne({first_name:"Steven"}, {$rename:{"gender":"sex"}});

db.students.deleteMany({first_name:"Mary"})

db.students.deleteOne({first_name:"Mary"});

db.students.find().count()

db.students.find({first_name:"John"})

db.students.find({$or:[{first_name:"John"},{first_name:"Joan"}]});

db.students.find({gender:"male"})

db.students.findOne({gender:"male"})

db.students.updateOne({first_name:"Steven"}, {$set:{age:45}});

db.students.find({age:{$lt:50}})

db.students.createIndex({first_name:"text"});

db.students.find({
    $text:{
        $search:"John"}
})

db.students.find().sort({last_name:1})
db.students.find().count()
db.students.find({gender:"male"}).count()
db.students.find().limit(4)
db.students.find().limit(4).sort({last_name:1})

db.students.find().forEach(function(doc){print(" Student Name: " + doc.first_name)})
