var db = require('../middlewares/db');

module.exports = {
    findUser:(Name)=>{
        return db.load('SELECT * FROM todolist.user where Name="'+Name+'"')
    },
    addUser: (Name, MK) => {
        return db.load('INSERT INTO `todolist`.`user` (`Name`, `Password`) VALUES ("'+Name+'", "'+MK+'")')
    },
}