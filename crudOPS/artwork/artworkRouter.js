const router = require("express").Router();
const Art = require("./artworkModel");
const restricted = require("../auth/restrictedMiddleware");

// @desc     Get all Art
// @route    GET /api/artwork
// @access   Private
router.get("/", restricted, async (req, res) => {
  try {
    const artwork = await Art.find();
    res.status(200).json(artwork);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Unable to get artwork, its not you.. its me" });
  }
});

// @desc     Get a single item by ID
// @route    GET /api/artwork/:id
// @access   Private
router.get("/:id", restricted, async (req, res) => {
  try {
    const item = await Art.findById(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "That item cannot be found" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this item, its not you.. its me"
    });
  }
});

// @desc     Post an item
// @route    POST /api/artwork
// @access   Private
router.post("/", restricted, async (req, res) => {
  try {
    const item = await Art.insert(req.body);
    if (item) {
      res
        .status(201)
        .json({ item, message: "You have successfully added an item!" });
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to add this item, its not you.. its me"
    });
  }
});

// @desc     Edit an Item
// @route    PUT /api/artwork:id
// @access   Private
router.put("/:id", restricted, async (req, res) => {
  try {
    const item = await Art.update(req.params.id, req.body);
    if (item) {
      res.status(200).json({ item, message: "Info updated!" });
    } else {
      res.status(404).json({ message: "Item could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to edit this Item, its not you.. its me"
    });
  }
});

// @desc     Delete an Item
// @route    DELETE /api/artwork:id
// @access   Private
router.delete("/:id", restricted, async (req, res) => {
  try {
    const count = await Art.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Deleted!" });
    } else {
      res.status(404).json({ message: "Item unable to be deleted!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to delete this Item, its not you.. its me"
    });
  }
});

module.exports = router;
