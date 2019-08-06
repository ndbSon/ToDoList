var express = require('express');
var db_ToDo = require("../model/model.ToDo");
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get("/todolist", function (req, res) {
    if (req.isAuthenticated()) {
        db_ToDo.loadToDo(req.user.idUser).then(rows => {
            res.render("../view/todolist", {
                ToDo: rows,
            })
        })
    } else {
        res.redirect("../");
    }
});

router.post("/search", urlencodedParser, function (req, res) {
    var ID = req.user.idUser;
    var search = req.body.search;
    db_ToDo.search(ID, search).then(rows => {
        res.render("../view/todolist", {
            ToDo: rows,
        })
    })
});

router.get("/checkToDo/:id", function (req, res) {
    var id = req.params.id;
    db_ToDo.checkToDo(id).then(rows => {
        res.redirect("../todolist")
    })
});

router.get("/editToDo/:id", function (req, res) {
    var id = req.params.id;
    db_ToDo.findToDo(id).then(rows => {
        res.render("../view/edit", {
            ToDo: rows[0],
        })
    })
});

router.post('/edit', urlencodedParser, (req, res) => {
    var iditem = req.body.ID;
    var EditToDo = req.body.EditToDo;
    db_ToDo.editToDo(iditem, EditToDo).then(rows => {
        res.redirect("../todolist")
    })

});


router.post('/add', urlencodedParser, (req, res) => {
    var addToDo = req.body.addToDo;
    var idUser = req.user.idUser;
    console.log(idUser);
    db_ToDo.addToDo(addToDo, idUser).then(rows => {
        res.redirect("../todolist")
    })

});

router.get("/deleteToDo/:id", function (req, res) {
    var id = req.params.id;
    db_ToDo.deleteToDo(id).then(rows => {
        res.redirect("../todolist")
    })
});







module.exports = router;