<template>
  <v-container>
    <v-row justify="center">
      <v-card :height="sizeOfCard" :width="sizeOfCard" class="light-blue">
        <v-row align="center" justify="center">
          <v-icon
            v-if="modoFinal==='Regular'"
            :size="sizeOfIco"
            @click="desactivarDialog=true"
          >mdi-lock-alert</v-icon>
          <v-icon
            v-else-if="modoFinal==='Casa'"
            :size="sizeOfIco"
            @click="desactivarDialog=true"
          >mdi-lock</v-icon>
          <v-icon v-else :size="sizeOfIco" @click="activarDialog=true">mdi-lock-open</v-icon>
        </v-row>
        <v-row v-if="modoFinal!=='disarmed'" justify="center" align="center">
          <v-btn text large outlined @click="activarDialog=true">{{modoFinal}}</v-btn>
        </v-row>
      </v-card>
    </v-row>
    <v-row justify="center" align="center" class="pa-10">
      <v-btn @click="cambiarCodigoDialog=true">cambiar codigo</v-btn>
    </v-row>
    <!-- activar -->
    <v-dialog persistent v-model="activarDialog" width="30em">
      <v-form @submit="submitActivar" class="white" ref="activarForm">
        <v-container>
          <v-row justify="center" align="center">
            <v-menu bottom offset-y origin="center top" transition="scale-transition">
              <template v-slot:activator="{ on }">
                <v-btn text x-large outlined v-on="on">{{modo}}</v-btn>
              </template>
              <v-list flat>
                <v-list-item v-for="(modo,index) in modos" :key="index" @click="changeModo(modo)">
                  <v-list-item-title>{{modo}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
          <v-row class="px-2">
            <v-col offset="3" cols="6">
              <v-text-field
                :rules="codigoRules"
                required
                v-model="codigo"
                maxlength="4"
                type="password"
                label="codigo"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="space-around" align="center">
            <v-btn type="submit" @click="
                activarDialog=false;">Activar</v-btn>
            <v-btn
              @click="
                activarDialog=false; 
                $refs.activarForm.reset()"
            >Cancelar</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-dialog>

    <!-- desactivar -->
    <v-dialog persistent v-model="desactivarDialog" width="30em">
      <v-form @submit="submitDesactivar" class="white" ref="desactivarForm">
        <v-container>
          <v-row class="px-2">
            <v-col offset="3" cols="6">
              <v-text-field
                :rules="codigoRules"
                required
                v-model="codigo"
                maxlength="4"
                type="password"
                label="codigo"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="space-around" align="center">
            <v-btn type="submit" @click="
                  desactivarDialog=false">Desactivar</v-btn>
            <v-btn
              @click="
                desactivarDialog=false; 
                $refs.desactivarForm.reset()"
            >Cancelar</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-dialog>

    <!-- cambiar codigo -->
    <v-dialog persistent v-model="cambiarCodigoDialog" width="30em">
      <v-form @submit="submitCambiarCodigo" class="white" ref="cambiarCodigoForm">
        <v-container>
          <v-row class="px-2">
            <v-col offset="3" cols="6">
              <v-text-field
                name="old"
                :rules="codigoRules"
                required
                v-model="codigo"
                maxlength="4"
                type="password"
                label="codigo viejo"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="px-2">
            <v-col offset="3" cols="6">
              <v-text-field
                :rules="codigoRules"
                required
                v-model="newCodigo"
                maxlength="4"
                type="password"
                label="codigo nuevo"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="px-2">
            <v-col offset="3" cols="6">
              <v-text-field
                :rules="codigoRules"
                required
                v-model="newCodigo2"
                maxlength="4"
                type="password"
                label="repetir codigo nuevo"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="space-around" align="center">
            <v-btn
              type="submit"
              @click="
                  cambiarCodigoDialog=false
                "
            >comfirmar</v-btn>
            <v-btn
              @click="
                  cambiarCodigoDialog=false;
                  $refs.cambiarCodigoForm.reset();
                "
            >cancelar</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "@/plugins/api.js";

export default {
  name: "Alarma",
  data() {
    return {
      alarm: null,
      sizeOfCard: 0,
      sizeOfIco: 0,
      activarDialog: false,
      desactivarDialog: false,
      cambiarCodigoDialog: false,
      codigo: "",
      newCodigo: "",
      newCodigo2: "",
      codigoRules: [
        v => {
          return !!v || "El codigo es obligatorio";
        },
        v => {
          return (
            /^[0-9][0-9][0-9][0-9]$/g.test(v) ||
            "El codigo debe contener 4 digitos"
          );
        }
      ],
      modos: ["Regular", "Casa"],
      modoTranslater: {
        Regular: "armAway",
        Casa: "armStay",
        disarmed: "disarmed",
        armedAway: "Regular",
        armedStay: "Casa"
      },
      modo: "Regular",
      modoFinal: "Regular"
    };
  },
  methods: {
    changeModo(modo) {
      this.modo = modo;
    },
    submitActivar(e) {
      e.preventDefault();
      if (this.$refs.activarForm.validate()) {
        let codigo = this.codigo;
        this.$refs.activarForm.reset();
        api.device
          .putAction(this.alarm.id, this.modoTranslater[this.modo], [codigo])
          .then(r => {
            if (r.result) {
              this.modoFinal = this.modo;
            } else {
              this.modoFinal = "disarmed";
            }
          });
      }
    },
    submitDesactivar(e) {
      e.preventDefault();
      if (this.$refs.desactivarForm.validate()) {
        let codigo = this.codigo;
        this.$refs.desactivarForm.reset();
        api.device
          .putAction(this.alarm.id, "disarm", [codigo])
          .then(r => {
            if (r.result) {
              this.modoFinal = "disarmed";
            }
          })
          .catch(e => {
            console.error(e);
          });
      }
    },
    submitCambiarCodigo(e) {
      e.preventDefault();
      if (this.$refs.cambiarCodigoForm.validate()) {
        let oldCode = this.codigo;
        let newCode = this.newCodigo;
        if (this.newCodigo !== this.newCodigo2) {
          console.log("los codigos son distintos");
        } else {
          api.device
            .putAction(this.alarm.id, "changeSecurityCode", [
              this.codigo,
              this.newCodigo
            ])
            .then(r => {
              if (!r.result) {
                console.log("codigo incorrecto");
              }else{
                api.device.modify(this.alarm.id,{
                  name:this.alarm.name,
                  meta:{
                    ...this.alarm.meta,
                    codigo:this.newCodigo
                  }
                }).then((r)=>{
                }).catch((e)=>{
                  console.log(e);
                })
              }
            });
        }
      }
    }
  },
  mounted() {
    this.sizeOfCard =
      (window.innerHeight > window.innerWidth
        ? window.innerWidth
        : window.innerHeight) - 250;
    this.sizeOfIco = this.sizeOfCard - 50;
    api.device
      .getAll()
      .then(r => {
        r.devices.forEach(d => {
          if (d.type.name === "alarm") {
            this.alarm = d;
          }
        });
        this.modoFinal = this.modoTranslater[this.alarm.state.status];
      })
      .catch(e => {
        console.error(e);
      });
  }
};
</script>