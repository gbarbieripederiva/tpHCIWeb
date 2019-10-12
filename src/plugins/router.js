import Vue from "vue";
import VueRouter from "vue-router";
import LoggedOffHome from "@/pages/loggedOffHome.vue";
import Piso from "@/pages/piso.vue";
import DispositivosFavoritos from "@/pages/dispositivosFavoritos.vue";
import Rutinas from "@/pages/rutinas.vue";
import Cuarto from "@/pages/cuarto.vue";
import AddRutina from "@/pages/addRutina.vue";
import Ayuda from "../pages/Ayuda";
import AcercaDe from "../pages/AcercaDe";
import Alarma from "@/pages/alarma.vue";


Vue.use(VueRouter);
var routes = [
  {
    path: "/",
    component: LoggedOffHome
  },
  {
    path: "/cuartos",
    component: Piso
  },
  {
    path: "/cuartos/:idCuarto/:nameCuarto",
    component: Cuarto
  },
  {
    path: "/dispositivosFavoritos",
    component: DispositivosFavoritos
  },
  {
    path: "/rutinas",
    component: Rutinas
  },
  {
    path:"/añadirRutina",
    component:AddRutina
  },
  {
    path: "/acercaDe",
    component: AcercaDe
  },
  {
    path: "/Ayuda",
    component: Ayuda
  },
  {
    path:"/alarma",
    component:Alarma
  },
  {
    path: "*",
    component: LoggedOffHome
  }
];
var router = new VueRouter({ mode: "history", routes });

router.beforeEach((to, from, next) => {
  if (!["/", "/acercaDe", "/ayuda"].includes(to.path)) {
    var entered;
    try {
      entered = JSON.parse(sessionStorage.getItem("entered"));
    } catch (e) {
      entered = false;
    }
    if (!entered) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
