**# Vue仿蘑菇街电商项目**



**## 项目安装**

```shell
yarn install
```

**##** 运行截图

- 首页

![ltQHtH.jpg](https://s2.ax1x.com/2020/01/02/ltQHtH.jpg)

![ltQL9A.jpg](https://s2.ax1x.com/2020/01/02/ltQL9A.jpg)

- 商品详情页

![ltQxnf.jpg](https://s2.ax1x.com/2020/01/02/ltQxnf.jpg)

- 分类页

![ltQbhd.jpg](https://s2.ax1x.com/2020/01/02/ltQbhd.jpg)

- 购物车页
- ![ltQ7Ae.jpg](https://s2.ax1x.com/2020/01/02/ltQ7Ae.jpg)

- 个人信息页（无功能）

![ltQXct.jpg](https://s2.ax1x.com/2020/01/02/ltQXct.jpg)



# 起步

### 一. 项目基本设置

#### 1.1. 目录结构

- network
- components -> common/content
- pages -> 路由分层
- common 
- assets
- router
- store



#### 1.2. 设置CSS初始化和全局样式

- initialize.css
- base.css



#### 1.3. tabbar的封装

- 封装HYTabbar
- 封装HYTabbarItem
- 响应点击切换的设计
- 封装完成后，使用时对HYTabbar重新包装



#### 1.4. axios的封装

- 创建axios实例
- 拦截响应，返回.data数据
- 根据传入的options发送请求，并且调用对应resolve和reject



# 项目的一些思路 

### 一. FeatureView

- 独立组件封装FeatureView
  - div>a>img	



### 二. TabControl

- 独立组件的封装
  - props -> titles
  - div>根据titles v-for遍历 div -> span{{title}}
  - css相关
  - 选中哪一个tab, 哪一个tab的文字颜色变色, 下面border-bottom
    - currentIndex



### 三. 首页商品数据的请求

#### 3.1. 设计数据结构, 用于保存数据

goods: {

pop: page/list

new: page/list

sell: page/list

}



#### 3.2. 发送数据请求

- 在home.js中封装getHomeGoods(type, page)
- 在Home.vue中, 又在methods中getHomeGoods(type)
- 调用getHomeGoods('pop')/getHomeGoods('new')/getHomeGoods('sell')
  - page: 动态的获取对应的page
- 获取到数据: res
  - this.goods[type].list.push(...res.data.list)
  - this.goods[type].page += 1

goods: {

pop: page1:/list[30]

new: page1/list[30]

sell: page1/list[30]

}

### 四. 对商品数据进行展示

#### 4.1. 封装GoodsList.vue组件

- props: goods -> list[30]
- v-for goods -> GoodsListItem[30]
- GoodListItem(组件) -> GoodsItem(数据)



#### 4.2. 封装GoodsListItem.vue组件

- props: goodsItem 
- goodsItem 取出数据, 并且使用正确的div/span/img基本标签进行展示



### 五. 对滚动进行重构: Better-Scroll

#### 5.1. 在index.html中使用Better-Scroll

- const bscroll = new BScroll(el, {   })
- 注意: wrapper -> content -> 很多内容
- 1.监听滚动
  - probeType: 0/1/2(手指滚动)/3(只要是滚动)
  - bscroll .on('scroll', (position) => {})
- 2.上拉加载
  - pullUpLoad: true
  - bscroll .on('pullingUp', () => {})
- 3.click: false
  - button可以监听点击
  - div不可以

#### 5.2. 在Vue项目中使用Better-Scroll

- 在Profile.vue中简单的演示
- 对Better-Scroll进行封装: Scroll.vue
- Home.vue和Scroll.vue之间进行通信
  - Home.vue将probeType设置为3
  - Scroll.vue需要通过$emit, 实时将事件发送到Home.vue

### 六. 回到顶部BackTop

#### 6.1. 对BackTop.vue组件的封装



#### 6.2. 如何监听组件的点击

- 直接监听back-top的点击, 但是可以直接监听?
  - 不可以, 必须添加修饰.native
- 回到顶部
  - scroll对象, scroll.scrollTo(x, y, time)
  - this.$refs.scroll.scrollTo(0, 0, 500)



#### 6.3. BackTop组件的显示和隐藏 

- isShowBackTop: false
- 监听滚动, 拿到滚动的位置:
  - -position.y > 1000  -> isShowBackTop: true
  - isShowBackTop = -position.y > 1000





### 七. 解决首页中可滚动区域的问题

- Better-Scroll在决定有多少区域可以滚动时, 是根据scrollerHeight属性决定
  - scrollerHeight属性是根据放Better-Scroll的content中的子组件的高度
  - 但是我们的首页中, 刚开始在计算scrollerHeight属性时, 是没有将图片计算在内的
  - 所以, 计算出来的告诉是错误的(1300+)
  - 后来图片加载进来之后有了新的高度, 但是scrollerHeight属性并没有进行更新.
  - 所以滚动出现了问题
- 如何解决这个问题了?
  - 监听每一张图片是否加载完成, 只要有一张图片加载完成了, 执行一次refresh()
  - 如何监听图片加载完成了?
    - 原生的js监听图片: img.onload = function() {}
    - Vue中监听: @load='方法'
  - 调用scroll的refresh()
- 如何将GoodsListItem.vue中的事件传入到Home.vue中
  - 因为涉及到非父子组件的通信, 所以这里我们选择了**事件总线**
    - bus ->总线
    - Vue.prototype.$bus = new Vue()
    - this.bus.emit('事件名称', 参数)
    - this.bus.on('事件名称', 回调函数(参数))

- 问题一: refresh找不到的问题
  - 第一: 在Scroll.vue中, 调用this.scroll的方法之前, 判断this.scroll对象是否有值
  - 第二: 在mounted生命周期函数中使用 this.$refs.scroll而不是created中
- 问题二: 对于refresh非常频繁的问题, 进行防抖操作
  - 防抖debounce/节流throttle(课下研究一下)
  - 防抖函数起作用的过程:
    - 如果我们直接执行refresh, 那么refresh函数会被执行30次.
    - 可以将refresh函数传入到debounce函数中, 生成一个新的函数.
    - 之后在调用非常频繁的时候, 就使用新生成的函数.
    - 而新生成的函数, 并不会非常频繁的调用, 如果下一次执行来的非常快, 那么会将上一次取消掉

```js
      debounce(func, delay) {
        let timer = null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },
```



### 八. 上拉加载更多的功能

y  ifu

### 九. tabControl的吸顶效果

#### 9.1. 获取到tabControl的offsetTop

- 必须知道滚动到多少时, 开始有吸顶效果, 这个时候就需要获取tabControl的offsetTop
- 但是, 如果直接在mounted中获取tabControl的offsetTop, 那么值是不正确.
- 如何获取正确的值了?
  - 监听HomeSwiper中img的加载完成.
  - 加载完成后, 发出事件, 在Home.vue中, 获取正确的值.
  - 补充:
    - 为了不让HomeSwiper多次发出事件,
    - 可以使用isLoad的变量进行状态的记录.
  - 注意: 这里不进行多次调用和debounce的区别

#### 9.2. 监听滚动, 动态的改变tabControl的样式

- 问题:动态的改变tabControl的样式时, 会出现两个问题:
  - 问题一: 下面的商品内容, 会突然上移
  - 问题二: tabControl虽然设置了fixed, 但是也随着Better-Scroll一起滚出去了.
- 其他方案来解决停留问题.
  - 在最上面, 多复制了一份PlaceHolderTabControl组件对象, 利用它来实现停留效果.
  - 当用户滚动到一定位置时, PlaceHolderTabControl显示出来.
  - 当用户滚动没有达到一定位置时, PlaceHolderTabControl隐藏起来.



### 十. 让Home保持原来的状态

#### 10.1. 让Home不要随意销毁掉

- keep-alive

#### 10.2. 让Home中的内容保持原来的位置

- 离开时, 保存一个位置信息saveY.
- 进来时, 将位置设置为原来保存的位置saveY信息即可.
  - 注意: 最好回来时, 进行一次refresh() （刷新Better-Scroll）

