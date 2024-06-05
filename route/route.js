    angular.module('myController',['ngRoute'])
    .config(function($routeProvider){
        $routeProvider.when('/products/list',{
            templateUrl: 'views/products/list.html',
            controller: ProductListController
        })
        .when('/products/add',{
            templateUrl: 'views/products/add.html',
            controller: ProductAddController
        })
        .when('/products/detail/:id',{
            templateUrl: 'views/products/detail.html',
            controller: ProductDetailController
        })
        .when('/products/:id/edit',{
            templateUrl: 'views/products/edit.html',
            controller: ProductEditController
        })
        .when('/category/list',{
            templateUrl: 'views/category/list.html',
            controller: CategoryListController
        })
        .when('/category/add',{
            templateUrl: 'views/category/add.html',
            controller: CategoryAddController
        })
        .when('/category/:id/edit',{
            templateUrl: 'views/category/edit.html',
            controller: CategoryEditController
        })
    
    });
