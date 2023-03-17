# Northcoders News API

## Link to hosted version

https://news-api-project.onrender.com/api

## Summary

This api is intended to provide a way to interact with a store of components that one would expect on a news site such as articles and comments.
### Key Features 
  - Retrieving comments by article and articles by id
  - Comments are linked to articles and can be posted to any existing article
  - Articles and comments are linked to existing users
  - Managing user content such as being able to delete comments
  - Voting system on comments

## Setup

### Cloning the repo

If you wish run to this project locally, fork this repo and then clone to your local machine using:
```
  $ git clone <url-of-your-for-repo>
```

### Installing dependencies

Make sure to install the project dependencies local by:
```
  $ npm install
```
If you are using npm or:
```
  $ yarn install
```
If you are using yarn.

### Setting up local databases

To set up the local databases you can use the _setup-dbs_ script provided. By default this will created databases with the names __nc\_news_ and _nc_\_news\_test_. To change this, change the names of the databases provided in _./db/setup.sql_. 

### Seeding the databases

Before you can seed the development and test databases, you will need to set two .env files in the main directory. One called .env.test with the following content:
```
  PGDATABASE=<name-of-your-test-database>
```
.env.development should contain the following:
```
  PGDATABASE=<name-of-your-development-database>
```
By default, the test database is _nc\_news\_test_ while the development database is _nc\_news_.

### Testing

You can any current tests or tests that you have implemented using the predefined _test_ script.

### Minimum Requirements

 - Node version >= 16.0.0
 - PostgreSQL version >= 14.6 
