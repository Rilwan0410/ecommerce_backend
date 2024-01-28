const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const allTags = await Tag.findAll({ include: [Product] });
  res.status(200).json(allTags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params;
  const singleTag = await Tag.findOne({
    where: { id: id },
    include: [Product],
  });
  res.status(200).json(singleTag);
});

router.post("/", async (req, res) => {
  // create a new tag
  let newTag = await Tag.create(req.body);
  res.status(200).json(newTag);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const { id } = req.params;
  const updatedTag = await Tag.update(req.body, { where: { id: id } });
  res.status(200).json(updatedTag);
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params;
  const deletedTag = await Tag.destroy({ where: { id: id } });
  res.status(200).json(deletedTag);
});

module.exports = router;
