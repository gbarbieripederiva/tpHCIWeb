<template>
  <nav>
    <v-toolbar :color="'rgb(48,151,166)'">
      <v-toolbar-title>
        <v-img :src="logo" alt="logo" height="40px" width="40px"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/acercaDe" text>Acerca de</v-btn>
      <v-btn to="/ayuda" text>Ayuda</v-btn>
      <v-btn v-if="!value" rounded color="rgb(208,201,61)" @click="login()">Entrar</v-btn>
      <v-btn v-else rounded color="rgb(208,201,61)" @click="logout()">Salir</v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import logo from "@/assets/logo.png";

export default {
  name: "NavBar",
  props: ["value"],
  data: function() {
    return { logo: logo };
  },
  methods: {
    login: function() {
      this.$emit("input", true  );
      sessionStorage.setItem("entered",true);
      this.$router.push("/dispositivosFavoritos");
    },
    logout: function() {
      this.$emit("input", false  );
      sessionStorage.removeItem("entered");
      this.$router.push("/");
    }
  }
};
</script>