'use strict';
/* 
- consts
- internals 
- fundamentals
conj, cons, clone, eq, partial, partialR, pipe, vector, vals, keys, hashMap
- string
toUpperCase, toLowerCase
- math 
isEven, isOdd, sqr, isMultipleOf, sum
- seqs 
conj, concat,  first, last, nth, seq , map, filter, reduce
- sets 
difference, union, intersection
- misc 
toClj, toJs
*/

// consts
const _ERR_KEYS = { ERR_NOT_COUNTABLE  : "ERR_NOT_COUNTABLE",
                    ERR_NOT_NUMERIC  : "ERR_NOT_NUMERIC", 
                    ERR_OUT_OF_INDEX : "ERR_OUT_OF_INDEX",
                    ERR_NOT_SEQ : "ERR_NOT_SEQ"
                  } 
const errMsg = {
    "ERR_NOT_COUNTABLE" : "Trying to count something not countable",
    "ERR_NOT_NUMERIC" : "Function expected numeric input",
    "ERR_OUT_OF_INDEX" : "Out of index",
    "ERR_NOT_SEQ" : "The given argument is not seqable"
}


// internals
const _INLINE_addOrRemove =  (arr, value) =>  {
    if (!isArray(arr)) {
        console.log("---->>>>",arr,value);
    }
        var index = arr.indexOf(value);
        if (index === -1) {
            arr.push(value);
        } else {
            arr.splice(index, 1);
        }
}

const _map_2Object = (map) => {
  const o = {};
    map.forEach(function (k,v) {    o[k] = v;  });
    return o;
}

const  _eqAtoms = (a,b) => {
    
    if (type(a)!=type(b)) {
        return false;
    }

    if (isDate(a)) {
        return a.getTime()===b.getTime()
    }

    if (isRegexp(a)) {
        return a.toString() === b.toString();
    }
    
    return a === b;
}


const _eqPrimitiveMaps = (m1,m2) => {
    const keys1 = Object.keys(m1);
    const vals1 = Object.values(m1);
    const keys2 = Object.keys(m2);
    const vals2 = Object.values(m2);
    const arrEq = _eqPrimitiveArrays.bind(this);
    const uniq = _uniqShallow;
    return eqSets(uniq(keys1),uniq(keys2)) &&
        eqSets(uniq(vals1),uniq(vals2));
}


const __partitionHelp = (n, a) =>  a.length ? [a.splice(0, n)].concat(__partitionHelp(n,a)) : [];
// to mimic clojure behaviour : a partition that isn't full lenght doesn't get returned 
const partition = (n,a) => {  const r1 = __partitionHelp(n,clone(a));  return r1[r1.length-1].length == r1[0].length ? r1 : r1.slice(0,-1) }
// todo : signature to (...a)
const interleave2 = (a1, a2) => { const [b1,b2] = [a1.slice(0,a2.length),a2.slice(0,a1.length)];
                                 return b1.reduce((ret, el, i) => ret.concat(el, b2[i]), []);
                               }

const cons =  (el,s) => {
    const ar = clone(seq(s));
    ar.unshift(el);
    return ar; 
}

const identity = x => x

const i = (...s) => {

    if (s.length===0) {
        return []
    }
    if (s.length===1) {
        return seq(s);
    }
    if (s.length==2) {
        const [s1,s2] = [seq(s[0]),seq(s[1])]

        if (s1.length > 0 && s2.length > 0) {
            const ret = cons(first(s1),cons(first(s2),i( rest (s1) ,rest (s2))))

            return  ret;
        } else { return []}
    }
    if (s.length > 2) {
        const [s1,s2] = [seq(s[0]),seq(s[1])];
        const colls = drop(2,s);
        const ss = map(seq, conj(colls,s2,s1))

        return isEvery(identity,ss) ?   concat(map(first,ss),i(...i(map(rest,ss)))) : []; 
    }
 }


const isEvery = (pred,sq) => sq && sq.reduce((sum,el)=>  sum && pred(el),true)

//time
const start = () =>  {
    const _global = typeof window != "undefined" ? window : global;
   _global._funcl_start__ =  new Date().getTime();
}

const end  = ()  => {
    const _global = typeof window != "undefined" ? window : global;
    return (new Date().getTime() - _global._funcl_start__);
}


const eqSets = (s1,s2) => {
    return _eqPrimitiveArrays(sort(s1), sort(s2));
}

const _eqPrimitiveArrays = (a,b) =>  { 
    if (!(isArray(a)) || !(isArray(b))) {
        return false;
    }
    if (a.length != b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (isAtom(a[i])) {
            if (!_eqAtoms(a[i],b[i])) {
                return false;
            }
        }
        if (!(isAtom(a[i])) && (type(a[i]) != type(b[i]))) {
            return false;
        }

    }
    return true;
}

const _uniqShallow = (arr) => { 
    const out = [];
    for (let i=0; i<arr.length; i++) {
        if (out.indexOf(arr[i])===-1) {
            out.push(arr[i])
        }
    }
    return out;
}

const _mapKeepPrimitives = (map) => {
    const out = {};
    const keys_ = Object.keys(map);
    keys_.forEach(k => {
        if (isAtom(map[k])) {
            out[k] = map[k];
        }
    });
    return out;
}

const _mapKeepCollections = (map) => {
    const out = {};
    const keys_ = Object.keys(map);
    keys_.forEach(k => {
        if (!isAtom(map[k])) {
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


// type predicates
const isArray =  x  => Array.isArray(x)
const isAtom = x => typeof x != "undefined" &&  (x !== Object(x) || x instanceof Date || x instanceof Boolean || x instanceof RegExp) 
const isBoolean = x =>  typeof x === "boolean" 
const isColl = x => (isArray(x) || isMap(x))  
const isCountable = x => (isString(x) || isColl(x));
const isDate = x => x instanceof Date
const isEven = x =>  pre(isNumber(x),"ERR_NOT_NUMERIC") && x % 2 === 0  
const isFunction =  x => typeof x === "function" 
const isMap =  x => typeof x === 'object' && x !==null 
      && !Array.isArray(x)
      && Object.keys(x).length === Object.values(x).length
      && !(x instanceof RegExp)
      && !(x instanceof Boolean)
      && !(x instanceof Date)
const isNeg = x => pre(isNumber(x),"ERR_NOT_NUMERIC") &&  x < 0  
const isPos = x => pre(isNumber(x),"ERR_NOT_NUMERIC") && x > 0 
const isZero = x => pre(isNumber(x),"ERR_NOT_NUMERIC") && x === 0  
const isNumber = x => typeof x === "number" 
const isOdd =  x => pre(isNumber(x),"ERR_NOT_NUMERIC") && x % 2 !== 0
const isRegexp =  x => x instanceof RegExp 
const isString =  x => typeof x === "string" 
const isUndefined =  x => typeof x ==="undefined"
const isDefined = x => typeof x !=="undefined"
const isDefinedAndNotNull = x => x !== null && typeof x !== "undefined"
const isNull = x => x === null;
// fundamentals
const vector = (...args) => args;

const hashMap = (...args) => {
    const hm = {}
    for (let i=0;  i<Math.ceil(args.length / 2) +1; i+=2) {
        hm[args[i]]=args[i+1];
    }
    return hm; 
}

const vals = (map) => Object.values(map);
const keys = (map) => Object.keys(map);

const type = (x) =>  isArray(x)  ?  "array"
      : isString(x) ? "string"
      : isNumber(x) ? "number"
      : isMap(x)  ? "map"
      : x instanceof RegExp ? "regexp"
      : x instanceof Boolean ? "boolean"
      : x instanceof Date ? "date"
      : isUndefined(x) ?  "undefined"
      : isFunction(x) ? "function"
      : x === null ? "null"
      : typeof x;



const eq = (a,b) =>  {  
    if   (type(a) !== type(b)) {
        return false;
    }

    if (isAtom(a)) {
        return _eqAtoms(a,b);
    }

    const arrEq = _eqPrimitiveArrays;

    if (isArray(a)) {
        const topEqual = arrEq(a,b);
        if (!topEqual) return false;
        let  childsEqual = true;
        for (let i=0; i<a.length; i++) {
            if (!eq(a[i],b[i])) {
                childsEqual = false;
                break;}}
        return childsEqual;

    }

    if (isMap(a)) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) {
            return false
        }


        const primitivesA = _mapKeepPrimitives(a);
        const primitivesB = _mapKeepPrimitives(b);

        if (!_eqPrimitiveMaps(primitivesA,primitivesB)) {
            return false;
        }

        const nonPrimitivesA = _mapKeepCollections(a);
        const nonPrimitivesB = _mapKeepCollections(b);

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

const equals = eq; 


const clone = (el) =>  {
    if (isAtom(el)) {
        return  cloneAtom(el);
    }

    if (isArray(el)) {
        const arr = [];
        el.forEach(x => arr.push(clone(x))) ;
        return arr;
    }

    if (isMap(el)) {
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


const partial = (f,...args) => {
    return f.bind(null,...args);
}

const  partialR = (fn, ...args) => {
    return function(...args2) {
        const newArgs = [].concat(args2,args);
        return fn(...newArgs);
    };
}


// strings 
const upperCase = x => x.toUpperCase()
const lowerCase = x => x.toLowerCase()
const str = x => x.toString()

// math
const inc = x => x+1  
const dec = x => x-1
const sqr = x => x * x
const sum = (...coll) => !isArray(coll[0]) ? coll.reduce((x,y)=>x+y) : sum(...coll[0]); 
const isMultipleOf = (x,y) => y ?  x % y == 0  : partialR(isMultipleOf,x);


const assoc = (coll,...kvs) => {
    if (!isMap(coll) && !isArray(coll)) {
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
    _INLINE_addOrRemove(clonedSet,el);
    return clonedSet; 
}


// seqs
const seq = coll => isArray(coll)  || isString(coll) ? coll
      : isMap(coll) ?   Object.entries(coll)
      : pre(false,_ERR_KEYS.ERR_NOT_SEQ)
const first = coll =>  seq (coll) [0];
const second = coll => seq (coll) [1]
const last = coll =>  { const s = seq(coll); return s[s.length-1] }
const rest = (coll) => seq (coll).slice(1)
const nth = (coll,n) =>  n && pre(count(coll)>=n, _ERR_KEYS.ERR_OUT_OF_INDEX) ?  coll[n] :  c2 => partialR(nth,coll)(c2)
const drop = (n,coll) => coll ? (n <= 0 ? seq (coll) : seq (coll).slice(n)) : c2 => partial(drop,n)(c2)
const take = (n,coll) => coll ?   seq(coll).slice(0,n) : c2 => partial(take,n) (c2)
const takeLast = (n,coll) =>  coll ? seq (coll).slice(-n) : c2 => partial(takeLast,n)(c2)
const takeWhile = (pred, coll) => {
    if (!coll) {
        return partial(takeWhile,pred)
    }
    const ret = [];
    for (let el of seq(coll)) if (pred(el))  { ret.push(el); }  else break;
    return ret;
}

const some = (pred,coll) => {
    
    for (let i = 0; i < coll.length; i++) {

        if (pred(coll[i])) {
            return true;
        }
    }
    return false;
}

const  count = (coll) => {
    if (coll===null || isUndefined(coll)) {
        return 0; 
    }
    pre(isCountable(seq(coll)), "ERR_NOT_COUNTABLE"); 
     return Array.isArray(coll) || isString(coll)  ? coll.length
        : isMap(coll) ? Object.keys(coll).length
        : false
}


const conj =  (c,...el) => {
    if (isMap(c))  {
        const  cc = clone(c)
        el.forEach(m => seq(m).forEach( kv => cc[kv[0]]=kv[1])) 
        return cc;
    }
    if (isArray(c) || isString(c)) {
        return concat(c,el)
    }
}
                             
const concat = (...x) => { const s = map(seq,x); const ret =  [].concat(...s); return isString(ret[0]) ? ret.join("") : ret;  }
const mapEntries_2map =  mes =>  Object.assign({}, ...mes.map(me =>  ({ [me[0]] : me[1] })))

const map  = (f,coll) =>  coll ?    seq(coll).map(x => f(x)) : partial(map,f);
const filter  = (f,coll) =>  coll ?    seq(coll).filter(x => f(x)) : partial(filter,f);
const reduce = (f,coll) =>  coll ? seq(coll).reduce(f) : partial(reduce,f);
const merge = (...c) => isMap(c[0]) ? mapEntries_2map(concat(...c)) : pre(false,_ERR_KEYS.ERR_NOTIMPL);

const  range = (x,y,step) => {
    return (x<0 || y <= x) ? [] :
        !y ?  [...Array(x).keys()] :
        !step
        ? [...Array(y-x).keys()].map(n => n +  x)
        : new Error("step not supperted yet")
}

const  cloneAtom = (el) =>  {
    if (isDate(el)) {
        return new Date(el);
    }
    return el;
}


const reverse =  coll => { const s = seq(coll);  return isArray(s) ? s.reverse() :  s.split("").reverse().join("") }


const get_ = (coll,k,notFound) => {
    if (isArray(coll) || isMap(coll)) {
        return coll[k] || notFound;
    }
    if (isString(coll)) {
        return coll.substr(k,1) || notFound
    }
    return notFound; 
};

const getIn__ =  (m, ks, notFound) => {
    const notFoundFn  = _ => isUndefined(notFound) ? null : notFound;
    return ks.reduce((obj, key) =>
        (isDefinedAndNotNull(obj) && isDefined(obj[key]))
            ? obj[key]
            : notFoundFn(), m);
}

const getIn = (m,ks,notFound) => getIn__(clone(m),ks,notFound); 

const assocIn__ = (m,ks,v) =>  {
    let tempObj = m;
    for (let i = 0; i < (ks.length - 1); i++) {
        const curKey  = ks[i];
        const curVal = tempObj[curKey];
        tempObj = curVal; 
    }
    const lastKey = ks[ks.length-1];
    tempObj[lastKey] = v;
    return m; 
}

const assocIn = (m,ks,v) => assocIn__(clone(m),ks,v);

const sortBy = (fn,coll) =>  {
    return coll.sort((x,y) => fn(x) > fn(y) ? 1 : -1)
}


const isAllOf = (...p) => x => p.reduce((p1,p2) => p1(x) && p2(x))
const isAnyOf = (...p) => x => p.reduce((p1,p2) => p1(x) || p2(x))


const sort = (coll) => coll.sort();

const set = arr => [...new Set(arr)];
const intersection = (...s) =>  count(s)==1 ? partialR(intersection,s[0]) :  [...s.reduce((e1,e2) => e1.filter(x => new Set(e2).has(x)))];
const union = (...s) =>  count(s)==1 ?  partialR(union,s[0]) :  set(s.reduce((e1,e2) => concat([...e1],[...e2])));
const difference  = (...s) => count(s)==1 ? partialR(difference,s[0]) :   [...s.reduce((e1,e2) => e1.filter(x => !(new Set(e2).has(x))))];

// misc
// mori transition support
const toJs = x => x;
const toClj = x => x;

const toExport = {
    assoc,
    assocIn,
    clone,
    concat,
    conj,
    cons,
    count,
    dec,
    difference,
    drop,
    end,
    errMsg,
    eq,
    equals,
    eqSets,
    filter,
    first,
    get : get_,
    getIn,
    getIn__,
    hashMap,
    inc,
    i,
    interleave2,
    intersection,
    isAllOf,
    isArray,
    isAtom,
    isBoolean,
    isColl,
    isCountable,
    isDate,
    isDefined,
    isEven,
    isFunction,
    isMap,
    isMultipleOf,
    isNeg,
    isNull,
    isNumber,
    isOdd,
    isPos,
    isRegexp,
    isAnyOf,
    isString,
    isUndefined,
    isZero,
    keys,
    last,
    lowerCase,
    map,
    mapEntries_2map,
    merge,
    nth,
    partial,
    partialR,
    partition, 
    pipe,
    range,
    reduce,
    rest,
    reverse,
    second,
    seq,
    some,
    sort,
    sortBy,
    sqr,
    sum, 
    start,
    take,
    takeLast,
    takeWhile,
    toClj,
    toJs,
    toggle,
    type,
    union,
    vals,
    vector,
    upperCase,

}

module.exports = toExport; 
