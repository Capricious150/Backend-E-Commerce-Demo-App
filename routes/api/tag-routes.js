const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagGet = await Tag.findAll({
      include: {model: Product}
    })
    res.status(200).json(tagGet)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagGetSingle = await Tag.findByPk(req.params.id, {
      include: {model: Product}
    })
    if (!tagGetSingle){
      res.status(404).json({message: "No tag with that ID found"})
    }
    res.status(200).json(tagGetSingle)
  }
  catch (err){
    res.status(400).json(err)
  }
});

router.post('/',  (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => {
    res.status(200).json(newTag)
  })
  .catch((err) => {
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
