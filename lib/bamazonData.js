var mysql = require('mysql');

// Configure connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db',
});


// Connect to DB
function openConnection(callback) {
    connection.connect(function (err) {
        if (err) throw err;
        console.log('Connected to DB');
        callback();
    });
}

// Return all departments
function getDepartments(callback) {
    connection.query('SELECT * FROM departments', (err, data, fields) => {
        if (err) throw err;
        callback(data);
    })
}


// Get department ID from department name
function getDepartmentIdFromName(deptName, callback) {
    connection.query('SELECT id FROM departments WHERE ?', {
        department_name: deptName
    }, (err, data) => {
        if (err) throw err;
        callback(parseInt(data[0].id));
    });
}

// Get product ID from product name
function getProductIdFromName(productName, callback) {
    connection.query('SELECT id, stock_quantity FROM products WHERE ?', {
        product_name: productName
    }, (err, data) => {
        if (err) throw err;
        callback(parseInt(data[0].id), parseInt(data[0].stock_quantity));
    });
}

// Display separator
function separator() {
    console.log('-----------------------------------------------------------------------');
}

// Update product quantity
function removeProductFromDatabase(productName, buyQuantity, callback) {
    getProductIdFromName(productName, (id, quantity) => {
        // Check if there are products to remove
        if (quantity <= 0) {
            separator();
            console.log('Sorry, home skittle, there is no more of this in stock.');
            separator();
            callback();
        // Check if quantity is N/A
        } else if(buyQuantity > quantity) {
            separator();
            console.log(`Sorry, dawg, there are only ${ quantity } ${ productName }(s) left in stock.`);
            separator();
            callback();
        } else {
            quantity-=buyQuantity;
            connection.query('UPDATE products SET ? WHERE ?', [{ stock_quantity: quantity }, { id: id }], (err, data) => {
                if (err) throw err;
                separator();
                console.log(`Get excited, yo! You've purchased: ${ buyQuantity } ${ productName }(s)!`);
                separator();
                callback();
            });
        }
    });
}

// Get products from department name
function getProductsByDepartmentName(deptName, callback) {
    getDepartmentIdFromName(deptName, (data) => {
        connection.query('SELECT * FROM products WHERE ?', {
            department_id: data
        }, (err, products) => {
            if (err) throw err;
            callback(products);
        })
    });
}

// Get all products from DB
function getAllProducts(callback) {
    connection.query("SELECT * FROM products", (err, data) => {
        if(err) throw err;
        callback(data);
    })
}

// Add a new product 
function addProductToDatabase(name, price, stock_quantity, deptId, callback) {
    var query = `INSERT INTO products (product_name, price, stock_quantity, department_id) VALUES('${name}', ${price}, ${stock_quantity}, ${ deptId })`;
    connection.query(query, (err, data) => { 
        if(err) throw err;
        callback(data);
    });
}
// Query the DB
function customQuery(query, callback) {
    connection.query(query, (err, data) => {
        if(err) throw err;
        callback(data);
    });
}

// Closes connection to DB
function closeConnection() {
    connection.end();
}


// 
module.exports = {
    getDepartments,
    openConnection,
    addProductToDatabase,
    getDepartmentIdFromName,
    getProductsByDepartmentName,
    removeProductFromDatabase,
    getAllProducts,
    customQuery,
    closeConnection,
};