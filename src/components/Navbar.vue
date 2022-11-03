<template>
    <section>
        <v-navigation-drawer enable-resize-watcher :permanent="modeDesktop" v-model="drawer" app color="#2B3739" width="220" height="100%" :dark="true">
            <div class="pt-2"/>
            <v-list class="OpenSans fs13">
                <v-list-item>
                    <img src="../assets/eden-logo-dev.png" width="70%" height="70%" class="pl-md-3">
                </v-list-item>
                <div class="pt-3"/>
                <div v-for="(item, idx) in navbar" :key="idx">
                    <div v-if="!item.child">
                        <v-list-item v-privilege="item.privilege.value" color="#FFFFFF" :to="item.url">
                            <v-list-item-icon class="p-icon-nav" style="margin-right:14px">
                                <v-icon>{{item.icon}}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="fs13">{{item.title}}</v-list-item-title>
                        </v-list-item>
                    </div>
                    <div v-else>
                        <v-list-group :value="activeRoute(item.child)" color="#FFFFFF" v-privilege="item.privilege.value">
                            <template v-slot:activator>
                                <v-list-item-icon class="p-icon-nav" style="margin-right:14px">
                                    <v-icon>{{item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title class="fs13">{{item.title}}</v-list-item-title>
                            </template>
                            <div>
                                <div v-for="(child, idx) in item.child" :key="idx">
                                    <v-list-item :to="child.url" v-privilege="child.privilege.value" >
                                        <v-list-item-content class="p-icon-nav" style="margin-right:14px">{{child.title}}</v-list-item-content>
                                    </v-list-item>
                                    <!-- <hr class="mx-4 hr-navbar" v-privilege="child.privilege.value"> -->
                                    <div class="hr-navbar-new" v-privilege="child.privilege.value"/>
                                </div>
                            </div>
                        </v-list-group>
                    </div>
                </div>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="white" flat class="OpenSans fs14" dense>
            <v-btn icon v-if="!modeDesktop" @click.stop="drawer = !drawer">
                <img src="/icon/menu.png">
            </v-btn>
            <v-toolbar-title class="nav-title">{{routeName}}</v-toolbar-title>
            <div class="flex-grow-1 men" ></div>
            <v-btn
                v-if="modeDesktop"
                class="no-caps fs14 mr8"
                text
                name="logout-btn"
                color="#768F9C"
                @click="signoutButtonPressed"
                outlined
            >
                <v-icon left>
                    power_settings_new
                </v-icon>
               <span class="fs13">Logout</span>
                    
            </v-btn>

            <v-card-actions v-else @click.stop="drawerRight = !drawerRight">
                <v-list-item style="margin-right:-28px">
                    <v-menu offset-y >
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <img src="/icon/polygon.png">
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
        </v-app-bar>
    </section>
</template>
<script>
    import { mapState, mapActions } from 'vuex'

    import { ImageLogo } from "@vue-mf/global";
    import { BgNavbarNew } from "@vue-mf/global";

    export default {
        props: {
            source: String,
        },

        components: { 
            ImageLogo,
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
        }),
        computed: {
            ...mapState({
                navbar: state => state.navbar.navbar.data
            }),
            routeName() {
                let path = this.$route.path;
                let title = ''
                if (this.navbar.length > 0) {
                    let selectedPage = this.navbar.filter((e) => {
                        return e.url === path
                    })
                    title = selectedPage[0].title
                }
                return title;
            }
        },
        methods: {
            ...mapActions([
                'fetchNavbar',
            ]),
            async fetchAPI() {
                await this.fetchNavbar()
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
            darkMode(){
                let value
                value = localStorage.getItem('dark_mode')

                if(value === 'true'){
                    localStorage.removeItem('dark_mode')
                    localStorage.setItem('dark_mode','false')
                    this.$vuetify.theme.dark = false
                    this.dark_mode=false
                }else if(value === 'false' || value === null){
                    localStorage.removeItem('dark_mode')
                    localStorage.setItem('dark_mode','true')
                    localStorage.setItem('dark_mode','true')
                    this.$vuetify.theme.dark = true
                    this.dark_mode=true
                }
            },
            async checkPageExist() {
                let checkPage = await this.navbar.filter((e) => {
                    return e.url === this.$route.path
                })
                if (checkPage.length === 0) {
                    window.location.replace("/error/404");
                }
            }
        },
        async mounted(){
            await this.fetchAPI()
            this.checkPageExist()
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
            // let env = process.env.VUE_APP_LOGO_ENV
            // if (env == 'dev') {
            //     this.logo_url = "/img/eden-logo-dev.png"
            // } else if (env == 'staging') {
            //     this.logo_url = "/img/eden-logo-staging.png"
            // } else {
            //     this.logo_url = "/img/eden-logo.png"
            // }
            this.logo_url = ImageLogo
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
