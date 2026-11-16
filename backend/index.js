require("dotenv").config();
const express=require('express');
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { UserModel } = require("./model/UserModel");

const app=express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());



const {PositionsModel}=require("./model/PositionsModel");
const {HoldingsModel}=require("./model/HoldingsModel");
const { OrdersModel } = require("./model/OrdersModel");

/*app.get("/addpositions",async (req,res)=>{
  let tempopositions= [
  {
    product: "CNC",
    name: "EVERYDAY",
    qty: 2,
    avg: 316.27,
    price: 312.35,
    net: "+0.58%",
    day: "-1.24%",
    isLoss: true,
  },
  {
    product: "MIS",
    name: "RELIANCE",
    qty: 5,
    avg: 1250.0,
    price: 1290.5,
    net: "+3.24%",
    day: "+1.20%",
    isLoss: false,
  },
  {
    product: "CNC",
    name: "TCS",
    qty: 3,
    avg: 3800.0,
    price: 3725.5,
    net: "-1.96%",
    day: "-0.65%",
    isLoss: true,
  },
  {
    product: "MIS",
    name: "INFY",
    qty: 8,
    avg: 1450.0,
    price: 1510.75,
    net: "+4.19%",
    day: "+0.85%",
    isLoss: false,
  },
  {
    product: "CNC",
    name: "HDFCBANK",
    qty: 6,
    avg: 1650.0,
    price: 1595.25,
    net: "-3.32%",
    day: "-1.10%",
    isLoss: true,
  },
  {
    product: "MIS",
    name: "ICICIBANK",
    qty: 4,
    avg: 1100.0,
    price: 1165.8,
    net: "+5.98%",
    day: "+1.45%",
    isLoss: false,
  },
  {
    product: "CNC",
    name: "WIPRO",
    qty: 10,
    avg: 480.0,
    price: 455.6,
    net: "-5.08%",
    day: "-0.92%",
    isLoss: true,
  },
  {
    product: "MIS",
    name: "TATAMOTORS",
    qty: 7,
    avg: 720.0,
    price: 745.3,
    net: "+3.51%",
    day: "+0.70%",
    isLoss: false,
  },
  {
    product: "CNC",
    name: "KPITTECH",
    qty: 5,
    avg: 250.3,
    price: 266.45,
    net: "+6.45%",
    day: "+3.54%",
    isLoss: false,
  },
  {
    product: "MIS",
    name: "M&M",
    qty: 2,
    avg: 809.9,
    price: 779.8,
    net: "-3.72%",
    day: "-0.01%",
    isLoss: true,
  },
];

  tempopositions.forEach((item) => {
    let indposition=new PositionsModel({
      product: item.product,
    name: item.name,
    qty: item.qty,
    avg: item.avg,
    price: item.price,
    net: item.net,
    day: item.day,
    isLoss: item.isLoss,
    })
    indposition.save();
  });
    res.send("Done");
})*/

app.post("/signup", async (req, res) => {
  if (!process.env.TOKEN_KEY) {
    return res.status(503).json({
      message: "Signup is unavailable. Set TOKEN_KEY in backend/.env and restart the backend.",
    });
  }

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const newUser = new UserModel({
      username,
      email: email.trim().toLowerCase(),
      password,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.TOKEN_KEY,
      { expiresIn: "3d" }
    );

    await newUser.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Signup failed",
    });
  }
});

app.post("/login", async (req, res) => {
  if (!process.env.TOKEN_KEY) {
    return res.status(503).json({
      message: "Login is unavailable. Set TOKEN_KEY in backend/.env and restart the backend.",
    });
  }

  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.TOKEN_KEY,
      { expiresIn: "3d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Login failed",
    });
  }
});

app.get("/verify", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await UserModel.findById(decoded.id).select("username email");

    if (!user) {
      return res.status(401).json({ authenticated: false });
    }

    return res.json({
      authenticated: true,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch {
    return res.status(401).json({ authenticated: false });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.json({ message: "Logged out successfully" });
});

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please log in first"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

app.get("/allHoldings",authenticateToken,async(req,res)=>{
  let allHolding=await HoldingsModel.find({user: req.userId});
  res.json(allHolding);
})

app.get("/allPositions", authenticateToken,async(req,res)=>{
  let pos=await PositionsModel.find({user: req.userId});
  res.json(pos);
})

app.post("/newOrder",authenticateToken,async(req,res)=>{
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  const qty = Number(req.body.qty);
  const price = Number(req.body.price);
  const mode = req.body.mode;

  if (!name || !Number.isFinite(qty) || qty <= 0 || !Number.isFinite(price) || price <= 0) {
    return res.status(400).json({ message: "A stock name, positive quantity, and positive price are required." });
  }

  if (mode !== "BUY" && mode !== "SELL") {
    return res.status(400).json({ message: "Order mode must be BUY or SELL." });
  }

  try {
    if (mode === "BUY") {
      const holding = await HoldingsModel.findOne({ name,user: req.userId});
      if (holding) {
        const totalQty = Number(holding.qty) + qty;
        holding.avg = (Number(holding.avg) * Number(holding.qty) + price * qty) / totalQty;
        holding.qty = totalQty;
        await holding.save();
      } else {
        await HoldingsModel.create({
          name,
          qty,
          avg: price,
          price,
          net: "0.00%",
          day: "0.00%",
          user: req.userId
        });
      }
    } else {
      const holding = await HoldingsModel.findOne({ name,user: req.userId });
      if (!holding) {
        return res.status(400).json({ message: `No shares of ${name} are available to sell.` });
      }
      if (qty > Number(holding.qty)) {
        return res.status(400).json({
          message: `Cannot sell ${qty} shares of ${name}; only ${holding.qty} are available.`,
        });
      }

      const remainingQty = Number(holding.qty) - qty;
      if (remainingQty === 0) {
        await HoldingsModel.deleteOne({ _id: holding._id ,user: req.userId});
      } else {
        holding.qty = remainingQty;
        await holding.save();
      }
    }

    const newOrder = await OrdersModel.create({ name, qty, price, mode,user: req.userId });
    return res.status(201).json({ message: "Order placed successfully.", order: newOrder });
  } catch (error) {
    console.error("Failed to place order:", error);
    return res.status(500).json({ message: "Unable to place order." });
  }
})

app.get("/myOrders",authenticateToken ,async (req,res)=>{
  const order=await OrdersModel.find({user: req.userId});
  res.json(order);
})



const PORT=process.env.PORT || 3002;
const uri=process.env.MONGO_URL;


app.listen(PORT,'0.0.0.0',()=>{
  console.log(`http://localhost:${PORT}`);
  mongoose.connect(uri);
})