// const Product = require('../models/products');
// const Category = require('../models/category');
// const Wishlist = require("../models/wishlist");
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const productId = req.params.id; // Assuming you pass the product ID in the request params
//     console.log(productId);
//     const productFolderPath = `public/products/${productId}`;
//     if (!fs.existsSync(productFolderPath)) {
//       fs.mkdirSync(productFolderPath, { recursive: true });
//     }
//     cb(null, productFolderPath);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Upload middleware
// const upload = multer({ storage: storage }).single('image');

// const uploadProductImages = async (req, res, next) => {
//   try {
//     upload(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//         // Handle Multer errors
//         return res.status(500).json({ message: 'Error uploading image' });
//       } else if (err) {
//         // Handle other errors
//         return res.status(500).json({ message: err.message });
//       }
//       // File uploaded successfully
//       next();
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Create Product
// const createProduct = async (req, res) => {
//   try {
//     upload.fields([
//       { name: 'thumbnailImage', maxCount: 1 },
//       { name: 'galleryImages', maxCount: 5 }
//     ])(req, res, async function(err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ message: 'Error uploading images' });
//       } else if (err) {
//         return res.status(500).json({ message: err.message });
//       }

//       const { name, price, categoryId } = req.body;
//       const category = await Category.findById(categoryId);
//       if (!category) {
//         return res.status(400).json({ message: "Category not found" });
//       }

//       const thumbnailImage = req.files['thumbnailImage'] ? req.files['thumbnailImage'][0].path : null;
//       const galleryImages = req.files['galleryImages'] ? req.files['galleryImages'].map(file => file.path) : [];

//       const product = new Product({ name, price, category: categoryId, thumbnailImage, galleryImages });
//       await product.save();

//       res.status(201).json({ message: 'Product created successfully', product });
//     });
//   } catch (error) {
//     if (error.name === 'CastError' && error.kind === 'ObjectId') {
//       return res.status(400).json({ message: "Invalid category ID" });
//     }
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get Product by ID
// const getProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findById(productId).populate('category');
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Product by ID
// const updateProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const updateData = req.body;
//     const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json({ message: "Product updated successfully", product });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete Product by ID
// const deleteProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findByIdAndDelete(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json({ message: 'Product deleted successfully', count: 1 });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get All Products
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().populate('category');
//     const productsCount = products.length;
//     res.status(200).json({totalProducts: productsCount, products });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const createWishlist = async (req, res) => {
//   try {
//     const { productId, userId } = req.body;

//     // Check if the user already has the product in their wishlist
//     const existingWishlistItem = await Wishlist.findOne({ product: productId, user: userId });

//     if (existingWishlistItem) {
//       // If the product already exists in the user's wishlist, return a message indicating it
//       return res.status(400).json({ message: "Product already exists in the user's wishlist" });
//     }

//     // If the product doesn't exist in the user's wishlist, create a new wishlist item
//     const wishlistItem = new Wishlist({ product: productId, user: userId });
//     await wishlistItem.save();

//     res.status(201).json(wishlistItem);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = {
//   createProduct,
//   getProductById,
//   updateProductById,
//   deleteProductById,
//   getAllProducts,
//   uploadProductImages,
//   createWishlist,
// };

const Product = require("../models/products");
const Category = require("../models/category");
// const Wishlist = require("../models/wishlist");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const productId = req.params.productId; // Assuming you pass the product ID in the request params
    const productFolderPath = `public/products`;

    // Create a subfolder for each product if it doesn't exist
    if (!fs.existsSync(productFolderPath)) {
      fs.mkdirSync(productFolderPath, { recursive: true });
    }

    // Pass the product folder path to multer
    cb(null, productFolderPath);
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer upload for product images
const upload = multer({ storage: storage }).fields([
  { name: "thumbnailImage", maxCount: 1 }, // Single thumbnail image
  { name: "galleryImages", maxCount: 10 }, // Up to 10 gallery images
]);

const createProduct = async (req, res) => {
  console.log(req.body);
  try {
    // const isCategory = await Category.findById(req.body.category);
    // if (!isCategory) {
    //   return res.status(400).json({ message: "Category not found" });
    // }

    let thumbnailImagePath, galleryImagePaths;
    if (req.files) {
      const { thumbnailImage, galleryImages } = req.files; 

      if (thumbnailImage) {
        thumbnailImagePath = "/products/" + thumbnailImage[0  ].filename;
      }

      if (galleryImages) {
        galleryImagePaths = galleryImages.map(
          (file) => "/products/" + file.filename
        );
      }
    }

    // Calculate price and percentage
    const { price, offerPrice } = req.body;
    const originalprice = offerPrice - price;
    // const percentage = ((originalprice / price) * 100).toFixed(2);

  console.log(originalprice)
    const percentage = Math.round((originalprice / offerPrice) * 100);


    // Add calculated fields and image paths to the request body
    const productData = {
      ...req.body,
      // originalprice,
      percentage:percentage,
      thumbnailImage: thumbnailImagePath,
      galleryImages: galleryImagePaths
    };
    console.log(productData)

    // Create new product
    const product = new Product(productData);
    await product.save();

    // Send response
    res.status(201).json({ 
      message: "Product created successfully", 
      product: productData 
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    res.status(400).json({ message: error.message });
  }
};



const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const ProductFilter = async (req, res) => {
  try {
    console.log(req.query);
    const currentpage = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 9;
    const category = req.query.category || '';
    const name = req.query.name || '';

    const query = {};

    if (category !== "") {
      query.category = category
    }

    if (name !== "") {
      query.name = { $regex: name, $options: "i" };
    }


    const product = await Product.find(query)
      .skip(currentpage * limit)
      .limit(limit)
      .populate("category")
    // .populate("ratings.postedby");
    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    res.json({
      product,
      total,
      currentpage: currentpage + 1,
      limit,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    // Handle file uploads

    if (req.body?.galleryImages) {
      req.body.galleryImages = JSON?.parse(req.body?.galleryImages);
    }
    const productId = req.params.id;

    const updateData = req.body;

    // Check if there are any image uploads
    if (req.files) {
      const { thumbnailImage, galleryImages } = req.files;

      if (thumbnailImage) {
        updateData.thumbnailImage =

          "/products/" +
          thumbnailImage[0].filename;
      }

      if (galleryImages) {
        updateData.galleryImages = galleryImages.map(
          (file) =>

            "/products/" +
            file.filename
        );
      }
    }
        const { price, offerPrice } = updateData;
        const originalPrice =  offerPrice - price;
        updateData.percentage = Math.round((originalPrice / offerPrice) * 100);

    // Perform the update operation, but only update the provided fields
    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true }
    );

    // Check if the product was found and updated
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Respond with the updated product
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully", count: 1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    const productsCount = products.length;
    // const totalPages = Math.ceil(productsCount / 9);
    res
      .status(200)
      .json({ totalProducts: productsCount, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    const existingWishlistItem = await Wishlist.findOne({
      product: productId,
      user: userId,
    });

    if (existingWishlistItem) {
      return res
        .status(400)
        .json({ message: "Product already exists in the user's wishlist" });
    }

    const wishlistItem = new Wishlist({ product: productId, user: userId });
    await wishlistItem.save();

    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addProductRating = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { star, comment } = req.body;
    const userId = req.user._id;
    const username = req.user.username ;
    const currentDate = new Date(); 

    const product = await Product.findById(productId).populate("category");;
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingReviewIndex = product.ratings.findIndex(rating => rating.postedBy.toString() === userId);
    if (existingReviewIndex !== -1) {
      product.ratings[existingReviewIndex] = { star, comment, postedBy: userId, username: username ,createdAt: currentDate,};
    } else {
      const user = await User.findById(userId);
      console.log("user", req.user.username)
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      product.ratings.push({ star, comment, postedBy: userId, username: username ,createdAt: currentDate,});
    }
    product.totalratings = product.ratings.length;

    let totalStars = 0;
    product.ratings.forEach(rating => {
      totalStars += rating.star;
    });
    product.averageRating = totalStars / product.totalratings;

    await product.save();

    res.status(201).json({ message: "Product rating added successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




const updateProductRating = async (req, res) => {
  try {
    const productId = req.params.productId;
    const ratingId = req.params.ratingId;
    const { star, comment } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const rating = product.ratings.find(rating => rating._id.equals(ratingId));
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    if (!rating.postedBy.equals(userId)) {
      return res.status(403).json({ message: "You are not authorized to update this review" });
    }

    if (star !== undefined && comment !== undefined) {
      rating.star = star;
      rating.comment = comment;
    } else {
      product.ratings = product.ratings.filter(rating => !rating._id.equals(ratingId));
    }

    let totalRatings = 0;
    product.ratings.forEach(rating => {
      totalRatings += rating.star;
    });
    product.averageRating = totalRatings / product.ratings.length;

    await product.save();

    res.json({ message: "Product rating updated successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProductRating = async (req, res) => {
  try {
    const productId = req.params.productId;
    const ratingId = req.params.ratingId;
    // const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const ratingIndex = product.ratings.findIndex(rating => rating._id.equals(ratingId));
    // if (ratingIndex === -1) {
    //   return res.status(404).json({ message: "Rating not found" });
    // }

    // if (!product.ratings[ratingIndex].postedBy.equals(userId)) {
    //   return res.status(403).json({ message: "You are not authorized to delete this review" });
    // }

    product.ratings.splice(ratingIndex, 1);

    product.totalratings = product.ratings.length;

    let totalRatings = 0;
    product.ratings.forEach(rating => {
      totalRatings += rating.star;
    });
    product.averageRating = totalRatings / product.ratings.length;

    await product.save();

    res.json({ message: "Product rating deleted successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProducts,
  createWishlist,
  ProductFilter,
  addProductRating,
  updateProductRating,
  deleteProductRating,
};
