<template>
  <v-app>
    <NavBar></NavBar>
    <v-content class="primary">
      <v-container fluid>
        <v-row fill-height align="center" justify="center">
            <v-img max-width="250" :src="require('@/assets/logo.png')"></v-img>
        </v-row>
        <v-row align="center" justify="center">
          <p class="display-3 yellow--text">Barsa Home</p>
        </v-row>
        <v-row>
          <v-col>
            <p class="title">Misma casa, otra sensación</p>
            <p>Descubre una nueva forma de controlar
              su casa. Todo desde el alcance de su mano. 
              Automatice el prendido y apagado de dispositivos
              con nuestra aplicacion web
            </p>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/navBar/navbar.vue";
export default {
  name: "App",
  components: { NavBar }
};
</script>
