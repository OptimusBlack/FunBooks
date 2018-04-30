var funbooksApp = angular.module('funbooksApp', []);

funbooksApp.controller('funbooksController', function($scope, $http){
    $scope.bookCategories;
    $scope.username = "";
    $scope.books = null;
    $scope.booksInCart = null;
    $scope.booksInCartData = null;
    $scope.currentPage;
    $scope.currentCategory;
    $scope.totalPages = [];
    $scope.bookSelected = false;
    $scope.selectedBookData = null;
    $scope.signinClicked = false;
    $scope.signinUsernameEntered = "";
    $scope.signinPasswordEntered = "";
    $scope.signInResponse = "";
    $scope.addToCartQuantity;
    $scope.addToCartTotalPrice;
    $scope.addToCartClicked = false;
    $scope.loadCartClicked = false;
    $scope.loadCartTotalPrice = 0;
    $scope.updateCartSelectOptions = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
    $scope.updateCartSelectValue;
    $scope.checkoutClicked = false;
    $scope.checkoutFinalNumItems = 0;
    $scope.checkoutFinalAmount = 0;
    $scope.showSignoutpage = false;
    
    $scope.getBooks = function(category, page){
        if (page != null) {
            $http.get("/loadpage?category=" + category + "&page=" + page).then(function (response) {
                $scope.bookCategories = response.data.categories;
                $scope.username = response.data.username;
                $scope.booksInCart = response.data.booksInCart;
                $scope.books = response.data.booksData;
                if (response.data.booksData[0].category != $scope.currentCategory) {
                    $scope.currentCategory = response.data.booksData[0].category;
                    $scope.totalPages = [];
                    for (i = 1; i <= response.data.numpages; i++) {
                        $scope.totalPages.push(i);
                    }
                }
                $scope.currentPage = page;
            }, function (response) {
                $scope.books = response;
            });
        }
    }

    $scope.authorListing = function(list){
        var authors = "";
        for (a in list){
            if (a != 0){
                authors += ", ";
            }
            authors += list[a];
        }
        return authors;
    }

    $scope.addToCart = function () {
        if (parseInt($scope.addToCartQuantity) != null && parseInt($scope.addToCartQuantity) != 0) {
            if ($scope.username != "") {
                var requestJSON = {
                    'bookid': $scope.selectedBookData._id,
                    'quantity': parseInt($scope.addToCartQuantity)
                }
                $http.put("/addtocart", requestJSON).then(function (res) {
                    $scope.addToCartTotalPrice = res.data.totalPrice;
                    $scope.booksInCart = res.data.totalNum;
                    $scope.addToCartClicked = true;
                    $scope.addToCartQuantity = null;
                }, function (res) {
                    alert("Error " + res.data.msg);
                });
            }
            else{
                alert("Please sign in first");
            }
        }
    }

    $scope.signin = function () {
        if ($scope.signinUsernameEntered != "" && $scope.signinPasswordEntered != "") {
            var requestJSON = {
                'username': $scope.signinUsernameEntered,
                'password': $scope.signinPasswordEntered
            }
            $http.post("/signin", requestJSON).then(function (res) {
                if (res.data.msg != "Login failure") {
                    $scope.username = $scope.signinUsernameEntered;
                    $scope.booksInCart = res.data.msg;
                    $scope.signinClicked = false;
                    $scope.signInResponse = "";
                }
                else {
                    $scope.signInResponse = res.data.msg;
                }
                $scope.signinUsernameEntered = "";
                $scope.signinPasswordEntered = "";
                console.log(res.data.msg);
            }, function (res) {
                $scope.signinUsernameEntered = "";
                $scope.signinPasswordEntered = "";
            });
        }
    }

    $scope.signout = function(){
        $http.get("/signout").then(function(res){
            if (res.data == ""){
                $scope.username = "";
                $scope.booksInCart = -1;
                if ($scope.checkoutClicked == true || $scope.loadCartClicked == true){
                    $scope.loadCartClicked = false;
                    $scope.checkoutClicked = false;
                    $scope.bookSelected = false;
                    $scope.addToCartClicked = false;
                    $scope.getBooks("nil",1);
                }
                $scope.showSignoutpage = false;
            }
        },function(res){
            alert(res.data);
            console.log(res.data);
        });
    }

    $scope.loadBook = function(bookid){
        $http.get("/loadbook/"+bookid).then(function(res){
            $scope.selectedBookData = res.data;
            $scope.bookSelected = true;
            $scope.addToCartClicked = false;
            console.log(res);
        }, function(res){
            alert(res);
            console.log(res);
        });
    }

    $scope.loadCart = function(){
        $scope.signinClicked = false;
        $scope.loadCartClicked = true;
        $scope.checkoutClicked = false;
        $http.get("/loadcart").then(function(res){
            $scope.booksInCartData = res.data;
            if (res.data.length == 0){
                $scope.booksInCart = 0;
            }
            else{
                $scope.booksInCart = res.data[0].totalNum;
            }
            $scope.loadCartTotalPrice = 0;
            for (i in $scope.booksInCartData){
                $scope.loadCartTotalPrice += $scope.booksInCartData[i].price * $scope.booksInCartData[i].quantity;
            }
        },function(res){
            alert(res.data);
        });
    }

    $scope.updateCart = function (bookid, quantity) {
        if (parseInt(quantity) == 0) {
            $scope.deleteFromCart(bookid);
        }
        else{
            var requestJSON = {
                'bookid': bookid,
                'quantity': parseInt(quantity)
            }
            $http.put("/updatecart", requestJSON).then(function (res) {
                $scope.booksInCart = res.data.msg;
                $scope.loadCart();
            }, function (res) {
                alert(res.data.msg);
            });
        }
    }

    $scope.deleteFromCart = function(bookid){
        $http.delete("/deletefromcart/"+bookid).then(function(res){
            $scope.loadCart();
        },function(res){
            alert(res.data.msg);
        });
    }

    $scope.handleNextPage = function(){
        if ($scope.currentPage < $scope.totalPages.length){
            $scope.getBooks($scope.currentCategory, $scope.currentPage+1);
        }
    }

    $scope.handlePreviousPage = function(){
        if ($scope.currentPage > 1){
            $scope.getBooks($scope.currentCategory, $scope.currentPage-1);
        }
    }

    $scope.goBackBookSelected = function(){
        $scope.bookSelected = false;
        $scope.selectedBookData = null;
    }

    $scope.handleSignInClick = function(){
        $scope.signinClicked = true;
        $scope.loadCartClicked = false;
        $scope.checkoutClicked = false;
    }

    $scope.goBackSignIn = function(){
        $scope.signinClicked = false;
    }

    $scope.continueBrowsing = function(){
        $scope.addToCartClicked = false;
        $scope.bookSelected = false;
        $scope.selectedBookData = null;
    }

    $scope.proceedToCheckOut = function(){
        $scope.signinClicked = false;
        $scope.loadCartClicked = false;
        $scope.checkoutClicked = true;
        $scope.addToCartClicked = false;
        $scope.checkoutFinalNumItems = $scope.booksInCart;
        $scope.checkoutFinalAmount = $scope.loadCartTotalPrice;
        $http.get('/checkout').then(function(res){
            $scope.booksInCart = 0;
            $scope.loadCartTotalPrice = 0;
            $scope.booksInCartData = null;
        },function(res){
            alert(res.data.msg);
        });
    }

    $scope.continueBrowsingCheckout = function(){
        $scope.signinClicked = false;
        $scope.loadCartClicked = false;
        $scope.checkoutClicked = false;
        $scope.bookSelected = false;
    }

    $scope.handleSignoutClick = function(){
        if ($scope.booksInCart == 0){
            $scope.signout();
        }
        else {
            $scope.showSignoutpage = true;
        }
    }

    $scope.signoutConfirm = function(){
        $scope.signout();
    }

    $scope.cancelSignout = function(){
        $scope.showSignoutpage = false;
    }
});