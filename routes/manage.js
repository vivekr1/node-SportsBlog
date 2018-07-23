const express = require('express');
const router = express.Router();
CategoryModel = require('../models/category.js');
ArticleModel = require('../models/article.js');

router.get('/articles', (req, res, next) => {
    console.log('in /articles');
    ArticleModel.getArticles ((err, articles) => {
        if (err) {
            res.send(err);
        }

        res.render('manage_articles', {
            title: 'Manage Articles',
            articles: articles
        });
    });


});

router.get('/categories', (req, res, next) => {
    CategoryModel.getCategories((err, categories) => {
        if (err)
            res.render(err);
        res.render('manage_categories', {
            title: 'Categories',
            categories: categories

        });
    }, 10)

});


router.get('/articles/add', (req, res, next) => {

    CategoryModel.getCategories((err, categories) => {
        if (err)
            res.send(err);
        res.render('add_article.pug', {
            title: 'Create Article',
            categories: categories
        });

    });

});


router.get('/categories/add', (req, res, next) => {
    res.render('add_category', {
        title: 'Create Category'
    });
});



// EDit category - GET 
router.get('/categories/edit/:id', (req, res, next) => {
    CategoryModel.getCategoryById(req.params.id, (err, category) => {
        if (err)
            res.send(err);

        res.render('edit_category', {
            title: 'Edit Category',
            category:   category

        });
    })

});


// EDit article - GET 
router.get('/articles/edit/:id', (req, res, next) => {
    ArticleModel.getArticleById(req.params.id, (err, article) => {
        if (err)
            res.send(err);

        CategoryModel.getCategories((err, categories)=>{
            if (err)
            res.send(err);

            res.render('edit_articles', {
                title: 'Edit Article',
                article:      article,
                categories: categories
        });


        });
    })

});






module.exports = router;