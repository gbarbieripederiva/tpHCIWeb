<template>
  <v-container fill-width>
    <v-row>
      <v-col>
        <v-row justify="center" align="center">
          <v-switch @change="closeAction" v-model="isClosed" :readonly="isLocked">
            <template v-slot:prepend>
              <v-icon>mdi-door-open</v-icon>
            </template>
            <template v-slot:append>
              <v-icon>mdi-door-closed</v-icon>
            </template>
          </v-switch>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center" align="center">
          <v-switch v-model="isLocked" @change="lockAction">
            <template v-slot:prepend>
              <v-icon>mdi-lock-open</v-icon>
            </template>
            <template v-slot:append>
              <v-icon>mdi-lock</v-icon>
            </template>
          </v-switch>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/plugins/api.js";

export default {
  name: "Puerta",
  props: ["dispositivo"],
  watch: {
    isLocked() {
      if (this.isLocked) {
        this.isClosed = true;
      }
    }
  },
  data() {
    return {
      isClosed: false,
      isLocked: false
    };
  },
  methods: {
    closeAction(e) {
      if (!this.dispositivo.routines) {
        let action = e ? "close" : "open";
        api.device.putAction(this.dispositivo.id, action).then(r => {
          if (!r.result) {
            api.device.getState(this.dispositivo.id).then(r2 => {
              this.dispositivo.state = r2.result;
            });
          }
          this.dispositivo.state.status = e ? "closed" : "opened";
          this.setState();
        });
      }
    },
    lockAction(e) {
      if (!this.dispositivo.routines) {
        let action;
        if (e) {
          action = "lock";
          if (!this.isClosed) {
            this.closeAction(true);
          }
        } else {
          action = "unlock";
        }
        api.device.putAction(this.dispositivo.id, action).then(r => {
          if (!r.result) {
            api.device.getState(this.dispositivo.id).then(r2 => {
              this.dispositivo.state = r2.result;
            });
          }
          this.dispositivo.state.lock = e ? "locked" : "unlocked";
          this.setState();
        });
      }
    },
    setState() {
      this.isLocked = this.dispositivo.state.lock === "locked" ? true : false;
      this.isClosed = this.dispositivo.state.status === "closed" ? true : false;
    }
  },
  mounted() {
    if (!this.dispositivo.routines) {
      this.setState();
    }
  }
};
</script>