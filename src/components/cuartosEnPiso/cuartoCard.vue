<template>
  <v-card
    height="200"
    width="200"
    color="yellow"
    align="center"
    justify="center"
    @click="cuarto.open"
  >
    <v-icon size="150">{{cuarto.img}}</v-icon>
    <v-card-title class="justify-center">{{cuarto.name}}</v-card-title>
  </v-card>
</template>
<script>
export default {
  name: "CuartoCard",
  props: ["cuarto"]
};
</script>