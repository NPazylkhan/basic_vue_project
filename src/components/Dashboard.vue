<template>
    <Layout title="Dashboard"></Layout>
    <br/>
    <button class="my-button" @click="addCustomer" style="margin: 10px 0 10px 0;">Create</button>
    <table>
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
                <td>{{item.Role}}</td>
                <td>
                    <button class="my-button" @click="editCustomer(item.customerId)" style="float:left;">Edit</button>
                    <button class="my-button" @click="deleteCustomer(item.customerId)" style="float:left;">Delete</button>
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