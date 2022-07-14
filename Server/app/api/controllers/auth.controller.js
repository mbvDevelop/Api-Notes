const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const email = req.body.email;
    const name  = req.body.name;
    let password =  req.body.password;

    if (email == null || name == null || password == null) {
        return res.status(400).send("Bad Request");
    }

    const emailExists = await User.findOne({email: email});
    const nameExists = await User.findOne({name: name});

    if (emailExists || nameExists) {
        return res.status(400).send("User name or email already exists")
    }
    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    password = null

    //Create user
    const user = new User({
        name: req.body.name,
        email: req.body.email, 
        password: hashedPass
    })
    try {
        const savedUser = await user.save();

        const token = jwt.sign({_id: user._id}, "42");
        res.send(token);
    } catch(err) {
        res.status(400).send(err);
    }
};

const login = async (req, res) => {
    // Check if email exists
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send("Wrong email or password")
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Wrong email or password")
    // Gen token
    const token = jwt.sign({_id: user._id}, "42");
    // Send the auth token
    res.send(token)
}

module.exports = { 
    register,
    login
}
