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
      <v-btn text to="/cuartos" small>Cuartos</v-btn>
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