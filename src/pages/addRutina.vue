<template>
  <div>
    <v-row justify="center" align="center">
      <v-stepper class="transparent" flat v-model="step">
        <v-stepper-items>
          <v-stepper-content step="1">
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
          <v-stepper-content step="2">
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
      step: 1,
      dispositivosSelected:[]
    };
  },
  methods: {
    nextStep(){
      console.log(this.dispositivosSelected);
      this.step=2;
    },
    addRutina() {
    }
  },
  mounted() {
    this.sizeOfCard.width = window.innerWidth - 80;
    this.sizeOfCard.height = window.innerHeight - 300;

    api.device
      .getAll()
      .then(r => {
        this.dispositivos = r.devices;
        this.dispositivos.forEach(v => {
          v.routines = {};
        });
      })
      .catch(e => {
        console.error(e);
      });
  }
};
</script>