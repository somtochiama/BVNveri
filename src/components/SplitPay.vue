<template>
    <div class="box">
        <section class="form-box">
            <form id="bvn-form" @submit.prevent="payWithRave">
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
import router from "../router.js"

export default {
    name: "SplitPay",
    data() {
        return {
            email: null,
            amount: null,
            errors: []
        }
    },
    methods: {
        payWithRave() {
            console.log(router)            
            console.log("here", process.env.VUE_APP_API_PUBKEY);
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
                onclose: function() {},
                callback: function(response) {
                    var txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
                    console.log("This is the response returned after a charge", response);
                    if (
                        response.tx.chargeResponseCode == "00" ||
                        response.tx.chargeResponseCode == "0"
                    ) {
                        // redirect to a success page
                        // alert('success')
                        x.close();
                        router.go()
                    } else {
                        // redirect to a failure page.
                        // alert('success')
                    }
                    // x.close(); // use this to close the modal immediately after payment.
                }
            });
        }
    }
}
</script>

<style>

</style>
