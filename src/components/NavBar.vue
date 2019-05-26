<template>
    <div id="nav">
      <div id="right-nav">
        <h1>Rave-Up!</h1>
        <div class="menu-icon">
          <i class="fa" :class="{'fa-bars':!isOpen, 'fa-times':isOpen }" @click="showNavLinks()">
          </i>
        </div>
      </div>
      <div id="center-nav" :style="{display: isBlock}">
      	<router-link to="/">Home</router-link> 
      	<router-link to="/verify">BVN Verification</router-link>
      	<router-link to="/split-pay">Split Payment Demo</router-link>
      </div>
    </div>
</template>

<script>

export default {
  name: "NavBar",
  
  data() {
    return {
      isOpen: false,
      isBlock: null
    }
  },

  methods: {
    showNavLinks() {
      this.isOpen = !this.isOpen
      this.isBlock = this.isBlock ? null : 'flex'
    },

  }
}
</script>

<style scoped>
    
#nav {
  background-color: #1e223f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  transition: all 5s;
}

a {
  text-decoration: none;
  color: white;
  padding: 10px;
}

h1 {
  color: white;
  margin: 5px;
  font-size: 26px;
}

.menu-icon {
  color: white;
  display: none;
  margin-right: 10px;
  font-size: 20px;
}

@media screen and (max-width: 750px){
  .menu-icon {
    display: block;
  }

  #right-nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .flex {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #nav {
    flex-direction: column;
  }

  #center-nav,#left-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #center-nav, #left-nav {
    display: none;
  }
}

</style>
