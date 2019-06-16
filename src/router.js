import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/item_details/:id",
      name: "item_details",
      component: () => import("./views/ItemDetails.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("./views/Cart.vue")
    }
  ]
});
