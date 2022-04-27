<template>
        <div class="container">
            <div class="card">
                <div class="card-body">
            <h2>Sign In</h2>
                <div class="card-body">
                    <div class="form-group">
                        <label for="userName"><b>Username</b></label>
                        <input v-model="user.userName" ref="userName" type="text" class="form-control" placeholder="Enter username" name="userName" />
                    </div>
                    <div class="form-group">
                        <label for="password"><b>Password</b></label>
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
        width: 25%;
        padding: 16px;
        text-align: left;
    }

    body {font-family: Arial, Helvetica, sans-serif;}
    * {box-sizing: border-box}

    input[type=text],input[type=password],input[type=email]{
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    }
    input[type=text]:focus,input[type=password]:focus,input[type=email]:focus{
        background-color: #ddd;
        outline: none;
    }
    hr{
        border: 1px solid #f1f1f1;
        margin-bottom:25px;
    }
    button{
        background-color: #04AA6D;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
        opacity: 0.9;        
    }
    button:hover{
        opacity:1;
    }

    /* Extra styles for the cancel button */
    .cancelbtn {
        padding: 14px 20px;
        background-color: #f44336;
    }

    /* Float cancel and signup buttons and add an equal width */
    .cancelbtn, .signupbtn {
        float: left;
        width: 50%;
    }

    /* Add padding to container elements */
    .container {
        padding: 16px;
    }

    /* Clear floats */
    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }

    /* Change styles for cancel button and signup button on extra small screens */
    @media screen and (max-width: 300px) {
        .cancelbtn, .signupbtn {
            width: 100%;
        }
    }
</style>