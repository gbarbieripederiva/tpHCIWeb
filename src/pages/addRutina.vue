<template>
  <div>
    <v-row justify="center" align="center">
      <v-dialog persistent v-model="dialogName" max-width="68em">
        <v-card>
          <v-form ref="nameForm">
            <v-container>
              <v-row>
                <v-text-field
                  maxlength="60"
                  class="mx-4"
                  placeholder="Nombre de la rutina"
                  :rules="rutinaNombreRules"
                  required
                  v-model="rutinaNameTemp"
                ></v-text-field>
              </v-row>
              <v-row justify="space-around">
                <v-btn @click="comfirmNameRutina">Comfirmar</v-btn>
                <v-btn @click="cancelNameRutina">Cancel</v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
      <v-container class="pa-0">
        <v-row justify="center">
          <p class="ma-0 headline">{{rutinaName}}</p>
          <v-icon v-if="rutinaName.length>0" @click="dialogName=true">mdi-pencil</v-icon>
        </v-row>
      </v-container>
      <v-stepper class="mt-0 transparent" flat v-model="step">
        <v-stepper-items>
          <v-stepper-content class="pa-0" step="1">
            <template>
              <v-card class="grey px-4">
                <v-container>
                  <v-row>
                    <v-card
                      :width="sizeOfCard.width"
                      :height="sizeOfCard.height"
                      class="overflow-y-auto light-blue"
                    >
                      <v-list class="transparent">
                        <v-list-item v-if="dispositivos.length<1" >
                          <p  class="headline">No hay dispositivos.</p>
                        </v-list-item>
                        <v-list-item-group multiple v-model="dispositivosSelected">
                          <template v-for="dispositivo in dispositivos">
                            <v-divider v-if="!dispositivo" :key="`d+${dispositivo.id}`"></v-divider>
                            <v-list-item
                              v-else
                              :key="`i${dispositivo.id}`"
                              :value="dispositivo"
                              active-class="deep-purple--text text--accent-4"
                            >
                              <template v-slot:default="{ active, toggle }">
                                <v-list-item-content>
                                  <v-list-item-title class="black--text" v-text="dispositivo.name"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-checkbox
                                    :input-value="active"
                                    :true-value="dispositivo.id"
                                    color="black black"
                                    @click="toggle"
                                  ></v-checkbox>
                                </v-list-item-action>
                              </template>
                            </v-list-item>
                          </template>
                        </v-list-item-group>
                      </v-list>
                    </v-card>
                  </v-row>
                  <v-row justify="end" class="my-5">
                    <v-btn class="mx-5 error" to="rutinas">Cancelar</v-btn>
                    <v-btn class="success" @click="nextStep">Comfirmar</v-btn>
                  </v-row>
                </v-container>
              </v-card>
            </template>
          </v-stepper-content>
          <v-stepper-content class="pa-0" step="2">
            <template>
              <v-card class="grey px-4">
                <v-container>
                  <v-row>
                    <v-card
                      :width="sizeOfCard.width"
                      :height="sizeOfCard.height"
                      class="overflow-y-auto light-blue"
                    >
                      <Dispositivo
                        v-for="dispositivo in dispositivosSelected"
                        :key="dispositivo.id"
                        :dispositivo="dispositivo"
                      ></Dispositivo>
                    </v-card>
                  </v-row>
                  <v-row justify="end" class="my-5">
                    <v-btn class="mx-5 error" @click="step=1">Volver</v-btn>
                    <v-btn class="success" @click="addRutina">Comfirmar</v-btn>
                  </v-row>
                </v-container>
              </v-card>
            </template>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-row>
    <v-snackbar :color="snackBarColor" v-model="snackBar">
      <v-container class="ma-0 pa-0">
        <v-row justify="center" align="center">{{this.snackBarMessage}}</v-row>
      </v-container>
    </v-snackbar>
  </div>
</template>

<script>
import api from "@/plugins/api.js";
import Dispositivo from "@/components/dispositivosEnCuarto/dispositivo.vue";

export default {
  name: "AddRutina",
  components: {
    Dispositivo
  },
  data() {
    return {
      sizeOfCard: {
        height: 10,
        width: 10
      },
      dispositivos: [],
      rutinaName: "",
      rutinaNameTemp: "",
      dialogName: true,
      rutinaNombreRules: [
        v => !!v || "El nombre es obligatorio",
        v => (v && v.length >= 3) || "El minimo de caracteres es 3",
        v =>
          /^[0-9A-Za-z\ _][0-9A-Za-z\ _][0-9A-Za-z\ _][0-9A-Za-z\ _]*$/.test(
            v
          ) ||
          "El nombre puede contener solamente letras, números, espacio y guion bajo"
      ],

      step: 1,
      dispositivosSelected: [],
      snackBar: false,
      snackBarMessage: "",
      snackBarColor: ""
    };
  },
  methods: {
    nextStep() {
      if (this.dispositivosSelected.length < 1) {
        this.snackBar = false;
        this.snackBarMessage = "Debes elegir al menos un dispositivo";
        this.snackBarColor = "error";
        this.snackBar = true;
      } else {
        this.step = 2;
      }
    },
    addRutina() {
      if (this.dispositivosSelected.length < 1) {
        this.snackBar = false;
        this.snackBarMessage = "Debes elegir al menos un dispositivo";
        this.snackBarColor = "error";
        this.snackBar = true;
        this.step = 1;
        return;
      }
      let rutina = {
        name: this.rutinaName,
        actions: []
      };
      this.dispositivosSelected.forEach(d => {
        d.routines.actions.forEach(a => {
          rutina.actions.push({
            device: {
              id: d.id
            },
            actionName: a.name,
            params: a.params,
            meta: {
              deviceName: d.name
            }
          });
        });
      });
      api.routines
        .add(rutina)
        .then(r => {
          this.$router.push("rutinas");
        })
        .catch(e => {
          this.snackBar = false;
          this.snackBarMessage = "Hubo un error al crear la rutina";
          this.snackBarColor = "error";
          this.snackBar = true;
          console.error(e);
        });
    },
    comfirmNameRutina() {
      if (this.$refs.nameForm.validate()) {
        this.rutinaName = this.rutinaNameTemp;
        this.dialogName = false;
      }
    },
    cancelNameRutina() {
      if (this.rutinaName !== "") {
        this.rutinaNameTemp = this.rutinaName;
        this.dialogName = false;
      } else {
        this.$router.push("rutinas");
      }
    }
  },
  mounted() {
    this.sizeOfCard.width = window.innerWidth - 80;
    this.sizeOfCard.height = window.innerHeight - 300;

    api.device
      .getAll()
      .then(r => {
        this.dispositivos = r.devices.filter(v => {
          return v.type.name !== "alarm";
        });
        this.dispositivos.forEach(v => {
          v.routines = {
            actions: []
          };
        });
      })
      .catch(e => {
        this.snackBar = false;
        this.snackBarMessage = "Hubo un error al obtener los dispositivos";
        this.snackBarColor = "error";
        this.snackBar = true;
        console.error(e);
      });
  }
};
</script>