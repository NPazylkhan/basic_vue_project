<template>
    <!-- <h5>{{title}}</h5> -->
    <button class="btn btn-secondary" @click="logout"><i class="fa fa-sign-out"></i></button>
</template>

<script>
export default {
    data() {
        return{

        }
    },
    created(){
        document.title = this.$props.title;
    },
    props:{
        title:String
    },
    methods:{
        logout(){
            window.localStorage.clear();
            this.$router.push({name:'Login'});
        },
    }
}
</script>

<style scoped>

</style>