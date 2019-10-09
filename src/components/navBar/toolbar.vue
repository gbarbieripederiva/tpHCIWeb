<template>
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
  data(){
    return{
      toolbarColor:'rgb(138,196,180)'
    };
  }
};
</script>