<template>
    <div style="display:flex;justify-content:flex-end;margin-right:10px;">
        <button class="btn btn-primary m-2 fload-end" @click="addCustomer" style="margin: 10px 0 10px 0;float:right;">Create</button>
        <Layout title="Dashboard"></Layout>
    </div>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in customers" :key="item.customerId">
                <td>{{item.customerName}}</td>
                <td>{{item.role}}</td>
                <td>
                    <button class="btn btn-primary" @click="editCustomer(item.customerId)" style="float:center; margin-right:2px">Edit</button>
                    <button class="btn btn-primary" @click="deleteCustomer(item.customerId)" style="float:center;">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import Layout from './Layout.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data(){
        return{
            customers:[]
        }
    },
    components:{
        Layout
    },
    async created(){
        await this.getCustomers();
    },
    setup() {
        
    },
    methods:{
        addCustomer(){
            this.$router.push({name:"Customer", params:{id:0}})
        },
        editCustomer(customerId){
            this.$router.push({name:"Customer", params:{id:customerId}})
        },
        deleteCustomer(customerId){
            axios.delete(this.hostname + "/api/customer/delete/" + customerId, this.getTokenConfig())
                .then(response=>{
                    Swal.fire(response.data);
                    var removeIndex = this.customers.findIndex(x=>x.customerId==customerId);
                    ~removeIndex && this.customers.splice(removeIndex,1);
                })
                .catch(error=>{
                    if(error.response){
                        Swal.fire(error.response.data);
                    }
                })
        },
        getTokenConfig(){
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            };
            return config;
        },
        async getCustomers(){
            await axios.get(this.hostname+"/api/customer/gets1/", this.getTokenConfig())
                .then(response=>{
                    this.customers = response.data;
                })
                .catch(error=>{
                    if(error.response){
                        Swal.fire(error.response.data)
                    }
                });
        }
    }
}
</script>