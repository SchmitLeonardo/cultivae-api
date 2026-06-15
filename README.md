# Cultivaê Marketplace API

## Overview
Cultivaê is a marketplace that connects consumers with small rural producers, allowing them to buy fresh and organic products directly from the source. This API serves as the backend for the Cultivaê platform, providing endpoints for user authentication, product management, producer information, and order processing.

## Technology Stack
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MySQL**: Relational database for storing user, product, producer, and order data.
- **JWT**: JSON Web Tokens for secure user authentication.

## Folder Structure
```
cultivae-api
├── src
│   ├── app.js
│   ├── config
│   │   └── database.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── producerController.js
│   │   └── orderController.js
│   ├── models
│   │   ├── user.js
│   │   ├── product.js
│   │   ├── producer.js
│   │   └── order.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── producers.js
│   │   └── orders.js
│   ├── middlewares
│   │   └── authMiddleware.js
│   └── utils
│       └── helpers.js
├── sql
│   └── init.sql
├── package.json
└── README.md
```

## Setup Instructions
1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd cultivae-api
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up the MySQL database**:
   - Create a MySQL database and user.
   - Run the SQL script located in `sql/init.sql` to create the necessary tables and seed initial data.

4. **Run the application**:
   ```
   npm start
   ```

## API Endpoints
- **Authentication**
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.

- **Products**
  - `GET /api/products`: Retrieve a list of products.
  - `POST /api/products`: Create a new product.
  - `PUT /api/products/:id`: Update an existing product.
  - `DELETE /api/products/:id`: Delete a product.

- **Producers**
  - `GET /api/producers`: Retrieve a list of producers.
  - `GET /api/producers/:id/products`: Retrieve products from a specific producer.

- **Orders**
  - `POST /api/orders`: Create a new order.
  - `GET /api/orders/:id`: Retrieve order details.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.