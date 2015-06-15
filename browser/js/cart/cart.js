app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {

        	getCartOfCakes: function (AuthService, $localStorage, $q, CakeFactory, CartFactory) {

                return AuthService.getLoggedInUser().then(function (user) {

                    if (user) {
                        return CartFactory.getCartByUser(user);
                    } else {
                        return $localStorage.cart;
                    }

                }).then(function (userCart) {

                    if (userCart.cakes) {

                        var cakes = userCart.cakes.map(function (cake) {
                            return CakeFactory.getCakes(cake);
                        });

                        return $q.all(cakes);

                    } else {
                        return userCart;
                    }

                }).then(function (cakes) {
                    return cakes;
                });
            },

        	isAuthenticated: function (AuthService) {

        		return AuthService.isAuthenticated();
        	}
        }
    });

});


app.controller('CartCtrl', function ($scope, $state, $stateParams, $localStorage, CartFactory, OrderFactory, getCartOfCakes, isAuthenticated) {

    $scope.cart = getCartOfCakes;

    console.log('scope.cart', $scope.cart);

    $scope.price = CartFactory.calculateCart($scope.cart);

    $scope.currentStore = $localStorage.currentStore;

    $scope.checkout = function (cart) {

    	var store = cart[0].storeId;

    	var cakes = cart.map(function (cake) {
    		return cake._id;
    	});

    	if (isAuthenticated) {
    		OrderFactory.createNewOrder(store, cakes, $scope.price);	
    	}
    	
    };


});