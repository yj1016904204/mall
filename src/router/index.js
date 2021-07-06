import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const Home = () => import("views/home/Home")
const Categore = () => import("views/categore/Categore")
const Shopcart = () => import("views/shopcart/Shopcart")
const Profile = () => import("views/profile/Profile")
const Detail = () => import("views/detail/Detail")

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/categore",
    component: Categore
  },
  {
    path: "/shopcart",
    component: Shopcart
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/detail/:iid",
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router