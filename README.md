# Bamazon
HW Assignment # 10: Node.js &amp; MySQL

## Welcome to Bamazon! :moneybag:
### _Fulfilling your weird Command Line Interface shopping needs since 2019._

The application initiates with node for the Customer by greeting them, listing available products, and prompting for the item they wish to purchase:

![start](/images/start.jpg)

The application then asks how many of the items the customer would like:

![quantity](/images/quantity.jpg)

If there is sufficient quantiy for purchase, the application calculates the customer's total based on the purchase price times the quantity of items requested, and updates the quantity in the database:

![purchase](/images/purchase.jpg)

If the customer requests more of a product than is available, the application displays an "Insufficient quantity" message:

![insufficient](/images/insufficient.jpg)

After each transaction, the customer is prompted to continue shopping or not. If the customer chooses to not continue, the application bids them goodbye, and closes the connection.

![goodbye](/images/goodbye.jpg)
:sun_with_face:
 