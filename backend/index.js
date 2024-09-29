const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT;
// const Schema = mongoose.Schema;
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL);
app.listen(port, (error) => {
  if (!error) {
    console.log("connected to port" + port);
  } else {
    console.log("the error is " + error);
  }
});
const storage = multer.diskStorage({
  destination: "./upload/image",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
app.use("/images", express.static("./upload/image"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});
const Product = mongoose.model("product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
app.post("/addfiletodb", async (req, res) => {
  let pp = await Product.find({});
  let id = 0;
  if (pp.length > 0) {
    id = pp[pp.length - 1].id + 1;
  } else {
    id += 1;
  }
  try {
    const product = new Product({
      id: id,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      pic: req.body.pic,
    });
    await product.save();
    res.json({
      success: true,
    });
  } catch (e) {
    res.send(e);
  }
});
app.post("/removeitem", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
  });
});
app.get("/allproducts", async (req, res) => {
  let all_product = await Product.find({});
  res.send(all_product);
  console.log("all datas are feched succesfully");
});
const user = mongoose.model("User", {
  firstName: {
    type: String,
  },
  lastName: {},
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
});

//signup
app.post("/signup", async (req, res) => {
  const cheak = await user.findOne({ email: req.body.email });
  if (cheak) {
    return res.json({
      success: false,
      message: "the email addess is already registered",
    });
  }
  let cart = {};
  for (let i = 0; i <= 300; i++) {
    cart[i] = 0;
  }
  const newUser = new user({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await newUser.save();
  const userData = {
    id: newUser.id,
  };
  const token = jwt.sign(userData, process.env.TOKEN_SECRET);
  res.json({
    success: true,
    message: "u are registered succesfully",
    token,
  });
});

//login
app.post("/login", async (req, res) => {
  const userCheak = await user.findOne({ email: req.body.email });
  if (userCheak) {
    if (req.body.password === userCheak.password) {
      const userData = {
        id: userCheak.id,
      };
      const token = jwt.sign(userData, process.env.TOKEN_SECRET);
      res.json({
        success: true,
        message: "u are logged in",
        token,
      });
    } else {
      res.json({
        message: "email or password is incorrect",
      });
    }
  } else {
    res.json({
      message: "email or password is incorrect",
    });
  }
});

//a midddleware to
const fetchUser = async (req, res, next) => {
  const token = req.header("token-auth");
  if (!token) {
    res.status(401).send({ error: "no token" });
  } else {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.data = data;
    console.log(".......", data);
    next();
  }
};

app.post("/addtocart", fetchUser, async (req, res) => {
  console.log(req.body, req.data);
  const tobeUpdated = await user.findOne({ _id: req.data.id });
  tobeUpdated.cartData[req.body.item] += 1;
  await user.findOneAndUpdate(
    { _id: req.data.id },
    { cartData: tobeUpdated.cartData }
  );
  res.send("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log(req.body, req.data);
  const tobeUpdated = await user.findOne({ _id: req.data.id });
  tobeUpdated.cartData[req.body.item] -= 1;
  await user.findOneAndUpdate(
    { _id: req.data.id },
    { cartData: tobeUpdated.cartData }
  );
  res.send("removed");
});
app.post("/allcartdata", fetchUser, async (req, res) => {
  const userdata = await user.findOne({ _id: req.data.id });
  res.json(userdata.cartData);
});
