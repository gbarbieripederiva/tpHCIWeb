
<template>
  <div>
    <v-row justify="center" align="center">
      <v-card
        :height="sizeOfCard.height"
        :width="sizeOfCard.width"
        class="overflow-y-auto light-blue"
      >
        <Rutina v-for="rutina in rutinas" :key="rutina.id" :rutina="rutina"></Rutina>
        <v-card fill-width to="añadirRutina">
          <v-container fill-width class="light-blue  my-2">
            <v-row justify="center" align="center">Añadir rutina</v-row>
          </v-container>
        </v-card>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import api from "../plugins/api";
import Rutina from "@/components/rutinas/rutina.vue";

export default {
  name: "rutinas",
  components: {
    Rutina
  },
  data() {
    return {
      rutinas: [],
      sizeOfCard: {
        height: 10,
        width: 10
      }
    };
  },
  mounted() {
    this.sizeOfCard.width = Math.floor((window.innerWidth - 30) / 250) * 200;
    if (this.sizeOfCard.width < 250) {
      this.sizeOfCard.width = 250;
    }
    this.sizeOfCard.height = window.innerHeight - 250;

    // api.routines
    //   .getAll()
    //   .then(r => {
    //     this.rutinas = r.result.map(v => {
    //       return {
    //         name: v.name,
    //         open: () => {
    //           this.$router.push(this.$route.path + "/" + v.id);
    //         }
    //       };
    //     });
    //   })
    //   .catch(e => {
    //     //TODO IMPLEMENT ERROR SHOWING
    //     console.error(e);
    //   });

    this.$nextTick().then(() => {
      this.rutinas.push({
        id: "1912i3912i39i",
        name: "rutina 1"
      });
    });
  }
};
</script>
