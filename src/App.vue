<template>
    <div>
        <div v-if="getStatusLogin && !isLoading">
            <NavBar v-if="!isLoading && ['Maintenance','Unauthorized','Forbidden','PageNotFound','InternalServerError'].indexOf($route.name) === -1"  v-show="getStatusLogin"/>
        </div>
        <v-main v-if="!isLoading">
            <!-- <BreadCrumbsNew v-if="$route.meta.breadcrumbs" /> -->
            <router-view />
        </v-main>
    </div>
</template>


<script>
    import NavBar from "./components/Navbar.vue";
    // import { BreadCrumbsNew } from "@vue-mf/global";

    export default {
        name: "App",
        components: {
            NavBar,
            // BreadCrumbsNew,
        },
        data() {
            return { isLoading: true };
        },
        computed: {
            getStatusLogin: function () {
                var valToken = localStorage.getItem('bearer')
                if(valToken !== ''){
                    return true
                }else{
                    return false
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.isLoading = false;
            }, 50);
        },
        created() {
            document.title = 'Dashboard - '+this.$route.meta.title;
        },
        watch: {
            '$route' (to, from) {
                document.title = to.meta.title ? 'Dashboard - '+ to.meta.title : 'EdenFarm'|| 'EdenFarm'
            }
        },
    };
</script>