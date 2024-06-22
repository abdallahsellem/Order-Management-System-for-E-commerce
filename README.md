# Project Name: E-Commerce Backend

This project is an e-commerce backend service built using **NestJS** and **Prisma ORM**, with a **PostgreSQL** database. The project provides functionalities to manage users, carts, and orders, and is containerized using Docker.

## Table of Contents

- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
  - [Cart Management](#cart-management)
  - [Order Management](#order-management)
  - [User Management](#user-management)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/abdallahsellem/Order-Management-System-for-E-commerce.git
    cd Order-Management-System-for-E-commerce
    ```

2. **Environment Variables**

    Create a `.env` file at the root of the project and add the following variables:

    ```bash
    DATABASE_URL=postgresql://postgres:postgres@db:5432/mydatabase
    ```

## Running the Project

1. **Build and Start the Containers**

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker containers for the backend and the PostgreSQL database, and start them.

2. **Access the Application**

    The application will be available at `http://localhost:3000`.

3. **Database Migration and Initialization**

    The Docker setup will automatically handle database migrations and initialization using Prisma.

## API Endpoints

### Cart Management

- **Add Item to Cart**

    - **URL:** `/cart/add`
    - **Method:** `POST`
    - **Body:**

      ```json
      {
        "userId": 1,
        "productId": 2,
        "quantity": 3
      }
      ```

    - **Description:** Adds a product to the user's cart.

- **View Cart**

    - **URL:** `/cart/:userId`
    - **Method:** `GET`
    - **Description:** Retrieves the user's cart details by their ID.

- **Update Cart Item**

    - **URL:** `/cart/update`
    - **Method:** `PUT`
    - **Body:**

      ```json
      {
        "userId": 1,
        "productId": 2,
        "quantity": 5
      }
      ```

    - **Description:** Updates the quantity of a product in the user's cart.

- **Remove Item from Cart**

    - **URL:** `/cart/remove`
    - **Method:** `DELETE`
    - **Body:**

      ```json
      {
        "userId": 1,
        "productId": 2
      }
      ```

    - **Description:** Removes a product from the user's cart.

### Order Management

- **Create Order**

    - **URL:** `/orders`
    - **Method:** `POST`
    - **Body:**

      ```json
      {
        "userId": 1
      }
      ```

    - **Description:** Creates a new order for the user.

- **Get Order by ID**

    - **URL:** `/orders/:orderId`
    - **Method:** `GET`
    - **Description:** Retrieves order details by order ID.

- **Update Order Status**

    - **URL:** `/orders/:orderId/status`
    - **Method:** `PUT`
    - **Body:**

      ```json
      {
        "status": "shipped"
      }
      ```

    - **Description:** Updates the status of the order.

- **Apply Coupon to Order**

    - **URL:** `/orders/apply-coupon`
    - **Method:** `POST`
    - **Body:**

      ```json
      {
        "orderId": 1,
        "discount": 20
      }
      ```

    - **Description:** Applies a discount coupon to the order.

### User Management

- **Testing User Controller**

    - **Test File:** `src/user/users.controller.spec.ts`
    - **Description:** This file contains tests to ensure that the user controller is defined and behaves as expected.

## Database Schema

The database schema is managed using Prisma ORM. Below is the schema definition:

```prisma
// Prisma schema file (prisma/schema.prisma)

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  userId    Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  password  String
  address   String?
  orders    Order[]
  cart      Cart?
}

model Product {
  productId  Int      @id @default(autoincrement())
  name       String
  description String?
  price      Float
  stock      Int
  cartItems  CartItem[]
  orderItems OrderItem[]
}

model Order {
  orderId   Int      @id @default(autoincrement())
  orderDate DateTime @default(now())
  status    String
  userId    Int
  user      User     @relation(fields: [userId], references: [userId])
  totalPrice Float
  discount   Float?
  orderItems OrderItem[]
}

model Cart {
  cartId   Int      @id @default(autoincrement())
  userId   Int @unique
  user     User     @relation(fields: [userId], references: [userId])
  cartItems CartItem[]
}

model CartItem {
  cartItemId Int      @id @default(autoincrement())
  cartId     Int
  productId  Int
  quantity   Int
  cart       Cart     @relation(fields: [cartId], references: [cartId])
  product    Product  @relation(fields: [productId], references: [productId])
}

model OrderItem {
  orderItemId Int      @id @default(autoincrement())
  orderId     Int
  productId   Int
  quantity    Int
  order       Order    @relation(fields: [orderId], references: [orderId])
  product     Product  @relation(fields: [productId], references: [productId])
}
```
### Project Structure

-` src/: Contains the main source code for the application.`
- `cart/: Contains the cart controller and service.`
- `order/: Contains the order controller and service.`
- `user/: Contains the user controller and related logic.`
- `prisma/: Contains the Prisma schema and migration files.`
- `docker-compose.yml: Docker Compose configuration file for the project.`