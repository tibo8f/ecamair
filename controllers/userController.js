const User = require('../models/userModel');
let user = require('../models/userModel');

const router = require('../routes');

let userList = [];
// Data base connection
var mysql = require("mysql");

var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'ecamair'
});
connection.connect(function(error){if (error) console.log(error);})     // si erreur de type : ER_NOT_SUPPORTED_AUTH_MODE       // mettre ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root'; dans mysql workbench et executer

exports.reservation = function(request, response){
    response.render("home.ejs", {destination:'', nbseat:""});
};


exports.person = function(request, response){
    response.render("person.ejs");
};


exports.validation = function(request, response){
    connection.query("select * from persons;", function(error, result){
        if (error) console(error);
        connection.query("select destination from voyages;", function(error, result2){
            if (error) console(error);
            response.render("validation.ejs", {persons: result, destination : result2});
        });
    });
};


exports.newDestination = function(request, response) {
    let voyage = {"destination":request.body.destination,"nbseat":request.body.nbseat};
    connection.query("INSERT INTO voyages SET ?", voyage , function(error, result){
        if(error) console.log(error);
        response.redirect('/home');
    });
    // response.redirect('/person'); marche pas modele mvc
    response.render("person.ejs");      
};


exports.newPersons = function(request, response) {
    let person = {"name":request.body.name,"age":request.body.age};
    connection.query("INSERT INTO persons SET ?", person , function(error, result){
        if(error) console.log(error);
        response.redirect('/home');
    });
    response.redirect('/validation'); 
};