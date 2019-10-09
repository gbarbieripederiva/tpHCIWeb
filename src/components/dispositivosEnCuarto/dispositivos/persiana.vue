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
    <v-row align="center" justify="center">
      <v-slider
              v-model="level"
              readonly
              color="lime accent-2"
              max="100"
              min="0"
              > </v-slider>
      <p class="pa-2 white">{{level}}%</p>
    </v-row>
  </v-container>
</template>

<script>
import api from "../../../plugins/api";

export default {
  name: "Persiana",
  props: ["dispositivo"],
  data() {
    return {
      isUp: true,
      level: 100,
      alreadyMoving:false,
      interval:null,
    };
  },
  methods: {
    goUp() {
      this.isUp = true;
      api.device.putAction(this.dispositivo.id, "open").catch(e => {
        console.error(e);
      });
      if(this.level > 0) {
        this.interval = setInterval(() => {
                  if (this.level > 0 && this.isUp == true)
                    this.level = this.level - 1;
                  else {
                    clearInterval(this.interval);
                    this.alreadyMoving == false;

                  }
                }
                , 1000);
      }

    },
      goDown() {
      this.isUp = false;
      api.device.putAction(this.dispositivo.id, "close").catch(e => {
        console.error(e);
      });
        if(this.level < 100){
          this.interval = setInterval(() => {
            if(this.level < 100 && this.isUp == false)
              this.level = this.level + 1;

              clearInterval(this.interval);}
            , 1000);
      }

    }
  }
};

</script>


