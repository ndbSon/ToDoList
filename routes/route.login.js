var express = require('express');
var db_User = require("../model/model.user");
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();


router.get("/", function (req, res) {
    var mess="";
            res.render("../view/login", {
                mess:mess
        })
});

router.post('/addUser', urlencodedParser, (req, res) => {
    var SignName =req.body.SignName;
    var SignPassword = req.body.SignPassword;
    var SignConfirm =req.body.SignConfirm;
    if(SignPassword==SignConfirm)
    {
        db_User.findUser(SignName).then(rows=>{
            if(rows.length<0)
            {
                db_User.addUser(SignName,SignPassword).then(rows => {
                    res.render("../view/login", {
                    })
                })
            }else{
                var mess="Tên đăng nhập đã có";
                res.render("../view/login", {
                    layout: false,
                    mess:mess
                })
            }
        })
    }
    else{
        var mess="mật Khẩu không trùng";
        res.render("../view/login", {
            layout: false,
            mess:mess
        })
    }
   
})

module.exports = router;