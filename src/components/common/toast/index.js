import Toast from './Toast.vue'

const obj = {}

obj.install = (Vue) => {
  // 1.创建一个组件构造器
  const toastConstructor = Vue.extend(Toast)
    // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()
    // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
    // 4.tost.$el对应的就是div(这样才真正的加到了界面上面)
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj