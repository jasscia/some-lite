//深拷贝
function depclone(obj){
  if(typeof obj!=="object"){
    return obj
  }
  if(Object.is(obj,null)){
    return obj
  }
  let result=Array.isArray(obj)?[]:{};
  for(key in obj){
    result[key]=typeof obj[key]==='Object'?depclone(obj[key]):obj[key]
  }
  return result
}
  
  a=[1,2,{1:1,2:2}]
  b=a
  c=depclone(a)
  b[2]={3:3}
  console.log(a,b,c)

//Promise
  function myPromise(fn) {
    var value = null,
        status="pending",
        resfnList = [];
        rejfnList=[];
    this.then = function (onFulfilled) {
      if(status==="pending"){
        resfnList.push(onFulfilled);
//         console.log(resfnList.length)
        return this
      }
      onFulfilled(value)
      return this
    };
    function resolve(value) {
        status="fulfilled";
        value=value;
        resfnList.forEach(function (resFn) {
            resFn(value);
        });
    }
    fn(resolve);
}

var mypromise  = new myPromise(function(resolve){
    setTimeout(function(){
        resolve("resolve");
    },0)
}).then(function(value){
    console.log(value); 
}).then((value)=>console.log(value))
.then(function(value){
    console.log(value); 
}).then((value)=>console.log(value))


function curring(fn){
  let _args=[]
  return function(){
    if(arguments.length===0){
      return fn(..._args)
    }
    _args=[].concat.apply(_args,arguments)
    return arguments.callee
  }
}
var multi=function () {
  var total = 0;
  if(!arguments.length){
    return
  }
  total=[].slice.call(arguments).reduce((a,b)=>{return a+b})
  return total;
};
sum=curring(multi)
sum(100)(100)(1)
a=sum()
console.log(a)
  export{
    depclone,
    myPromise,
    curring
  }