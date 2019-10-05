<template>
  <v-container fill-width>
    <v-row>
      <v-col>
        <v-row justify="center" align="center">
          <v-switch v-model="isClosed" :readonly="isLocked">
            <template v-slot:prepend>
              <v-icon>mdi-door-open</v-icon>
            </template>
            <template v-slot:append>
              <v-icon>mdi-door-closed</v-icon>
            </template>
          </v-switch>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center" align="center">
          <v-switch v-model="isLocked">
            <template v-slot:prepend>
              <v-icon>mdi-lock-open</v-icon>
            </template>
            <template v-slot:append>
              <v-icon>mdi-lock</v-icon>
            </template>
          </v-switch>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Puerta",
  watch:{
    isLocked(){
      if(this.isLocked){
        this.isClosed=true;
      }
    }
  },
  data(){
    return{
      isClosed:false,
      isLocked:false
    };
  }
};
</script>