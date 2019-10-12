<template>
  <v-card fill-width class="light-blue my-2">
    <v-container fill-width>
      <v-row class="px-3" align="center">
        <p class="mt-4 mr-2">{{rutina.name}}</p>
        <v-icon @click="deleteRutina">mdi-delete</v-icon>
        <v-spacer></v-spacer>
        <v-btn fab class="mr-4" @click="showRutina">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-dialog v-model="dialogShowRoutine">
          <v-list>
            <v-list-group
              v-for="(d,name) in dialogData"
              :key="name"
              active-class="info black--text"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{name}}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="a in dialogData[name]"
                :key="a.name"
              >{{a.name}}{{a.params.length>0?`: ${a.params[0]}`:""}}</v-list-item>
            </v-list-group>
          </v-list>
        </v-dialog>
        <v-btn fab @click="executeRoutine">
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import api from "@/plugins/api.js";
import ActionTranslater from "./actionTranslater.js";

export default {
  name: "Rutina",
  props: ["rutina"],
  data() {
    return { dialogData: {},dataInitialized:false, dialogShowRoutine: false };
  },
  methods: {
    executeRoutine() {
      this.$emit("executeStat", 1);
      api.routines
        .execute(this.rutina.id)
        .then(r => {
          this.$emit("executeStat", 2);
        })
        .catch(e => {
          console.error(e);
          this.$emit("executeStat", -1);
        });
    },
    deleteRutina() {
      this.$emit("deleteRutina", this.rutina.id);
    },
    showRutina() {
      if (!this.dataInitialized) {
        for (let a of this.rutina.actions) {
          if (this.dialogData[a.meta.deviceName]) {
            this.dialogData[a.meta.deviceName].push({
              name: ActionTranslater[a.actionName],
              params: a.params
            });
          } else {
            this.dialogData[a.meta.deviceName] = [
              { name: ActionTranslater[a.actionName], params: a.params }
            ];
          }
        }
        this.dataInitialized=true;
      }
      this.dialogShowRoutine = true;
    }
  }
};
</script>