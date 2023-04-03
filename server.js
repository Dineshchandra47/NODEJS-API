const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
const Product = require("./Models/ProductModel");
app.use(express.json());

//Checking  API  working or not
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is working",
  });
});

//Fetch all products
app.get("/product", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Fetch product by ID
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create Product
app.post("/product", async (req, res) => {
  console.log(req.body);
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

//Update Product by ID
app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res
        .status(400)
        .json({ message: `Cannot find any product with this ID: ${id}` });
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete product by ID
app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    console.log(product);
    if (!product) {
      res
        .status(400)
        .json({ message: `Cannot find any product with this ID: ${id}` });
    }
    res.status(200).json({ message: "Product Delete Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Database Connection
mongoose
  .connect(
    "mongodb+srv://admin:12345678Admin@devtaminapi.zpncstm.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DATABASE");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
