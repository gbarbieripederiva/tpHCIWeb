<template>
    <div class="mx-6">
        <v-row class="blue darken-2">
            <p class="display-3">Ayuda</p>
        </v-row>
        <v-row>
            <p>Esta página se tiene que conectar con la API que está contenido en el archivo de descarga. Si la API no corre en el puerto 8080
                esta no funciona, por lo que si se corre primero el archivo TpHci no funcionará.
            </p>
        </v-row>
        <v-row>
            <p>Para navegar en la aplicación se debe utilizar el menu de secciones por donde se puede acceder a las secciones:</p>

        </v-row>
        <v-row>
            <ul>
                <li>Dispositivos favoritos</li>
                <li>Rutinas</li>
                <li>Cuartos</li>
                <li>Seguridad</li>
            </ul>
        </v-row>

    </div>
</template>

<script>
    export default {
        name: "Ayuda"
    }
</script>

<style scoped>

</style>