window.ProductAddController = function($scope, $http, $location){
    var apiProductsUrl="http://localhost:3000/products";
    var apiCategoryUrl="http://localhost:3000/category";
    // kiểm tra dữ liệu có hợp lệ hay không
    $scope.selectedItem = "";

    $scope.kiemTraDuLieu = {
        name: false,
        price: false,
        category: false,
    }

    $scope.onSubmit = function(){
        // gán 1 biến kiểm tra lỗi
        // nếu 1 trong 2 trường lỗi thì cập nhật thành true
        let flag = false;
        if(!$scope.selectedItem){
            // nếu không có inputValue hoặc inputValue.name
            // thì lập tức chuyển thành true
            $scope.kiemTraDuLieu.category= true;
            flag = true;
        }
        if(!$scope.inputValue || !$scope.inputValue.name){
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
            var newItem = {
                    name: $scope.inputValue.name,
                    price: $scope.inputValue.price,
                    categoryId: $scope.selectedItem 
            }
            // khi thêm dữ liệu mới vào thì phải sử dụng đoạn code sau
            // bằng phương thức post
            $http.post(
                apiProductsUrl,
                newItem
            ).then(function(response){
                if(response.status == 201){
                    $location.path('/products/list')
                    alert('Add confirm');
                }
            })
        }

    }
    $scope.getCategory = function() {
        $http.get(apiCategoryUrl).then(function(categoryResponse){
            // nếu như reponse trả về dữ liệu thành công
                if (categoryResponse.status == 200) {
                    $scope.category = categoryResponse.data
                }
            
        });
    };
    // Gọi hàm để lấy dữ liệu danh mục khi controller được khởi tạo
    $scope.getCategory();
}