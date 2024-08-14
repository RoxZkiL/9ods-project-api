const Comment = require("../models/commentModel");

const addComment = async (req, res) => {
  const { blogId, content } = req.body;
  const userId = req.user.id;
  const userName = req.user.name;
  const userImage = req.user.image;

  console.log("Imagen de usuario:", req.user.image);

  try {
    const newComment = await Comment.create(
      userId,
      blogId,
      content,
      userName,
      userImage
    );
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getCommentsByBlogId = async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await Comment.findByBlogId(blogId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addComment,
  getCommentsByBlogId,
};
