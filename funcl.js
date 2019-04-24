const errMsg = {
    "countable" : "Trying to count something not countable",
    "nb" : "Function expected numeric input",
    "outofindex" : "Out of index"
}

const start = () =>  {
    window.___funcl_start__ =  new Date().getTime();
}

const end  = ()  => {
    console.log(new Date().getTime() -  window.___funcl_start__);
    delete window.___funcl_start__;
}

const ___INLINE_addOrRemove =  (arr, value) =>  {
    if (!array_p(arr)) {
	debugger;
	console.log("---->>>>",arr,value);
    }
	var index = arr.indexOf(value);
	if (index === -1) {
            arr.push(value);
	} else {
            arr.splice(index, 1);
	}
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
    debugger ;
    const keys1 = Object.keys(m1);
    const vals1 = Object.values(m1);
    const keys2 = Object.keys(m2);
    const vals2 = Object.values(m2);
    const arrEq = ___eqPrimitiveArrays.bind(this);
    const uniq = ___uniqShallow;
    return ___eqSets(uniq(keys1),uniq(keys2)) &&
	___eqSets(uniq(vals1),uniq(vals2));
}

const ___eqSets = (s1,s2) => {
    return ___eqPrimitiveArrays(sort(s1), sort(s2))
}



const ___eqPrimitiveArrays = (a,b) =>  { 
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

const ___uniqShallow = (arr) => { 
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



const pre = (x,msgCode) => {
    if (x) {
	return  true
    }
    const err = new Error(errMsg[msgCode]);
    throw err;
}

const array_p =  x  => Array.isArray(x)
const atom_p = x => typeof x != "undefined" &&  (x !== Object(x) || x instanceof Date || x instanceof Boolean || x instanceof RegExp) 
const boolean_p = x =>  typeof x === "boolean" 
const coll_p = x => (array_p(x) || map_p(x))  
const countable_p = x => (string_p(x) || coll_p(x));
const date_p = x => x instanceof Date
const even_p = x =>  pre(number_p(x),"nb") && x % 2 === 0  
const function_p =  x => typeof x === "function" 
const map_p =  x => typeof x === 'object' && x !==null 
      && !Array.isArray(x)
      && Object.keys(x).length === Object.values(x).length
      && !(x instanceof RegExp)
      && !(x instanceof Boolean)
      && !(x instanceof Date)
const neg_p = x => pre(number_p(x),"nb") &&  x < 0  
const pos_p = x => pre(number_p(x),"nb") && x > 0 
const zero_p = x => pre(number_p(x),"nb") && x === 0  
const number_p = x => typeof x === "number" 
const odd_p =  x => pre(number_p(x),"nb") && x % 2 === 1 
const regexp_p =  x => x instanceof RegExp 
const string_p =  x => typeof x === "string" 
const undefined_p =  x => typeof x ==="undefined"
const defined_p = x => typeof x !=="undefined"

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


const eq = (a,b) =>  {  
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


const upperCase = x => x.toUpperCase()
const lowerCase = x => x.toLowerCase()
const inc = x => x+1  
const dec = x => x-1
const sqr = x => x * x 
const assoc = (coll,...kvs) => {
    if (!map_p(coll)) {
	return partialR(assoc,coll,...kvs)    }
    const c = clone(coll);
    for(let i=0; i<kvs.length; i += 2) {
	c[kvs[i]] = kvs[i+1];
    }
    return c;
}

// set
const toggle = (coll,el) => {
    if (!el)  { return partialR(toggle,coll) }
    const clonedSet = clone(coll); 
    ___INLINE_addOrRemove(clonedSet,el);
    return clonedSet; 
}

const first = coll => array_p(coll) ? coll[0] : map_2mapEntries(coll)[0];
const last = coll =>  array_p(coll) ?  coll[coll.length-1] : last(map_2mapEntries(coll))
const rest = (coll) => coll.slice(1)
const nth = (coll,n) =>  n ? (pre(count(coll)>=n,"outofindex") && array_p(coll) ? coll[n] : nth(map_2mapEntries(coll),n)) :  c2 => partialR(nth,coll)(c2)

const drop = (n,coll) => coll ? (n <= 0 ? coll : coll.slice(n)) : c2 => partial(drop,n)(c2)
const take = (n,coll) => coll ?  coll.slice(0,n) : c2 => partial(take,n) (c2)

const takeLast = (n,coll) =>  coll ? coll.slice(-n) : c2 => partial(takeLast,n)(c2)
const takeWhile = (pred, coll) => {
    if (!coll) {
	return partial(takeWhile,pred)
    }
    const ret = [];
    for (let el of coll) if (pred(el))  { ret.push(el); }  else break;
    return ret;
}

const  count = (coll) => {
    pre(countable_p(coll), "countable"); 
     return Array.isArray(coll) || string_p(coll)  ? coll.length
	: map_p(coll) ? Object.keys(coll).length : false
}

const partial = (f,...args) => {
    return f.bind(null,...args);
}

const  partialR = (fn, ...args) => {
    return function(...args2) {
	const newArgs = [].concat(args2,args);
	return fn(...newArgs);
    };
}

const map = (f,coll) => {
    
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
const concat = (...x)=> array_p(first(x))  ? [].concat(...x) : Object.assign({},...x)
const map_2mapEntries =  m => map(x => [x[0],x[1]],m)
const mapEntries_2map =  mes => Object.assign({}, ...mes.map(me =>  ({ [me[0]] : me[1] })))


const filter = (f,coll) => { 

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

const reduce = (f,coll) => {
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


const  range = (x,y,step) => {
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


const pipe = (el,...fns) => {  
    let curResult = el;
    fns.forEach(f =>   {curResult = f(curResult)});
    return curResult;
}

const reverse =  coll =>   Array.isArray (coll) ?  clone(coll).reverse () : coll.split("").reverse ().join("")


const getIn__ =  (m, ks, notFound) => {
	const notFoundFn  = _ => undefined_p(notFound) ? null : notFound; 
    return ks.reduce((obj, key) =>
			 (defined_p(obj) && defined_p(obj[key]))
			      ? obj[key]
			      : notFoundFn(), m);
    }

const sortBy = (fn,coll) =>  {
    return coll.sort((x,y) => fn(x) > fn(y) ? 1 : -1)
}


const getIn = (m,ks,notFound) => getIn__(clone(m),ks,notFound); 
const sort = (coll) => coll.sort();

const toExport = {
    sortBy,
    array_p,
    assoc,
    atom_p,
    boolean_p,
    clone,
    coll_p,
    concat,
    count,
    countable_p,
    date_p,
    dec,
    defined_p,
    drop,
    end,
    even_p,
    eq,
    filter,
    first,
    function_p,
    getIn,
    inc,
    last,
    lowerCase,
    map,
    mapEntries_2map,
    map_p,
    map_2mapEntries,
    neg_p,
    nth,
    number_p,
    odd_p,
    partial,
    partialR,
    pipe,
    pos_p,
    range,
    reduce,
    reverse,
    regexp_p,
    rest,
    sort,
    start,
    string_p,
    sqr,
    take,
    takeLast,
    takeWhile,
    toggle,
    type,
    undefined_p,
    upperCase,
    zero_p
}

module.exports = toExport; 
