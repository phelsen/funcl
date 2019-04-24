const f = require("./../funcl.js");
const fs = require('fs');


const {getIn, array_p, assoc, atom_p, boolean_p, clone, coll_p, concat, count, countable_p, date_p, dec, drop, eq, even_p, filter, first, function_p, inc, last, lowerCase, map, mapEntries_2map, map_p, map_2mapEntries, neg_p, nth, number_p, odd_p, partial, partialR, pipe, pos_p, range, reduce, reverse, regexp_p, rest, string_p, sqr, takeLast, takeWhile, type, undefined_p, upperCase, zero_p} = f; 



const r = [];
let arr; let dict; let dict2;
r.push ("range(10);");
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
r.push("pipe(arr,map(sqr),reverse,map(x=>x+100),filter(odd_p))");
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

## Get it 

You can install the latest release via npm:

\`\`\`shell
npm install funcl
\`\`\`

## Test it 

\`\`\`shell
npm run test
\`\`\`

## Understand it

The main goal of this library is to make programming in javascript easier,more fun and less error-prone. Not to mimic clojure 100%. 
Although an effort has been/will be made to stay close to the clojure api : this library will always choose pragmatism over 'puritanism'. 
FunCl is not supporting lazy collections, nor will it try to copy the behaviour of macro's. 
At the other side, functions that seem convenient will be added even though clojure might not offer them. 

As an example of the effort towards pragmatism : in this library most functions that lack some of their argumenst will return the partial function that makes most sense. 
That way the very convenient pipe() function can do its magic kinda intuitively. 


\`\`\`javascript
pipe(range(100),drop(80),reverse,takeWhile(x => x>90),filter(odd_p),map(inc))
=>${JSON.stringify(pipe(range(100),drop(80),reverse,takeWhile(x => x>90),filter(odd_p),map(inc)))}
\`\`\`

More rationale and examples will follow shortly. 


## Do it (some quick examples)

`

fileText += "|||\n";
fileText += "|--- |--- |\n"; 

const rows =  map(x => `|${x}|${JSON.stringify(eval(x))}|`,r).join("\n");
fileText +=   rows;
console.log(fileText);
fs.writeFile("README.md",fileText, (x,err) => console.log(err))


