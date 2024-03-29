const Post = require('../models/post');
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath('error'), { title: 'Error' });
};

const getPost = (req, res) => {
  const title = 'Дело';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('post'), { post, title }))
    .catch((error) => handleError(res, error));
}

const deletePost = (req, res) => {
  Post
  .findByIdAndDelete(req.params.id)
  .then((result) => {
    res.sendStatus(200);
  })
  .catch((error) => handleError(res, error));
}

const getEditPost = (req, res) => {
  const title = 'Редактирование';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('edit-post'), { post, title }))
    .catch((error) => handleError(res, error));
}

const editPost = (req, res) => {
  const { title, author, text, endDate } = req.body;
  const { id } = req.params;
  Post
    .findByIdAndUpdate(req.params.id, { title, author, text, endDate })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => handleError(res, error));
}

const getPosts = (req, res) => {
  const title = 'Дела';
  const sortBy = req.query.sort || 'createdAt'; // По умолчанию сортировка по дате окончания, если параметр сортировки не предоставлен

  Post
    .find()
    .sort({ [sortBy]: -1 }) // Используйте предоставленный параметр sortBy для сортировки
    .then(posts => res.render(createPath('posts'), { posts, title, sortBy }))
    .catch((error) => handleError(res, error));
}
const getAddPost = (req, res) => {
  const title = 'Новое дело';
  res.render(createPath('add-post'), { title });
}

const addPost = (req, res) => {
  const { title, author, text, endDate } = req.body;
  const post = new Post({ title, author, text, endDate});
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch((error) => handleError(res, error));
}

module.exports = {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost,
  addPost,
};