<template>
  <div class="details">
    <div class="top">
      <div class="image">
        <img v-bind:src="item.image" />
      </div>

      <div class="info">
        <div class="price">Price {{ item.price }}</div>
        <div class="stock">Stock {{ item.stock }}</div>
        <div v-if="item.discount" class="disc">
          Discount {{ item.discount * 100 }}%
        </div>
        <input
          class="qty"
          v-model="qty"
          min="1"
          v-bind:max="item.stock"
          type="number"
          placeholder="qty"
        />
        <button class="add" @click="addToCart({ item, qty, callback })">
          Add to Cart
        </button>
        <div v-if="success" class="msg">Added to Cart!</div>
      </div>
    </div>
    <div class="name">{{ item.name }}</div>
    <div class="desc">{{ item.description }}</div>
    <div class="spec" v-if="spec">
      <div class="row" v-for="s in spec" v-bind:key="s[0]">
        <div class="heading">{{ s[0] }}</div>
        <div class="data">{{ s[1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { read } from "../restService";
import { setTimeout } from "timers";

export default {
  data: function() {
    return {
      item: {},
      qty: 1,
      success: false
    };
  },
  computed: {
    spec: function() {
      if (this.item && this.item.spec) {
        return Object.entries(this.item.spec);
      } else return null;
    }
  },
  created: function() {
    this.getItem();
  },
  methods: {
    ...mapActions(["addToCart"]),
    getItem() {
      read("items", this.$route.params.id)
        .then(resp => {
          this.item = { ...resp.data };
        })
        .catch(err => {
          console.error(err);
        });
    },
    callback: function() {
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.details {
  margin: 30px;
  padding: 10px;
  width: calc(100% - 80px);
  overflow: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: white;
  border-radius: 5px;
}
.top {
  display: flex;
  justify-content: space-between;
}
.image img {
  width: 100%;
}
.image {
  overflow: hidden;
}
.info {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 1.1em;
}
.name {
  font-size: 2em;
  font-weight: bold;
  margin: 20px 0;
}
.desc {
  font-size: 1.3em;
  color: #787878;
  margin-bottom: 20px;
}
.row {
  display: flex;
  justify-content: space-between;
  font-size: 1.1em;
  padding: 5px;
}
.row:nth-child(odd) {
  background-color: #eee;
}
.row:nth-child(even) {
  background-color: white;
}
.price {
  font-weight: bold;
  margin: 10px 0;
}
.stock {
  font-style: italic;
  margin: 10px 0;
}
.disc {
  margin: 10px 0;
}
.add {
  margin: 10px 0;
  background-color: red;
  padding: 7px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  transition: transform 0.1s ease-in;
}
.add:hover {
  transform: scale(1.1);
}
.msg {
  margin: 10px 0;
}
.qty {
  margin: 10px 0;
}
</style>
