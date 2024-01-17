// npm run start

const express = require('express');
const path = require('path');
const Movie = require('./models/movies');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();
app.set('view engine', 'ejs');
const PORT = 3000;
const URL = 'mongodb://127.0.0.1:27017/moviebox';
app.use(express.json());

mongoose
    .connect(URL)
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});

  const handleError = (res, error) => {
    res.status(500).json({error});
  }

  app.get('/movies', (req, res) => {
    Movie
      .find()
      .sort({ title: 1 })
      .then((movies) => {
        res
          .status(200)
          .json(movies);
      })
      .catch(() => handleError(res, "Something goes wrong..."));
  });
  
  app.get('/movies/:id', (req, res) => {
        Movie
        .findById(req.params.id)
        .then((movie) => {
          res
            .status(200)
            .json(movie);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
  });

  app.delete('/movies/:id', (req, res) => {
        Movie
        .findByIdAndDelete(req.params.id)
        .then((result) => {
          res
            .status(200)
            .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
  });

  app.post('/movies', (req, res) => {
    const movie = new Movie(req.body);
    movie
    .save()
    .then((result) => {
      res
        .status(201)
        .json(result);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
  });

  app.patch('/movies/:id', (req, res) => {
        Movie
        .findByIdAndUpdate(req.params.id,req.body)
        .then((result) => {
          res
            .status(200)
            .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
  });

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('styles'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
});

app.get('/contacts', (req, res) => {
    const title = 'Contacts';
    const contacts = [
        { name: 'YouTube', link: 'http://youtube.com/@torto1se' },
        { name: 'Twitter', link: 'http://github.com/YauhenKavalchuk' },
        { name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk' },
    ]
    res.render(createPath('contacts'), {contacts, title});
});

app.get('/about-us', (req, res) => {
    res.redirect('/contacts');
});

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1', 
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
        title: 'Post title',
        date: '05.05.2021', 
        author: 'Yauhen',
    };
    res.render(createPath('post'), {title, post});
});

app.get('/posts', (req, res) => {
    const title = 'Post';
    const posts = [
        {
            id: '1', 
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
            title: 'Post title',
            date: '05.05.2021',
            author: 'Yauhen',
        }
    ];
    res.render(createPath('posts'), {title, posts});
});

app.post('/add-post', (req, res) => {
    const { title, author, text} = req.body;
    const post = new Post({title, author, text});
    post
        .save()
        .then((result) => res.send(result))
        .catch((error) =>{
            console.log(error);
            res.render(createPath('error'), {title:'Error'})
        })
});

app.get('/add-post', (req, res) => {
    const title = 'Add post';
    res.render(createPath('add-post'), {title});
});

app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), {title});
});

