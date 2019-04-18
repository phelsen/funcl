const errMsg = {
    "nb" : "Function expected numeric input",
    "countable" : "Trying to count something not countable"
}

//  ___abcdef =>  internals, not in tests, interface changeable at any time
const  ___start = () =>  {
    window.___funcl_start__ =  new Date().getTime();
}

const   ___end  = ()  => {
    console.log(new Date().getTime() -  window.___funcl_start__);
}

const  ___eqAtoms = (a,b) => {
    if (type(a)!=type(b)) {
	return false;
    }

    if (date_p(a)) {
	return a.getTime()===b.getTime()
    }

    if (regexp_p(a)) {
	return a.toString() === b.toString();
    }
    return a === b;
}


const ___eqPrimitiveMaps = (m1,m2) => {
    const keys1 = Object.keys(m1);
    const vals1 = Object.values(m1);
    const keys2 = Object.keys(m1);
    const vals2 = Object.values(m1);
    const arrEq = ___eqPrimitiveArrays.bind(this);
    const uniq = ___uniqShallow;
    return arrEq(uniq(keys1),uniq(keys2)) &&
	   arrEq(uniq(vals1),uniq(vals2));
}


const ___eqPrimitiveArrays = (a,b) =>  { // not tested
    // asserts only top level
    let counter = 0;
    if (!(array_p(a)) || !(array_p(b))) {
	return false;
    }
    if (a.length != b.length) {
	return false;
    }
    for (let i = 0; i < a.length; i++) {
	if (atom_p(a[i])) {
	    if (!___eqAtoms(a[i],b[i])) {
		return false;
	    }
	}
	if (!(atom_p(a[i])) && (type(a[i]) != type(b[i]))) {
	    return false;
	}

    }
    return true;
}

const ___uniqShallow = (arr) => { // untested
    const out = [];
    for (let i=0; i<arr.length; i++) {
	if (out.indexOf(arr[i])===-1) {
	    out.push(arr[i])
	}
    }
    return out;
}

const ___mapKeepPrimitives = (map) => {
    const out = {};
    const keys_ = Object.keys(map);
    keys_.forEach(k => {
	if (atom_p(map[k])) {
	    out[k] = map[k];
	}
    });
    return out;
}

const ___mapKeepCollections = (map) => {
    const out = {};
    const keys_ = Object.keys(map);
    keys_.forEach(k => {
	if (!atom_p(map[k])) {
	    out[k] = map[k];
	}
    });
    return out;
}



// precondition
const pre = (x, conditionFn ,msgCode,fn) => { // tested
    if (conditionFn(x)) {
	return  fn(x)
    }
    const err = new Error(errMsg[msgCode]);
    throw err;
}


// predicates
// ex: neg? => neg_p
const array_p =  x  => Array.isArray(x) // tested
const atom_p = x => typeof x != "undefined" &&  (x !== Object(x) || x instanceof Date || x instanceof Boolean || x instanceof RegExp) // tested
const boolean_p = x =>  typeof x === "boolean" // tested
const coll_p = x => (array_p(x) || map_p(x)) // tested
const countable_p = x => (string_p(x) || coll_p(x));
const date_p = x => x instanceof Date// tested
const even_p = x =>  pre(x,number_p,"nb", x => x % 2 === 0)  // tested
const function_p =  x => typeof x === "function" // tested
const map_p =  x => typeof x === 'object' && x !==null //tested
	       && !Array.isArray(x)
	       && Object.keys(x).length === Object.values(x).length
	       && !(x instanceof RegExp)
	       && !(x instanceof Boolean)
	       && !(x instanceof Date)
const neg_p = x =>  pre(x,number_p,"nb", x => x < 0)  // tested
const pos_p = x =>  pre(x,number_p,"nb", x => x > 0)  //  tested
const zero_p = x =>  pre(x,number_p,"nb", x => x === 0)  // tested
const number_p =  x => typeof x === "number" // tested
const odd_p = (x) => pre(x,number_p,"nb", x => x % 2 === 1)  // tested
const regexp_p =  x => x instanceof RegExp // tested
const string_p =  x => typeof x === "string" //  tested
const undefined_p =  x => typeof x ==="undefined"// tested

// type and comparisation // type: tested
const type = (x) =>  array_p(x)  ?  "array"
		   : string_p(x) ? "string"
		   : number_p(x) ? "number"
		   : map_p(x)  ? "map"
		   : x instanceof RegExp ? "regexp"
		   : x instanceof Boolean ? "boolean"
		   : x instanceof Date ? "date"
		   : undefined_p(x) ?  "undefined"
		   : function_p(x) ? "function"
		   : x === null ? "null"
		   : typeof x;


const eq = (a,b) =>  {  //tested
    if   (type(a) !== type(b)) {
	return false;
    }

    if (atom_p(a)) {
	return ___eqAtoms(a,b);
    }

    const arrEq = ___eqPrimitiveArrays;

    if (array_p(a)) {
	const topEqual = arrEq(a,b);
	if (!topEqual) return false;
	let  childsEqual = true;
	for (let i=0; i<a.length; i++) {
	    if (!eq(a[i],b[i])) {
		childsEqual = false;
		break;}}
	return childsEqual;

    }

    if (map_p(a)) {
	const keysA = Object.keys(a);
	const keysB = Object.keys(b);
	if (keysA.length !== keysB.length) {
	    return false
	}


	const primitivesA = ___mapKeepPrimitives(a);
	const primitivesB = ___mapKeepPrimitives(b);

	if (!___eqPrimitiveMaps(primitivesA,primitivesB)) {
	    return false;
	}

	const nonPrimitivesA = ___mapKeepCollections(a);
	const nonPrimitivesB = ___mapKeepCollections(b);

	if (nonPrimitivesA.length==0 && nonPrimitivesB.length==0) {
	    return true;
	}

	const npKA = Object.keys(nonPrimitivesA);
	const npKB = Object.keys(nonPrimitivesB);

	for (let i=0; i<npKA.length; i++) {
	    if (!eq(nonPrimitivesA[npKA[i]],nonPrimitivesB[npKA[i]])) {
		return false;
	    }
	}
	return true;
    }

}

// strings
const upperCase = x => x.toUpperCase()
const lowerCase = x => x.toLowerCase()


///math,
const inc = x => x+1  /// untested
const dec = x => x-1
const sqr = x => x * x // untested



// collection forming
const assoc = (coll,...kvs) => {
    if (!map_p(coll)) {
	return partialR(assoc,coll,...kvs)    }
    const c = clone(coll);
    for(let i=0; i<kvs.length; i += 2) {
	c[kvs[i]] = kvs[i+1];
    }
    return c;
}


// collection parts
const first = coll => array_p(coll) ? coll[0] : map_2mapEntries(coll)[0];
const last = coll =>  array_p(coll) ?  coll[coll.length-1] : last(map_2mapEntries(coll))
const rest = (coll) => coll.slice(1)
const nth = (coll,n) =>  array_p(coll) ? coll[n] : nth(map_2mapEntries(coll),n)
const drop = (coll,n) => n <= 0 ? coll : coll.slice(n)
const takeLast = (coll,n) => coll.slice(-n)
const take = (coll,n) => coll.slice(0,n)
const takeWhile = (pred, coll) => {
    const ret = [];
    for (let el of coll) if (pred(el))  { ret.push(el); }  else break;
    return ret;
}




// collection properties
// tested
const  count = (coll) =>
    pre(coll, countable_p, "countable",
	x =>  Array.isArray(coll) || string_p(coll)  ? coll.length
	    : map_p(coll) ? Object.keys(coll).length : false )

// collection parts


// function modulators
//tested
const partial = (f,...args) => {
    //tested
    return f.bind(null,...args);
}

const  partialR = (fn, ...args) => {
    return function(...args2) {
	return fn(...args2, ...args);
    };
}

// sequence ops.
const map = (f,coll) => {
    // tested
    if (!coll)  {
	return partial(map,f);
    };


    if (array_p(coll)) {
	return coll.map(x => f(x));
    };

    if (string_p(coll)) {
	return coll.split("").map(f)
    }

    return  function_p(f) && coll_p(coll)
       ?   Object.keys(coll).map(
	   k => {
	       const v = coll[k];
	       return f([k,v])
	   })
	 : new Error(`'map' expects (function, collection)`)
}
// collection alterators that keep size (count(coll))
const concat = (...x)=> array_p(first(x))  ? [].concat(...x) : Object.assign({},...x)
const map_2mapEntries =  m => map(x => [x[0],x[1]],m)
const mapEntries_2map =  mes => Object.assign({}, ...mes.map(me =>  ({ [me[0]] : me[1] })))


const filter = (f,coll) => { // untested
    // tested
    if (!coll)  {
	return partial(filter,f);
    };

    if (array_p(coll)) {
	return coll.filter(x => f(x));
    };

    return  function_p(f) && coll_p(coll)
       ?   Object.keys(coll).filter(
	   k => {
	       const v = coll[k];
	       return f([k,v])
	   })
	 : new Error(`'filter' expects (function, collection)`)
}

const reduce = (f,coll) => { //untested
    // tested
    if (!coll)  {
	return partial(reduce,f);
    };

    if (array_p(coll)) {
	return coll.reduce(f);
    };

    return  function_p(f) && map_p(coll)
	 ? map_2mapEntries(coll).reduce(
	     (me1,me2)  => {
		 const res = f(me1,me2);
		 return  res;
	     })
	 : new Error(`'reduce' expects (function, collection)`)
}




// utils
const  range = (x,y,step) => {// untested
    return (x<0 || y <= x) ? [] :
	   !y ?  [...Array(x).keys()] :
	   !step
	 ? [...Array(y-x).keys()].map(n => n +  x)
	 : new Error("step not supperted yet")
}

const  cloneAtom = (el) =>  {
    if (date_p(el)) {
	return new Date(el);
    }
    return el;
}


const clone = (el) =>  {
    if (atom_p(el)) {
	return  cloneAtom(el);
    }

    if (array_p(el)) {
	const arr = [];
	el.forEach(x => arr.push(clone(x))) ;
	return arr;
    }

    if (map_p(el)) {
	const obj = {}
	Object.keys(el).forEach( k => { obj[k] = clone(el[k]); });
	return obj;
    }
}


const pipe = (el,...fns) => { // tested
    let curResult = el;
    fns.forEach(f =>   {curResult = f(curResult)});
    return curResult;
}

const reverse =  coll =>   Array.isArray (coll) ?  clone(coll).reverse () : coll.split("").reverse ().join("")


export   {
    array_p, assoc, atom_p, boolean_p, clone, coll_p, concat, count, countable_p, date_p, dec, drop, eq, even_p, filter, first, function_p, inc, last, lowerCase, map, mapEntries_2map, map_p, map_2mapEntries, neg_p, nth, number_p, odd_p, partial, partialR, pipe, pos_p, range, reduce, reverse, regexp_p, rest, string_p, sqr, takeLast, takeWhile, type, undefined_p, upperCase, zero_p}
