import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
  import ('../views/home/Home')
const Category = () =>
  import ('../views/category/Category')
const Cart = () =>
  import ('../views/cart/Cart')
const Profile = () =>
  import ('../views/profile/Profile')
const Detail = () =>
  import ('../views/details/Detail.vue')

Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history'会导致githubpages无法配置
})

export default router