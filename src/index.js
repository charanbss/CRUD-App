//importing express package, db.js, models.js
const express = require("express");
require("./db")
const User = require("./models");

//importing email validating package
const emailValidator = require("email-validator");

//creating an instance
const app = express();

//using middleware to pass the stringified JSON objects in incoming requests as JSON objects.
app.use(express.json());

//welcome page
app.get('/', (req, res) => {
    return res.send("Welcome to the user database!");
})

//get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        if(users != []) {
            return res.status(200).send(users);
        }
        else {
            return res.send("No users found in the database");
        }
    } catch (e) {
        return res.status(500).send(e)
    }
})

//get user by id
app.get('/api/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if(user) {
            return res.status(200).send(user);
        }
        else {
            return res.send("User not found!");
        }
    } catch (e) {
        return res.status(500).send(e)
    }
});

//create new user
app.post('/api/users', async (req, res) => {
    try{
        const user = new User({
            name: req.body.name,
            email: req.body.email
        })
        
        if(emailValidator.validate(req.body.email)) {
            await user.save();
            return res.status(201).send(user);
        }
        else {
            return res.send("Invalid email! Please enter in correct format.");
        }
        
    } catch (e) {
        return res.status(500).send(e)
    }
});

//editing a user by id
app.patch('/api/users/:id',async (req, res) => {
    const _id = req.params.id
    try {
        const users = await User.findByIdAndUpdate(_id, req.body)
        if(users) {
            const userUp = await User.findById(_id);
            return res.status(200).send(userUp)
        } 
        else{
            return res.status(400).send("Update Failed")
        }
    } catch(e) {
       return res.status(500).send(e) 
    }
})

//deleting a user by id
app.delete('/api/users/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(_id);
        if(user) {
            return res.status(400).send("User Succesfully deleted")
        }
        return res.send("User deletion failed");
    } catch (e) {
        return res.status(500).send(e)
    }
})

//posting to local host port 3000
app.listen(3000, () => {console.log("Lisenting on Port 3000")})