<template>
  <nav>
    <v-toolbar :color="'rgb(48,151,166)'">
      <v-toolbar-title>
          <v-img :src="logo" alt="logo" height="40px" width="40px"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
          Acerca de
      </v-btn>
      <v-btn text>
          Ayuda
      </v-btn>
      <v-btn rounded color="rgb(208,201,61)">Entrar</v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import logo from "@/assets/logo.png";

export default {
  name: "NavBar",
  data:function(){
      return {logo:logo}
  }
};
</script>