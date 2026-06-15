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

3. **Configure environment variables**:
   ```
   cp .env.example .env
   ```

   Change at least `JWT_SECRET` before using the API outside your machine.

4. **Set up the MySQL database**:
   - With Docker, use the command in the next section.
   - Without Docker, create a MySQL database and user, then run `sql/init.sql`.

5. **Run the application**:
   ```
   npm start
   ```

## Running with Docker
This is the easiest way to have the API and database running together locally:

```
docker compose up --build
```

The API will be available at:

```
http://localhost:3000
```

Health check:

```
GET /health
```

Docker Compose creates:
- `api`: Node.js/Express API.
- `db`: MySQL 8 database with persistent volume.
- `mysql_data`: local database volume.

The first database initialization runs `sql/init.sql` automatically. If you change the schema and want to recreate the local database from zero, remove the Compose volume before starting again.

## Environment Variables
| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Public API port | `3000` |
| `CORS_ORIGIN` | Allowed frontend origin | `*` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL user | `cultivae` |
| `DB_PASSWORD` | MySQL password | `cultivae_password` |
| `DB_NAME` | MySQL database name | `cultivae_db` |
| `JWT_SECRET` | Secret used to sign JWT tokens | required in production |

## Deploy
The project now includes a production `Dockerfile`, so you can deploy it on any host that supports Docker containers.

Recommended simple path:

1. Push this repository to GitHub.
2. Create a MySQL database on your deploy provider.
3. Deploy the API from the repository using the `Dockerfile`.
4. Configure these production variables in the API service:
   ```
   DB_HOST=<mysql-host>
   DB_PORT=3306
   DB_USER=<mysql-user>
   DB_PASSWORD=<mysql-password>
   DB_NAME=<mysql-database>
   JWT_SECRET=<long-random-secret>
   CORS_ORIGIN=<frontend-url-or-*>
   ```
5. Run `sql/init.sql` once in the production database.
6. Open the public URL and test `GET /health`.

Railway is a good fit for this project because it supports Dockerfile-based services and managed MySQL in the same project. Render can run the Dockerized API, but you will usually connect it to a separate MySQL provider.

## API Endpoints
- **Authentication**
  - `POST /api/auth/register`: Register a new user. Requires `username`, `email` and `password`.
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
