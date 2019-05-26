<template>
    <div class="container">
        <div class="banner">
            <div class="img-box">
                <img src="../assets/icons/credit-cards-payment.svg" alt="credit-cards-payment.svg" >
            </div>
            <p class="banner-text">Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics artisan synth stumptown gastropub cornhole celiac swag. </p>
            <div class="buttons">
                <button class="btn mb">
                    <router-link to="/verify">BVN Verification</router-link>
                </button>
                <button class="btn">
      	            <router-link to="/split-pay">Split Payment Demo</router-link>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.img-box {
    width: 50%;
    margin: auto;
}


.banner {
    width: 60%;
}

.banner-text {
    text-align: center
}

.buttons {
    display: flex;
    justify-content: space-around
}

.btn {
    width: 200px
}

button > a {
    color: white;
    text-decoration: none
}

@media screen and (max-width:700px) {
    .banner {
      width: 80%
    }

}

@media screen and (max-width: 550px) {
    .buttons {
      flex-direction: column;
      align-items: center
    }

    .mb {
        margin-bottom: 10px
    }

    .img-box {
        width: 70%
    }
}

</style>
