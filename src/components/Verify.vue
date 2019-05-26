<template>
  <div class="box">
    <modal v-show="showModal" @close="showModal = false" >
        <template v-slot:body>
            <div class="img-box">
              <img ref="verifyIcon" :src="checked" alt="symbol">
            </div>
            <div v-if="message">{{message}}</div>
        </template>
        <template v-slot:footer>
            <button @click="showModal = false">Okay</button>
        </template>
    </modal>
    <section class="form-box">
      <form action id="bvn-form" @submit.prevent="verifyBvn">
        <p>Input BVN to check if customer is verified</p>
        <ul v-if="errors.length">
            <li v-for="error in errors">* {{ error }}</li>
        </ul>
        <div class="form-input">
          <label for="bvn">Your BVN:</label>
          <input type="text" v-model="bvn" name="bvn" id="bvn">
        </div>
        <input type="submit" class="btn" id="verify-btn" value="Verify!">
      </form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import loading from "@/assets/icons/loading.gif"
import Modal from "./Modal.vue";
import checked from "@/assets/icons/checked.svg"
export default {
  name: "Verify",
  data() {
    return {
      bvn: null,
      errors: [],
      showModal: false,
      checked: null,
      message: null,
    };
  },
  methods: {
    validateForm() {
      this.errors = [];

      if (!this.bvn) {
          this.errors.push('Bvn required.');
      }

      if (!this.errors.length ) {
          return true;
      }
    },

    verifyBvn() {
      const validate = this.validateForm();
      if (validate) {
        this.message = null
        this.checked = loading
        this.showModal = true
        let bvn = this.bvn;
        let url = `https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/${bvn}`;
        axios({
          url,
          method: "GET",
          header: {
            "Content-Type": "application/json"
          },
          params: {
            seckey: process.env.VUE_APP_SECKEY
          }
        })
        .then(response => {
          if (response.data.status == "success") {
            this.checked = checked;
            this.message = "BVN Validation Successfully!"
          } else {
            this.checked = "../assets/icons/unchecked.svg"
            this.message = "Unfortunately, Your customer isn't verified."
          }
          this.showModal = true 
        })
        .catch(err => {
          console.log(err);
          this.errors.push(err.response.data.message)
        });
      }
    },

  },
  components: {
    Modal,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.img-box {
  width: 100px;
  height: 100px;
  margin: auto
}

.modal-header, 
.modal-body {
  text-align: center
}

</style>
