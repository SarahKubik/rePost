const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    // gets all posts by reverse chronological order
    const postData = await Post.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        { 
          model: User,
          attributes: ['name']
        }
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    posts.forEach(async (post) => {
      
      let trail = [];

      let ref_id = post.post_id;

      while (ref_id && trail.length < 3) {

        let trailbite = posts.find(p => ref_id == p.id )
  
        trail.unshift(trailbite);
  
        ref_id = trailbite.id;
      }

      if (ref_id) {
        post.follow_tag = true;
      }

      post.trail = trail;
    });

    res.render('homepage', {
      posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { 
          model: Post,
          order: [['createdAt', 'DESC']]
        }
      ],
    });

    const user = userData.get({ plain: true });

    console.log(user);

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

router.get('/reblog/:id', withAuth, async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    let ref_id = req.params.id;

    let trail = []

    while (ref_id) {
      const refData = await Post.findByPk(ref_id, {
        include: [
          {
            model: User,
            attributes: ['name']
          }
        ]
      });

      const refPost = refData.get({ plain: true });

      trail.unshift({name: refPost.user.name, content: refPost.content})

      ref_id = refPost.post_id;
    }

    res.render('reblog', {
      trail,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;