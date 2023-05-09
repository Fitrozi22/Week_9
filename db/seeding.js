var pool = require('../queries.js');
var fs = require('fs');

const seedQuerry = fs.readFileSync('db/seeding.sql', {encoding: 'utf8'});
pool.query(seedQuerry, (err, res) => {
    console.log(err);
    console.log('Seeding complete');
    pool.end();
})