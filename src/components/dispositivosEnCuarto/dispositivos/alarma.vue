<template>
  <v-container>
    <v-row justify="space-around">
      <!-- activar -->
      <v-dialog v-model="activarDialog" width="30em">
        <template v-slot:activator="{on}">
          <v-btn class="green" v-on="on">Activar</v-btn>
        </template>
        <v-form @submit="submitActivar" class="white" ref="activarForm">
          <v-container>
            <v-row justify="center" align="center">
              <v-menu bottom offset-y origin="center top" transition="scale-transition">
                <template v-slot:activator="{ on }">
                  <v-btn text x-large outlined v-on="on">{{modo}}</v-btn>
                </template>
                <v-list flat>
                  <v-list-item
                    v-for="(modo,index) in modos"
                    :key="index"
                    @click="changeModo(modo)"
                  >
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
                  maxlength="4"
                  type="password"
                  label="codigo"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="space-around" align="center">
              <v-btn 
              type="submit" 
              @click="
                activarDialog=false; 
                $refs.activarForm.reset()"
              >Activar</v-btn>
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
      <v-dialog v-model="desactivarDialog" width="30em">
        <template v-slot:activator="{on}">
          <v-btn class="red" v-on="on">Desactivar</v-btn>
        </template>
        <v-form @submit="submitDesactivar" class="white" ref="desactivarForm">
          <v-container>
            <v-row class="px-2">
              <v-col offset="3" cols="6">
                <v-text-field
                  :rules="codigoRules"
                  required
                  maxlength="4"
                  type="password"
                  label="codigo"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="space-around" align="center">
              <v-btn
                type="submit"
                @click="
                  desactivarDialog=false; 
                  $refs.desactivarForm.reset()"
              >Desactivar</v-btn>
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
      <v-dialog v-model="cambiarCodigoDialog" width="30em">
        <template v-slot:activator="{on}">
          <v-btn class="yellow" v-on="on">Cambiar codigo</v-btn>
        </template>
        <v-form @submit="submitCambiarCodigo" class="white" ref="cambiarCodigoForm">
          <v-container>
            <v-row class="px-2">
              <v-col offset="3" cols="6">
                <v-text-field
                  name="old"
                  :rules="codigoRules"
                  required
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
                  cambiarCodigoDialog=false;
                  $refs.cambiarCodigoForm.reset();
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Alarma",
  data() {
    return {
      activada: false,
      activarDialog: false,
      desactivarDialog: false,
      cambiarCodigoDialog: false,
      codigo: "1111",
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
      modo: "regular"
    };
  },
  methods: {
    changeModo(modo) {
      this.modo = modo;
    },
    submitActivar(e) {
      console.log("activar");
      e.preventDefault();
    },
    submitDesactivar(e) {
      console.log("desactivar");
      e.preventDefault();
    },
    submitCambiarCodigo(e) {
      e.preventDefault();
      console.log("cambiarCodigo");
    }
  }
};
</script>
