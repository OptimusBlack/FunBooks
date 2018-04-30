var express = require('express');
var router = express.Router();

//1. HTTP GET requests for http://localhost:3000/loadpage?category=xx&page=yy.
router.get('/loadpage', function (req, res) {
    var db = req.db;
    var collectionBooks = db.get('bookCollection');
    var collectionUsers = db.get('userCollection');

    if (req.query.category=="nil" && req.session.userID == null){
        collectionBooks.find({}, {}, function(err, docs){
            if (err == null) {
                var booksData = docs;
                var categories = [];
                for (i in booksData) {
                    if (categories.indexOf(booksData[i].category) == -1) {
                        categories.push(booksData[i].category);
                    }
                }
                categories.sort();
                booksData.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                });

                var newBooksData = [];
                var numpages = 0;
                for (i=0; i<booksData.length; i++) {
                    if (booksData[i].category == categories[0]) {
                        newBooksData.push(booksData[i]);
                        numpages++;
                    }
                }

                var newBooksDataSameCategory = [];
                var counter = 0;
                for (i=(req.query.page-1)*4; i<newBooksData.length; i++){
                    if (counter >= 4){
                        break;
                    }
                    newBooksDataSameCategory.push(newBooksData[i]);
                    counter++;
                }

                numpages = Math.ceil(numpages/4);

                var responseJSON = {
                    'username': "",
                    'booksInCart': -1,
                    'booksData': newBooksDataSameCategory,
                    'categories': categories,
                    'numpages': numpages
                }

                res.json(responseJSON);
            }
            else{
                res.json({msg : err});
                console.log(err);
            }
        });
    }

    else if (req.query.category=="nil" && req.session.userID){
        collectionBooks.find({},{}, function(err, docs){
            if (err == null){
                var booksData = docs;
                var categories = [];
                for (i in booksData) {
                    if (categories.indexOf(booksData[i].category) == -1) {
                        categories.push(booksData[i].category);
                    }
                }
                categories.sort();
                booksData.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                });

                var newBooksData = [];
                var numpages = 0;
                for (i=0; i<booksData.length; i++) {
                    if (booksData[i].category == categories[0]) {
                        newBooksData.push(booksData[i]);
                        numpages++;
                    }
                }

                var newBooksDataSameCategory = [];
                var counter = 0;
                for (i=(req.query.page-1)*4; i<newBooksData.length; i++){
                    if (counter >= 4){
                        break;
                    }
                    newBooksDataSameCategory.push(newBooksData[i]);
                    counter++;
                }

                numpages = Math.ceil(numpages/4);

                collectionUsers.findOne(req.session.userID, function(err1, docs1){
                    if (err1 == null) {
                        var responseJSON = {
                            'username': docs1.name,
                            'booksInCart': docs1.totalnum,
                            'booksData': newBooksDataSameCategory,
                            'categories': categories,
                            'numpages': numpages
                        }

                        res.json(responseJSON);
                    }
                    else{
                        res.json({msg : err1});
                        console.log(err1);
                    }
                });
            }
            else{
                res.json({msg : err});
                console.log(err);
            }
        });
    }

    else if (req.query.category!="nil" && req.session.userID == null){
        collectionBooks.find({},{}, function(err, docs){
            if (err == null){
                var booksData = docs;
                var categories = [];
                for (i in booksData) {
                    if (categories.indexOf(booksData[i].category) == -1) {
                        categories.push(booksData[i].category);
                    }
                }
                categories.sort();
                booksData.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                });

                var newBooksData = [];
                var numpages = 0;
                for (i=0; i<booksData.length; i++) {
                    if (booksData[i].category == req.query.category) {
                        newBooksData.push(booksData[i]);
                        numpages++;
                    }
                }

                var newBooksDataSameCategory = [];
                var counter = 0;
                for (i=(req.query.page-1)*4; i<newBooksData.length; i++){
                    if (counter >= 4){
                        break;
                    }
                    newBooksDataSameCategory.push(newBooksData[i]);
                    counter++;
                }

                numpages = Math.ceil(numpages/4);

                var responseJSON = {
                    'username': "",
                    'booksInCart': -1,
                    'booksData': newBooksDataSameCategory,
                    'categories': categories,
                    'numpages': numpages
                }

                res.json(responseJSON);
            }
            else{
                res.json({msg : err});
                console.log(err);
            }
        });
    }

    else{
        collectionBooks.find({},{}, function(err, docs){
            if (err == null){
                var booksData = docs;
                var categories = [];
                for (i in booksData) {
                    if (categories.indexOf(booksData[i].category) == -1) {
                        categories.push(booksData[i].category);
                    }
                }
                categories.sort();
                booksData.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                });

                var newBooksData = [];
                var numpages = 0;
                for (i=0; i<booksData.length; i++) {
                    if (booksData[i].category == req.query.category) {
                        newBooksData.push(booksData[i]);
                        numpages++;
                    }
                }

                var newBooksDataSameCategory = [];
                var counter = 0;
                for (i=(req.query.page-1)*4; i<newBooksData.length; i++){
                    if (counter >= 4){
                        break;
                    }
                    newBooksDataSameCategory.push(newBooksData[i]);
                    counter++;
                }

                numpages = Math.ceil(numpages/4);

                collectionUsers.findOne(req.session.userID, function(err1, docs1){
                    if (err1 == null) {
                        var responseJSON = {
                            'username': docs1.name,
                            'booksInCart': docs1.totalnum,
                            'booksData': newBooksDataSameCategory,
                            'categories': categories,
                            'numpages': numpages
                        }

                        res.json(responseJSON);
                    }
                    else{
                        res.json({msg : err1});
                        console.log(err1);
                    }
                });
            }
            else{
                res.json({msg : err});
                console.log(err);
            }
        });
    }
});

router.get('/loadbook/:bookid', function (req, res) {
    var db = req.db;
    var collectionBooks = db.get('bookCollection');
    collectionBooks.findOne(req.params.bookid, function (err, docs) {
        if (err == null) {
            res.json(docs);
        }
        else {
            res.json({ msg: err });
            console.log(err);
        }
    });
});

router.post('/signin', function (req, res) {
    var db = req.db;
    var collectionUsers = db.get('userCollection');
    collectionUsers.findOne({ name: req.body.username, password: req.body.password }, function (err, docs) {
        if (err == null) {
            if (docs) {
                req.session.userID = docs._id;
                collectionUsers.update({ name: req.body.username, password: req.body.password }, { $set: { status: 'online' } });
                res.send({ msg: docs.totalnum });
                console.log(req.session);
                console.log("Books in cart: " + docs.totalnum);
            }
            else {
                res.send({ msg: "Login failure" });
                console.log("Login failure");
            }
        }
        else {
            console.log(err);
        }
    });
});

router.get('/signout', function (req, res) {
    var db = req.db;
    var collectionUsers = db.get('userCollection');
    console.log("session variable: " + req.session.userID);
    collectionUsers.update(req.session.userID, { $set: { status: 'offline' } }, function (err, result) {
        if (err == null) {
            if (result.nModified > 0) {
                req.session.userID = null;
                res.send("");
                console.log("Signed out successfully");
            }
            else {
                res.send("Could not sign out");
                console.log("sign out unsuccessful");
            }
        }
        else {
            res.send(err);
            console.log(err);
        }
    });
});

router.put('/addtocart', function (req, res) {
    var db = req.db;
    var collectionBooks = db.get('bookCollection');
    var collectionUsers = db.get('userCollection');
    console.log(req.body);
    console.log("UserID in session: " + req.session.userID);
    var userData;
    collectionUsers.findOne({ _id: req.session.userID }, function (err, docs) {
        if (err == null) {
            if (docs) {
                userData = docs;
                //console.log(userData);

                var isBookInCart = false;
                for (i in userData.cart) {
                    if (userData.cart[i].bookId == req.body.bookid) {
                        userData.cart[i].quantity += req.body.quantity;
                        isBookInCart = true;
                        console.log("Book already in cart: " + JSON.stringify(userData));
                    }
                }

                if (!isBookInCart) {
                    userData['cart'].push({ 'bookId': req.body.bookid, 'quantity': req.body.quantity });
                    console.log("New book added to cart: " + JSON.stringify(userData));
                }

                userData.totalnum += req.body.quantity;
                console.log("Total num updated: " + JSON.stringify(userData));

                var totalPrice = 0;
                collectionBooks.find({},{}, function(err1, docs1){
                    if (err1 == null){
                        for (i in docs1){
                            for (j in userData.cart){
                                if (docs1[i]._id == userData.cart[j].bookId){
                                    totalPrice += (docs1[i].price * userData.cart[j].quantity); 
                                }
                            }
                        }
                        console.log("Total price: "+totalPrice);

                        collectionUsers.update(req.session.userID, {$set: {cart: userData.cart, totalnum: userData.totalnum}}, function(err, result){
                            if (err == null){
                                var response = {
                                    'totalPrice': totalPrice,
                                    'totalNum': userData.totalnum
                                }
                                console.log("Update successful "+ JSON.stringify(response));
                                res.json(response);
                            }
                            else{
                                console.log(err);
                                res.send({msg : err});
                            }
                        });
                    }
                    else{
                        console.log(err1);
                    }
                });
            }
            else {
                console.log("user not found");
                res.json({ msg: "user not found in session" });
                return;
            }
        }
        else {
            console.log(err);
        }
    });
});

router.get('/loadcart', function(req, res){
    var db = req.db;
    var collectionBooks = db.get('bookCollection');
    var collectionUsers = db.get('userCollection');

    if (req.session.userID){
        collectionUsers.findOne(req.session.userID, {fields: {cart:1, totalnum: 1}}, function(err, docs){
            if (err == null){
                var cartBookIDs = [];
                for (i in docs.cart){
                    cartBookIDs.push(docs.cart[i].bookId);
                }
                
                collectionBooks.find({_id: {$in: cartBookIDs}}, {fields: {title:1, authorList: 1, price: 1, coverImage: 1}}, function(err1, docs1){
                    if (err == null){
                        var responseArr = [];
                        for (i in docs.cart){
                            for (j in docs1){
                                if (docs1[j]._id == docs.cart[i].bookId){
                                    var responseJSON = {
                                        bookId: docs.cart[i].bookId,
                                        quantity: docs.cart[i].quantity,
                                        totalNum: docs.totalnum,
                                        title: docs1[j].title,
                                        authorList: docs1[j].authorList,
                                        price: docs1[j].price,
                                        coverImage: docs1[j].coverImage
                                    }
                                    responseArr.push(responseJSON);
                                }
                            }
                        }
                        console.log(responseArr);
                        res.json(responseArr);
                    }
                    else{
                        res.send(err);
                    }
                });
            }
            else{
                res.send(err);
            }
        });
    }
    else{
        res.send("Session variable not set");
        console.log("Session variable not set");
    }
});

router.put('/updatecart', function(req, res){
    var db = req.db;
    var collectionUsers = db.get('userCollection');
    if (req.session.userID){
        collectionUsers.findOne(req.session.userID, function(err, docs){
            var userData;
            if (err == null){
                userData = docs;
                userData.totalnum = 0;
                for (i in userData.cart){
                    if (userData.cart[i].bookId == req.body.bookid){
                        userData.cart[i].quantity = req.body.quantity;
                    }
                    userData.totalnum += userData.cart[i].quantity;
                }
                console.log(userData);

                collectionUsers.update(req.session.userID, {$set:{cart: userData.cart, totalnum: userData.totalnum}}, function(err1, result){
                    if (err1 == null){
                        res.send({msg: userData.totalnum});
                    }
                    else{
                        res.send({msg: err1});
                        console.log(err1);
                    }
                });
            }
            else{
                res.send({msg: err});
                console.log(err);
            }
        });
    }
    else{
        res.send({msg: "Session variable not set"});
        console.log("Session variable not set");
    }
});

router.delete('/deletefromcart/:bookid', function(req,res){
    var db = req.db;
    var collectionUsers = db.get('userCollection');
    if (req.session.userID){
        collectionUsers.findOne(req.session.userID, function(err, docs){
            var userData;
            if (err == null){
                userData = docs;
                for (i in userData.cart){
                    if (userData.cart[i].bookId == req.params.bookid){
                        userData.totalnum -= userData.cart[i].quantity;
                        userData.cart.splice(i, 1);
                        console.log(userData);
                        break;
                    }
                }

                collectionUsers.update(req.session.userID, {$set: {cart: userData.cart, totalnum: userData.totalnum}}, function(err1, result){
                    if (err1 == null){
                        res.send({msg: userData.totalnum});
                    }
                    else{
                        res.send({msg: err1});
                    }
                });
            }
            else{
                res.send({msg: err});
                console.log(err);
            }
        });
    }
    else{
        res.send({msg: "Session variable not set"});
        console.log("Session variable not set");
    }
});

router.get('/checkout', function(req, res){
    var db = req.db;
    var collectionUsers = db.get('userCollection');
    if (req.session.userID){
        collectionUsers.update(req.session.userID, {$set: {cart: [], totalnum: 0}}, function(err, result){
            if (err == null){
                res.send({msg: ''});
            }
            else{
                res.send({msg: err});
            }
        });
    }
    else{
        res.send({msg: "Session variable not set"});
        console.log("Session variable not set");
    }
});

module.exports = router;
