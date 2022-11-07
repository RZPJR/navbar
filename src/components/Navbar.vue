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
                        <v-list-item v-privilege="item.privilege.value" color="#FFFFFF" :to="item.url" @click="checkPageExist()">
                            <v-list-item-icon class="p-icon-nav" style="margin-right:14px">
                                <v-icon>{{item.icon}}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content class="fs13">{{item.title}}</v-list-item-content>
                        </v-list-item>
                    </div>
                    <div v-else>
                        <v-list-group :value="activeRoute(item.child)" color="#FFFFFF" v-privilege="item.privilege.value">
                            <template v-slot:activator>
                                <v-list-item-icon class="p-icon-nav" style="margin-right:14px">
                                    <v-icon>{{item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="fs13">{{item.title}}</v-list-item-content>
                            </template>
                            <div>
                                <div v-for="(child, idx) in item.child" :key="idx">
                                    <v-list-item :to="child.url" v-privilege="child.privilege.value" @click="checkPageExist()">
                                        <v-list-item-content class="p-icon-nav" style="margin-right:14px">{{child.title}}</v-list-item-content>
                                    </v-list-item>
                                    <div class="hr-navbar-new" v-privilege="child.privilege.value"/>
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
                    <v-toolbar-title :class="!modeDesktop ? 'nav-title mt15' : 'nav-title'">{{routeName}}</v-toolbar-title>
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

    import { ImageLogo, ImageLogoStaging, ImageLogoDev, Menu, Polygon } from "@vue-mf/global";
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
            Polygon,
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
            async checkPageExist() {
                console.log('masuk');
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
            let env = process.env.VUE_APP_LOGO_ENV
            if (env == 'dev') {
                this.logo_url = ImageLogoDev
            } else if (env == 'staging') {
                this.logo_url = ImageLogoStaging
            } else {
                this.logo_url = ImageLogo
            }
            this.menu_url = Menu
            this.polygon_url = Polygon
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
