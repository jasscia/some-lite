# some-lite
一些小实现
### 1 用CSS动画实现的一个 行走的钟表
* 主要技术 CSS animation
* 代码在 [jsbin 链接](http://jsbin.com/sujocexuyi/edit?html,css,js,output)
* 效果图<br/>
![](./clock.png)
### 2 用js完成一个 四人赛制比赛的人员速配的实现方案，适用于各类球类比赛 四人双打的比赛规制，例如在羽毛球比赛中，根据报名人数，自动完成人员配对
* 主要技术 人员配对算法，详见class AganistPlal中，关键点在于：
> step1:完找出所有可能的队友组合，形成数组;<br>
***
> step2:遍历step1中的数组，将不同队友组进行配对（如果一个人同时出现在 战队的两方中，该种配对组合方式不成成立），形成所有可能的配对组合;<br>
***
> step3:根据每个人 与其他任何成员 成为队友的机会只有一起次的原则，过滤step2中的可能配对组合 后，形成最终的配对组合.<br>
* 代码在 [jsbin 链接](http://jsbin.com/nulowobazu/1/edit?html,js,console,output)
