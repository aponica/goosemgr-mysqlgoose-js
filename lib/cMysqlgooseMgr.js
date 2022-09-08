"use strict";
//=============================================================================
//  Copyright 2019-2022 Opplaud LLC and other contributors. MIT licensed.
//=============================================================================

//-----------
//  @ignore
//-----------

const kFs = require( 'fs' );

const kcMysqlgoose = require( '@aponica/mysqlgoose-js' );

const kcGooseMgr = require( '@aponica/goosemgr-js' );

//-----------------------------------------------------------------------------
//  @alias module:@aponica/goosemgr-mysqlgoose-js.cMysqlgooseMgr
//
//  @extends
//  https://aponica.com/docs/goosemgr-js/module-@aponica_goosemgr-js.cGooseMgr.html
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
//
//  @see
//  https://aponica.com/docs/goosemgr-js/module-@aponica_goosemgr-js.cGooseMgr.html
//-----------------------------------------------------------------------------

module.exports = class cMysqlgooseMgr extends kcGooseMgr {

  //---------------------------------------------------------------------------
  //  @public
  //
  //  @summary
  //    Constructs a cMysqlgooseMgr object.
  //
  //  @param {object|string} vDefinitions
  //    The definitions hash (dictionary object) used to create schemas
  //    for the database.
  //
  //    If `vDefinitions` is a string, it is assumed to be the filename from
  //    which the hash can be read as JSON data.
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

  constructor( vDefinitions ) {
    super( vDefinitions, kcMysqlgoose );
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
  //  @param {Object|string} vConfig
  //    The configuration parameters as expected by {@linkcode
  //    https://aponica.com/docs/mysqlgoose-js/module-@aponica_mysqlgoose-js.Mysqlgoose.html|
  //    Mysqlgoose.connect()}.
  //
  //    If `vConfig` is a string, it is assumed to be the filename from
  //    which the hash can be read as JSON data.
  //
  //  @returns {Promise}
  //    A promise to provide a connection (really, a Mysqlgoose instance).
  //---------------------------------------------------------------------------

  fpvCreateConnection( vConfig ) {

    if ( "string" === typeof( vConfig ) )
      vConfig = JSON.parse( kFs.readFileSync( vConfig, 'utf8' ) );

    const iGoose = this.fiGoose();

    return new Promise( ( fResolve, fReject ) =>

      iGoose.connect( vConfig ).then(
        () => {
          fResolve( iGoose );
          },
        iErr => {
          fReject( iErr );
          }
        ) // then()

      ); // Promise()

    } // fpvCreateConnection

  }; // cMysqlgooseMgr

// EOF
