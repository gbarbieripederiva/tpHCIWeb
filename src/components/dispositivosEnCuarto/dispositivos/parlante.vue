<template>
  <v-container fill-width>
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-row justify="center" align="center">
          <!-- display de generos -->
          <v-menu bottom offset-y origin="center top" transition="scale-transition" >
            <template v-slot:activator="{ on }">
              <v-btn text x-large outlined v-on="on">{{genero}}</v-btn>
            </template>
            <v-list color="light-blue" flat nav>
              <v-list-item
                v-for="(genero,index) in generos"
                :key="index"
                @click="()=>{ changeGenero(genero)}"
              >
                <v-list-item-title>{{genero}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-row justify="center" align="center">
          <!-- botones -->
          <v-icon @click="prevSong" x-large>mdi-skip-previous</v-icon>
          <v-icon @click="stopSong" x-large>mdi-stop</v-icon>
          <v-icon @click="pauseSong" x-large v-if="state=='playing'">mdi-pause</v-icon>
          <v-icon @click="playSong" v-else x-large>mdi-play</v-icon>
          <v-icon @click="nextSong" x-large>mdi-skip-next</v-icon>
        </v-row>
        <v-row justify="center" align="center">
          <!-- slider -->
          <v-slider v-model="volumen" max="10" min="0" ticks step="1">
            <template v-slot:append>
              <v-icon @click="subirVolumen">mdi-volume-plus</v-icon>
            </template>
            <template v-slot:prepend>
              <v-icon @click="bajarVolumen">mdi-volume-minus</v-icon>
            </template>
          </v-slider>
        </v-row>
      </v-col>
      <v-col>
        <v-row fill-width fill-height align="center" justify="center">
          <v-col>
            <v-list fill-width fill-height max-height="200" class="overflow-y-auto">
              <v-list-item v-for="(song,index) in lista" :key="index" fill-width>
                <p>{{song}}</p>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Parlante",
  props: ["dispositivo"],
  data() {
    return {
      generos: ["genero1", "genero2", "genero3"],
      genero: "genero1",
      volumen: 0,
      state:"playing",
      lista: [
        "hola",
        "hola2",
        "hola3",
        "hola2",
        "hola3",
        "hola2",
        "hola3",
        "hola2",
        "hola3"
      ]
    };
  },
  methods: {
    changeGenero(genero) {
      this.genero = genero;
    },
    subirVolumen() {
      if (this.volumen < 10) {
        this.volumen += 1;
      }
    },
    bajarVolumen() {
      if (this.volumen > 0) {
        this.volumen -= 1;
      }
    },
    nextSong(){

    },
    prevSong(){
      
    },
    pauseSong(){
      this.state="paused";
    },
    stopSong(){
      this.state="stopped";
    },
    playSong(){
      this.state="playing";
    }
  }
};
</script>