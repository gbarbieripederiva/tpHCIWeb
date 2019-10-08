<template>
  <div>
    <!-- TODO V-ICON FOR NAME CHANGE -->
    <p class="font-weight-black title">
      {{$route.params.idCuarto.replace(/_/g," ").replace(/^./g,$route.params.idCuarto[0].toUpperCase())}}
      <v-icon>mdi-pencil</v-icon>
      <v-icon @click="deleteRoom">mdi-delete</v-icon>
    </p>
    <v-row justify="center" align="center">
      <DispositivosEnCuarto :dispositivos="dispositivos"></DispositivosEnCuarto>
    </v-row>

  </div>
</template>

<script>
import DispositivosEnCuarto from "@/components/dispositivosEnCuarto/dispositivosEnCuarto.vue";
import api from "@/plugins/api.js";

export default {
  name: "Cuarto",
  components:{
    DispositivosEnCuarto
  },
  data() {
    return {
      sizeOfCard: {
        width: 0,
        height: 0
      },
      dispositivos:[],
      addIcon: "mdi-plus"
    };
  },
  mounted() {

  },
  methods:{
    deleteRoom(){
      if(window.confirm("¿Estas seguro que queres eliminar este cuarto?")){
        api.room.delete(this.$route.params.idCuarto).then(()=>{
          this.$router.push("/cuartos");
        }).catch((e)=>{
          console.error(e);
        });
      }
    }
  }
};
</script>