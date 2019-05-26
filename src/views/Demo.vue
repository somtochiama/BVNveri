<template>
    <div class="container">
        <h2>Our esteemed rideshare company</h2>
        <div class="explainer-text">
            <ul>
                <li>Login to your dashboard</li>
                <li>Click on transactions from the menu</li>
                <li>Click on each individual transactions to see the details</li>
                <li>The payment is split, giving you the commission</li>
            </ul>
        </div>
        <div class="img-container">
            <img src="../assets/images/dashboard.jpg" alt="Rave dashboard">
        </div>
    </div>
</template>

<script>
export default {
    name: "Demo"
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
    }

    .container h2 {
        text-align: center;
    }

    ul {
        width: 60%;
        margin: auto;
    }

    .img-container {
        width: 70%;
        margin: auto
    }
</style>
