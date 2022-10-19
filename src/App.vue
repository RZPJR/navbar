<template>
    <div>
        <div v-if="getStatusLogin && !isLoading">
            <NavBar v-if="!isLoading && ['Maintenance','Unauthorized','Forbidden','PageNotFound','InternalServerError'].indexOf($route.name) === -1"  v-show="getStatusLogin"/>
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