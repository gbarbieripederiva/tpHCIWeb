<template>
  <div>
    <v-card :height="sizeOfCard.height" :width="sizeOfCard.width" class="overflow-y-auto light-blue">
      <v-container grid-list-xl class="overflow-y-">
        <v-layout row wrap justify-space-start>
          <v-flex v-for="(cuarto,index) in cuartos" :key="index" md4>
            <cuartoCard :cuarto="cuarto"></cuartoCard>
          </v-flex>
          <v-flex md4>
            <v-card height="250" width="250" align="center" justify="center" flat class="transparent">
              <v-card
                height="200"
                width="200"
                color="grey"
                align="center"
                justify="center"
                @click="dialogAddCuarto=true"
              >
                <v-icon size="200">{{addIcon}}</v-icon>
              </v-card>
              <v-card-title class="justify-center">Añadir cuarto</v-card-title>
              <v-dialog v-model="dialogAddCuarto" max-width="68em">
                <v-card>
                  <v-container>
                    <v-form @submit="addCuarto" ref="addCuartoForm">
                      <v-row>
                        <v-text-field
                                maxlength="60"
                                class="mx-4"
                                placeholder="Nombre del cuarto"
                                :rules="cuartoNombreRules"
                                required
                                v-model="newCuarto"
                        ></v-text-field>
                      </v-row>
                      <v-row justify="space-around">
                        <v-btn type="submit">Comfirmar</v-btn>
                        <v-btn @click="cancelAddCuarto">Cancel</v-btn>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import CuartoCard from "./cuartoCard.vue";
import api from "@/plugins/api.js";

export default {
  name: "CuartosEnPiso",
  props: ["cuartos"],
  components: {
    CuartoCard
  },
  data() {
    return {
      sizeOfCard: {
        width: 0,
        height: 0
      },
      addIcon: "mdi-plus",
      dialogAddCuarto: false,
      newCuarto: "",
      newCuartoImage: "mdi-home",
      cuartoNombreRules:[
        (v)=>!!v||'El nombre es obligatorio',
        v=>(v&&v.length>=3)||'El minimo de caracteres es 3',
        (v)=>/^[0-9A-Za-z\ _][0-9A-Za-z\ _][0-9A-Za-z\ _][0-9A-Za-z\ _]*$/.test(v)||"El nombre puede contener solamente letras, números, espacio y guion bajo"
      ]
    };
  },
  methods: {
    addCuarto(e) {
      e.preventDefault();
      if(this.$refs.addCuartoForm.validate()){
        api.room
        .add({
          name: this.newCuarto,
          meta: {
            img: this.newCuartoImage
          }
        })
        .then(r => {
          let newCuarto = {
            name: r.result.name,
            img: r.result.meta.img,
            open: () => {
              this.$router.push(this.$route.path + "/" + r.result.id);
            }
          };
          this.$refs.addCuartoForm.reset();
          this.newCuarto = "";
          this.cuartos.push(newCuarto);
        })
        .catch(e => {
          //TODO:IMPLEMENT ERROR SHOWING
          console.error(e);
        });
        this.dialogAddCuarto=false;
      }else{
        this.$refs.addCuartoForm.reset();
        console.error("formularion invalido");
        this.dialogAddCuarto=false;
      }
    },
    cancelAddCuarto() {
      this.newCuarto = "";
      this.$refs.addCuartoForm.reset();
      this.dialogAddCuarto = false;
    }
  },
  mounted() {
    this.sizeOfCard.width = Math.floor((window.innerWidth - 30) / 250) * 200;
    if (this.sizeOfCard.width < 250) {
      this.sizeOfCard.width = 250;
    }
    this.sizeOfCard.height = window.innerHeight - 250;
  }
};
</script>