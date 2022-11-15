<template>
    <div>
        <div v-if="!isLoading">
            <NavBar v-if="!isLoading && !getErrorRoute"/>
        </div>
        <v-main v-if="!isLoading">
            <router-view />
        </v-main>
    </div>
</template>

<script>
    import NavBar from "./components/Navbar.vue";

    export default {
        name: "App",
        components: {
            NavBar,
        },
        data() {
            return { isLoading: true };
        },
        computed: {
            getErrorRoute: function () { //hide navbar when auth and error
                let url = window.location.href;
                return url.includes("auth") || url.includes("error")
            },
        },
        mounted() {
            setTimeout(() => {
                this.isLoading = false;
            }, 50);
        },
    };
</script>
