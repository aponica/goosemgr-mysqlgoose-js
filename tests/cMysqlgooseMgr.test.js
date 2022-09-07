"use strict";
//=============================================================================
//  Copyright 2022 Opplaud LLC and other contributors. MIT licensed.
//=============================================================================

//-----------------------------------------------------------------------------
//  Unit tests for goosemgr-mysqlgoose-js.
//-----------------------------------------------------------------------------

const kFs = require( 'fs' );

const kcMysqlgooseMgr = require( '../index.js' );

const zConfigPath = './node_modules/@aponica/mysqlgoose-js/tests-config/';

//---------------------------------------------------------------------------

test( 'InvalidConnection', fDone => {

  const iGooseMgr = new kcMysqlgooseMgr( {} );

  iGooseMgr.fiConnect( {} ).then(
    iConn => {
      expect( iConn ).toBe( 'to never happen' );
      fDone();
      },
    iErr => {
      expect( iErr.message ).toContain( 'ECONNREFUSED' );
      fDone();
      }
    ); // then()

  } ); // test(InvalidConnection)

//---------------------------------------------------------------------------

test( 'EverythingElse', fDone => {

  const iGooseMgr = new kcMysqlgooseMgr(
    JSON.parse( kFs.readFileSync( zConfigPath + 'definitions.json' ) ) );

  iGooseMgr.fiConnect(
    JSON.parse( kFs.readFileSync( zConfigPath + 'config_mysql.json' ) ) ).
      then( // connect
        () => { // success

          iGooseMgr.fiModel( 'customer' ).findById( 1 ).then( // find

            hCustomer => { // found
              expect( hCustomer ).toBeInstanceOf( Object );
              expect( hCustomer ).toHaveProperty( 'nId' );
              expect( hCustomer.nId ).toEqual( 1 );
              iGooseMgr.fiGoose().disconnect();
              fDone();
              }, // found

            iErr => { // not found
              expect( iErr.message ).toBe( 'to never happen' );
              iGooseMgr.fiGoose().disconnect();
              fDone();
              }

            ); // then() // find

          }, // success

        iErr => { // fail
          expect( iErr.message ).toBe( 'to never happen' );
          fDone();
          }

        ); // then() // connect

  } ); // test(EverythingElse)

// EOF
