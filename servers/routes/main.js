const express = require("express");
/* const router variable accesses the express library and then accesses the router function to route to the chosen route
this is done in order to take the routes from app.js and put them in a separate server folder so that the code can be organized more
efficiently*/

const router = express.Router();


/* when the route below is called, the layout created in the main.ejs will always be the central template/layout of all webpages
and whichever route/webpage you choose , the main.ejs layout will appear across all of them*/

const Post = require('../routes/models/Post');


//routes

router.get("/", async (req, res) => {

    try {

        const locals = {
            title: "Blog App",
            description: "A simple project"
        }




        const data = await Post.find();
        res.render('index.ejs', { locals, data });
    } catch (error) {

    }


});




// displays the page of the specific blog post you clicked
router.get("/post/:id", async (req, res) => {

    try {

        const locals = {
            title: "Blog App",
            description: "A simple project"
        }

        let slug = req.params.id;




        const data = await Post.findById({ _id: slug });
        res.render('post.ejs', { locals, data });
    } catch (error) {

    }


});




// search bar
router.post("/search", async (req, res) => {

    try {

        const locals = {
            title: "Blog App",
            description: "A simple project"
        }

        let tex = req.body["SearchTerm"];
        const noSpecialCharacters = tex.replace
        console.log(tex);
        //res.send(tex);

        const data = await Post.find({
            $or: [{ title: { $regex: tex, $options: 'i' } },
            { body: { $regex: tex, $options: 'i' } }]
        });

        res.render('search.ejs', { data: data });


        //const data = await Post.find();
        //res.render('search', { locals, data });
    } catch (error) {

    }


});





router.get("/about", (req, res) => {
    res.render('about.ejs');

});

module.exports = router;