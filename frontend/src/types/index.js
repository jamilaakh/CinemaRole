// =======================
// User Object Structure
// =======================
/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {'admin' | 'user'} role
 * @property {string} createdAt
 */
const User = {
  id: 0,
  name: '',
  email: '',
  role: 'user',
  createdAt: ''
};

// =======================
// Movie Object Structure
// =======================
/**
 * @typedef {Object} Movie
 * @property {number} id
 * @property {string} title
 * @property {string} background
 * @property {string} trailer
 * @property {string} releaseDate
 * @property {string} duration
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string} synopsis
 * @property {string} director
 * @property {string} cast
 * @property {'movie' | 'series'} type
 */
const Movie = {
  id: 0,
  title: '',
  background: '',
  trailer: '',
  releaseDate: '',
  duration: '',
  rating: 0,
  reviewCount: 0,
  synopsis: '',
  director: '',
  cast: '',
  type: 'movie'
};

// =======================
// Review Object Structure
// =======================
/**
 * @typedef {Object} Review
 * @property {number} id
 * @property {number} userId
 * @property {number} movieId
 * @property {number} rating
 * @property {string} comment
 * @property {string} createdAt
 * @property {string} updatedAt
 */
const Review = {
  id: 0,
  userId: 0,
  movieId: 0,
  rating: 0,
  comment: '',
  createdAt: '',
  updatedAt: ''
};

// =======================
// Genre Object Structure
// =======================
/**
 * @typedef {Object} Genre
 * @property {number} id
 * @property {string} name
 */
const Genre = {
  id: 0,
  name: ''
};

// =======================
// Favorite Object Structure
// =======================
/**
 * @typedef {Object} Favorite
 * @property {number} id
 * @property {number} userId
 * @property {number} movieId
 * @property {string} addedAt
 */
const Favorite = {
  id: 0,
  userId: 0,
  movieId: 0,
  addedAt: ''
};
