---
title: How to make a new page on Marble Seeds Admin
date: Wed Jun 01 2016 10:12:39 GMT-0500 (CDT)
slug: new-page
description: Hoy podemos aprender los conceptos importantes de cada industria leyendo la documentación del API de los grandes del mercado.
image: 0JLthSQ.jpg
imagePositionY: 0px
imageSize: cover
---

GET STARTED

# How to make a new page on Marble Seeds Admin

Before you start make sure that you have admin running, you have created a admin and you are logged in, for this check out [ReadMe](https://github.com/latteware/marble-seed/blob/master/README.md)

The structure UI of marble seed is divided in two main parts, from left side a sidebar and right side the section of pages. Each page (component) extends to [pageComponent](/documentation/page-component) or [listPageComponent](/documentation/list-page-component) according to the required functionality

to create a page requires certain methods and configuration


+	Constructor()

	Method that is executed before the component is mounted in the DOM. Is the correct place to initialize the state, it is also often used to link the event handlers to the instance of the class.

+	Statics

	- Natives
	
	- inherited
	
+	Render()

Method that returns the UI of the page


+	Config()

Global method that exports component information, receives as parameters an object, the data it receives are:

| parameters        | description           | required  |
| ------------- |:-------------:| -----:|
| name     | Name of the page| true |
| path      | path of the page      |   true |
| title | title for the header of the page      |   true |
| icon | icon for the page      |    true |
| validate | funcionalidad a validar      |    true |
| exact |       |    true |
| sortedBy |       |    false |
| components | components that will be required for specific functionality    |    false |





#### Example of structure for a page

1.- file create in folder `admin/frontend/pages/users`

Each page will extend to the component [pageComponent](/documentation/page-component) or [listPageComponent](/documentation/list-page-component) according to the component you require

for this example the name is UserList. this structure is:

```javascript
// import libraries

class UserList extends ListPageComponent {
  constructor (props) {}

//Statics

  render () {   
    return (<div>Your page body goes here</div>)
  }
}

UserList.config({
  name: 'user',
  path: '/path-users',
  title: 'Users',
})

export default UserList

```

So now you have your really simple page with:

+ UI of the page
+ parameters that the config () method receives


2.- The next step is to add it to the router

the router file is located in `admin/frontend/router`, you import the component in the router file

```javascript
import Users from '../pages/users/list'
```

add within the tag `<Switch>` the variable where we import the component I have invoked the function `asRouterItem()`

```javascript

<Switch>
  {Users.asRouterItem()}      
</Switch>

```

3.- The next step is to add this page to your sidebar.

the sidebar file is located in `admin/frontend/components/sidebar`, you import the component in the router file

```javascript
import Users from '../pages/users/list'
```

the Sidebar component has the getMenuItem () method where we register the page I have invoked the function `asSidebarItem()`

```javascript

getMenuItems () {
    return [
      Dashboard.asSidebarItem(),
      {
        title: 'Manage Your Team',
        icon: 'users',
        to: '/manage',
        open: false,
        dropdown: [
          Users.asSidebarItem(),
        ]
      }
      ...
    ]
```

Now that you have this go to blabla and see something


#### Expanding our example

now we need to load info from our api so we can do blabla

for something that persist multple pages do blablabla
















