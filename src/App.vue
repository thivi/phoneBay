<template>
  <div id="app">
    <div class="header">
      <router-link to="/" class="logo">The Phone Bay</router-link>
      <router-link class="cart" to="/cart">
        <font-awesome-icon class="icon" icon="shopping-basket" />
        <div v-if="cartItems" class="items">{{ cartItems }}</div>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from "vue";

library.add(faShoppingBasket);

Vue.component("font-awesome-icon", FontAwesomeIcon);

export default {
  name: "App",
  computed: {
    ...mapGetters(["cartItems"])
  }
};
</script>

<style scoped>
#id {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.header {
  width: calc(100% - 20px);
  height: 70px;
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-shadow: #5f5f5f 0px 2px 4px;
}
.logo {
  color: #ffffff;
  text-shadow: black 1px 1px 2px;
  font-size: 2.5em;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-decoration: none;
}
.cart {
  color: white;
  text-decoration: none;
  display: flex;
  position: relative;
  margin-right: 30px;
}
.icon {
  font-size: 2em;
}
.items {
  background-color: rgb(13, 230, 5);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 1em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: absolute;
  bottom: -15px;
  right: -10px;
}
#app {
  background-color: #eee;
  height: 100%;
  min-height: 100vh;
}
</style>
