app.config(function ($stateProvider) {

    $stateProvider.state('store', {
        url: '/store',
        templateUrl: 'js/store/store.html',
        controller: 'StoreCtrl'
    });

    $stateProvider.state('storeSingle', {
        url: '/store/:id',
        templateUrl: 'js/store/storeSingle.html',
        controller: 'StoreSingleCtrl'
    });



});

app.controller('StoreSingleCtrl', function ($scope, $state, StoreFCT, $stateParams) {
    StoreFCT.getOne($stateParams.id)
        .then(function (data) {
            console.log('SINGLE CAKE', data);
            $scope.cake = data.data;
        });
});

app.controller('StoreCtrl', function ($scope, AuthService, $state, StoreFCT, $localStorage) {

    var cartData = [];

    StoreFCT.getAll().then(function (data) {
        // console.log('DATA on controller', data.data);
        // $scope.products = data.data;
        $scope.products = data.data.map(function (obj) {
            obj.layerNum = obj.layers.length;
            obj.reviewNum = obj.reviews.length;
            return obj;
        });
            // console.log('OBJ', $scope.products);
    });

    $scope.addToCart = function (cake) {

        // we will need a condition here to handle authenticated users

        if ($localStorage.cart) {
            cartData = $localStorage.cart;
        }

        cartData.push(cake);

        $localStorage.cart = cartData;
    }

    $scope.removeFromCart = function (cake) {

        if (!$localStorage.cart) return;

        for (var i = 0; i < $localStorage.cart.length; i++) {
            if ($localStorage.cart[i]._id === cake._id) {
                $localStorage.cart.splice(i, 1)
            }
        }
    }



});