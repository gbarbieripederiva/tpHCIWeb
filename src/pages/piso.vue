
<template>
  <div >
    <v-row justify="center" align="center" >
      <CuartosEnPiso :cuartos="cuartos"></CuartosEnPiso>
    </v-row>
  </div>
</template>

<script>
import CuartosEnPiso from "@/components/cuartosEnPiso/cuartosEnPiso.vue";
import api from "@/plugins/api.js";

export default {
  name: "Piso",
  components: {
    CuartosEnPiso
  },data(){
    return {
      cuartos:[]
    };
  },
  mounted() {
    api.room.getAll().then((r)=>{
      this.cuartos=r.result.map((v)=>{
        return {
          name:v.name,
          img:v.meta.img,
          open:()=>{
            this.$router.push(this.$route.path+"/"+v.id);
          }
        }
      });
    }).catch((e)=>{
      //TODO IMPLEMENT ERROR SHOWING
      console.error(e);
    });
  }
};
</script>