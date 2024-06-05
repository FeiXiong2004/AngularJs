window.ProductListController = function($scope, $http, $location){
    
    // tạo đường dẫn apiUrl để nó gọi được API
    var apiProductsUrl = "http://localhost:3000/products";
    var apiCategoryUrl = "http://localhost:3000/category";
    $scope.getData = function(){
        // gọi để lấy data
        $http.get(apiProductsUrl).then(function(response){
            // nếu như reponse trả về dữ liệu thành công
            if(response.status == 200){
                $scope.products = response.data;
                // After fetching products, fetch categories and then map category names to products
                $http.get(apiCategoryUrl).then(function(categoryResponse){
                    // nếu như reponse trả về dữ liệu thành công
                        if (categoryResponse.status == 200) {
                            $scope.category = categoryResponse.data;
                            mapCategoryNamesToProducts();
                        }
                    
                });
            }
        })
      
    }
    function mapCategoryNamesToProducts() {
        // Lặp qua từng sản phẩm
        for (var i = 0; i < $scope.products.length; i++) {
            var product = $scope.products[i];
            
            // Lặp qua từng danh mục
            for (var j = 0; j < $scope.category.length; j++) {
                var cate = $scope.category[j];
                
                // Nếu ID của danh mục trong sản phẩm trùng với ID của danh mục, gán tên danh mục vào sản phẩm
                if (product.categoryId === cate.id) {
                    product.categoryName = cate.name;
                    break; 
                }
            }
        }
    }
 
    // xóa
    $scope.onDelete = function(deleteID){
        let confirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
        // nếu như confirm ok tức là đồng ý xóa
        if(confirm){
            $http.delete(`${apiProductsUrl}/${deleteID} `).then(
                function(response){
                    if(response.status == 200){
                        $scope.getData();
                    }
                }
            )
        }
    }

    $scope.onDetail = function(id){
        $location.path(`/products/detail/${id}`)
    }

    $scope.onEdit = function(id){
        $location.path(`products/${id}/edit`)
    }
    $scope.getData();
}