const {Pool} = require('pg')

var connectDB = new Pool({
    user:'admin',
    host:'localhost',
    database:'albums',
    password:'root',
    port:5433
})

async function createAlbumsTable(){
    try{
        const query = `create table if not exists albums (
            id serial primary key,
            title varchar(255) not null,
            artist varchar(255) not null,
            price numeric(10,2)
        );
        `;// price have 10 digits and 2 decimal
        await connectDB.query(query)
        console.log('Albums table created');
    }catch(e){
        console.error(e);
        console.error("Albums table creation failed");
        
    }
}

createAlbumsTable()

module.exports = connectDB