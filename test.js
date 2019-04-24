const f = require("./funcl.js");
const {getIn, array_p, assoc, atom_p, boolean_p, clone, coll_p, concat, count, countable_p, date_p, defined_p,  dec, drop, eq, even_p, filter, first, function_p, inc, last, lowerCase, map, mapEntries_2map, map_p, map_2mapEntries, neg_p, nth, number_p, odd_p, partial, partialR, pipe, pos_p, range, reduce, reverse, regexp_p, rest, string_p, sqr, take, takeLast, takeWhile, type, undefined_p, upperCase, zero_p} = f; 


const cl = console.log;
const assert =  (test, v, expected,codeString) => 
      ({ test : test,
	 v : v ,
	 expected : expected,
	 codeString : codeString,
	 testPassed : f.eq(v,expected)     })

const asserts = [];

const sumOf4 = (w,x,y,z) => w + x + y + z;
const a = (test,v,expected) => asserts.push(assert(test,v,expected));
const b = (test,v,expected) => asserts.push(assert(test,eval(v),expected,v)); 

//;; partials 
b("partial,1", "sumOf4(10,20,30,33)",93);
b("partial,2", "f.partial(sumOf4,10)(10,20,30)",70);
b("partial,3", "f.partial(sumOf4,10)(20,30,100)",160);
b("partial,4", "f.partial(sumOf4,20,50)(20,30)",120);
b("a partial test","f.partial(sumOf4,1,2,3)(4)",10);
b("a partial test","f.partial(sumOf4,1,2)(3,4)",10);
b("a partial test","f.partial(sumOf4,1,2,3)(4)",10);
b("a partial test","f.partial(sumOf4,1,2,3,4)()",10);
b("array?,1","f.array_p([1,2,3])",true);
b("array?,2","f.array_p([])",true);
b("array?,3","f.array_p(1)",false);
b("array?,4","f.array_p(null)",false);
b("array?,5","f.array_p()",false);
b("string?, 1","f.string_p('jos')", true);
b("string?, 2","f.string_p('')", true);
b("string?, 3","f.string_p()", false);
b("string?, 4","f.string_p(null)", false);
b("string?, 5","f.string_p(false)", false);
b("string?, 6","f.string_p(1)", false);
b("map?,1", "f.map_p({})",true);
b("map?,2", "f.map_p({a: 1, b: 2})",true);
b("map?,3", "f.map_p([1,2,3])",false);
b("map?,4", "f.map_p('funcl')",false);
b("map?,5", "f.map_p(new Boolean())",false);
b("map?,6", "f.map_p(true)",false);
b("map?,7", "f.map_p(/regex/)",false);
b("map?,8", "f.map_p(new Date())",false);
b("map?,9", "f.map_p([])",false);
b("map?,10", "f.map_p('')",false);
b("map?,11", "f.map_p()",false);
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
b("atom?,1","f.atom_p(1)",true);
b("atom?,2","f.atom_p(0)",true);
b("atom?,3","f.atom_p()",false);
b("atom?,4","f.atom_p('')",true);
b("atom?,5","f.atom_p('Some string')",true);
b("atom?,6","f.atom_p(new Date())",true);
b("atom?,7","f.atom_p(new RegExp())",true);
b("atom?,8","f.atom_p([1,2,3])",false);
b("atom?,9","f.atom_p([])",false);
b("atom?,10","f.atom_p({})",false);
b("atom?,11","f.atom_p({a :  12})",false);
b("boolean?,1","f.boolean_p (true)", true)
b("boolean?,2","f.boolean_p (false)", true)
b("boolean?,3","f.boolean_p ()", false)
b("boolean?,4","f.boolean_p (2 == 2 )",true)
b("coll?,1", "f.coll_p([])",true)
b("coll?,2", "f.coll_p({})",true)
b("coll?,3", "f.coll_p()",false)
b("coll?,4", "f.coll_p([1,2,3])",true)
b("coll?,5", "f.coll_p([1,{a : 99},2,3])",true)
b("coll?,6", "f.coll_p({ a : 1 })",true)
b("coll?,7", "f.coll_p(null)",false)
b("date?,1", "f.date_p(null)", false)
b("date?,2", "f.date_p(new Date())", true)
b("date?,3", "f.date_p(new Date('2019'))", true)
b("date?,4", "f.date_p(new Object())", false)
b("even?,1", "f.even_p(2)", true)
b("even?,2", "f.even_p(3)", false)
b("even?,3", "f.even_p(0)", true)
b("odd?,1", "f.odd_p(2)", false)
b("odd?,2", "f.odd_p(3)", true)
b("odd?,3", "f.odd_p(0)", false)
b("odd?,4", "(x => { try {  f.even_p('jjo') } catch(e) { return   e.message} })()"  , "Function expected numeric input")
b("fn?,1" , "f.function_p(x => x)", true);
b("fn?,2", "f.function_p()", false);
b("fn?,3", "f.function_p(new Object())", false)
b("fn?,4", "f.function_p(null)", false)
b("fn?,5", "f.function_p(f.odd_p)", true)
b("fn?,6", "f.function_p(function(x) {})", true)
b("fn?,7", "f.function_p([].map)", true)
//type
// ["array", "string", "map", "regexp", "boolean", "undefined", "function", "null"];
b("type1", "f.eq(f.map(f.type.bind(f),[[],'',{},/e/,true,undefined,x=>x,null]),['array', 'string', 'map', 'regexp', 'boolean', 'undefined', 'function', 'null'])",true);
b("type2", "f.eq(f.map(f.type.bind(f),[[1,2,3],'jos',{a: 12 }]),['array', 'string', 'map'])",true);
b("neg?,1","f.neg_p(0)",false)
b("neg?,2","f.neg_p(1)",false)
b("neg?,3","f.neg_p(-1)",true)
b("neg?,4", "{ try {  f.neg_p('jjo') } catch(e) { e.message} }"  , "Function expected numeric input")
b("pos?,1","f.pos_p(0)",false)
b("pos?,2","f.pos_p(1)",true)
b("pos?,3","f.pos_p(-1)",false)
b("pos?,4", "{ try {  f.pos_p('jjo') } catch(e) { e.message} }"  , "Function expected numeric input")
b("zero?,1","f.zero_p(0)",true)
b("zero?,2","f.zero_p(1)",false)
b("zero?,3","f.zero_p(-1)",false)
b("zero?,4", "{ try {  f.zero_p('') } catch(e) {   e.message} }"  , "Function expected numeric input")
b("number_p?,1", "f.number_p(0)",true)
b("number_p?,2", "f.number_p(1e9)",true)
b("number_p?,3", "f.number_p(-89)",true)
b("number_p?,4", "f.number_p('2')",false)
b("number_p?,5", "f.number_p('')",false)
b("number_p?,6", "f.number_p(/1/)",false)
b("number_p?,7", "f.number_p()",false)
b("regexp_p?,1", "f.regexp_p()",false)
b("regexp_p?,2", "f.regexp_p('/jso/')",false)
b("regexp_p?,3", "f.regexp_p(/e/)",true)
b("regexp_p?,1", "f.regexp_p(/\\//)",true)
b("regexp_p?,2", "f.undefined_p()",true)
b("regexp_p?,3", "f.undefined_p(undefined)",true)
b("regexp_p?,4", "f.undefined_p(null)",false)
b("regexp_p?,5", "f.undefined_p(false)",false)
b("count,1", "f.count('skfd')",4)
b("count,2", "f.count([1,2,3,4])",4)
b("count,3", "f.count([])",0)
b("count,4", "f.count({ a: 12 , b: 8, c: [1,2,3,4]})",3)
b("count,5", "{ try {  f.count(new Date()) } catch(e) { e.message} }" , "Trying to count something not countable")
b("countable,1", "f.countable_p(new Date())",false)
b("map,1",  "f.eq(f.map(f.inc, [1,2,3]),[2,3,4])",true);
b("mappipe,1", "f.eq(f.pipe([1,2,3,4],f.map(f.inc),f.map(x=>2*x)),[4,6,8,10])",true);
b("filter,1", "f.eq(f.filter(f.odd_p, [1,2,3,4,5,6]),[1,3,5])",true);
b("filter,2", "f.eq(f.filter(f.even_p,[1,2,3,4,5,6]),[2,4,6])",true);
b("filter,3", "f.eq(f.filter(x => x > 4, [1,2,3,4,5,6]),[5,6])",true);
// fixme : next 2 assume order in map
b("map_2mapEntries,1", "f.eq(f.map_2mapEntries({ a: 1, b: 2, c: 3}), [['a',1],['b',2],['c',3]])",true)
b("map_2mapEntries,1", "f.eq( f.map_2mapEntries({}), [])",true)
//clone
b("date_clone?", "f.date_p(f.clone(new Date()))",true)
//reduce
b("reduce,1", "f.reduce((x,y)=>x, [1,2,3,4])",1);
b("reduce,2", "f.reduce((x,y)=>y, [1,2,3,4])",4);
b("reduce,3", "f.reduce((x,y)=>x+y, [1,2,3,4])",10);
b("reduce,4","f.eq( f.reduce((x,y)=>x, {a : 1 , b : 2, c : 3, d : 4}),[ 'a' , 1])",true);
b("reduce,5","f.eq(f.reduce((x,y)=>y, {a : 1 , b : 2, c : 3, d : 4}),[ 'd' , 4])",true);
//take
b("take,1", "f.take(3,f.range(10))",[0,1,2])
b("take,2", "f.take(3,f.range(1))",[0])
b("take in pipe, 1", "f.pipe([1,2,3],take(2))", [1,2])
b("take in pipe, 2", "f.pipe(range(1,11),map(sqr),filter(odd_p),reverse,take(4),take(2))", [81,49])
b("drop,1", "f.drop(3,f.range(10))",[3,4,5,6,7,8,9])
b("drop,2", "f.drop(3,f.range(1))",[])
b("nth,1", "f.nth(f.range(10),2)",2);
b("nth,3","{ try {  f.nth([1,2,3],10) } catch(e) {    e.message}}","Out of index")
b("assoc,1","f.assoc({}, 'a', 1, 'b', 22)" , { "a" : 1, "b" : 22 });
b("assoc,2","f.pipe({}, f.assoc('a', 1, 'b', 2))" , { "a" : 1, "b" : 2 });

const nbNPassed = asserts.filter(x=>!x.testPassed).length;
const nbPassed = asserts.filter(x=>x.testPassed).length;
const ok =  nbPassed == asserts.length;


const passed = '<h1>' +  (ok ? "Tests Passed!" : "Tests DID NOT pass") + '</h1>';
const node_p = (typeof window === 'undefined')
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

if (node_p) {
    if (ok) {

	console.log(`${asserts.length} tests Passed!`); 
    }   else {
	console.log(asserts.filter(x=>!x.testPassed));
	console.log("Tests *DID NOT*  Pass!"); 
        console.log(`Nb Failed : ${nbNPassed}`);
        console.log(`Nb Tottal : ${asserts.length}`);

    }
}


