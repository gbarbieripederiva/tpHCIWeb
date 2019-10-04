<template>
  <v-container fill-width>
    <v-row justify="center" align="center">
      <!-- slider volumen -->
      <v-col offset="9">
        <v-slider v-model="volumen" max="10" min="0" ticks step="1" dense hide-details>
          <template v-slot:append>
            <v-icon @click="subirVolumen">mdi-volume-plus</v-icon>
          </template>
          <template v-slot:prepend>
            <v-icon @click="bajarVolumen">mdi-volume-minus</v-icon>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-row justify="center" align="center">
          <!-- display de generos -->
          <v-menu bottom offset-y origin="center top" transition="scale-transition">
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
          <!-- song name -->
          {{songPlaying.name}}
        </v-row>
        <v-row>
          <!-- slider song -->
          <v-slider dense hide-details readonly :value="timeStamp" :max="songPlaying.length">
            <template v-slot:append>{{songEndString}}</template>
            <template v-slot:prepend>{{songTimestampString}}</template>
          </v-slider>
        </v-row>
        <v-row justify="center" align="center">
          <!-- botones -->
          <v-icon @click="prevSong" x-large>mdi-skip-previous</v-icon>
          <v-icon @click="stopSong" x-large>mdi-stop</v-icon>
          <v-icon @click="pauseSong" x-large v-if="state=='playing'">mdi-pause</v-icon>
          <v-icon @click="playSong" v-else x-large>mdi-play</v-icon>
          <v-icon @click="nextSong" x-large>mdi-skip-next</v-icon>
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
  computed: {
    songEndString() {
      return (
        Math.floor(this.songPlaying.length / 60) +
        ":" +
        ("0" + (this.songPlaying.length % 60)).slice(-2)
      );
    },
    songTimestampString() {
      return (
        Math.floor(this.timeStamp / 60) +
        ":" +
        ("0" + (this.timeStamp % 60)).slice(-2)
      );
    }
  },
  data() {
    return {
      generos: ["genero1", "genero2", "genero3"],
      genero: "genero1",
      volumen: 0,
      state: "playing",
      songPlaying: { name: "highway to hell", length: 240 },
      timeStamp: 230,
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
  interval: null,
  mounted() {
    this.startUpdate();
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
    nextSong() {},
    prevSong() {},
    pauseSong() {
      this.state = "paused";
      clearInterval(this.interval);
      this.interval = null;
    },
    stopSong() {
      this.state = "stopped";
    },
    playSong() {
      this.state = "playing";
      if (this.interval == null) {
        this.startUpdate();
      }
    },
    startUpdate() {
      if(this.interval!==null){
        return;
      }
      this.interval = setInterval(() => {
        if (this.timeStamp < this.songPlaying.length) {
          this.timeStamp = this.timeStamp + 1;
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    if (this.interval != null) {
      clearInterval(this.interval);
    }
  }
};
</script>