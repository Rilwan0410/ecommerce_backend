const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  let allCategories = await Category.findAll({ include: [Product] });
  res.status(200).json(allCategories);
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // find one category by its `id` value
  // be sure to include its associated Products
  let singleCategory = await Category.findOne({
    where: { id: id },
    include: [Product],
  });

  res.status(200).json(singleCategory);
});


router.post("/", async (req, res) => {
  // create a new categor
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  // update a category by its `id` value
  const updatedCategory = await Category.update(req.body, {
    where: { id: id },
  });
  res.status(200).json(updatedCategory);
});


router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const { id } = req.params;
  let deletedCategory = await Category.destroy({ where: { id: id } });
  res.status(200).json(deletedCategory);
});


module.exports = router;
