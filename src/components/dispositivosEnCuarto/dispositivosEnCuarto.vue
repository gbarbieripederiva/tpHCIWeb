<template>
  <div>
    <v-card
      :height="sizeOfCard.height"
      :width="sizeOfCard.width"
      class="overflow-y-auto"
      color="light-blue"
    >
      <Dispositivo
        v-for="(dispositivo,index) in dispositivos"
        :key="index"
        :dispositivo="dispositivo"
      ></Dispositivo>

    </v-card>
  </div>
</template>

<script>
import Dispositivo from "./dispositivo";
export default {
  name: "DispositivosEnCuarto",
  props: ["dispositivos"],
  components: {
    Dispositivo
  },
  data() {
    return {
      sizeOfCard: {
        width: 0,
        height: 0
      },
      addIcon: "mdi-plus"
    };
  },
  methods: {
    addDispositivo: () => {}
  },
  mounted() {
    this.sizeOfCard.width = window.innerWidth-40;
    this.sizeOfCard.height = window.innerHeight - 250;
  }
};
</script>