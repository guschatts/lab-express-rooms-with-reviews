const express = require('express');
const router  = express.Router();

const Room = require('../models/room.model');
const User = require('../models/User.model');

const { isLoggedIn, isLoggedOut, isOwner} = require('../middleware/route-guard');

// GET route create
router.get('/create-room', isLoggedIn, (req, res, next) => {
    res.render('rooms/create-room');
  });

  // POST route create
  router.post("/create-room", isLoggedIn, (req, res) => {
    const { name, description, imageUrl } = req.body
    const owner = req.session.currentUser._id
    
    if (!name || !description || !imageUrl) {
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your name, description and imageUrl.' });
        return;
      }

      Room.create({name, description, imageUrl, owner})
      .then(()=> res.redirect('/rooms/rooms-list'))
      .catch(err => console.log(err))
})



  module.exports = router;