//importing express and database
const express = require("express");
const router = express.Router();
const User = require('../routes/models/User');
const Post = require('../routes/models/Post');
const bcrypt = require('bcrypt');



//routes
router.get("/admin", async (req, res) => {

    try {

        const locals = {
            title: "Admin",
            description: "A simple project"
        }




        const data = await Post.find();
        res.render('admin/index', { locals });
    } catch (error) {

    }


});



//takes you to the register and sign up page
router.post("/admin", async (req, res) => {

    try {

        const { username, password } = req.body;
        console.log(username);
        const user = await User.findOne({ Username: username });
        console.log(user);

        if (!user) {
            return res.status(401).json({ message: 'invalid credentials' });
            console.log('invalid credentials');
        }



        const isPasswordValid = await bcrypt.compare(password, user['Password']);
        console.log(isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        res.redirect('/dashboard');




    } catch (error) {

    }


});

// takes in username and password and stores in the database
router.post("/register", async (req, res) => {

    try {

        const { username, password } = req.body;
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        try {
            const user = await User.insertMany({ Username: username, Password: hashedPassword });
            console.log(user)

        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already in use' });
            }


        }






    } catch (error) {

    }


});



// user dashboard when they log in
router.get("/dashboard", async (req, res) => {

    try {
        const data = await Post.find();
        res.render("admin/dashboard.ejs", { data: data });
    } catch (error) {

    }








});

//Takes you to the page where you can add the post
router.get("/add-post", async (req, res) => {

    try {
        const data = await Post.find();
        res.render("admin/add-post.ejs", { data: data });
    } catch (error) {

    }



});


// The content of your post is stored in the database.
router.post("/add-post", async (req, res) => {

    try {
        const title = req.body.title;
        const body = req.body.body;

        await Post.insertMany({ title: title, body: body });
        res.redirect("/dashboard");
        res.render("admin/add-post.ejs", { data: data });
    } catch (error) {

    }


});



// edit a post
router.post("/edit-post/:id", async (req, res) => {



    try {

        const data = await Post.findByIdAndUpdate(req.params.id, {

            title: req.body['title'],
            body: req.body['body'],
            updatedAt: Date.now()


        });
        console.log(data);
        //res.redirect('/edit-post/${req.params.id}');
        res.redirect({ data: data }, 'admin/dashboard');
        //res.render("admin/add-post.ejs", { data: data });
    } catch (error) {

    }





});



router.get("/edit-post/:id", async (req, res) => {

    try {
        const data = await Post.findOne({ _id: req.params.id });
        console.log(data);
        res.render('admin/edit-post', { data: data })
        //res.render("admin/add-post.ejs", { data: data });
    } catch (error) {

    }

});





// deleting a post
router.post("/delete-post/:id", async (req, res) => {

    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
        //res.render("admin/add-post.ejs", { data: data });
    } catch (error) {

    }

});

/**try {
 
    const { username, password } = req.body;
    const user = await User.findOne({ username });
 
    const isPasswordValid = await bcrypt.compare(password, user["Password"]);
    console.log(isPasswordValid);
} catch (error) {
 
}
 
**/

module.exports = router;