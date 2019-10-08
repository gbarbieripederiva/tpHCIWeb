<template>
  <v-container fill-width>
    <v-row>
      <v-col >
        <div align="center">
          <v-btn class="ma-2 lime lighten-2 black--text mx-3 ma-2" x-large @click="goUp">
            <v-icon left>mdi-arrow-up-bold</v-icon>
            <span>SUBIR</span>
          </v-btn>
          <v-btn class="ma-2 lime lighten-2 black--text mx-3 ma-2" x-large @click="goDown">
            <v-icon left>mdi-arrow-down-bold</v-icon>
            <span>BAJAR</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Persiana",
  data() {
    return {
      isUp: true,
    };
  },
  methods:{
    goUp(){
      this.isUp = true;
    },
    goDown(){
      this.isUp = false;
    }
  }
};

</script>


