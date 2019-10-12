<template>
  <v-content class="blue darken-2">
    <v-container fluid>
      <v-row fill-height align="center" justify="center">
        <v-img max-width="250" :src="require('@/assets/logo.png')"></v-img>
      </v-row>
      <v-row align="center" justify="center">
        <p class="display-3 yellow--text">Barsa Home</p>
      </v-row>
      <v-row class="my-8">
        <v-col cols="4 mx-3" class="light-blue">
          <p class="display-1 font-weight-bold" justify="center" align="center">Misma casa, otra sensación</p>
          <p class="body-1">
            Descubre una nueva forma de controlar
            su casa. Todo desde el alcance de su mano.
            Automatice el prendido y apagado de dispositivos
            con nuestra aplicacion web. Acceda a cada lugar de su casa con solo un click y sin tener que mover un dedo. Desplazarse en su hogar
            ya no es una obligación sino una descisión. Las nuevas tecnlogías están constantemente desarrollándose permitiendo
            como nuestro producto un comfort que hace unos años era impensado. La planificación de eventos y su seguridad que brinda
            la aplicación le ayudará a usted a administrar mejor su tiempo libre. <p class="font-weight-bold">Es facil, es simple, es Barsa. <p>
          </p>
        </v-col>
        <v-spacer ></v-spacer>
        <v-col cols="6">
          <v-container >
            <v-row align="center" justify="center">
              <v-img :src="require('@/assets/smartHouse.jpg')" width="400"></v-img>
            </v-row>
          </v-container>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "LoggedOffHome",



};
</script>
