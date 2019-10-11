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
        @deleteDevice="deleteDispositivo"
      ></Dispositivo>
      <v-card v-if="dispositivos.length==0&&!!notShowAdd" fill-width>
        <v-container fill-width class="light-blue my-2">
          <v-row justify="center" align="center">
            <p>No hay dispositivos favoritos</p>
          </v-row>
        </v-container>
      </v-card>
      <v-card class="grey" raised v-if="!notShowAdd" fill-width @click="()=>{dialogAddDispositivo=true}">
        <v-container fill-width>
          <v-row justify="center" align="center">
            <p class="font-weight-bold headline"><v-icon class="mx-1">mdi-plus-box</v-icon>Añadir dispositivo </p>
          </v-row>
        </v-container>
      </v-card>
      <v-dialog v-model="dialogAddDispositivo">
        <v-card>
          <v-form @submit="addDispositivo">
            <v-text-field
              class="mx-4"
              maxlength="60"
              :rules="dispositivoNombreRules"
              required
              v-model="newDispositivo"
              placeholder="Nombre"
            ></v-text-field>
            <v-select
              class="mx-4"
              label="Tipo"
              :items="deviceTypes"
              v-model="newDispositivoType"
              item-text="name"
              item-value="id"
            ></v-select>
            <v-btn type="submit" @click="dialogAddDispositivo=false">Comfirmar</v-btn>
            <v-btn type="reset" @click="cancelAddDispositivo">Cancelar</v-btn>
          </v-form>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import Dispositivo from "./dispositivo";
import api from "@/plugins/api.js";

export default {
  name: "DispositivosEnCuarto",
  props: ["dispositivos", "notShowAdd"],
  components: {
    Dispositivo
  },
  data() {
    return {
      sizeOfCard: {
        width: 0,
        height: 0
      },
      addIcon: "mdi-plus",
      deviceTypes: [],
      dialogAddDispositivo: false,
      newDispositivo: "",
      newDispositivoType: -1,
      dispositivoNombreRules: [
        v => !!v || "El nombre es obligatorio",
        v => (v && v.length >= 3) || "El minimo de caracteres es 3",
        v =>
          /^[0-9A-Za-z\ _][0-9A-Za-z\ _][0-9A-Za-z\ _][0-9A-Za-z\ _]*$/.test(
            v
          ) ||
          "El nombre puede contener solamente letras, números, espacio y guion bajo"
      ]
    };
  },
  methods: {
    addDispositivo(e) {
      e.preventDefault();
      api.device
        .addDevice({
          name: this.newDispositivo,
          type: {
            id: this.newDispositivoType
          }
        })
        .then(r => {
          api.roomDevices
            .add(this.$route.params.idCuarto, r.result.id)
            .then(res => {
              this.dispositivos.push(r.result);
            })
            .catch(e => {
              console.error(e);
            });
        })
        .catch(e => {
          console.error(e);
        });
      this.newDispositivo = "";
      this.newDispositivoType = -1;
    },
    cancelAddDispositivo() {
      this.dialogAddDispositivo = false;
      (this.newDispositivo = ""), (this.newDispositivoType = -1);
    },
    deleteDispositivo(id) {
      this.$emit("deleteDevice", id);
    }
  },
  mounted() {
    this.sizeOfCard.width = window.innerWidth - 40;
    this.sizeOfCard.height = window.innerHeight - 300;
    api.deviceType
      .getAll()
      .then(r => {
        for (let v of r.result) {
          this.deviceTypes.push({
            name: v.name,
            id: v.id
          });
        }
      })
      .catch(e => {
        console.error(e);
      });
  }
};
</script>