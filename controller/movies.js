/**
 * @swagger
 * components:
 *  schemas:
 *      Movies:
 *          type: object
 *          required:
 *              - title
 *              - genres
 *              - year
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of movies
 *              title:
 *                  type: string
 *                  description: The title of your movies
 *              genres:
 *                  type: string
 *                  description: The movies genres
 *              year:
 *                  type: number
 *                  description: Year of movie
 *              createdAt:
 *                  type: string
 *                  format: date
 *                  description: The date movies was added
 *          example:
 *              id: 1
 *              title: John Wick
 *              genres: crime
 *              year: 1998
 *              createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: The movies managing API
 */

/**
 * @swagger
 * /movies/:
 *  get:
 *      summary: Get all movies ang limit
 *      parameters:
 *        - in: query
 *          name: limit
 *          type: integer
 *          description: The number of items to return
 *      tags: [Movies]
 *      responses:
 *          200:
 *              description: The list of movies
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Movies'
 *          500:
 *              description: Some server error
 */

/**
 * @swagger
 * /movies/{id}:
 *  get:
 *      summary: Get the movie by ID
 *      tags: [Movies]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: The movie ID
 *      responses:
 *          200:
 *              description: The movie response by ID
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Movies'
 *          404:
 *              description: The movie was not found
 */

/**
 * @swagger
 * /movies/{id}:
 *  post:
 *      summary: Update the movie by the id
 *      tags: [Movies]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: The movie id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Movies'
 *      responses:
 *          200:
 *              description: The movie was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Movies'
 *          404:
 *              description: The movie was not found
 *          500:
 *              description: Some error happened
 */

/**
 * @swagger
 * /movies/{id}:
 *  put:
 *      summary: Get the movie by ID
 *      tags: [Movies]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: The movie ID
 *      responses:
 *          200:
 *              description: The movie response by ID
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Movies'
 *          404:
 *              description: The movie was not found
 */


/**
 * @swagger
 * /movies/{id}:
 *  delete:
 *      summary: Remove the movie by Id
 *      tags: [Movies]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: The movie id
 *      responses:
 *          200:
 *              description: The movie was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Movies'
 *          404:
 *              description: The movie was not found
 *          500:
 *              description: Some error happened
 */

/**
 * @swagger
 * /movies/{id}:
 *  put:
 *      summary: Update a movie by ID
 *      tags: [Movies]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: The movie ID
 *      requestBody:
 *          description: The updated movie object
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MovieUpdate'
 *      responses:
 *          200:
 *              description: The updated movie
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Movie'
 *          404:
 *              description: The movie was not found
 */


const express = require('express');
const router = express.Router();
const pool = require('../queries.js');
const auth = require('../middleware/authMiddleware.js');

router.get('/', auth, (req, res) => {
  pool.query(
    `SELECT * FROM movies ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
});


//get movies by id
router.get('/:id', (req, res) => {
  const movieId = req.params.id;

  pool.query(
    `SELECT * FROM movies WHERE id = $1`, 
    [movieId], 
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(result.rows[0]);
    }
  );
});

//post
router.post('/', (req,res) => {
  pool.query(
    `INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3);`,
    [req.body.title, req.body.genres, req.body.year], 
  (err, result) => {
    if (err){
      throw err
    }
    res.status(201).json({
      status: 'success'
    })
  })
});

//delete
router.delete('/:id', (req,res) => {
  pool.query(
    `DElETE FROM movies WHERE id = ${req.params.id}`, 
  (err, result) => {
    if (err){
      throw err
    }
    res.status(201).json({
      status: 'success'
    })
  })
});

//put
router.put('/:id', (req, res) => {
  pool.query(
    `UPDATE movies SET year = '${req.body.year}' WHERE id = ${req.params.id}`, 
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result);
    }
  );
});

//pagination
router.get('/', (req, res) => {
  console.log(req.query);
  const limit = req.query.limit ? `LIMIT ${req.query.limit}` : '';
  pool.query(`SELECT * FROM movies ${limit}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result.rows);
  });
});


module.exports = router;