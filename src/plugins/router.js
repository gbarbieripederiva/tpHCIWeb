import Vue from "vue";
import VueRouter from "vue-router";
import LoggedOffHome from "@/pages/loggedOffHome.vue";
import Pisos from "@/pages/pisos.vue";


Vue.use(VueRouter);
var routes = [
  {
    path: "/",
    component: LoggedOffHome
  },{
    path:"/pisos",
    component:Pisos
  }
];
export default new VueRouter({ mode: "history", routes });
