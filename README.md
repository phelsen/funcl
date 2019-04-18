
# Funcl!

|||
|--- |--- |
|range(10);|[0,1,2,3,4,5,6,7,8,9]|
|arr=range(1,11); arr|[1,2,3,4,5,6,7,8,9,10]|
|count(arr)|10|
|reverse(arr)|[10,9,8,7,6,5,4,3,2,1]|
|count('λλ FUNCL! λλ')|12|
|reverse('λλ FUNCL! λλ' )|"λλ !LCNUF λλ"|
|[first(arr), last(arr)]|[1,10]|
|rest(arr)|[2,3,4,5,6,7,8,9,10]|
|takeWhile(x => x < 5, arr)|[1,2,3,4]|
|takeLast(3, arr)|[8,9,10]|
|map(sqr,arr)|[1,4,9,16,25,36,49,64,81,100]|
|pipe(arr,map(sqr),reverse,map(x=>x+100),filter(odd_p))|[181,149,125,109,101]|
|dict={}; assoc(dict, 'fn' , 'Bar' , 'ln', 'Foo')|{"fn":"Bar","ln":"Foo"}|