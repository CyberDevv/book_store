1. General endpoints:

-  [x] `/auth/register`: POST endpoint to register a new user account.
-  [x] `/auth/login`: POST endpoint to login a user.

2. Customer/User endpoints:

-  [x] `/books`: GET endpoint to retrieve a list of all available books.
-  [x] `/books/:id`: GET endpoint to retrieve details of a specific book.
-  [ ] `/cart`: GET endpoint to retrieve the current shopping cart of a user.
-  [x] `/users/cart`: POST endpoint to add a book to a user's shopping cart.
-  [ ] `/cart/checkout`: POST endpoint to complete a purchase and create a new order.
-  [ ] `/orders`: GET endpoint to retrieve a list of a user's orders.
-  [ ] `/reviews`: POST endpoint to submit a new book review.
-  [ ] `/wishlist`: GET endpoint to retrieve a user's wish list.
-  [ ] `/contact`: POST endpoint to send a message to the website administrator.

3. Admin endpoints:

-  [x] `/admin/books`: GET endpoint to retrieve a list of all available books.
-  [x] `/admin/books`: POST endpoint to add a new book to the inventory.
-  [x] `/admin/books/:id`: GET endpoint to retrieve details of a specific book.
-  [x] `/admin/books/:id`: PATCH endpoint to edit an existing book in the inventory.
-  [x] `/admin/books/:id`: DELETE endpoint to remove a book from the inventory.
-  [ ] `/admin/users`: GET endpoint to retrieve a list of all users.
-  [ ] `/admin/users/:id`: GET endpoint to retrieve details of a specific user.
-  [ ] `/admin/users/edit/:id`: PUT endpoint to edit an existing user's account.
-  [ ] `/admin/orders`: GET endpoint to retrieve a list of all orders.
-  [ ] `/admin/orders/:id`: GET endpoint to retrieve details of a specific order.
-  [ ] `/admin/orders/edit/:id`: PUT endpoint to update the status of an existing order.
