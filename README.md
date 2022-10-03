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
**GET** | ​/health | Check if app is online
**GET** | /api-doc | API Swagger


## :fire: Getting Started

These instructions will get this project up and running in your machine.

### :wave: Prerequisites

> [Node.js](http://nodejs.org/) \
> [NPM](https://www.npmjs.com/) \
> [YARN](https://yarnpkg.com/) \
> [Docker](https://www.docker.com/)

### :rocket: Installing

Running project:

- Unzip project:

  ```sh
  $ unzip bruno_teodosio_strider_web_back_end_assessment_3_0.zip
  ```

- Open folder:

  ```sh
  $ cd bruno_teodosio_strider_web_back_end_assessment_3_0
  ```

- Make sure Docker is running:

  ```sh
  $ docker info
  ```

- Run project:
  - Win
  ```sh
  $ ./docker_up.bat
  ```
  - Unix/Mac
  ```sh
  $ make up
  ```

- Install all packages:
<span style="color: #FF0000"> Make sure node version > v16.16.0 </span>

  ```sh
  $ yarn
  ```
  ```sh
  $ npm install
  ```

- Dev Run project:
  - Win
  ```sh
  $ ./dev_mode.bat
  ```
  - Unix/Mac
  ```sh
  $ yarn dev
  ```
  ```sh
  $ npm run dev
  ```

- Run tests:

  ```sh
  $ yarn test
  ```
  ```sh
  $ npm run test
  ```
  > Coverage information will be available at \_\_tests\_\_

### :information_source: Critique

> Test Details
 - I've created 4 demo users that you can use to test the application : <span style='color:green'>dummyUser, otherDummyUser, someDummyUser and oneDummyUser</span>

 - There is, also, some post already created, so it's possible to test some validation cases

 - I've included in zip file a collection that you can use to try the application

 - All environment variables are included in zip file, but ignored in git

> Possible Improvements

- I've saved only the post Object Id in repostedPost field, it is better for database performance, but for recover the information you need to populate the request, so front-end can display the post correctly, and this populate method goes down only one level of the repost field. It means that if some other user repost a post that is a repost, the repost information will not be displayed correctly. So, if I got more time, I'd implement a custom populate method to recover post information.

- Babel needs to be configure to transpile param decorators. If I got more time, I would configure it and change tsc. Babel if faster and more reliable.

> Scaling up

- I think that the worst part dealing with lots of request is recovering information. Especially when using Object Id as reference to other document. I think that the better solution for this is to change the repostedPost field to store a document, instead of Object Id. It will make the database grows fast, but will reduce the time to get the post information.

- I would also use a cloud service to host this application in a container, like EKS, where it can implement a load balancer and auto-scaling routines.
