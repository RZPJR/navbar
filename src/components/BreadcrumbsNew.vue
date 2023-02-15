<template>
    <div class="breadcrumbs-main text-black60">
        <span v-for="(item, idx) in item" :key="idx">
            <span v-if="item.to && idx == 0">
                <router-link 
                    class="route-active"
                    :to="item.to"
                >{{item.text}}</router-link>
            </span>
            <span v-else-if="item.to && idx != 0">
                &nbsp; > &nbsp;
                <router-link 
                    class="route-active"
                    :to="item.to"
                >{{item.text}}</router-link>
            </span>
            <span v-else>
                &nbsp; > &nbsp; {{item.text}}
            </span>
        </span>
    </div>
</template>
<script>
export default {
    name : "BreadcrumbsNew",
    data() {
        return {
            items: [],
        }
    },
    watch: { '$route' () {
        let self = this 
        setTimeout(() => {
            self.updateList() 
        }, 200);
    }},
    mounted() {
        let self = this 
        setInterval(() => {
            self.updateList() 
        }, 200);
    },
    computed:{
        item(){
            return this.items
        }
    },
    methods : {
        updateList () { 
            let route = JSON.parse(localStorage.getItem("route"))
            if (route.meta.breadcrumbs) {
                this.items = JSON.parse(JSON.stringify(route.meta.breadcrumbs))
                for (let i = 0; i < this.items.length; i++) {
                    let link = this.items[i].to
                    if (link !== undefined) {
                        if (link.includes(':id')) {
                            this.items[i].to = link.replace(":id", route.params.id)
                        }
                    } 
                }
            }
        }
    }
}
</script>