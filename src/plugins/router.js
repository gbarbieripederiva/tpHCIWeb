import Vue from "vue";
import VueRouter from "vue-router";
import LoggedOffHome from "@/pages/loggedOffHome.vue";
import Piso from "@/pages/piso.vue";
import DispositivosFavoritos from "@/pages/dispositivosFavoritos.vue";
import Rutinas from "@/pages/rutinas.vue";

Vue.use(VueRouter);
var routes = [
  {
    path: "/",
    component: LoggedOffHome
  },{
    path:"/pisos/:id",
    component:Piso
  },{
    path:"/dispositivosFavoritos",
    component:DispositivosFavoritos
  },{
    path:"/rutinas",
    component:Rutinas
  },
  {
    path:"*",
    component:LoggedOffHome
  }
];
export default new VueRouter({ mode: "history", routes });
