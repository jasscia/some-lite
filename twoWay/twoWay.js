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
  depend(){
    if (Dep.target) {
      Dep.target.addDep(this)
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
  }
  get(){
    pushTarget(this)
    const vm=this.vm
    let value=this.getter()
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
class Observer{
  constructor(state){
    this.state=state;
    this.dep=new Dep()
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
    for (let i = 0; i < keys.length; i++) {
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
  const dep = new Dep()
  //处理children
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      console.log(`调用get获取值，key为${key}值为${val}`)
        const value = val
        if (Dep.target) {
          dep.depend()
          if (childOb) {
            childOb.dep.depend()
          }
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
function protoAugment (target,src) {
  target.__proto__ = src
}
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
        dependArray(e)
    }
  }
}


// 测试：
let data={
  name:'zane',
  blog:'https://blog.seosiwei.com/',
  hobby:['basketball','football'],
  list:[
      {name:'zhangsan'},
      {name:'lishi'}
  ]
}

let getUpdates = (vm)=>{
  console.log('默认调用一次，进行依赖收集')
  return vm
}
let watcher=new Watcher(this,getUpdates)
observe(data)


data.name
data.hobby

data.name = 'zhangshan'
data.hobby.push('volleyball')

data.blog = 'http://www.seosiwei.com/'
data.list.push({name:'xiaowang'})

console.log(Dep.target)

