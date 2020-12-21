# Axios Hero (Vue Edition)

<code>npm install --save vue-axios-hero</code>

**Axios hero is not an alternative to axios but a utility tool to speed of your process of using axios so make sure you already have axios installed**

## Introduction

Axios hero is a axios plugin that that lets you have a more organized solution toward axios usage. With the help of this tool you can save all of your endpoints as a config file and feed it to the plugin and simply call them by name in your entire project.

## Usage

After installation add a config file with your desire name including all the endpoints like below:

```
export default {
  baseConfig: {
    baseURL: "https://jsonplaceholder.typicode.com",
  },
  calls: [
    // Get all todos
    {
      method: "GET",
      pattern: "/todos",
      data: {},
      params: {},
      p: {},
      name: "todos",
      url: "",
    },
    // Get 1 todo by id
    {
      method: "GET",
      pattern: "/todos/{todo_id}",
      data: {},
      params: {},
      p: [{ name: "todo_id" }],
      name: "todo",
      url: "",
    },
    // Create new post
    {
      method: "POST",
      pattern: "/posts",
      data: {},
      params: {},
      p: [],
      name: "post_create",
      url: "",
    },
    // Edit existing post
    {
      method: "PUT",
      pattern: "/posts/{post_id}",
      data: {},
      params: {},
      p: [{ name: "post_id" }],
      name: "post_edit",
      url: "",
    },
  ],
};
```

**Note:** For this example we are using jsonplaceholder sample apis, make sure to give them love and support, they really deserve it.

After that add your config file to axios hero and install it as a plugin to your vue applicatin. (we are now installing it in main.js)

```
import AxiosHero from "vue-axios-hero";

import heroConfig from "./configs/axioshero";

Vue.use(AxiosHero, heroConfig);
```

Now you can initiate call it with `Vue.makeRequest('name-of-endpoint', {configs})`, like the example below inside App.vue file:

```
// Get all todos
console.log(await Vue.makeRequest("todos", {}));
// Get 1 todo by id
console.log(await Vue.makeRequest("todo", { p: { todo_id: 1 } }));
// Create new post
console.log(
  await Vue.makeRequest("post_create", {
    data: { title: "foo", body: "bar", userId: 1 },
  })
);
// Edit existing post
console.log(
  await Vue.makeRequest("post_edit", {
    p: { post_id: 1 },
    data: { title: "foo", body: "bar", userId: 1 },
  })
);
```

## Upcomming

this package is still at its early stages, we will try to improve it and build a universal plugin that can be used anywhere with axios. We welcome any contrbution on the project and if you had any issue please feel free to open a new issue with us on github or ask on stackoverflow.
