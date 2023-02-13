<template>
    <section>
        <v-navigation-drawer enable-resize-watcher :permanent="modeDesktop" v-model="drawer" app color="#2B3739" width="220" height="100%" :dark="true">
            <div class="pt-2"/>
            <v-list class="OpenSans fs13">
                <v-list-item>
                    <img :src="logo_url" class="image-sidebar">
                </v-list-item>
                <div v-for="(item, idx) in navbar" :key="idx" class="mt3">
                    <div v-if="!item.child">
                        <v-list-item v-privilege="item.permission_id" color="#FFFFFF" :to="item.url" @click="checkPageExist()">
                            <v-list-item-icon class="p-icon-nav" style="margin-right:14px">
                                <v-icon>{{item.icon}}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content class="fs13" :data-unq="`parent-menu-${item.title}`">{{item.title}}</v-list-item-content>
                        </v-list-item>
                    </div>
                    <div v-else>
                        <v-list-group :value="activeRoute(item.child)" color="#FFFFFF" v-privilege="item.permission_id">
                            <template v-slot:activator>
                                <v-list-item-icon class="p-icon-nav" style="margin-right:14px">
                                    <v-icon>{{item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="fs13" :data-unq="`parent-menu-${item.title}`">{{item.title}}</v-list-item-content>
                            </template>
                            <div>
                                <div v-for="(child, idx) in item.child" :key="idx">
                                    <v-list-item :to="child.url" v-privilege="child.permission_id" @click="checkPageExist(child.url)">
                                        <v-list-item-content class="p-icon-nav" style="margin-right:14px" :data-unq="`child-menu-${child.title}`">{{child.title}}</v-list-item-content>
                                    </v-list-item>
                                    <div class="hr-navbar-new" v-privilege="child.permission_id"/>
                                </div>
                            </div>
                        </v-list-group>
                    </div>
                </div>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="#FFFFFF" flat class="OpenSans fs14" dense>
            <v-row>
                <v-col cols="2" v-if="!modeDesktop">
                    <v-btn icon @click.stop="drawer = !drawer" class="-ml6 mt6">
                        <img :src="menu_url">
                    </v-btn>
                </v-col>
                <v-col :cols="!modeDesktop ? 8 : 10">
                    <v-toolbar-title :class="!modeDesktop ? 'nav-title mt15' : 'nav-title'">{{title}}</v-toolbar-title>
                </v-col>
                <v-col cols="2">
                    <v-btn
                        v-if="modeDesktop"
                        class="no-caps fs14 mr8"
                        text
                        name="logout-btn"
                        color="#768F9C"
                        @click="signoutButtonPressed"
                        outlined
                        style="float: right;"
                    >
                        <v-icon left>power_settings_new</v-icon><span class="fs13">Logout</span>                    
                    </v-btn>
                    <v-card-actions v-else @click.stop="drawerRight = !drawerRight">
                        <v-list-item>
                            <v-menu offset-y >
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" class="-ml24">
                                    <img :src="polygon_url">
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item  @click="signoutButtonPressed">
                                    <v-list-item-content>
                                        <v-list-item-title>Logout</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            </v-menu>
                        </v-list-item>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-app-bar>
    </section>
</template>
<script>
    import { mapState, mapActions } from 'vuex'

    import { ImageLogo, ImageLogoStaging, ImageLogoDev, Menu } from "@vue-mf/global";
    import { BgNavbarNew } from "@vue-mf/global";

    export default {
        props: {
            source: String,
        },
        components: { 
            ImageLogo,
            ImageLogoStaging,
            ImageLogoDev,
            Menu, 
            BgNavbarNew,
        },
        data: () => ({
            selectedItem: 1,
            drawer: null,
            drawerRight: null,
            dark_mode:false,
            me:{},
            items: [
                { text: 'Real-Time', icon: 'mdi-clock' },
                { text: 'Audience', icon: 'mdi-account' },
                { text: 'Conversions', icon: 'mdi-flag' },
            ],
            modeDesktop : null,
            logo_url: "",
            menu_url: "",
            polygon_url: "",
            title: ''
        }),
        computed: {
            ...mapState({
                bearer: state => state.navbar.bearer,
                navbar: state => state.navbar.navbar.data
            }),
        },
        methods: {
            ...mapActions([
                'fetchNavbar',
            ]),
            async fetchAPI() {
                if (this.bearer === '' || this.bearer === null || this.bearer === undefined) {
                    window.location.replace('/auth')
                } else {
                    await this.fetchNavbar()
                    this.checkPageExist()
                }
            },
            activeRoute(child) {
                let value = false
                child.forEach(e => {
                    if (this.$route.path.includes(e.url)) {
                        value = true
                    }
                });
                return value
            },
            signoutButtonPressed() {
                localStorage.setItem('bearer', '')
                window.location.replace("/auth");
            },
            async fetchRouteInformation() {
                let page = []
                let url_pathname = window.location.pathname
                await this.navbar?.map((e) => {
                    if (e.url === '') {
                        e.child.map((el) => {
                            if (url_pathname.includes(el.url)) {
                                page = el
                            } else if (url_pathname.includes('weigh-scale')) {
                                page = el
                            }
                        })
                    } else {
                        if (url_pathname.includes(e.url)) {
                            page = e
                        }
                    }
                })
                return page
            },
            async checkPageExist(url) {
                let page = await this.fetchRouteInformation()
                if (page.length === 0) {
                    // window.location.replace("/error/404")
                    // this.$router.push("/error/404").catch(error => {
                    //     if (error.name != "NavigationDuplicated") {
                    //         throw error;
                    //     }
                    // });
                } else {
                    document.title = "Dashboard - " + page.title;
                    this.title = page.title
                    this.setTitle()
                    if (url) {
                        window.location.replace(url)
                        // this.$router.push(url).catch(error => {
                        //     if (error.name != "NavigationDuplicated") {
                        //         throw error;
                        //     }
                        // });
                    }
                }
            },
            setTitle() {
                let route = JSON.parse(localStorage.getItem("route"))
                if (route && route.meta.title) {
                    this.title = route.meta.title
                }
            }
        },
        watch: { 
            '$route' () {
                let self = this 
                setTimeout(() => {
                    self.setTitle()
                }, 100);
            } 
        },
        async mounted(){
            this.setTitle()
            await this.fetchAPI()
            window.onresize = () => {
                if (window.screen.width > 1024) {
                    this.modeDesktop = true
                } else {
                    this.modeDesktop = false
                }
            }
        },
        created () {
            if (window.screen.width > 1024) {
                this.modeDesktop = true
            } else {
                this.modeDesktop = false
            }
            let env = process.env.VUE_APP_LOGO_ENV
            if (env == 'dev') {
                this.logo_url = ImageLogoDev
            } else if (env == 'staging') {
                this.logo_url = ImageLogoStaging
            } else {
                this.logo_url = ImageLogo
            }
            this.menu_url = Menu
            // this.polygon_url = Polygon
        },
        beforeCreate() {
            if (window.screen.width > 1024) {
                this.modeDesktop = true
            } else {
                this.modeDesktop = false
            }
        },
    };
</script>
<style scoped>
/* background v-list active */
.v-list .v-list-item--active {
    color: #FFFFFF;
    background-image: BgNavbarNew;
    background-position: left;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
}
/* padding icon */
.p-icon-nav {
    /* padding-left:20px; */
    margin-right:14px
}
</style>
