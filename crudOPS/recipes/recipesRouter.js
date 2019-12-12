const router = require("express").Router();
const Parties = require("./recipesModel");
const restricted = require("../auth/restrictedMiddleware");
const verifyPartyInfo = require("../../middleware/verifyPartyInfo");

// @desc     Get all Parties
// @route    GET /api/parties
// @access   Private
router.get("/", restricted, async (req, res) => {
  try {
    const parties = await Parties.find();

    res.status(200).json(parties);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Unable to find Parties, its not you.. its me" });
  }
});

// @desc     Get single Party
// @route    GET /api/parties/:id
// @access   Private
router.get("/:id", restricted, async (req, res) => {
  try {
    const party = await Parties.findById(req.params.id);
    const images = await Parties.getPartyImages(req.params.id);
    const items = await Parties.getPartyItems(req.params.id);

    if (party) {
      res.status(200).json({ party, images, items });
    } else {
      res.status(404).json({ message: "That party cannot be found" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this party id, its not you.. its me"
    });
  }
});

// @desc     Get a parties users
// @route    GET /api/parties/users/:id
// @access   Private
router.get("/users/:id", restricted, async (req, res) => {
  try {
    const users = await Parties.getPartiesUsers(req.params.id);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "That parties users cannot be found" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this user id, its not you.. its me"
    });
  }
});

// @desc     Post a Party
// @route    POST /api/parties
// @access   Private
router.post("/", restricted, verifyPartyInfo, async (req, res) => {
  try {
    const { name, date, budget, user_id } = req.body;

    const party = await Parties.insert({ name, date, budget });

    if (party) {
      Parties.insertUserParty(user_id, party.id);
      res
        .status(201)
        .json({ party, message: "You have successfully added a Party!" });
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to add this party, its not you.. its me"
    });
  }
});

// @desc     Edit a  Party
// @route    PUT /api/parties:id
// @access   Private
router.put("/:id", restricted, async (req, res) => {
  try {
    const party = await Parties.update(req.params.id, req.body);
    if (party) {
      res.status(200).json({ message: "Party updated!" });
    } else {
      res.status(404).json({ message: "Party could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to edit this Party, its not you.. its me"
    });
  }
});

// @desc     Delete a Party
// @route    DELETE /api/parties:id
// @access   Private
router.delete("/:id", restricted, async (req, res) => {
  try {
    const count = await Parties.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ party, message: "Deleted!" });
    } else {
      res.status(404).json({ message: "Party unable to be deleted!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting party!, its not you.. its me" });
  }
});

module.exports = router;
