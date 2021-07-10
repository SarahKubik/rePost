const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:user_id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {user_id: req.params.user_id},
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json(postData);

  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router;
