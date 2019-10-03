<template>
  <!--  
    receives pisos with the following format
    pisos:[
        {
            name:"algo",
            open:()=>{
                funcion que abre ese piso
            }
        }
    ]
  -->
  <nav>
    <v-toolbar height="30" :color="toolbarColor">
      <v-btn text to="/dispositivosFavoritos" small>Dispositivos favoritos</v-btn>
      <v-btn text to="/rutinas" small>Rutinas</v-btn>
      <v-menu bottom offset-y origin="center top" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn text small v-on="on">Pisos</v-btn>
        </template>
        <v-list :color="toolbarColor" flat nav>
          <v-list-item v-for="(piso,index) in pisos" :key="index" @click="piso.open">
            <v-list-item-title>{{piso.name}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </nav>
</template>
<script>
export default {
  name: "ToolBar",
  props: ["pisos"],
  data(){
    return{
      toolbarColor:'rgb(138,196,180)'
    };
  }
};
</script>