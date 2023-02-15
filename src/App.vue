<template>
    <div>
        <div v-if="!isLoading">
            <NavBar v-if="!isLoading && !getErrorRoute"/>
        </div>
        <v-main v-if="!isLoading">
            <BreadcrumbsNew v-if="breadcrumbs"/>
            <router-view />
        </v-main>
    </div>
</template>

<script>
    import NavBar from "./components/Navbar.vue";
    import BreadcrumbsNew from "./components/BreadcrumbsNew.vue";

    export default {
        name: "App",
        components: {
            NavBar,
            BreadcrumbsNew
        },
        data() {
            return { 
                isLoading: true,
                breadcrumbs : false
            };
        },
        watch: { 
            '$route' () {
                let self = this 
                setTimeout(() => {
                    self.getBreadcrumbs()
                }, 100);
                setTimeout(() => {
                    self.getBreadcrumbs()
                }, 1000);
            } 
        },
        methods : {
            getBreadcrumbs() {
                let route = JSON.parse(localStorage.getItem("route"))
                if (route.meta.breadcrumbs) {
                    this.breadcrumbs = true
                } else {
                    this.breadcrumbs = false
                }
            }
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
            this.getBreadcrumbs()
            let self = this 
            setInterval(() => {
                self.getBreadcrumbs()
            }, 1000);
        },
    };
</script>
