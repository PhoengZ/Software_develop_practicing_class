const sql = require('../config/pgdb')

const Album = function(album){
    this.id = album.id
    this.title = album.title
    this.artist = album.artist
    this.price = album.price
}

Album.getAlbums = (result) =>{
    sql.query('select * from albums;',
        (err, res)=>{
            if (err){
                console.log(`error: ${err}`);
                result(err,null)
                return 
            }
            console.log('All albums: ');
            console.log(res.rows);
            result(null, res.rows)
        }
    )
}

Album.getAlbumById = (id, result) => {
    sql.query(`select * from albums
        where id = ${id};
    `,(err ,res)=>{
            if (err){
                console.log(`error: ${err}`);
                result(err, null)
                return 
            }else{
                if (res.rows.length >= 1){
                    console.log('found Album: ');
                    console.log(res.rows[0]);
                    result(null, res.rows[0])
                    return
                }
                result({message: 'not_found'}, null)
                return
            }
        }
    )
}

Album.createAlbum = (newAlbum, result)=>{
    const {title, artist, price} = newAlbum
    const query = `insert into albums (title, artist, price) values
        ('${title}', '${artist}', ${price}) returning *;
    `
    sql.query(query, (err, res)=>{
        if (err){
            console.log(`create album failed: ${err}`);
            result(err, null)
            return 
        }
        console.log('created album');
        console.log(res.rows);
        result(null, res.rows)
    }) 
}

Album.updateById = (id, newAlbum, result)=>{
    const {title, artist, price} = newAlbum
    const query = `update albums set title = '${title}', artist = '${artist}', price = ${price}
        where id = ${id} returning *;
    `
    sql.query(query, (err, res)=>{
        if (err){
            console.log(`error: ${err}`);
            result(err, null)
            return
        }
        if (res.rowCount == 0){
            result({message: 'not_found'}, null)
            return
        }
        console.log('updated albums');
        console.log(res.rows);
        result(null, res.rows)
    })
}

Album.deleteById = (id, result)=>{
    const query = `delete from albums where id = ${id} returning *`
    sql.query(query, (err, res)=>{
        if (err){
            console.log(`error: ${err}`);
            result(err, null)
            return
        }
        if (res.rowCount == 0){
            result({message: 'not_found'}, null)
            return
        }
        result(null, res.rows)
    })
}

module.exports = Album