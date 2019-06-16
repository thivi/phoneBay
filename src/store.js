import Vue from "vue";
import Vuex from "vuex";
import { read } from "./restService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    items: []
  },
  getters: {
    cartItems: function(state) {
      if (state.cart) {
        let c = 0;
        state.cart.forEach(item => {
          c += parseInt(item.qty);
        });
        return c;
      } else {
        return 0;
      }
    }
  },
  mutations: {
    saveItems(state, payload) {
      state.items = [...payload];
    },
    add(state, payload) {
      state.cart.push(payload);
    },
    remove(state, payload) {
      state.cart.pop(payload);
    }
  },
  actions: {
    getItems: ({ commit }) => {
      read("items")
        .then(resp => {
          commit("saveItems", resp.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    addToCart: ({ commit }, { item, qty, callback }) => {
      commit("add", { item, qty });
      callback();
    },
    remove({ commit }, index) {
      commit("remove", index);
    }
  }
});
