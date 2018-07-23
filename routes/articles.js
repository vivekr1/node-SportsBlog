const express = require('express');
const router = express.Router();

const Article = require('../models/article.js');

router.get('/', (req, res, next) => {
    Article.getArticles((err, articles)=>{
        res.render('articles',{title:'Articles',
    articles: articles});
    });
    
});



router.get('/show/:id', (req, res, next) => {
    Article.getArticleById(req.params.id, (err, article) => {
        console.log();
        res.render('article.pug', {
            title: 'Article ',
            article: article
        });
    })
});

router.get('/category/:category_id', (req, res, next) => {
    Article.getCategoryArticles(req.params.category_id, (err, articles) => {
        Category.getCategoryById(req.params.category_id, (err, category) =>{
            res.render('articles.pug', {
                title: category.title +  ' Articles ',
                articles: articles
            });
        });



    });
});

router.post('/add', (req, res, next) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();
    req.checkBody('category', 'Category is required').notEmpty();


    
    let errors = req.validationErrors();

    if (errors) {
        Category.getCategories((err, categories) => {
            res.render('add_article', {
                errors: errors,
                title: 'Create Article',
                categories: categories
            });
        });
    } else {

        let a = new Article();
        a.title = req.body.title;
        a.subtitle = req.body.subtitle;
        a.category = req.body.category;
        a.body = req.body.body
        a.author = req.body.author;
 
        Article.addArticle(a, (err, article) => {
            console.log('in add article cb ', a);

            if (err){
                res.send(err);
            }
            req.flash('success', 'Article Added');
            res.redirect('/manage/articles');
        });
    }

});

router.post('/edit/:id', (req, res, next) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();
    req.checkBody('category', 'Category is required').notEmpty();

    let errors = req.validationErrors();
    if(errors)
        console.log(' has errors ', errors);

    if (errors) {
        Category.getCategories((err, categories) => {
            res.render('edit_article', {
                errors: errors,
                title: 'Edit Article',
                categories: categories
            });
        });
    } else {
    let article = new Article();

        const query = {
            _id: req.params.id
        };
    
        const update = {
            title: req.body.title,
            subtite: req.body.subtite,
            category: req.body.category,
            author: req.body.author,
            body: req.body.body
        }
        Article.updateArticle(query, update, {}, (err, article) => {
            console.log('in add article cb ', article);
            if (err){
                res.send(err);
            }
            req.flash('success', 'Article Edited');
            res.redirect('/manage/articles');
        });
    }
});

// Delete category - POST
router.delete('/delete/:id', (req, res, next) => {

            let c = new Article();
            const query = {
                _id: req.params.id
            }

            console.log(" in article delete ", query);

            Article.removeArticle(query, (err, category) => {
                console.log(" in  Article.removeArticle cb  ");
                if (err) {
                    res.send(err);
                }
                res.status(200);
            });
        });


router.post('/comments/add/:id', (req, res, next) => {

    req.checkBody('comment_subject', 'Subject  is required').notEmpty();
    req.checkBody('comment_author', 'Author is required').notEmpty();
    req.checkBody('comment_body', 'Body is required').notEmpty();

    let errors = req.validationErrors();

    console.log(errors);

    if (errors) {
        Article.getArticleById(req.params.id, (err, article) => {
            res.render('article.pug', {
                title: 'Article ',
                article: article,
                errors: errors
            });
        });
    } else {
        let c = {
            comment_subject: req.body.comment_subject,
            comment_author: req.body.comment_author,
            comment_body: req.body.comment_body,
            comment_email: req.body.comment_email
        };


        console.log('in else ..' , c );
        let article = new Article();
        let query = {
            _id: req.params.id
        };

        Article.addComment(query, c, (err, article) => {
            console.log(' addComment - in call back ');
            res.redirect('/articles/show/' + req.params.id);
        });
    }

});
module.exports = router;