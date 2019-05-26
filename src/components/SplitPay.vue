<template>
    <div class="box">
        <section class="form-box">
            <form id="bvn-form" @submit.prevent="paymentDetails">
                <ul v-if="errors.length">
                    <li v-for="error in errors">* {{ error }}</li>
                </ul>
                <div class="form-input">
                    <label for="bvn">Your Email:</label>
                    <input type="email" v-model="email" name="email" id="email">
                </div>
                <div class="form-input">
                    <label for="amt">Amount:</label>                    
                    <input type="number" v-model="amount" name="amount" id="amount">
                </div>
                <input type="submit" class="btn"  value="Pay Now">      
            </form>
        </section>
    </div>
</template>

<script>
import axios from "axios"
import router from "../router.js"
import { deflate } from "zlib";

const aVue = {
    name: "SplitPay",
    data() {
        return {
            email: null,
            amount: null,
            errors: [],
            txref: null
        }
    },
    methods: {
        validateForm() {
            this.errors = [];

            if (!this.email) {
                this.errors.push('Email required.');
            }

            if (!this.amount) {
                this.errors.push('An amount required.');
            }

            if (!this.errors.length ) {
                return true;
            }
        },
        payWithRave() {
            console.log(router)            
            console.log("here", process.env.VUE_APP_API_PUBKEY);
            const validate = this.validateForm();
            if (validate) {

                var x = getpaidSetup({
                    PBFPubKey: process.env.VUE_APP_API_PUBKEY,
                    customer_email: this.email,
                    amount: this.amount,
                    currency: "NGN",
                    txref: "rave-123456",
                    subaccounts: [
                    {
                        id: "RS_BB6FC86F4809812FC5C4FCAAF0BD242C", // This assumes you have setup your commission on the dashboard.
                        transaction_charge: 0.09,
                        transaction_charge_type: "percentage"
                    }
                    ],
                    meta: [
                    {
                        metaname: "flightID",
                        metavalue: "AP1234"
                    }
                    ],
                    // redirect_url: "https://www.google.com",
                    onclose: function() {
                        // router.push("/split-pay")
                        // x.close()
                        location.reload()
                    },
                    callback: function(response) {
                        var txref = response.tx.txRef; // collect flwRef returned and pass to a server page to complete status check.
                        console.log("This is the response returned after a charge", response);
                        if (
                            response.tx.chargeResponseCode == "00" ||
                            response.tx.chargeResponseCode == "0"
                        ) {
                            // redirect to a success page
                            // alert('success')
                            aVue.txref = txref
                            console.log(aVue.txref, aVue,"MAdd") 
                            // router.go()
                        } else {
                            // redirect to a failure page.
                            // alert('success')
                        }
                        // x.close(); // use this to close the modal immediately after payment.
                    }
                });
                this.paymentDetails()
            }
        },
        paymentDetails() {
            console.log("here")
            axios({
                method: "POST",
                url: "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify",
                header: {
                    "Content-Type": "application/json"
                },
                data: {
                    txref: "rave-123456",
                    SECKEY: process.env.VUE_APP_SECKEY
                }
            })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err, err.response.data)
            })
        }
    }
}

export default aVue;
</script>

<style>

</style>
