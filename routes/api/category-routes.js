const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryGet = await Category.findAll({
      include: {model: Product}
    });
    res.status(200).json(categoryGet)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategoryGet = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
      }
    })
    res.status(200).json(singleCategoryGet)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.status(200).json(newCategory)
  })
  .catch((err) => {
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
  { category_name: req.body.category_name },
  { where: 
  { id: req.params.id }
  })
  .then((updatedCategory) => {
    res.status(200).json(updatedCategory)
  })
  .catch((err) => {
    res.status(400).json()
  })
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy(
      {
        where: {id: req.params.id}
      }
      )      
      if(!deletedCategory){
        res.status(404).json({message: "No category with that ID found"})
      }
      res.status(200).json(deletedCategory)

  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
