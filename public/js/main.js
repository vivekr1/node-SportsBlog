$(document).ready(function () {
    $('.category-delete').on('click', function (e) {
        $target= $(e.target);
        $.ajax({
            type: "DELETE",
            url: "/categories/delete/"+$target.attr('data-cat-id'),
            data: "data",
            success: function (response) {
                alert('Category Removed');
                window.location.href="/";
            },
            error:(error)=>{
                console.log(error);
            }
        });
        
    });


    $('.article-delete').on('click', function (e) {
        $target= $(e.target);
        $.ajax({
            type: "DELETE",
            url: "/articles/delete/"+$target.attr('data-article-id'),
            data: "data",
            success: function (response) {
                alert('Article Removed');
                window.location.href="/";
            },
            error:(error)=>{
                console.log(error);
            }
        });
        
    });
});