// Require Inquirer & MySQL & Console table & Clear
require("console.table");
var mysql = require("mysql");
var inquirer = require("inquirer");
const clear = require('clear');

// Configure connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "turkey@13",
    database: "bamazon_db"
});

// Connect to DB
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB as ID " + connection.threadId + "\n");
    welcomeMessage();
    
});

// Display welcome message & products to select from
function welcomeMessage() {
    console.log(
        `Welcome to Bamazon!  Fulfilling your weird Command Line Interface shopping needs since 2019.\n`
    );
    readProducts();
}

// Return all products
function readProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        console.table(res);
        selectProduct();

    });
};

function selectProduct() {
    inquirer.prompt([
       {
           type: "input",
           name: "userInput",
           message: "What is the ID of the product you wish to purchase?"
       } ,
       {
           type: "input",
           name: "userQuantity",
           message: "How many would you like to purchase?"
       }
    ]).then(function(res) {
        // console.log(res);
        buyProduct(res.userInput, res.userQuantity);
    })
}

function continueShopping() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Continue shopping?"
        }
    ]).then(function(res) {
        if (res.continue === true) {
            readProducts();
        } else if (res.continue === false) {
            console.log('Goodbye!');
            connection.end()
        }
    });
}

function buyProduct(product, amount) {
    // console.log(product);
    connection.query("SELECT * FROM products WHERE ?", 
        {item_id: product}, 
        function(err, res){
            // console.log(res[0]);
            if (amount > res[0].stock) {
               console.log("\n\nInsufficient quantity!\n\n");
               continueShopping()
           } else {
                var totalCost = amount * res[0].price;
                var inventory = res[0].stock - amount;
                var id = res[0].item_id;
                updateProduct(id, inventory);
                console.log("\n\nYour total will be: $" + totalCost + "\n\n");
                
           }
            
        })
};

function updateProduct(id, inv) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock: inv
            },
            {
                item_id: id
            }
        ],
        function(err, res) {
            // console.log(res.affectedRows + " products updated!\n");
            continueShopping();
        }
    );
    // console.log(query.sql);
};

