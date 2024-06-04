const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const cpUpload = upload.fields([
  { name: "galleryImages", maxCount: 10 },
  { name: "thumbnailImage", maxCount: 1 }, // Single thumbnail image
]);
console.log(cpUpload)

router.post(
  "/",
  cpUpload,
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  productController.createProduct
);
// router.get('/',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']), productController.getAllProducts);
router.get("/", productController.getAllProducts);
// router.get('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']), productController.getProductById);
router.get("/filterproduct", productController.ProductFilter);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  cpUpload,
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  productController.updateProductById
);
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  productController.deleteProductById
);
router.post("/:productId/ratings", authMiddleware.authenticateUser, productController.addProductRating);
router.put("/:productId/ratings/:ratingId", authMiddleware.authenticateUser, productController.updateProductRating);
router.delete("/:productId/ratings/:ratingId", productController.deleteProductRating);




module.exports = router;
