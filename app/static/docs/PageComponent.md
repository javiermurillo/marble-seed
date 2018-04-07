---
title: PageComponent
date: Wed Jun 01 2016 10:12:39 GMT-0500 (CDT)
slug: page-component
description: Hoy podemos aprender los conceptos importantes de cada industria leyendo la documentación del API de los grandes del mercado.
image: 0JLthSQ.jpg
imagePositionY: 0px
imageSize: cover
---

# PageComponent


##### What

root component to [create a page](/documentation/new-page), its functionality is basic and necessary when invoking the page from the sidebar


##### What for


PageComponent executes foreground functionality


##### How


###### Description of methods

`config()`

static function that registers global variables

`asSiderbarItem()`

function that validates from the sidebar and returns the name, icon and path of the view to be displayed

the implementation of this method is done when [creating a page](/documentation/new-page)

`asRouterItem()`

static function that redirects the page created by clicking on the sidebar

the implementation of this method is done when [creating a page](/documentation/new-page)

`onFirstPageEnter()`

function that executes before the component is mounted in the DOM. can be used to make API requests

`onPageEnter()`

function that is invoked immediately before disassembling and destroying a component.Perform the necessary cleanup tasks on this method or delete the subscriptions that were created on onFirstPageEnter ().