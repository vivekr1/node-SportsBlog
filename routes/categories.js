const express = require('express');
const router = express.Router();


Category = require('../models/category.js');

router.get('/', (req, res, next) => {
    Category.getCategories((err, categories) => {
        console.log(categories);

        if (err) {
            res.send(err);
        }
        res.render('categories', {
            title: 'Categories @1',
            categories: categories
        });
    });
});


// Add category - POST
router.post('/add', (req, res, next) => {
    req.checkBody('title', 'Title is required').notEmpty()

    let errors = req.validationErrors();
    if (errors) {
        res.render('add_category', {
            errors: errors,
            title: 'Create Category'
        });
    } else {

        let c = new Category();
        c.title = req.body.title;
        c.description = req.body.description;

        Category.addCategory(c, (err, c) => {
            if (err){
                res.send(err);
            }
            req.flash('success', 'Category Saved')
            res.redirect('/manage/categories');
        });
    }

});


// Edit category - POST
router.post('/edit/:id', (req, res, next) => {

    let c = new Category();
    const query = {
        _id: req.params.id
    }
    const update = {
        title: req.body.title,
        description: req.body.description
    }

    Category.updateCategory(query, update, {}, (err, category) => {
        console.log(" in  Category.updateCategory cb  ");
        if (err) {
            
             res.send(err);
        }
        req.flash('success', 'Category Updated');
        res.redirect('/manage/categories');
    });

});



// Delete category - POST
router.delete('/delete/:id', (req, res, next) => {

    let c = new Category();
    const query = {
        _id: req.params.id
    }

    Category.removeCategory(query, (err, category) => {
        console.log(" in  Category.removeCategory cb  ");
        if (err) {
            res.send(err);
        }
        res.status(200);
    });

});



module.exports = router;