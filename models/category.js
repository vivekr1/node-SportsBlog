const mongoose = require('mongoose');


// category schema

const categorySchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});

const Category = module.exports = mongoose.model('Category', categorySchema);

// get categories
module.exports.getCategories = function(callback, limit) {
    Category.find(callback).limit(limit).sort();
}

// add category 
module.exports.addCategory = function(category, callback) {
    Category.create(category, callback);
}


module.exports.getCategoryById= function (id, callback) {
    Category.findById(id, callback);
}


module.exports.updateCategory = function (query, udpate , options, cb) { 
    console.log(" in category model update category"); 
    Category.findOneAndUpdate(query, udpate , options, cb);
}

// Remove categoiry
module.exports.removeCategory = function (query , cb) {
    console.log(" in category model delete category"); 

    Category.remove(query, cb);
}
