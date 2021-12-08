const express = require("express");

const router = express.Router();

// Middleware
const { protect, admin } = require("../middleware/authMiddleware");

//Controllers

const { 
    registerUser, 
    getAllUsers, 
    loginUser, 
    deleteUser 
} = require("../controllers/userControllers");

//Routes

router
    .route('/').post(registerUser)
    .get(getAllUsers);

router
    .route('/login').post(loginUser);

router
    .route('/:id')
    .delete(protect, admin, deleteUser)

module.exports = router;