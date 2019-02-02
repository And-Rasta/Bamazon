CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES 
    ("12 Ft Inflatable Portable Terrible Ghost Lantern", "Outdoor Decor", 66, 3),
    ("Rocketbook Everlast Mini Smart Reusable Notebook", "Office Products", 16, 30),
    ("Magic Poo Slime Twin Set Bundle", "Toys & Games", 12, 60),
    ("Rocky Horror Show Rubber Duck Bath Toy", "Toys & Games", 13, 5),
    ("TriceraTACO Taco Holder", "Home & Kitchen", 11, 95),
    ("Natural Harvest: A Collection of Semen-Based Recipes", "Books", 22, 354),
    ("Semenology - The Semen Bartender's Handbook", "Books", 22, 206);

SELECT * FROM products;