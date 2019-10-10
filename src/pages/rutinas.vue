
<template>
  <div>
    <v-row justify="center" align="center">
      <rutina :rutina="rutina"></rutina>
    </v-row>
  </div>
</template>

<script>
  import rutina from "../components/rutinas/rutina";
  import api from "../plugins/api";
  export default {

    name: "rutinas",
    components: {
      rutina,
  },data(){
      return{
        rutinas : []
      };
    },
    mounted() {
      api.routines.getAll().then((r)=>{
        this.rutinas=r.result.map((v)=>{
          return {
            name:v.name,
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
  }
</script>
