import Vue from "vue";
import Router from "vue-router";
import SplitPay from "./components/SplitPay.vue";
import Verify from "./components/Verify.vue";
// import BvnForm from "./components/BvnForm.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Verify",
      component: Verify
    },
    {
      path: "/split-pay",
      name: "SplitPay",
      component: SplitPay
    }
  ]
});

export default router;