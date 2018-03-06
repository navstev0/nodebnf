//Import compiler//
const { Compiler } = require( "../../Compiler" );

//Load bnf file, this can be done inline//
let bnf = require( "fs" ).readFileSync( __dirname + "/calculator.bnf" ).toString();
let functionBnf = require( "fs" ).readFileSync( __dirname + "/function.abnf" ).toString();

//Instance a BNF compiler//
let compiler = new Compiler();

//Add new language for the bnf//
compiler.AddLanguage( bnf, "calc" );
compiler.AddLanguage( functionBnf, "function" );

//Set the execute rules
compiler.SetRuleEvents({
  mathLibAction( token ){
    token.SetValue( "Math." );
  },
  expression( token, dataObject ){
    dataObject.calculations.push( { question : token.value, answer : eval( token.value ) } );
  }
});

//Set up data storage for parser//
let parserSavedData = {
  calculations : []
};

//Parse the script
compiler.ParseScript( `
1 + PI
193 - 1233
4.32 * 24
`.trim(), parserSavedData );

//Review data saved during parser step//
console.log( parserSavedData.calculations );