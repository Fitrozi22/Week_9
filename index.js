const express = require('express');
const app = express();

var pool = require('./queries.js');

var things = require('./things.js')

app.use('/things', things)

app.get('/', (req,res) => {
  pool.query('SELECT * FROM actor', (err, result) => {
    if (err){
      throw err
    }
    res.send(result.rows)
  })
})

//Jawaban Soal Nomor 2
//1. (Menampilkan seluruh data list Film)

app.get('/film', (req,res) => {
  pool.query('SELECT * FROM film', (err, result) => {
    if (err){
      throw err
    }
    res.send(result.rows)
  })
})

//2. (Menampilkan data film tertentu berdasarkan id)
app.get('/film/:id', (req,res) => {
  pool.query('SELECT * FROM film WHERE film_id = 98', (err, result) => {
    if (err){
      throw err
    }
    res.send(result.rows)
  })
})

//3. Menampilkan data list category
app.get('/film_category', (req,res) => {
  pool.query('SELECT * FROM film_category', (err, result) => {
    if (err){
      throw err
    }
    res.send(result)
  })
})

//4.Menampilkan data list film berdasarkan category
app.get('/film/category/:category_id', (req, res) => {
  const category_id = req.params.category_id;
  console.log(category_id); // menampilkan nilai parameter category_id pada console
  pool.query(`SELECT * FROM film
              JOIN film_category ON film.film_id = film_category.film_id
              WHERE film_category.category_id = 6`, [category_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

// Set port
const port = process.env.PORT || 3000;

// // Data text
// const text = "Hello, world!!";
// const text2 = "Hello, World!! From Post"

// // Route untuk menampilkan data text
// app.get('/', (req, res) => {
//   res.send(text);
// });

// app.post('/', (req, res) => {
//     res.send(text2)
// })
pool.connect((err, res) => {
  console.log (err);
  console.log('connectted');
})

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
