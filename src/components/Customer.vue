<template>
  <Layout title="Customer"></Layout>
  <br />
  <input
    v-model="customer.customerName"
    ref="customerName"
    type="text"
    placeholder="Customer name"
  />
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
  components: { Layout },
  data() {
    return {
      customer: {
        customerId: 0,
        customerName: "",
        role: ""
      },
    };
  },
  setup() {},
  async created(){
      if(this.$route.params.id>0) await this.getCustomer();
  },
  methods: {
    async getCustomer() {
      var customerId = this.$route.params.id;
      await axios
        .get(
          this.hostname + "/api/customer/GetByCustomerId/" + customerId,
          this.getTokenConfig()
        )
        .then((response) => {
          this.customer = response.data;
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
        axios
          .post(this.hostname + "/api/customer/save", this.customer,this.getTokenConfig())
          .then((response) => {
            if (response.data.customerId > 0) {
              Swal.fire("Successfully saved")
              this.$router.push({name:"Dashboard"});
            } else {
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
</style>