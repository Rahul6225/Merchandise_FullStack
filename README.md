**E-Commerce Merchandise Website**

*Introduction*

Our proposed project is an E-commerce Merchandise Website designed to offer a seamless and efficient shopping experience for computer enthusiasts and tech geeks. The platform provides a diverse range of computer components, including processors, motherboards, graphics cards, and peripherals from the industry's top brands. The website is built with user-friendliness in mind, ensuring a smooth and intuitive navigation experience. We prioritize customer satisfaction, competitive pricing, and hassle-free communication between buyers and sellers to enhance the overall shopping experience.

*Objectives*

The primary goal of our project is to develop a successful online platform that facilitates the sale of computer parts. Our key objectives include:

Providing an efficient and convenient shopping experience for customers.
Offering competitive pricing for high-quality products.
Ensuring a user-friendly interface that allows easy navigation and product selection.
Establishing a robust communication system between buyers and sellers.
Enhancing customer experience through features such as reviews, wishlists, and order tracking.

*Functionalities*

1. Account Management (Customers/Admin)

Users can create, update, and delete their accounts. Customers can track their purchases, while administrators can manage product listings, monitor sales, and oversee platform functionality.

2. Product Catalog

A dedicated module allows users to browse and search through a wide array of computer parts. Features include:

Filtering by product type, brand, and price range.
Searching by name, description, or brand.
Displaying detailed product information.

3. Product Details

Each product page provides comprehensive details, including:
Specifications and features.
High-quality images.
Customer reviews and ratings.
Add-to-cart functionality for seamless purchases.

4. Shopping Cart

Customers can add products to their cart and review their selections before proceeding to checkout. Features include:
Displaying total cost, including taxes and shipping fees.
Updating or removing items before purchase.

5. Checkout

A secure and intuitive checkout module guides users through the purchasing process:

Enter billing and shipping details.
Select a payment method.
Review and confirm orders before final submission.

6. Shipping and Delivery

Customers can choose from multiple shipping options and track their orders in real time.

7. Reviews and Ratings

A module where users can:
Rate and review products they have purchased.
Read feedback from other customers to make informed purchasing decisions.

8. Order Management (Admin Panel)

Administrators can:
Review new orders and update their status.
Manage order fulfillment and shipping to ensure timely deliveries.

9. Inventory Management

A system that allows admins to monitor stock levels and product availability.

10. Wishlist

Customers can save products they are interested in for future reference, allowing easy access to desired items.

***Database Design***


**Attributes**

Accounts: aid, afname, alname, phone, email, cnic, DOB, username, password, gender.
Orders: oid, dateordered, datedelivered, aid, accountno, address, city, country, totalcost.
Products: pid, pname, category, description, price, quantityavailable, img, brand.
Order Details: oid, pid, orderquantity.
Cart: pid, aid, cquantity.
Reviews: pid, oid, rtext, rating.
Wishlist: pid, oid.

***Functional Dependencies***

aid → (aid, afname, alname, phone, email, cnic, DOB, username, password, gender)
pid → (pid, pname, category, description, price, quantityavailable, img, brand)
oid → (oid, dateordered, datedelivered, address, city, country, accountno, totalcost)
oid, pid → (cquantity, orderquantity, rtext, rating)

***Conclusion***

Our E-commerce Merchandise Website aims to provide a streamlined and enjoyable shopping experience for customers seeking high-quality computer parts. With features such as a robust product catalog, user-friendly shopping cart, secure checkout, real-time order tracking, and customer reviews, we ensure customer satisfaction at every step. The efficient admin panel helps manage orders, inventory, and user accounts seamlessly. By prioritizing ease of use, competitive pricing, and a strong buyer-seller relationship, our platform is set to become a leading online destination for computer enthusiasts.
