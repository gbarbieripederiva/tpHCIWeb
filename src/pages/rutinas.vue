
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="grey" dark v-on="on"><v-icon>mdi-plus</v-icon>Añadir rutina</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Añadir rutina</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="Nombre de la rutina*" required></v-text-field>
              </v-col>
            </v-row>

            <v-btn color="grey" ><v-icon>mdi-plus</v-icon>Añadir acción</v-btn>

          </v-container>
          <small>*indica la información requerida</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
    }),
  }
</script>
