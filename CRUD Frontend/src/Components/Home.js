/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Row, Modal, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addproduct } from "../Product/productSlice"; // Assuming you have defined this action
import * as yup from "yup";
import { useFormik } from "formik";
import { getuser, deleteuser } from "../Fetures/userSlice"; // Removed unnecessary import of updateUser


const Home = () => {
  const { user, alluser } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteuser(userId));
    alert("User Delete SuccessFully.....");
    dispatch(getuser());
  };

  let schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required"),
    offerPrice: yup.number().required("Offer Price is required"),
    percentage: yup.number().required("Percentage is required"),
    category: yup.string().required("Category is required"),
    thumbnailImage: yup.string().required("Thumbnail Image URL is required"),
    galleryImages: yup.array().required("Gallery Images are required"), // Updated to accept an array
    quantity: yup.number().required("Quantity is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      offerPrice: "",
      percentage: "",
      category: "",
      thumbnailImage: null,
      galleryImages: [],
      quantity: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "thumbnailImage") {
            formData.append("thumbnailImage", values.thumbnailImage);
          } else if (key === "galleryImages") {
            values.galleryImages.forEach((image, index) => {
              formData.append(`galleryImages${index}`, image);
            });
          } else {
            formData.append(key, values[key]);
          }
        });
        dispatch(addproduct(formData));

        // Handle success if needed
        console.log("Product added successfully:" , formData);
        setShowModal(false);
      } catch (error) {
        // Handle error if needed
        console.error("Error adding product:", error);
      }
    },
  });

  const isAdmin = user && user.role === "admin";

  return (
  <>

     <div>
      <Container>
        <Row className="justify-content-center">
          {isAdmin ? (
            <div>
              <h1>Admin Home</h1>
              <button
                className="btn btn-success"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                + Add Product
              </button>
              {/* Your table code here */}
            </div>
          ) : (
            <>
              <h1>User Home</h1>
            </>
          )}
        </Row>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="bg-secondary" closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-danger">{formik.errors.description}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="text-danger">{formik.errors.price}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicOfferPrice">
              <Form.Label>Offer Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product offer price"
                name="offerPrice"
                value={formik.values.offerPrice}
                onChange={formik.handleChange}
              />
              {formik.touched.offerPrice && formik.errors.offerPrice && (
                <div className="text-danger">{formik.errors.offerPrice}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPercentage">
              <Form.Label>Percentage</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product percentage"
                name="percentage"
                value={formik.values.percentage}
                onChange={formik.handleChange}
              />
              {formik.touched.percentage && formik.errors.percentage && (
                <div className="text-danger">{formik.errors.percentage}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
              />
              {formik.touched.category && formik.errors.category && (
                <div className="text-danger">{formik.errors.category}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicThumbnailImage">
              <Form.Label>Thumbnail Image</Form.Label>
              <Form.Control
                type="file"
                name="thumbnailImage"
                onChange={(event) => {
                  formik.setFieldValue(
                    "thumbnailImage",
                    event.currentTarget.files[0]
                  );
                }}
              />
              {formik.errors.thumbnailImage &&
                formik.touched.thumbnailImage && (
                  <div className="text-danger">
                    {formik.errors.thumbnailImage}
                  </div>
                )}
            </Form.Group>

            <Form.Group controlId="formBasicGalleryImages">
              <Form.Label>Gallery Images</Form.Label>
              <Form.Control
                type="file"
                name="galleryImages"
                onChange={(event) => {
                  const files = event.currentTarget.files;
                  const galleryImagesArray = [];
                  for (let i = 0; i < files.length; i++) {
                    galleryImagesArray.push(files[i]);
                  }
                  formik.setFieldValue("galleryImages", galleryImagesArray);
                }}
                multiple
              />
              {formik.errors.galleryImages && formik.touched.galleryImages && (
                <div className="text-danger">{formik.errors.galleryImages}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product quantity"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <div className="text-danger">{formik.errors.quantity}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            type="submit"
            variant="success"
            onClick={() => {
              formik.handleSubmit();
              setShowModal(false);
            }}
          >
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </>
  );
};

export default Home;
