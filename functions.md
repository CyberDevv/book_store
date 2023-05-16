1. General endpoints:

-  [x] `/auth/register`: POST endpoint to register a new user account.
-  [x] `/auth/login`: POST endpoint to login a user.

2. Customer/User endpoints:

-  [x] `/books`: GET endpoint to retrieve a list of all available books.
-  [x] `/books/:id`: GET endpoint to retrieve details of a specific book.
-  [x] `/users/cart`: GET endpoint to retrieve the current shopping cart of a user.
-  [x] `/users/cart`: POST endpoint to add a book to a user's shopping cart.
- [x] `/users/cart/:id`: DELETE endpoint to delete a specific cart item.
-  [x] `/users/cart/checkout`: POST endpoint to complete a purchase and create a new order.
-  [x] `/users/orders`: GET endpoint to retrieve a list of a user's orders.

3. Admin endpoints:

-  [x] `/admin/books`: GET endpoint to retrieve a list of all available books.
-  [x] `/admin/books`: POST endpoint to add a new book to the inventory.
-  [x] `/admin/books/:id`: GET endpoint to retrieve details of a specific book.
-  [x] `/admin/books/:id`: PATCH endpoint to edit an existing book in the inventory.
-  [x] `/admin/books/:id`: DELETE endpoint to remove a book from the inventory.
-  [ ] `/admin/orders`: GET endpoint to retrieve a list of all orders.
-  [ ] `/admin/orders/:id`: GET endpoint to retrieve details of a specific order.
-  [ ] `/admin/orders/edit/:id`: PUT endpoint to update the status of an existing order.
