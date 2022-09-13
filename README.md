<h1 align="center">
  <img alt="tonStone" title="tonStone" src=".github/strider.png" width="200px" />
</h1>

<h3 align="center">
  Back-end Developer Challenge
</h3>

<p align="center">
  <img alt = "Github Last Confirmation" src = "https://img.shields.io/github/last-commit/Bteodosio/Posterr">
  <img alt = "GitHub Main Language" src = "https://img.shields.io/github/languages/top/Bteodosio/Posterr">
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/Bteodosio/Posterr?color=%2304D361">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Bteodosio/Posterr/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/Bteodosio/Posterr?style=social">
  </a>
</p>

## :page_with_curl: Summary

This project is a new social media

Method | Endpoint | Description
------------- | ------------- | -------------
**POST** | /visitCounterIncrement?key | Increase the number of visits for a unique key (SiteID).
**GET** | /visits?key | Get the number of visits for a key (SiteID).
**POST** | ​/users | Add new user to database.
**GET** | /users?email | Get user information by email.

## :fire: Getting Started

These instructions will get this project up and running in your machine.

### :wave: Prerequisites

> [Node.js](http://nodejs.org/) \
> [NPM](https://www.npmjs.com/) \
> [YARN](https://yarnpkg.com/)

### :rocket: Installing

Running project:

- Clone the project:

  ```sh
  $ git clone https://github.com/bteodosio/Posterr.git
  ```

- Open Posterr folder:

  ```sh
  $ cd Posterr
  ```

- Install all packages:

  ```sh
  $ yarn
  ```
  ```sh
  $ npm install
  ```

- Create .env file:

  ```sh
  $ cat .env.exemple >> .env
  ```

- Make sure Docker is running:

  ```sh
  $ docker info
  ```

- Run project:

  ```sh
  $ make up
  ```

### :information_source: Recommendations

> [VS Code](https://code.visualstudio.com/)
