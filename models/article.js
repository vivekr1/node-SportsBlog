const mongoose = require('mongoose');


// Article schema

const articleSchema = mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    category: {
        type: String
    },
    body: { 
        type: String
    },
    author: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    comments: [{
        comment_subject:{
            type:String
        },
        comment_body:{
            type:String
        },
        comment_author:{
            type:String
        },
        comment_email:{
            type:String
        },
        comment_date:{
            type:String
        }
    }]

});

const Article = module.exports = mongoose.model('Article', articleSchema);

// get categories
module.exports.getArticles = function(callback, limit) {
    Article.find(callback).limit(limit).sort();
}

// add article 
module.exports.addArticle = function(article, callback) {
    Article.create(article, callback);
}


module.exports.getArticleById= function (id, callback) {
    Article.findById(id, callback);
}


module.exports.updateArticle = function (query, udpate , options, cb) { 
    console.log(" in article model update article"); 
    Article.findOneAndUpdate(query, udpate , options, cb);
}

// Remove categoiry
module.exports.removeArticle = function (query , cb) {
    console.log(" in article model delete article"); 

    Article.remove(query, cb);
}

// get article by category 
module.exports.getCategoryArticles = function (categoryid, callback) {
    let query = {category: categoryid};
    Article.find(query, callback);
  }

  // add Commeny
  module.exports.addComment = function (query, comment, cb) {
      Article.update(query, {
          $push: {
              comments: comment
          }
      }, cb)
  }