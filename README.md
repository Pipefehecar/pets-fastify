# 🐾 Fastify + DynamoDB Single Table Design

Welcome to the **Fastify + DynamoDB** project! 🚀 This application demonstrates how to implement a **Single Table Design** using DynamoDB while leveraging Fastify's performance and flexibility. Built with ❤️ for modern, scalable applications.

---

## 📖 Table of Contents
- [✨ Features](#-features)
- [🛠️ Technology Stack](#%EF%B8%8F-technology-stack)
- [🚀 How to Run](#-how-to-run)
- [📦 API Endpoints](#-api-endpoints)
- [📚 Learn More](#-learn-more)

---

## ✨ Features
- 🗂️ **Single Table Design**: Efficiently manage related entities in DynamoDB.
- ⚡ **Fastify Framework**: Lightweight, fast, and extensible.
- 🔍 **RESTful Endpoints**: CRUD operations for foundations and pets.
- 🔄 **ULID Integration**: Ensure globally unique and sortable identifiers.
- 🎨 **Developer-Friendly**: Easy-to-read code and clear structure.

---

## 🛠️ Technology Stack
- **Fastify**: High-performance web framework for Node.js.
- **AWS DynamoDB**: NoSQL database with single table design.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **Docker + LocalStack**: Mock AWS services locally for testing.

---

## 🚀 How to Run

### Prerequisites
- Node.js 16+
- Docker

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/fastify-dynamodb.git
   cd fastify-dynamodb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start LocalStack:
   ```bash
   docker-compose up -d
   ```

4. Run the application:
   ```bash
   npx ts-node src/index.ts
   ```

5. Test the API using REST Client or Postman.

---

## 📦 API Endpoints

### Foundations
- **POST** `/foundation`
  Create a new foundation.
- **GET** `/foundation/:id/pets`
  Get all pets from a specific foundation with optional filters.

### Pets
- **POST** `/pet`
  Add a new pet to a foundation.
- **GET** `/pet/:id`
  Get details of a specific pet.
- **PUT** `/pet/:foundationId/:id`
  Update a pet's information.
- **DELETE** `/pet/:foundationId/:id`
  Delete a pet from the system.

---

## 📚 Learn More
- [Fastify Documentation](https://www.fastify.io/docs/latest/)
- [AWS DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/index.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ULID Specification](https://github.com/ulid/spec)

---

Enjoy coding! 🎉 Let us know if you have any questions or feedback. 😊
