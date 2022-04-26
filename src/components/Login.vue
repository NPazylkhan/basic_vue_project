<template>
    <div class="col-md-12">
        <div class="container">
            <h3 class="e-shop-font">Login Page</h3>
            <div class="card">
                <div class="card-body">
                    <div class="form-group">
                        <label for="userName">Username:</label>
                        <input v-model="user.userName" ref="userName" type="text" class="form-control" placeholder="Enter username" name="userName" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input v-model="user.password" ref="password" type="password" class="form-control" placeholder="Enter password" name="password" />
                    </div>
                    <div class="form-group form-check">
                        <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" name="remember" />
                        </label>
                    </div>
                    <div class="clearfix">
                        <button type="button" class="signin" @click="login">Sign in</button>
                        <button type="button" class="signup" @click="signup">Sign up</button>
                    </div>
                </div>
            </div>
        </div>    
    </div>    
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default ({
    data(){
        return{
            user:{
                userName:"",
                password:""
            }
        }
    },
    methods:{
        signup(){
            this.$router.push({name:'Register'});
        },
        login(){
            if(this.checkValidation()){
                axios.get(this.hostname + "/api/user/signin/" + this.user.userName + "/" + this.user.password)
                    .then(response=>{
                        if(response.data.userId>0){
                            localStorage.setItem('token', JSON.stringify(response.data.token));
                            response.data.token = "";
                            localStorage.setItem('user', JSON.stringify(response.data));
                            this.$router.push({name:"Dashboard"});
                        }
                    })
                    .catch(error=>{
                        if(error.response){
                            Swal.fire(error.response.data);
                        }
                    })
            }

        },
        checkValidation(){
            if(!this.user.userName){
                this.$refs.userName.focus();
                Swal.fire("Give username");
                return;
            }
            if(!this.user.password){
                this.$refs.password.focus();
                Swal.fire("Give password");
                return;
            }
            return true;
        }
    }
})
</script>

<style scoped>
    .container{
        max-width: 360px;
    }

    button{
        background-color:red;
        color:white;
        padding:14px 20px;
        margin: 8px 0;
        border:none;
        cursor:pointer;
        width:100%;
        opacity:0.9;        
    }
    button:hover{
        opacity:1;
    }
</style>