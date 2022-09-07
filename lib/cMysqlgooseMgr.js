"use strict";
//=============================================================================
//  Copyright 2019-2022 Opplaud LLC and other contributors. MIT licensed.
//=============================================================================

//-----------
//  @ignore
//-----------

const cGooseMgr = require( '@aponica/goosemgr-js' );
const cMysqlgoose = require( '@aponica/mysqlgoose-js' );

//-----------------------------------------------------------------------------
//  @alias module:@aponica/goosemgr-mysqlgoose-js.cMysqlgooseMgr
//
//  @public
//
//  @classdesc
//    Goose Manager for Mysqlgoose Database Abstraction.
//
//    A "Goose Manager" provides a consistent way to access an object or
//    relational database. A "Mysqlgoose Manager" allows
//    {@linkcode https://aponica.com/docs/mysqlgoose-php|Mysqlgoose}
//    to be managed consistently with other types of "Goose."
//-----------------------------------------------------------------------------

module.exports = class cMysqlgooseMgr extends cGooseMgr {

  //---------------------------------------------------------------------------
  //  @public
  //
  //  @summary
  //    Constructs a cMysqlgooseMgr object.
  //
  //  @param {object} hDefinitions
  //    The definitions hash (dictionary object) used to create schemas
  //    for the database.
  //
  //    The hash contains one property for each table or collection to
  //    be accessed. The name of the property is the name of the table or
  //    collection, and its value is a hash as expected by Mysqlgoose's
  //    {@linkcode
  //    https://aponica.com/docs/mysqlgoose-js/module-@aponica_mysqlgoose-js.Schema.html|
  //    Schema} constructor.
  //
  //    The hash may contain a property named `"//"` with any value;
  //    it is assumed to be a comment member, and is ignored.
  //
  //    The hash is typically created by parsing the output of
  //    {@linkcode https://aponica.com/docs/mysqlgoose-schema-js|npx
  //      @aponica/mysqlgoose-schema-js} using `JSON.parse()`.
  //---------------------------------------------------------------------------

  constructor( hDefinitions ) {
    super( hDefinitions, cMysqlgoose );
    }


  //---------------------------------------------------------------------------
  //  @protected
  //
  //  @summary
  //    Private interface to connect to a database.
  //
  //  @description
  //    Used by {@linkcode
  //      module:@aponica/goosemgr-js.cGooseMgr#fiConnect|cGooseMgr.fiConnect}
  //    to establish a connection.
  //
  //  @param {Object} hConfig
  //    The configuration parameters as expected by {@linkcode
  //    https://aponica.com/docs/mysqlgoose-js/module-@aponica_mysqlgoose-js.Mysqlgoose.html|
  //    Mysqlgoose.connect()}.
  //
  //  @returns {Promise}
  //    A promise to provide a connection (really, a Mysqlgoose instance).
  //---------------------------------------------------------------------------

  fiCreateConnection( hConfig ) {

    const iGoose = this.fiGoose();

    return new Promise( ( fResolve, fReject ) =>

      iGoose.connect( hConfig ).then(
        () => {
          fResolve( iGoose );
          },
        iErr => {
          fReject( iErr );
          }
        ) // then()

      ); // Promise()

    } // fiCreateConnection

  }; // cMysqlgooseMgr

// EOF
