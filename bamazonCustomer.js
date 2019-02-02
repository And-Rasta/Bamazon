// Require Inquirer & Product data
const inquirer = require('inquirer');
const bamazonData = require('./lib/bamazonData');
const clear = require('clear');

// Connect to DB & display welcome message
clear();
bamazonData.openConnection(welcomeMessage);


// Verify if customer wants to complete a purchase
function verifyPurchase(productName, productPrice, productQuantity) {
    var question = [
        {
            type: 'input',
            name: 'yesOrNo',
            message: 
            `Are you sure you'd like to purchase ${ productQuantity } ${ productName }(s) for $${ productPrice * productQuantity }? ('y/n')`,
            validate: function(val) {
                var lower = val.toLowerCase();
                if(lower === 'y' || lower === 'n') return true;
                return 'You must enter y or n';
            }
        },
    ];
    inquirer.prompt(question).then(answer => {
        if(answer.yesOrNo === 'y') {
            bamazonData.removeProductFromDatabase(productName, productQuantity, displayDepartments);
        } else {
            displayDepartments();
        }
    });
    
}

// Display products available for purchase
function selectProduct(products) {
    clear();
    var choices = [];
    for(var i = 0; i < products.length; i++) choices.push(products[i].product_name + " | $" + products[i].price);
    var questions = [
        {
            name: "product",
            message: "What would you like to buy?",
            type: 'list',
            choices: choices,
        },
        {
            name: "quantity",
            message: "How many would you like?",
            type: 'input',
            validate: (value) => {
                var valid = !Number.isNaN(parseFloat(value));
                return valid || "Please enter a number.";
            }
        }
    ];
    inquirer.prompt(questions).then(answer => {
        // Grab product name displayed before the |
        var productName = answer.product.substring(0, answer.product.indexOf('|')).trim();
        // Price is after | 
        var productPrice = answer.product.substring(answer.product.indexOf('$') + 1);
        
        verifyPurchase(productName, productPrice, answer.quantity);
    });
}

// Display departments for the user to select from
function selectDepartment(data) {
    var choices = [];
    for(var i = 0; i < data.length; i++) choices.push(data[i].department_name);
    choices.push('Quit');
    var question = [
        {
            name: 'department_select',
            type: 'list',
            message: "Please select the department you'd like to shop in.",
            choices: choices,
        }
    ];
    inquirer.prompt(question).then(answer => {
        if(answer.department_select == 'Quit') {
            console.log('Goodbye!');
            bamazonData.closeConnection();
            process.exit();
        }
        var products = bamazonData.getProductsByDepartmentName(answer.department_select, (products) => {
            selectProduct(products);
        });
    })
}

// Display welcome message & departments to select from
function welcomeMessage() {
    console.log(
        `Welcome to Bamazon!  Fulfilling your weird command line shopping needs since 2019.\n`
    );
    displayDepartments();
}


// Display departments
function displayDepartments() {
    bamazonData.getDepartments(data => {
        selectDepartment(data);        
    });
}