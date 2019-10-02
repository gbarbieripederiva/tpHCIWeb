<template>
  <v-app>
    <v-content class="primary">
      <br />
      <div>
        <v-row justify="center" align="center">
          <CuartosEnPiso :cuartos="users.cuartos"></CuartosEnPiso>
        </v-row>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import CuartosEnPiso from "@/components/cuartosEnPiso/cuartosEnPiso.vue";

export default {
  name: "Pisos",
  props:["users"],
  components: {  CuartosEnPiso }
};
</script>
