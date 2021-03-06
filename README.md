# FunCl
[![LICENSE MIT](https://img.shields.io/npm/l/funcl.svg)](https://www.npmjs.com/package/funcl)


Some javascript util functions that sure as hell ring a clojure bell!

https://phelsen.github.io/funcl/

NOTE: funcl is still in alpha phase.
(However : functions that allready have an exact clojure signature will continue to do so)

## Get it 

You can install the latest release via npm:

```shell
npm i -S funcl
```

and use it with Node or a bundler like webpack or browserify  : 

```javascript
f = require('funcl');
// or 
import f from  'funcl'; 
```


## Test it 

```shell
npm run test
```

## Understand it

The main goal of this library is to make programming in javascript easier, more fun and less error-prone. Not to mimic clojure 100%. 
Although an effort has been/will be made to stay close to the clojure api : this library will always choose pragmatism over 'puritanism'. 
FunCl is not supporting lazy collections, nor will it try to copy the behaviour of macro's. 
At the other side, functions that seem convenient will be added even though clojure might not offer them. 

As an example of the effort towards pragmatism : in this library most functions that lack some of their arguments will return the partial function that makes most sense. 
That way the very convenient pipe() function can do its magic kinda intuitively. 


```javascript
pipe(range(100),drop(80),reverse,takeWhile(x => x>90),filter(isOdd),map(inc))
=>[100,98,96,94,92]
```


API documentation is a work in progress :  https://phelsen.github.io/funcl/


## Do it (some quick examples)
| Code | Result |
| --- | --- |
|everything=range(1e4); life=pipe(range(1,50),filter(isMultipleOf(6))); theUniverse=filter(isMultipleOf(7),range(1e4)); intersection(life,theUniverse,everything)|[42]|
|sum(filter(isAnyOf(isMultipleOf(3),isMultipleOf(5)),range(1e3))) // https://projecteuler.net/problem=1|233168|
|arr=range(1,11); arr|[1,2,3,4,5,6,7,8,9,10]|
|count(arr)|10|
|reverse(arr)|[10,9,8,7,6,5,4,3,2,1]|
|count('λλ FUNCL! λλ') |12|
|reverse('λλ FUNCL! λλ' )|"λλ !LCNUF λλ"|
|[first(arr), last(arr)]|[10,1]|
|rest(arr)|[9,8,7,6,5,4,3,2,1]|
|takeWhile(x => x < 5, arr)|[]|
|takeLast(3, arr)|[3,2,1]|
|map(sqr,arr)|[100,81,64,49,36,25,16,9,4,1]|
|partition(2,interleave([1,2,3],[4,5,6]))|[[1,4],[2,5],[3,6]]|
|pipe(arr,map(sqr),reverse,map(x=>x+100),filter(isOdd))|[101,109,125,149,181]|
|dict=assoc({}, 'fn' , 'Bar' , 'ln', 'Foo')|{"fn":"Bar","ln":"Foo"}|
|map(type, [arr,dict,11,true,{},[],new Date(),/funcl/])|["array","map","number","boolean","map","array","date","regexp"]|
|dict=pipe(dict,assoc('ln', 'StillFoo', 'address',{ street : 'FunclStreet' , nb :  '12' }));|{"fn":"Bar","ln":"StillFoo","address":{"street":"FunclStreet","nb":"12"}}|
|dict2=clone(dict)|{"fn":"Bar","ln":"StillFoo","address":{"street":"FunclStreet","nb":"12"}}|
|eq(dict,dict2)|true|
|dict2=assoc(dict2,'nickname','funky' )|{"fn":"Bar","ln":"StillFoo","address":{"street":"FunclStreet","nb":"12"},"nickname":"funky"}|
|eq(dict,dict2)|false|