var express = require('express');
var router = express.Router();
var authorModel = require('../schemas/author')
var ResHelper = require('../helper/ResponseHelper');

router.get('/', async function (req, res, next) {
  let authors = await authorModel.find({}).populate('published')
    .exec();
  ResHelper.RenderRes(res, true, authors)
});

router.get('/:id', async function (req, res, next) {
  try {
    let author = await authorModel.findById(req.params.id).exec();
    ResHelper.RenderRes(res, true, author);
  } catch (error) {
    ResHelper.RenderRes(res, false, error);
  }
});

router.post('/', async function (req, res, next) {
  try {
    var newAuthor = new authorModel({
      name: req.body.name
    })
    await newAuthor.save();
    ResHelper.RenderRes(res, true, newAuthor)
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    let updatedAuthor = await authorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).exec();
    ResHelper.RenderRes(res, true, updatedAuthor);
  } catch (error) {
    ResHelper.RenderRes(res, false, error);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    let deletedAuthor = await authorModel.findByIdAndDelete(req.params.id).exec();
    ResHelper.RenderRes(res, true, deletedAuthor);
  } catch (error) {
    ResHelper.RenderRes(res, false, error);
  }
});

module.exports = router;
