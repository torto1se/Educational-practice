// npm run start

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
app.set('view engine', 'ejs');
const PORT = 3000;
const URL = 'mongodb://127.0.0.1:27017/blogs';
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

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('styles'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Главная';
  res.render(createPath('index'), { title });
});

app.use(postRoutes);
app.use(contactsRoutes);

app.use((req, res) => {
    const title = '404 Not Found';
    res
        .status(404)
        .render(createPath('error'), {title});
});

