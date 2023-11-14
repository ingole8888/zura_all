const express = require("express")
const bcrypt = require("bcrypt")
const multer = require('multer');
const jwt = require('jsonwebtoken');
const AuthModel = require("../models/authmodel")
const authController = express.Router();

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `uploads/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const upload = multer({
    storage: multerStorage,
});

authController.post("/signup", async (req, res) => {

    //console.log(req.file.filename)
    const { email, fname, lname, profile } = req.body;

    try {

        const user1 = await AuthModel.findOne({ email })

        if (user1) {
            return res.status(501).send("User already present please use different userid!");
        }

        const user = new AuthModel({
            email,
            fname,
            lname,
            profile
        })
        await user.save();
        return res.status(200).send({ message: "Signup successfull", user: user })

    } catch (error) {
        res.send(error)
    }

})

authController.post("/login", async (req, res) => {
    const { email} = req.body;
    try {
        const user = await AuthModel.findOne({ email })

        if (!user) {
            return res.status(501).send({ message: "Login Failed, User Not Found!", status: 501 });
        }

        if (user) {
            const token = jwt.sign({ email: user.email, userId: user._id }, "shhhhhsecret", { expiresIn: "365 day" })

            return res.status(200).send({ status: 200, message: "login succesfully", token: token, userId: user._id, user: user })
        }
        else {
            res.status(401).send({ status: 401, message: "invalid password" })
        }

    } catch (error) {
        res.send(error)
    }
})

authController.get("/alldata", async (req, res) => {
    try {
        const user = await AuthModel.find()
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

authController.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await AuthModel.findByIdAndUpdate(id,
            {
                $set: req.body,
            },
            { new: true })
        res.status(200).send(user)
    } catch (error) {
        res.send(error)
    }
})

authController.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await AuthModel.findByIdAndRemove(id)
        res.send(user)

    } catch (error) {
        res.send(error)
    }
})

module.exports = authController
