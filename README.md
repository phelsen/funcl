# FunCl
[![LICENSE MIT](https://img.shields.io/npm/l/funcl.svg)](https://www.npmjs.com/package/funcl)


Some javascript util functions that sure as hell ring a clojure bell!

## Get it 

You can install the latest release via npm:

```shell
npm install funcl
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
pipe(range(100),drop(80),reverse,takeWhile(x => x>90),filter(odd_p),map(inc))
=>[100,98,96,94,92]
```


API documentation is a work in progress :  https://phelsen.github.io/funcl/


## Do it (some quick examples)
|||
|--- |--- |
|range(10);|[0,1,2,3,4,5,6,7,8,9]|
|arr=range(1,11); arr|[1,2,3,4,5,6,7,8,9,10]|
|count(arr)|10|
|reverse(arr)|[10,9,8,7,6,5,4,3,2,1]|
|count('λλ FUNCL! λλ') |12|
|reverse('λλ FUNCL! λλ' )|"λλ !LCNUF λλ"|
|[first(arr), last(arr)]|[1,10]|
|rest(arr)|[2,3,4,5,6,7,8,9,10]|
|takeWhile(x => x < 5, arr)|[1,2,3,4]|
|takeLast(3, arr)|[8,9,10]|
|map(sqr,arr)|[1,4,9,16,25,36,49,64,81,100]|
|pipe(arr,map(sqr),reverse,map(x=>x+100),filter(odd_p))|[181,149,125,109,101]|
|dict=assoc({}, 'fn' , 'Bar' , 'ln', 'Foo')|{"fn":"Bar","ln":"Foo"}|
|map(type, [arr,dict,11,true,{},[],new Date(),/funcl/])|["array","map","number","boolean","map","array","date","regexp"]|
|dict=pipe(dict,assoc('ln', 'StillFoo', 'address',{ street : 'FunclStreet' , nb :  '12' }));|{"fn":"Bar","ln":"StillFoo","address":{"street":"FunclStreet","nb":"12"}}|
|dict2=clone(dict)|{"fn":"Bar","ln":"StillFoo","address":{"street":"FunclStreet","nb":"12"}}|
|eq(dict,dict2)|true|
|dict2=assoc(dict2,'nickname','funky' )|{"fn":"Bar","ln":"StillFoo","address":{"street":"FunclStreet","nb":"12"},"nickname":"funky"}|
|eq(dict,dict2)|false|