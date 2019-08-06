var db = require('../middlewares/db');

module.exports = {
    loadToDo:(IDUser)=>{
        return db.load('SELECT * FROM todolist.item where IDuser='+IDUser+'')
    },
    addToDo:(addToDo,IDUser)=>{
        return db.load(' INSERT INTO `todolist`.`item` (`todo`, `IDuser`, `check`) VALUES ("'+addToDo+'", '+IDUser+', 0);')
    },
    deleteToDo:(iditem)=>{
        return db.load('DELETE FROM `todolist`.`item` WHERE (`iditem` = '+iditem+')')
    },
    checkToDo:(iditem)=>{
        return db.load(' UPDATE `todolist`.`item` SET `check` = 1 WHERE (`iditem` = '+iditem+')')
    },
    editToDo:(iditem,EditToDo)=>{
        return db.load(' UPDATE `todolist`.`item` SET `todo` = "'+EditToDo+'" WHERE (`iditem` = '+iditem+')')
    },
    findToDo:(iditem)=>{
        return db.load('SELECT * FROM todolist.item where iditem='+iditem+'')
    },
    search:(IDUser,search)=>{
        return db.load('SELECT * FROM todolist.item where IDuser= '+IDUser+' and todo like "'+search+'"')
    },
}