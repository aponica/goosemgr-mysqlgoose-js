# @aponica/goosemgr-mysqlgoose-js

Goose Manager for Mysqlgoose Database Abstraction.

A "[Goose Manager](https://aponica.com/docs/goosemgr-js)" provides a
consistent way to access an object or relational database. 

A "Mysqlgoose Manager" allows
[Mysqlgoose](https://aponica.com/docs/mysqlgoose-js)
to be managed consistently with other types of "Goose."

An equivalent JS package, 
[aponica/goosemgr-mysqlgoose-php](https://aponica.com/docs/goosemgr-mysqlgoose-php), 
is maintained for consistency.

<a name="installation"></a>
## Installation

```sh
npm i @aponica/goosemgr-mysqlgoose-js
```

<a name="usage"></a>
## Usage

### Step 1: Create Configuration Files

Create a database connection file and Mysqlgoose definitions file
according to the first two steps for 
<a href="https://aponica.com/docs/mysqlgoose-js">@aponica/mysqlgoose-js</a>.

### Step 2: Use a Mysqlgoose Manager

Use class `cMysqlgooseMgr` to connect to your database and create the models,
then use the models as specified in the 
<a href="https://aponica.com/docs/mysqlgoose-js">@aponica/mysqlgoose-js</a>
documentation.

## Examples

### Example: Async/Await Syntax

Remember: `await` can only be used within an `async` function!

```javascript
const cMysqlgooseMgr = require( '@aponica/goosemgr-mysqlgoose-js' );

const mgr = new cMysqlgooseMgr( 'definitions.json' );
  
await mgr.fiConnect( 'mysql.json' );

const cust = await mgr.fiModel( 'customer' ).findById( 1234 );
console.info( cust.id ); // 1234
```

### Example: Promise-Based Syntax

This syntax can be used anywhere; for example, at the top level of a
NodeJS application:

```javascript
const cMysqlgooseMgr = require( '@aponica/goosemgr-mysqlgoose-js' );

const mgr = new cMysqlgooseMgr( 'definitions.json' );
  
mgr.fiConnect( 'mysql.json' ).then( () => {
  mgr.fiModel( 'customer' ).findById( 1234 ).
    then( cust => console.info( cust.id ) ); // 1234
  } );
```

## Please Donate!

Help keep a roof over our heads and food on our plates! 
If you find aponica® open source software useful, please 
**[click here](https://www.paypal.com/biz/fund?id=BEHTAS8WARM68)** 
to make a one-time or recurring donation via *PayPal*, credit 
or debit card. Thank you kindly!

## Unit Testing

The [JEST](https://jestjs.io/) unit tests require the test database
and configuration as specified for
[@aponica/mysqlgoose-js](https://aponica.com/docs/mysqlgoose-js). 

## Contributing

Please [contact us](https://aponica.com/contact/) if you believe this package
is missing important functionality that you'd like to provide.

Under the covers, the code is **heavily commented** and uses a form of
[Hungarian notation](https://en.wikipedia.org/wiki/Hungarian_notation) 
for data type guidance. If you submit a pull request, please try to maintain
the (admittedly unusual) coding style, which is the product of many decades
of programming experience.

## Copyright

Copyright 2019-2022 Opplaud LLC and other contributors.

## License

MIT License.

## Trademarks

OPPLAUD and aponica are registered trademarks of Opplaud LLC.

## Related Links

Official links for this project:

* [Home Page & Online Documentation
    ](https://aponica.com/docs/goosemgr-mysqlgoose-js/)
* [GitHub Repository](https://github.com/aponica/goosemgr-mysqlgoose-js)
* [NPM Package](https://www.npmjs.com/package/@aponica/goosemgr-mysqlgoose-js)
  
Related projects:

* [Mysqlgoose (@aponica/mysqlgoose-js)
    ](https://aponica.com/docs/mysqlgoose-js/)
* [Goose Manager (@aponica/goosemgr-js)
    ](https://aponica.com/docs/goosemgr-js/)
* [Mongoose Manager (@aponica/goosemgr-mongoose-js)
    ](https://aponica.com/docs/goosemgr-mongoose-js/)
* [PHP Version (aponica/goosemgr-mysqlgoose-php)
    ](https://aponica.com/docs/goosemgr-mysqlgoose-php/)
