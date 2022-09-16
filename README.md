<h1 align="center">
  <img alt="Posterr" title="Posterr" src=".github/strider.png" width="200px" />
  <p><strong>Posterr</strong></p>
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
**POST** | /posts | Create new post or repost or quote-post.
**GET** | /posts| Get posts by filter.

**CURL POST** | ​/posts |
```curl
curl --location --request POST 'localhost:3004/posts' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName":"otherDummyUser",
    "postContent":"",
    "postId": ""
}'
```
**CURL GET** | /posts |
```curl
curl --location --request GET 'localhost:3004/posts/?userName=dummyUser&page=1&startDate=2022-09-15&endDate=2022-09-16'
```

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

- Dev Run project:

  ```sh
  $ yarn dev
  ```
  ```sh
  $ npm run dev
  ```

- Run project:

  ```sh
  $ make up
  ```

### :information_source: Critique

> Possible Improvements

- Reflect on this project, and write what you would improve if you had more time.

> Scaling up

- If this project were to grow and have many users and posts, which parts do you think would fail first?
- In a real-life situation, what steps would you take to scale this product? What other types of technology and infrastructure might you need to use?
