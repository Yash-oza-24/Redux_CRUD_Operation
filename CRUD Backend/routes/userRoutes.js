const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/users - Create a new user (available to all)
router.post(
  "/", userController.createUser);

// POST /api/users/login - Login user
router.post("/login", userController.loginUser);

router.get(
    "/alluser",
    // authMiddleware.authenticateUser,
    // authMiddleware.checkUserRole(["admin"]),
    userController.getAllUsers
  );
router.delete("/:id",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin" ]),
  userController.deleteUserById
);
router.put("/:id", 
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin" , "branch"]),
  userController.updateUserById
);

module.exports = router;

