<template>
  <Layout title="Customer"></Layout>
  <br />
    <label for="upload-pic" class="imgLabel">
        <img class="rounded-circle mt-5 imgTag" style="width:100%;height:100%;" v-bind:src="fileSrc">
        <input type="file" id="upload-pic" @change="uploadImage($event)" class="upload-pic" accept="image/*" name="Files" style="display:none;">
    </label>
  <br />
  <input v-model="customer.customerName" ref="customerName" type="text" placeholder="Customer name"/>
  <br />
  <input v-model="customer.role" ref="role" type="text" placeholder="Role" />
  <br />
  <button class="btn btn-primary" @click="save">Save</button>
</template>

<script>
import Layout from "./Layout.vue";
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            files:'',
            customer: {
                file:'',
                fileSrc:require('@/assets/anonymous.png'),
                customerId: 0,
                customerName: "",
                role: "",
            },
        };
    },
  components: { 
      Layout 
    },
  async created(){
      if(this.$route.params.id>0) await this.getCustomer();
  },
  setup() {
      
  },
  methods: {
    async getCustomer() {
      var customerId = this.$route.params.id;
      await axios.get(this.hostname + "/api/customer/GetByCustomerId/" + customerId, this.getTokenConfig())
        .then((response) => {
          this.customer = response.data;

          if(this.customer.imgByte != null && this.customer.imgByte.length > 0){
              this.fileSrc = 'data:image/jpeg;base64,'+this.customer.imgByte;
              this.file = 'data:image/jpeg;base64,'+this.customer.imgByte;
          }
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire(error.response.data);
          }
       });
    },
    getTokenConfig() {
      var token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return config;
    },
    save() {
      if (this.checkValidation()) {
        axios.post(this.hostname + "/api/customer/save", this.customer, this.getTokenConfig())
            .then((response) => {
                if (response.data.customerId > 0) {
                    Swal.fire("Successfully saved")
                    this.$router.push({name:"Dashboard"});
                } 
                else {
                    Swal.fire("Error : Something went wrong.");
                }
            })
            .catch((error) => {
                if (error.response) {
                    Swal.fire(error.response.data);
                }
          });
      }
    },
    uploadImage(e){
        this.customer.file = e.target.files[0];
        this.fileSrc = window.URL.createObjectURL(e.target.files[0]);

        let formData = new FormData();
            formData.append('files', e.target.files[0]);

        axios.post(this.hostname + "/api/customer/AddFile", formData, this.getTokenConfig(),{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
           .then(response => {
                    alert(`Total Mock File Uploaded: ${response.data}`);
                }).catch(error => {
                    alert(`something went wrong: ${error}`);
                });
    },
    checkValidation() {
      if (!this.customer.customerName) {
        this.$refs.customerName.focus();
        Swal.fire("Give customer name");
        return;
      }
      if (!this.customer.role) {
        this.$refs.role.focus();
        Swal.fire("Give role");
        return;
      }
      return true;
    },
  },
};
</script>

<style scoped>
    button, input{
        margin-top:4px;
    }
    .imgLabel{
        cursor: pointer;
        height: 200px;
        width:200px;
        margin-bottom: 50px;
    }
</style>