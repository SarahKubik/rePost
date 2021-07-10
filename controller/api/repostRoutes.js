const router = require('express').Router();
const { Repost } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newRepost = await Repost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRepost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
