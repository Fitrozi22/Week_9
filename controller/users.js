/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - email
 *         - genres
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         genres:
 *           type: string
 *           description: The user's genres
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *       example:
 *         id: 1
 *         email: example@exampl.com
 *         genres: crime
 *         password: *******
 *         role: user
 */

const express = require('express');
const router = express.Router();
const { signToken } = require('../utils/auth.js');
const pool = require('../queries.js');

router.post('/login', (req, res) => {
  pool.query(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [req.body.email, req.body.password],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        const token = signToken(result.rows[0]);
        res.json({
          token: token,
        });
      }
    }
  );
});

module.exports = router;
