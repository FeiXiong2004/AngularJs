window.ProductEditController = function($scope,$http,$routeParams,$location){
    var apiProductsUrl = "http://localhost:3000/products";
    var apiCategoryUrl = "http://localhost:3000/category";
    var editId = $routeParams.id;
    $scope.selectedItem = "";
    $scope.getProductInfo = function(){
        $http.get(`${apiProductsUrl}/${editId}`).then(function(response){
            
                if(response.status == 200){
                    $scope.product = response.data;
                    $scope.inputValue = {
                        name: response.data.name,
                        price: response.data.price,
                        categoryId: response.data.category, 
                    }
                    $http.get(apiCategoryUrl).then(function(categoryResponse) {
                        if (categoryResponse.status == 200) {
                            $scope.category = categoryResponse.data;
                            // Gán selectedItem cho id của danh mục của sản phẩm
                            $scope.selectedItem = response.data.categoryId;
                        }
                    })
    
                }
            }
        ).catch(function(error){
            $scope.message = `${error.statusText} product with id ${editId}`;
        })
    }
    $scope.getProductInfo();

    $scope.kiemTraDuLieu = {
        name: false,
        price: false,
        category: false,
    }

    $scope.onEditForm = function(){
        // gán 1 biến kiểm tra lỗi
        // nếu 1 trong 2 trường lỗi thì cập nhật thành true
        let flag = false;
        if(!$scope.selectedItem){
            // nếu không có inputValue hoặc inputValue.name
            // thì lập tức chuyển thành true
            $scope.kiemTraDuLieu.category= true;
            flag = true;
        }
        if(!$scope.inputValue   || !$scope.inputValue.name){
            // nếu không có inputValue hoặc inputValue.name
            // thì lập tức chuyển thành true
            $scope.kiemTraDuLieu.name= true;
            flag = true;
        }
        if(!$scope.inputValue || !$scope.inputValue.price){
            // nếu không có inputValue hoặc inputValue.price
            // thì lập tức chuyển thành true
            $scope.kiemTraDuLieu.price= true;
            flag = true;
        }
        if(!flag){
         // tạo ra đối tượng item để thêm vào
            var updateItem = {
                name: $scope.inputValue.name,
                price: $scope.inputValue.price,
                categoryId: $scope.selectedItem 
            }
          
            $http.put(
                `${apiProductsUrl}/${editId}`,
                updateItem
            ).then(function(response){
                if(response.status == 200){
                    $location.path('product/list')
                    alert('Edit confirm');
                }
            })  
        }
    }
  
}