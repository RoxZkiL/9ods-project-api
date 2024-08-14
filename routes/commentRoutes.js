const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByBlogId,
} = require("../controllers/commentController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/addComment", authenticate, addComment);

router.get("/:blogId", getCommentsByBlogId);

module.exports = router;
