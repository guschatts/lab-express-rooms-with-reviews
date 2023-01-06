// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next(); // execute the next action for this route
    }
    else {
        return res.redirect('/auth/login');
    }
  
};
   
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next(); // execute the next action for this route
    }
    else{
        return res.redirect('/');
    }
   
  };

  const isOwner = (req, res, next) => {
    const roomId = req.params
    const userId = req.session.currentUser._id

    Room.findById(roomId)
      .then((foundRoom) => {
        const roomOwner = foundRoom.owner
        if (roomOwner === userId){
          next()
        }
      })}
   
  module.exports = {
    isLoggedIn,
    isLoggedOut,
    isOwner
  };