---
title: ListPageComponent
date: Wed Jun 01 2016 10:12:39 GMT-0500 (CDT)
slug: list-page-component
description: Hoy podemos aprender los conceptos importantes de cada industria leyendo la documentación del API de los grandes del mercado.
image: 0JLthSQ.jpg
imagePositionY: 0px
imageSize: cover
---

# ListPageComponent


##### What is

Component that extends from PageComponent and as main functionality is to show a list of items with their respective filters, actions in a table.


##### What for

ListPageComponent has a series of functionalities, listed below:

+	visualize the iteration of elements in a table. The table has sorting methods in each column and pagination
+	display search filters in a panel that is displayed and hidden when required
+	Each row has action buttons, according to the configuration.
+	

##### How

###### Description of methods

ListPageComponent  | 
 -------------| 
 getFilters() | 
 getColumns() |
 getHeader()  |
 FinishUp()   |
 showModal()  | 
 hideModal()  | 
 onSelectChange()  |
 
 
 
 `getFilters()`

Function that returns an object according to the amount and type of filters you need. [React JSON Schema](https://github.com/mozilla-services/react-jsonschema-form#the-uischema-object) returns an object with the corresponding configuration, both the name of the filter with its corresponding UISchema.

JSON Schema example:

```javascript
const data = {
      schema: {
        type: 'object',
        required: [],
        properties: {
          screenName: {type: 'text', title: 'Por nombre'},
          email: {type: 'text', title: 'Por email'},
          organization: {type: 'text', title: 'Por organización', values: []}
        }
      },
      uiSchema: {
        screenName: {'ui:widget': 'SearchFilter'},
        email: {'ui:widget': 'SearchFilter'},
        organization: {'ui:widget': 'SelectSearchFilter'}
      }
    }
```


`getColumns()`

function that returns an array of objects, each object will show the value of the cell in each row, it can be both text and action buttons

get columns, example:

```javascript
getColumns () {
    return [
      {
        'title': 'Screen name',
        'property': 'screenName',
        'default': 'N/A',
        'sortable': true
      },
      {
        'title': 'Name',
        'property': 'name',
        'default': 'N/A',
        'sortable': true
      },
      {
        'title': 'Email',
        'property': 'email',
        'default': 'N/A',
        'sortable': true
      },
      {
        'title': 'Actions',
        formatter: (row) => {

          return (
            <div className='field is-grouped'>
              <div className='control'>
                <Link className='button' 
                  to={'/path'}>
                  Detalle
                </Link>
              </div>
              <div className='control'>
                  <DeleteButton
                    objectName='Usuario'
                    objectDelete={() => this.deleteObject(row)}
                    message={`Está seguro de querer desactivar a ${row.email} ?`}
                  />
              </div>
            </div>
          )
        }
      }
    ]
  }
```

`getHeader()`

function that will show the header of the table according to the headerLayout that is sent as a parameter in the config () function

There is the possibility of customizing the header in different ways, I show some ways in this example:

```javascript
getHeader () {
    const config = this.config

    if (config.headerLayout === 'custom') {
      return <headerComponent
        //props for headerComponent
      />
    } else if (config.headerLayout === 'create') {
      return (<header className='card-header'>
        <p className='card-header-title'>
          Layout title
        </p>
        <div className='card-header-select'>
          <button className='button is-primary'>
            Title button in layout
          </button>
          <createComponent
            //props for createComponent
          />
        </div>
      </header>)
    } else {
      return (<header className='card-header'>
        <p className='card-header-title'>
          {config.titleHeaderLayout}
        </p>
      </header>)
    }
  }
```


`FinishUp()`

```javascript


```

`showModal()`

Function that activates a class to show the modal

show modal, example:

```javascript
showModal () {
    this.setState({
      className: ' is-active'
    })
  }
```

`hideModal()`

Function that removes a class to hide the modal

hide modal, example:

```javascript
hideModal () {
    this.setState({
      className: ''
    })
  }
```

`onSelectChange()`

Function that receives as parameters an object with the item of the selected row

select row, example:

```javascript

onSelectChange (items) {
    this.setState({
      selectedRows: items
    })
  }

```
