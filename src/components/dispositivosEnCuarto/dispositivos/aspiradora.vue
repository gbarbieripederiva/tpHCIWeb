<template>
  <v-container fill-width>
    <v-row justify="center" align="center">
      <v-col>
        <!-- iconos -->
        <v-icon @click="prendido=!prendido" :color="prendidoColor">mdi-power</v-icon>
        <v-icon v-if="!pausado" @click="pausado=true">mdi-pause</v-icon>
        <v-icon v-else @click="pausado=false">mdi-play</v-icon>
      </v-col>
      <v-col>
        <!-- cambiar ubicacion de base -->
        <v-dialog max-width="500" v-model="cambiarBaseDialog">
          <template v-slot:activator="{on}">
            <v-btn v-on="on">Cambiar base</v-btn>
          </template>
          <v-card>
            <v-card-title>Seleccione un cuarto</v-card-title>
            <v-list-item-group>
              <v-list-group no-action v-for="(piso,index) in pisos" :key="index">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title >{{piso.name}}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="(cuarto,index) in piso.cuartos"
                  :key="index"
                >
                  <template v-slot:default="{active,toggle}">
                    <v-list-item @click="active=true;nuevaBase=cuarto.name">{{cuarto.name}}</v-list-item>
                  </template>
                </v-list-item>
              </v-list-group>
            </v-list-item-group>
            <v-container>
              <v-row justify="space-around">
                <v-btn @click="cambiarBaseSubmit">Comfirmar</v-btn>
                <v-btn @click="cambiarBaseDialog=false">Cancelar</v-btn>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col>
        <!-- cambiar ubicacion -->
        <v-dialog max-width="500" v-model="cambiarUbicacionDialog">
          <template v-slot:activator="{on}">
            <v-btn v-on="on">Cambiar ubicacion</v-btn>
          </template>
          <v-card>
            <v-card-title>Seleccione un cuarto</v-card-title>
            <v-list-item-group ref="selUbica">
              <v-list-group no-action v-for="(piso,index) in pisos" :key="index">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title >{{piso.name}}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="(cuarto,index) in piso.cuartos"
                  :key="index"
                >
                  <template v-slot:default="{active,toggle}">
                    <v-list-item @click="active=true;nuevaUbicacion=cuarto.name">{{cuarto.name}}</v-list-item>
                  </template>
                </v-list-item>
              </v-list-group>
            </v-list-item-group>
            <v-container>
              <v-row justify="space-around">
                <v-btn @click="cambiarUbicacionSubmit">Comfirmar</v-btn>
                <v-btn @click="cambiarUbicacionDialog=false">Cancelar</v-btn>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col>
        <!-- modo -->
        <v-menu bottom offset-y origin="center top" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn text outlined class="blue" v-on="on">{{modo}}</v-btn>
          </template>
          <v-list flat nav>
            <v-list-item v-for="(modo,index) in modos" :key="index" @click="changeModo(modo)">
              <v-list-item-title>{{modo}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col>
        <!-- volver base -->
        <v-btn @click="volverABase">Volver a base</v-btn>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Aspiradora",
  props: ["dispositivo"],
  computed:{
    prendidoColor(){
      return this.prendido?"green":"";
    }
  },
  data() {
    return {
      modos: ["Aspirar", "Trapear"],
      prendido:false,
      pausado:false,
      modo: "Aspirar",
      pisos: [
        {
          name: "hola",
          cuartos: [
            { name: "hola" },
            { name: "hola2" },
            { name: "hola3" },
            { name: "hola4" }
          ]
        },
        {
          name: "hola",
          cuartos: [
            { name: "hola" },
            { name: "hola2" },
            { name: "hola3" },
            { name: "hola4" }
          ]
        }
      ],
      cambiarBaseDialog: false,
      cambiarUbicacionDialog: false,
      nuevaUbicacion: "",
      nuevaBase:""
    };
  },
  methods: {
    changeModo(modo) {
      this.modo = modo;
    },
    volverABase() {
      console.log("volver a base");
    },
    cambiarUbicacionSubmit() {
      this.cambiarUbicacionDialog=false;
      console.log(this.nuevaUbicacion);
    },
    cambiarBaseSubmit() {
      this.cambiarBaseDialog=false;
      console.log(this.nuevaBase);
    }
  }
};
</script>