//实现一个被监听的数组
var ArrayProto=Array.prototype;
var ArrayMethod=Object.create(ArrayProto);
['push','pop','shift','unshift','splice','sort','reverse'].forEach(method => {
  Object.defineProperty(ArrayMethod,method,{
    value:function mutator(){
      const originMethod=ArrayProto[method]
      let arg=Array.from(arguments)//确保将arguments转变成数组 即使只有一个参数
      originMethod.apply(this,arg)//这里的this指向调用 method的那个对象

      const ob=this.__ob__;//一旦调用method方法 则会触发 观察者的dep的notify 
      ob.dep.notify()
    }
  })
})

//定义Dep类 每个state及其子属性 都有一个dep实力
class Dep{
  constructor(){
    this.subs=[]
  }
  addSub(watcher){
    this.subs.push(watcher)
  }
  notify(){
    for(let sub of this.subs){
      sub.update()
    }
  }
  depend(){//收集依赖
    if (Dep.target) {
      Dep.target.addDep(this)
      console.log('addDep',this,Dep.target)
    }
  }
}
function pushTarget(watcher){
  Dep.target=watcher
}

//定义 watcher类，具有update
class Watcher{
  constructor(vm,expOrFn,cb,options){
    this.vm=vm;
    this.getter=expOrFn;
    this.cb=cb;
    this.newDep=[];
    this.value =this.get()
    console.log('this in watcher:',this)
  }
  get(){
    pushTarget(this)
    const vm=this.vm
    let value=this.getter.call(vm,vm)
    return value
  }
  addDep (dep) {
    this.newDep.push(dep)
    dep.addSub(this)
  }
  update(){
    this.run()
  }
  run(){
		console.log(`这里会去执行Vue的diff相关方法，进而更新数据`)
  }
}
//定义Observer
const arrayKeys=Object.getOwnPropertyNames(ArrayMethod)
console.log('arrayKey in Observer',arrayKeys)
class Observer{
  constructor(state){
    this.state=state;
    this.dep=new Dep()
    console.log('dep in Observer',this.dep)
    state.__ob__=this
    if(Array.isArray(state)){
      const augment = state.__proto__ ? protoAugment : copyAugment  
      augment(state, ArrayMethod, arrayKeys)
      this.observeArray(state)
    }else{
      this.walk(state)
    }
  }
  walk (obj) {
    const keys = Object.keys(obj)
    console.log('key of obj=',keys,obj)
    for (let i = 0; i < keys.length; i++) {
      //此处我做了拦截处理，防止死循环，Vue中在oberve函数中进行的处理
      if(keys[i]=='__ob__') return;
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
  observeArray (items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
function observe(state){
	if(typeof(state) != 'object' ) return;
	let ob = new Observer(state)
  return ob;
}
function defineReactive (obj,key,val) {
  console.log('defineReactive,key=',key)
  const dep = new Dep()
  //处理children
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      console.log(`调用get获取值，key为${key}值为${val}`)
      console.log('Dep',Dep.target)
        const value = val
        if (Dep.target) {
          dep.depend()
          if (childOb) {
            console.log('childOb',childOb)
            childOb.dep.depend()
          }
          //此处是对Array数据类型的依赖收集
          if (Array.isArray(value)) {
              dependArray(value)
          }
        }
        return value
    },
    set: function reactiveSetter (newVal) {
      console.log(`调用了set，key为${key}值为${newVal}`)
        const value = val
         val = newVal
        childOb = observe(newVal)
        dep.notify()
    }
  })
}
//重新赋值Array的__proto__属性
function protoAugment (target,src) {
  target.__proto__ = src
}
//不支持__proto__的直接修改相关属性方法
function copyAugment (target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    target[key]=src[key]
  }
}
function dependArray (value) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
    	//循环遍历chindren进行依赖收集
        dependArray(e)
    }
  }
}


// 测试：
// 定义一个data对象：
let data={
  name:'zane',
  blog:'https://blog.seosiwei.com/',
  hobby:['basketball','football'],
  list:[
      {name:'zhangsan'},
      {name:'lishi'}
  ]
}

// 调用watcher，并进行数据监听
let getUpdates = (vm)=>{
	console.log('默认调用一次，进行依赖收集')
}
new Watcher(this,getUpdates)
observe(data)

// 调用get收集依赖

//收集name依赖
data.name
//收集hobby依赖
data.hobby
// 测试数据监听

data.name = 'zhangshan'
data.hobby.push('volleyball')

data.blog = 'http://www.seosiwei.com/'
data.list.push({name:'xiaowang'})


