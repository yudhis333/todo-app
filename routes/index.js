const express = require("express");
const router = express.Router();
const userRouter = require("./user")
const todoRouter = require("./todo")

router.get("/", (req, res) => {
    res.send("Halo, dunia!");
});

router.use("/users", userRouter);
router.use("/users", todoRouter);


module.exports = router;
