const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');
const createPath = require('../helpers/create-path');

router.get('/contacts', (req, res) => {
    const title = 'Contacts';
    Contact
      .find()
      .then((contacts) => res.render(createPath('contacts'), {contacts, title}))
      .catch((error) => {
        console.log(error);
        res.render(createPath('error'), {title: 'Error'});
      });
});

router.get('/about-us', (req, res) => {
    res.redirect('/contacts');
});

module.exports = router;