const f = require("./../funcl.js");
const fs = require('fs');

const {getIn, isArray, assoc, isAtom, isBoolean, clone, isColl, concat, count, isCountable, isDate, isDefined,  isUndefined, dec, drop, eq, isEven, filter, first, isFunction, inc, last, lowerCase, map, mapEntries_2map, isMap, map_2mapEntries, isNeg, nth, partition, interleave, intersection, isMultipleOf, isNumber, isOdd, partial, partialR, pipe, isPos, range, reduce, reverse, isRegexp, rest, isString, sqr, sum,  take, takeLast, takeWhile, type,  upperCase, isZero, isAnyOf } = f; 

const r = [];
let arr; let dict; let dict2;
r.push("everything=range(1e4); life=pipe(range(1,50),filter(isMultipleOf(6))); theUniverse=filter(isMultipleOf(7),range(1e4)); intersection(life,theUniverse,everything)")


r.push("sum(filter(isAnyOf(isMultipleOf(3),isMultipleOf(5)),range(1e3))) // https://projecteuler.net/problem=1")
r.push("arr=range(1,11); arr");
r.push("count(arr)"); 
r.push("reverse(arr)");
r.push("count('λλ FUNCL! λλ') ");
r.push("reverse('λλ FUNCL! λλ' )");
r.push("[first(arr), last(arr)]");
r.push("rest(arr)");
r.push("takeWhile(x => x < 5, arr)");
r.push("takeLast(3, arr)");
r.push("map(sqr,arr)");
r.push("partition(2,interleave([1,2,3],[4,5,6]))");
r.push("pipe(arr,map(sqr),reverse,map(x=>x+100),filter(isOdd))");
r.push("dict=assoc({}, 'fn' , 'Bar' , 'ln', 'Foo')")
r.push("map(type, [arr,dict,11,true,{},[],new Date(),/funcl/])")
r.push("dict=pipe(dict,assoc('ln', 'StillFoo', 'address',{ street : 'FunclStreet' , nb :  '12' }));");
r.push("dict2=clone(dict)");
r.push("eq(dict,dict2)");
r.push("dict2=assoc(dict2,'nickname','funky' )")
r.push("eq(dict,dict2)");

let fileText = `# FunCl
[![LICENSE MIT](https://img.shields.io/npm/l/funcl.svg)](https://www.npmjs.com/package/funcl)


Some javascript util functions that sure as hell ring a clojure bell!

https://phelsen.github.io/funcl/

NOTE: funcl is still in alpha phase.
(However : functions that allready have an exact clojure signature will continue to do so)

## Get it 

You can install the latest release via npm:

\`\`\`shell
npm i -S funcl
\`\`\`

and use it with Node or a bundler like webpack or browserify  : 

\`\`\`javascript
f = require('funcl');
// or 
import f from  'funcl'; 
\`\`\`


## Test it 

\`\`\`shell
npm run test
\`\`\`

## Understand it

The main goal of this library is to make programming in javascript easier, more fun and less error-prone. Not to mimic clojure 100%. 
Although an effort has been/will be made to stay close to the clojure api : this library will always choose pragmatism over 'puritanism'. 
FunCl is not supporting lazy collections, nor will it try to copy the behaviour of macro's. 
At the other side, functions that seem convenient will be added even though clojure might not offer them. 

As an example of the effort towards pragmatism : in this library most functions that lack some of their arguments will return the partial function that makes most sense. 
That way the very convenient pipe() function can do its magic kinda intuitively. 


\`\`\`javascript
pipe(range(100),drop(80),reverse,takeWhile(x => x>90),filter(isOdd),map(inc))
=>${JSON.stringify(pipe(range(100),drop(80),reverse,takeWhile(x => x>90),filter(isOdd),map(inc)))}
\`\`\`


API documentation is a work in progress :  https://phelsen.github.io/funcl/


## Do it (some quick examples)
`

fileText += "|||\n";
fileText += "| Code | Result |\n"; 

const rows =  map(x => `|${x}|${JSON.stringify(eval(x))}|`,r).join("\n");
fileText +=   rows;
console.log(fileText);
fs.writeFile("README.md",fileText, (x,err) => console.log(err))


