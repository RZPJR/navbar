<template>
    <div>
        <div v-if="getStatusLogin && !isLoading">
            <NavBar v-if="!isLoading && !getErrorRoute" v-show="getStatusLogin" />
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
            getStatusLogin: function () { //get status login
                var valToken = localStorage.getItem("bearer");
                if (valToken !== "") {
                    return true;
                } else {
                    return false;
                }
            },
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
