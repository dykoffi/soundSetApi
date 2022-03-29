## cqx documentation for begining

### Prerequises
- [Nodejs](https://nodejs.org/) >= 14.x
- [cqx](https://www.npmjs.com/package/cqx)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker-compose](https://docs.docker.com/compose/)

### Databases supported
- [PostreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Microsoft SQL Server](https://www.prisma.io/docs/concepts/database-connectors/sql-server)
- [Mysql](https://www.prisma.io/docs/concepts/database-connectors/mysql)
- [Sqlite](https://www.prisma.io/docs/concepts/database-connectors/sqlite)
- [MongoDB](https://www.mongodb.com/)


### Documentation
- [Prisma](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) For making good schema.
- [Swagger](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject) For making good api's documentation.
- [Supertest](https://www.npmjs.com/package/supertest) For making Api test.
- [EXpressJs](https://expressjs.com/fr/4x/api.html)


### For Begining
1. Your dev database connection is define in **.env** file
2. Define your model in **prisma/schema.prisma**
3. Use **yarn db:start** to run your Dev BD instance
4. Use **yarn db:update** to update API and database structure following your model in schema.prisma file
5. Use **yarn start** to run project