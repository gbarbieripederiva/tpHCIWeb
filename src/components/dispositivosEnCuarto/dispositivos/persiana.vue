<template>
  <v-container fill-width>
    <v-row align="center" justify="center">
      <v-slider v-model="level" readonly color="lime accent-2" max="100" min="0" vertical>
        <template v-slot:append>
          <v-icon @click="goUp">mdi-arrow-up</v-icon>
        </template>
        <template v-slot:prepend>
           <v-icon @click="goDown">mdi-arrow-down</v-icon>
        </template>
      </v-slider>
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
      level: 0,
      direction:0,
      intervalShow: null,
      intervalUpdate:null
    };
  },
  methods: {
    goUp() {
      if(this.direction!==1){
        api.device.putAction(this.dispositivo.id,"open").then((r)=>{
        }).catch((e)=>{
          console.error(e);
        });
        if(this.intervalShow!==null){
          clearInterval(this.intervalShow);
          this.intervalShow=null;
        }
        if(this.intervalUpdate!==null){
          clearInterval(this.intervalUpdate);
          this.intervalUpdate=null;
        }
        this.intervalShow=setInterval(() => {
          if(this.level<100){
            this.level++;
          }else{
            clearInterval(this.intervalShow);
            this.intervalShow=null;
          }
        }, 1000);
        this.intervalUpdate=setInterval(() => {
          if((this.level===100 && this.intervalUpdate)||this.direction!==1){
            clearInterval(this.intervalUpdate);
            this.intervalUpdate=null;
          }
          api.device.getState(this.dispositivo.id).then((r)=>{
            this.level=100-r.result.level;
          }).catch((e)=>{
            console.error(e);
          });
        }, 5000);
      }
    },
    goDown() {
      if(this.direction!==-1){
        api.device.putAction(this.dispositivo.id,"close").then((r)=>{
        }).catch((e)=>{
          console.error(e);
        });
        if(this.intervalShow!==null){
          clearInterval(this.intervalShow);
          this.intervalShow=null;
        }
        if(this.intervalUpdate!==null){
          clearInterval(this.intervalUpdate);
          this.intervalUpdate=null;
        }
        this.intervalShow=setInterval(() => {
          if(this.level>0){
            this.level--;
          }else{
            clearInterval(this.intervalShow);
            this.intervalShow=null;
          }
        }, 1000);
        this.intervalUpdate=setInterval(() => {
          if((this.level===100 && this.intervalUpdate)||this.direction!==-1){
            clearInterval(this.intervalUpdate);
            this.intervalUpdate=null;
          }
          api.device.getState(this.dispositivo.id).then((r)=>{
            this.level=100-r.result.level;
          }).catch((e)=>{
            console.error(e);
          });
        }, 5000);
      }
    }
  },
  mounted(){
    this.level=100-this.dispositivo.state.level;
    switch (this.dispositivo.state.status) {
      case "opening":
        
        break;
      case "closing":
        break;
      default:
        this.direction=0;
        break;
    }
  }
};
</script>


