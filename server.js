// npm run start

const express = require('express');
const Movie = require('./models/movies');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
app.set('view engine', 'ejs');
const PORT = 3000;
const URL = 'mongodb://127.0.0.1:27017/moviebox';
app.use(express.json());
const postRoutes = require('./routes/post-routes');
const contactsRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

mongoose
    .connect(URL)
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});

  // const handleError = (res, error) => {
  //   res.status(500).json({error});
  // }

  // app.get('/movies', (req, res) => {
  //   Movie
  //     .find()
  //     .sort({ title: 1 })
  //     .then((movies) => {
  //       res
  //         .status(200)
  //         .json(movies);
  //     })
  //     .catch(() => handleError(res, "Something goes wrong..."));
  // });
  
  // app.get('/movies/:id', (req, res) => {
  //       Movie
  //       .findById(req.params.id)
  //       .then((movie) => {
  //         res
  //           .status(200)
  //           .json(movie);
  //       })
  //       .catch(() => handleError(res, "Something goes wrong..."));
  // });

  // app.delete('/movies/:id', (req, res) => {
  //       Movie
  //       .findByIdAndDelete(req.params.id)
  //       .then((result) => {
  //         res
  //           .status(200)
  //           .json(result);
  //       })
  //       .catch(() => handleError(res, "Something goes wrong..."));
  // });

  // app.post('/movies', (req, res) => {
  //   const movie = new Movie(req.body);
  //   movie
  //   .save()
  //   .then((result) => {
  //     res
  //       .status(201)
  //       .json(result);
  //   })
  //   .catch(() => handleError(res, "Something goes wrong..."));
  // });

  // app.patch('/movies/:id', (req, res) => {
  //       Movie
  //       .findByIdAndUpdate(req.params.id,req.body)
  //       .then((result) => {
  //         res
  //           .status(200)
  //           .json(result);
  //       })
  //       .catch(() => handleError(res, "Something goes wrong..."));
  // });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('styles'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.use(postRoutes);
app.use(contactsRoutes);

app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), {title});
});

