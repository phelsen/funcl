const f = require("./funcl.js");

const cl = console.log;
const assert =  (test, v, expected,codeString) => 
      ({ test : test,
	 result : v ,
	 expected : expected,
	 codeString : codeString,
	 testPassed : f.eq(v,expected)     })

const asserts = [];

const sumOf4 = (w,x,y,z) => w + x + y + z;
const a = (test,v,expected) => asserts.push(assert(test,v,expected));
const b = (test,v,expected) => asserts.push(assert(test,eval(v),expected,v)); 

const start = f.start();
//;; partials
b("first,1", "f.first([1,2,3])",1);
b("first,2", "f.first('Barfoo')",'B');
b("first,3",  "f.first({ a : 1, b : 2})", ["a",1]) ;
b("second,1", "f.second([1,2,3])",2);
b("second,2", "f.second('Barfoo')",'a');
b("second,3",  "f.second({ a : 1, b : 2})", ["b",2]) ;
b("last,1", "f.last([1,2,3])",3);
b("last,2", "f.last('Barfoo')",'o');
b("last,3",  "f.last({ a : 1, b : 2})", ["b",2]) ;
b("rest,1", "f.rest([1,2,3])",[2,3]);
b("rest,2", "f.rest('Barfoo')",'arfoo');
b("rest,3",  "f.rest({ a : 1, b : 2, c : 3})", [["b",2],["c",3]]) ;
b("rest,4",  "f.rest({})", []);
b("rest,5",  "f.rest([])", []);
b("partial,1", "sumOf4(10,20,30,33)",93);
b("partial,2", "f.partial(sumOf4,10)(10,20,30)",70);
b("partial,3", "f.partial(sumOf4,10)(20,30,100)",160);
b("partial,4", "f.partial(sumOf4,20,50)(20,30)",120);
b("a partial test","f.partial(sumOf4,1,2,3)(4)",10);
b("a partial test","f.partial(sumOf4,1,2)(3,4)",10);
b("a partial test","f.partial(sumOf4,1,2,3)(4)",10);
b("a partial test","f.partial(sumOf4,1,2,3,4)()",10);
b("array?,1","f.isArray([1,2,3])",true);
b("array?,2","f.isArray([])",true);
b("array?,3","f.isArray(1)",false);
b("array?,4","f.isArray(null)",false);
b("array?,5","f.isArray()",false);
b("string?, 1","f.isString('jos')", true);
b("string?, 2","f.isString('')", true);
b("string?, 3","f.isString()", false);
b("string?, 4","f.isString(null)", false);
b("string?, 5","f.isString(false)", false);
b("string?, 6","f.isString(1)", false);
b("map?,1", "f.isMap({})",true);
b("map?,2", "f.isMap({a: 1, b: 2})",true);
b("map?,3", "f.isMap([1,2,3])",false);
b("map?,4", "f.isMap('funcl')",false);
b("map?,5", "f.isMap(new Boolean())",false);
b("map?,6", "f.isMap(true)",false);
b("map?,7", "f.isMap(/regex/)",false);
b("map?,8", "f.isMap(new Date())",false);
b("map?,9", "f.isMap([])",false);
b("map?,10", "f.isMap('')",false);
b("map?,11", "f.isMap()",false);
// equality
b("eq1", "f.eq(1,1)",true);
b("eq2", "f.eq(0,0)",true);
b("eq3", "f.eq(41,42)",false);
b("eq4", "f.eq(41,'41')",false);
b("eq5", "f.eq('','')",true);
b("eq6", "f.eq(false,true)",false);
b("eq7", "f.eq(false,false)",true);
b("eq8", "f.eq({},{})",true);
b("eq9", "f.eq({},[])",false);

b("eq10", "f.eq([1,2,3],[1,2,3])",true);
b("eq11", "f.eq([1,2,3],[1,2,4])",false);
b("eq12", "f.eq([1,2,3],[1,2])",false);
b("eq13", "f.eq({ a : 12, b : 12  }, { b: 12 , a:12} )",true);
b("eq14", "f.eq({ a : 12, b : 12, c: 12  }, { b: 12 , a:12})",false);
b("eq15", "f.eq({ a : 12, b : 12, c: 12  }, { b: 12 , a:12, c : 12, d : []} )",false);
b("eq16", "f.eq({ a : 12, b : 12, c: 12 , d : [9,9] }, { b: 12 , a:12, c : 12, d : [9, 9]} )",true);
b("eq17", "f.eq(new Date('2019'), new Date('2019'))",true);
b("eq18", "f.eq(new Date('2019'), new Date('2029'))",false);
b("eq19", "f.eq({ a : 12, b : 12, c: 12 , d : [9,9,new Date('2019')] }, { b: 12 , a:12, c : 12, d : [9, 9, new Date('2019')]} )",true);
b("eq20", "f.eq({ a : 12, b : 12, c: 12 , d : [9,9,new Date('2019')] }, { b: 12 , a:12, c : 12, d : [9, 9, new Date('2017')]} )",false);
b("eq21", "f.eq(/^funcl(.*)/g,/^funcl(.*)/g)",true);
b("eq22", "f.eq(new RegExp('^funcl(.*)'),new RegExp('^funcl(.*)'))",true);
b("eq23", "f.eq([/jojoj/,{ a : 12, b : 12, c: 12 , d : [9,9,new Date('2019')] },[{ a : [[]]}]], [ /jojoj/ ,{ b: 12 , a:12, c : 12, d : [9, 9, new Date('2019')]}, [{ a : [[]]} ]])",true);
b("eq24", "f.eq([/jojoj/,{ a : 12, b : 12, c: 12 , d : [9,9,new Date('2019')] },[{ a : [[]]}]], [ /jojoj/ ,{ b: 12 , a:12, c : 12, d : [9, 9, new Date('2019')]}, [{ a : [[[]]]} ]])",false);
b("eq25", "f.eq({ a: 12, b: 99}, { 'b' : 99, a : 12 })",true);
b("eq25", "f.eq({ a: 12, b: 2}, { 'a' :12, b : 22 })",false);
b("atom?,1","f.isAtom(1)",true);
b("atom?,2","f.isAtom(0)",true);
b("atom?,3","f.isAtom()",false);
b("atom?,4","f.isAtom('')",true);
b("atom?,5","f.isAtom('Some string')",true);
b("atom?,6","f.isAtom(new Date())",true);
b("atom?,7","f.isAtom(new RegExp())",true);
b("atom?,8","f.isAtom([1,2,3])",false);
b("atom?,9","f.isAtom([])",false);
b("atom?,10","f.isAtom({})",false);
b("atom?,11","f.isAtom({a :  12})",false);
b("boolean?,1","f.isBoolean (true)", true)
b("boolean?,2","f.isBoolean (false)", true)
b("boolean?,3","f.isBoolean ()", false)
b("boolean?,4","f.isBoolean (2 == 2 )",true)
b("coll?,1", "f.isColl([])",true)
b("coll?,2", "f.isColl({})",true)
b("coll?,3", "f.isColl()",false)
b("coll?,4", "f.isColl([1,2,3])",true)
b("coll?,5", "f.isColl([1,{a : 99},2,3])",true)
b("coll?,6", "f.isColl({ a : 1 })",true)
b("coll?,7", "f.isColl(null)",false)
b("date?,1", "f.isDate(null)", false)
b("date?,2", "f.isDate(new Date())", true)
b("date?,3", "f.isDate(new Date('2019'))", true)
b("date?,4", "f.isDate(new Object())", false)
b("even?,1", "f.isEven(2)", true)
b("even?,2", "f.isEven(3)", false)
b("even?,3", "f.isEven(0)", true)
b("odd?,1", "f.isOdd(2)", false)
b("odd?,2", "f.isOdd(3)", true)
b("odd?,3", "f.isOdd(0)", false)                                                     
b("odd?,4", "(x => { try {  f.isEven('jjo') } catch(e) { return   e.message} })()"  ,f.errMsg.ERR_NOT_NUMERIC)
b("fn?,1" , "f.isFunction(x => x)", true);
b("fn?,2", "f.isFunction()", false);
b("fn?,3", "f.isFunction(new Object())", false)
b("fn?,4", "f.isFunction(null)", false)
b("fn?,5", "f.isFunction(f.isOdd)", true)
b("fn?,6", "f.isFunction(function(x) {})", true)
b("fn?,7", "f.isFunction([].map)", true)
//type
// ["array", "string", "map", "regexp", "boolean", "undefined", "function", "null"];
b("type1", "f.eq(f.map(f.type.bind(f),[[],'',{},/e/,true,undefined,x=>x,null]),['array', 'string', 'map', 'regexp', 'boolean', 'undefined', 'function', 'null'])",true);
b("type2", "f.eq(f.map(f.type.bind(f),[[1,2,3],'jos',{a: 12 }]),['array', 'string', 'map'])",true);
b("neg?,1","f.isNeg(0)",false)
b("neg?,2","f.isNeg(1)",false)
b("neg?,3","f.isNeg(-1)",true)
b("neg?,4", "{ try {  f.isNeg('jjo') } catch(e) { e.message} }"  , "Function expected numeric input")
b("pos?,1","f.isPos(0)",false)
b("pos?,2","f.isPos(1)",true)
b("pos?,3","f.isPos(-1)",false)
b("pos?,4", "{ try {  f.isPos('jjo') } catch(e) { e.message} }"  , "Function expected numeric input")
b("zero?,1","f.isZero(0)",true)
b("zero?,2","f.isZero(1)",false)
b("zero?,3","f.isZero(-1)",false)
b("zero?,4", "{ try {  f.isZero('') } catch(e) {   e.message} }"  , "Function expected numeric input")
b("number?,1", "f.isNumber(0)",true)
b("number?,2", "f.isNumber(1e9)",true)
b("number?,3", "f.isNumber(-89)",true)
b("number?,4", "f.isNumber('2')",false)
b("number?,5", "f.isNumber('')",false)
b("number?,6", "f.isNumber(/1/)",false)
b("number?,7", "f.isNumber()",false)
b("isRegexp?,1", "f.isRegexp()",false)
b("isRegexp?,2", "f.isRegexp('/jso/')",false)
b("isRegexp?,3", "f.isRegexp(/e/)",true)
b("isRegexp?,1", "f.isRegexp(/\\//)",true)
b("isRegexp?,2", "f.isUndefined()",true)
b("isRegexp?,3", "f.isUndefined(undefined)",true)
b("isRegexp?,4", "f.isUndefined(null)",false)
b("isRegexp?,5", "f.isUndefined(false)",false)
b("count,1", "f.count('skfd')",4)
b("count,2", "f.count([1,2,3,4])",4)
b("count,3", "f.count([])",0)
b("count,4", "f.count({ a: 12 , b: 8, c: [1,2,3,4]})",3)
b("count,5", "{ try {  f.count(new Date()) } catch(e) { e.message} }" , f.errMsg.ERR_NOT_SEQ)
b("count,6", "f.count(null)",0)
b("count,7", "f.count(undefined)",0)
b("countable,1", "f.isCountable(new Date())",false)
b("map,1",  "f.eq(f.map(f.inc, [1,2,3]),[2,3,4])",true);
b("mappipe,1", "f.eq(f.pipe([1,2,3,4],f.map(f.inc),f.map(x=>2*x)),[4,6,8,10])",true);
b("filter,1", "f.eq(f.filter(f.isOdd, [1,2,3,4,5,6]),[1,3,5])",true);
b("filter,2", "f.eq(f.filter(f.isEven,[1,2,3,4,5,6]),[2,4,6])",true);
b("filter,3", "f.eq(f.filter(x => x > 4, [1,2,3,4,5,6]),[5,6])",true);

//clone
b("date_clone?", "f.isDate(f.clone(new Date()))",true)
//reduce
b("reduce,1", "f.reduce((x,y)=>x, [1,2,3,4])",1);
b("reduce,2", "f.reduce((x,y)=>y, [1,2,3,4])",4);
b("reduce,3", "f.reduce((x,y)=>x+y, [1,2,3,4])",10);
b("reduce,4","f.eq( f.reduce((x,y)=>x, {a : 1 , b : 2, c : 3, d : 4}),[ 'a' , 1])",true);
b("reduce,5","f.eq(f.reduce((x,y)=>y, {a : 1 , b : 2, c : 3, d : 4}),[ 'd' , 4])",true);
// reverse
b("reverse,1", "f.reverse([1,2,3])",[3,2,1])
b("reverse,2", "f.reverse('Barfoo')","oofraB")
//take
b("take,1", "f.take(3,f.range(10))",[0,1,2])
b("take,2", "f.take(3,f.range(1))",[0])
b("take in pipe, 1", "f.pipe([1,2,3],f.take(2))", [1,2])
b("take in pipe, 2", "f.pipe(f.range(1,11),f.map(f.sqr),f.filter(f.isOdd),f.reverse,f.take(4),f.take(2))", [81,49])
b("drop,1", "f.drop(3,f.range(10))",[3,4,5,6,7,8,9])
b("drop,2", "f.drop(3,f.range(1))",[])
b("nth,1", "f.nth(f.range(10),2)",2);
b("nth,3","{ try {  f.nth([1,2,3],10) } catch(e) {    e.message}}","Out of index")
b("assoc,1","f.assoc({}, 'a', 1, 'b', 22)" , { "a" : 1, "b" : 22 });
b("assoc,2","f.pipe({}, f.assoc('a', 1, 'b', 2))" , { "a" : 1, "b" : 2 });
b("toggle,1","f.toggle([1,2,3],4)", [1,2,3,4]);
b("toggle,2","f.toggle([1,2,3,4],4)", [1,2,3]);
b("toggle,4","f.pipe([1],f.toggle(2))", [1,2]);
b("toggle,5","f.pipe([1],f.toggle(2),f.toggle(3))", [1,2,3]);
b("toggle,6","f.pipe([1],f.toggle(2),f.toggle(3),f.toggle(2))", [1,3]);
b("eqSet,1", "f.eqSets([1,2,3],[1,2,3])",true)
b("eqSet,2", "f.eqSets([1,2],[1,2,3])",false)
b("eqSet,3", "f.eqSets([3,2,1],[1,2,3])",true)
b("eqSet,4", "f.eqSets([{ a : 12 },2,1],[1,2,{ a : 12}])",true)
b("test42","everything=f.range(1e4); life=f.pipe(f.range(1,50),f.filter(f.isMultipleOf(6))); theUniverse=f.filter(f.isMultipleOf(7),f.range(1e4)); f.intersection(life,theUniverse,everything)",[42]);
b("partion/inter" , "f.partition(2,f.interleave2([1,2,3],[4,5,6]))",[[1,4],[2,5],[3,6]])
b("takeWhile,1", "f.pipe(f.range(100),f.drop(80),f.reverse,f.takeWhile(x => x>90),f.filter(f.isOdd),f.map(f.inc))",[ 100, 98, 96, 94, 92 ])
b("seqtest1", "f.seq([1,2,3,4])",[1,2,3,4])
b("seqtest2", "f.seq({ a: 1 , b: 2 , c: 3 })",[['a',1],['b',2],['c',3]]);
b("seqtest3", "{ try {  f.seq(1) } catch(e) { e.message} }", f.errMsg.ERR_NOT_SEQ)
b("seqtest4", "f.seq({ a: 1 , b: 2 , c: 3 })",[['a',1],['b',2],['c',3]]);
b("seqtest5", "f.seq({})",[]) // clj-diff
b("euler1", "f.sum(f.filter(f.isAnyOf(f.isMultipleOf(3),f.isMultipleOf(5)),f.range(1e3)))", 233168)
b("concat", "f.concat([1,2,3],[3,4],[5,6])", [1,2,3,3,4,5,6])
b("concat", "f.concat('bar', 'foo', 'yo')", "barfooyo")
b("concat", "f.concat('bar', 'foo', 'yo', [1,2,3])", "barfooyo123")
b("concat", "f.concat([1,2,3],'bar','foo','yoo')", [1,2,3,'bar','foo','yoo'])
b("conj", "f.conj([1,2,3],4,5)", [1,2,3,4,5])
b("conj", "f.conj({  a : 12 , b : 22 },{c : 33} ,{ a :1 , d: 44})",  { a: 1, b : 22 , c: 33, d:44})
b("merge","f.merge({ a : 12, b : 22, c : 99, d : 100} ,{a : 8, d : 12},{f : 9, g : 99})", {a : 8 , b : 22, c : 99, d : 12, f: 9, g : 99})
b("assocIn,1", "f.assocIn({ a : 12 },['a'],42)", { a :42 });
b("assocIn,2", "f.assocIn({ a : 12 },['b'],42)", { a :12, b : 42 });
b("assocIn,3", "f.assocIn({ a : 12, b : [1, 2, 3] },['b',0],42)", { a : 12, b : [42, 2, 3] });
b("getIn,1",  "f.getIn({ a : { c : 4}}, ['a','c', 'd', 'z'])", null);
b("getIn,2",  "f.getIn({ a : { c : 4}}, ['j'])", null);
b("getIn,3",  "f.getIn({ a : { c : 4}}, ['a','c'])", 4);
b("getIn,4",  "f.getIn({ a : { c : 4}}, ['a'])", { c :  4 });


const end = f.end();

const nbNPassed = asserts.filter(x=>!x.testPassed).length;
const nbPassed = asserts.filter(x=>x.testPassed).length;
const ok =  nbPassed == asserts.length;

const nbInfo = `${asserts.length} asserts have run in ${end} ms.`
const passed = '<h1>' +  (ok ? "Tests Passed!" : "Tests DID NOT pass") + '</h1>';
const node_p = (typeof window === 'undefined')

if (node_p) {
    console.log(nbInfo); 
    if (ok) {

	console.log(`${asserts.length} tests Passed!`); 
    }   else {
	console.log(asserts.filter(x=>!x.testPassed));
	console.log("Tests *DID NOT*  Pass!"); 
        console.log(`Nb Failed : ${nbNPassed}`);
        console.log(`Nb Total : ${asserts.length}`);
    }
}


if (!node_p) {


    const rows =  map(x => `<tr>
<td>${x.test}</td>
<td>${x.codeString}</td>
<td>${JSON.stringify(x.expected)}</td>
<td>${JSON.stringify(eval(x.codeString))}</td>
<td>${x.testPassed}</td>
</tr>`,asserts.sort((x,y)=>x.testPassed > y.testPassed ? 1 : -1));
    
    const tbl = `${passed}
<table>
<tr><th>Nb of tests </th><td>${asserts.length} </td></tr>
<tr><th>Passed </th><td>${nbPassed} </td></tr>
<tr><th>Not Passed </th><td>${nbNPassed} </td></tr>
</table>
<br/><br/>
<table>
<tr><th>Name test</th><th>Code<th>Expected</th><th>Actual</th><th>Passed</th></tr>
${rows.join("")}
</table>`; 
    document.querySelector("#main").innerHTML = tbl;

}


