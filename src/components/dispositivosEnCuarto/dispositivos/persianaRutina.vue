<template>
    <v-container fill-width>
        <v-switch v-model="moveUp" vertical>
            <template v-slot:prepend>
                <v-icon>mdi-arrow-down</v-icon>
            </template>
            <template v-slot:append>
               <v-icon>mdi-arrow-up</v-icon>
            </template>
        </v-switch>
    </v-container>
</template>

<script>
    export default {
        name: "PersianaRutina",
        data(){
            return{
                moveUp: false,
            }
        }
    }
</script>

<style scoped>

</style>