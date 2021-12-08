const asyncHandler = require("express-async-handler");

//Models
const Blog = require("../models/Blog");

// @route   POST /api/blog
// @desc    Create blog
// @access  Private / Admin

const createBlog = asyncHandler(async (req, res) => {

    const blog = new Blog({
        title: "Sample Title",
        image: "Sample Image",
        description: "Sample Content",
        content: "Sample Description",
    })

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
});

// @route   GET /api/blog
// @desc    Read all blogs
// @access  Public

const getAllBlogs = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Blog.countDocuments();

    const blogs = await Blog.find()
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ blogs, page, pages: Math.ceil(count / pageSize) });
})

// @route   GET /api/blog/:id
// @desc    Read a single blogs
// @access  Public

const getBlogById = asyncHandler(async (req, res) => {

    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404)
        throw new Error("Blog not found")
    }
})

// @route   PUT /api/blog/
// @desc    Update blog post
// @access  Private / Admin

const updateBlog = asyncHandler(async (req, res) => {
    const { title, image, description, content } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (blog) {
        blog.title = title;
        blog.image = image;
        blog.description = description;
        blog.content = content;
    }

    const updatedBlog = await blog.save();

    res.status(201).json(updatedBlog);
})

// @route   DELETE /api/blog/:id
// @desc    Delete blogs By ID
// @access  Private / Admin

const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        const removedBlog = await blog.remove()
        res.json(removedBlog, { message: "Blog removed" })
    } else {
        res.status(404)
        throw new Error("Blog not found")
    }
})

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    deleteBlog,
    updateBlog
}