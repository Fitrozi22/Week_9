const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const pool = require('./queries.js');
const movies = require('./controller/movies.js');
const users = require('./controller/users.js');
const morgan = require('morgan');
const port = process.env.PORT || 3000;

app.use(morgan('common'));

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Define spesifikasi OpenAPI
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contoh API dengan Swagger',
      version: '1.0.0',
      description: 'Contoh API dengan Swagger dan Express.js',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./controller/*.js'],
};

// Buat dokumentasi dengan swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/movies', movies);
app.use('/users', users);

pool.connect((err, res) => {
  console.log (err);
  console.log('connectted');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
