<template>
  <div @click="openItem(id)" class="item">
    <div class="productImage">
      <img id="pim" v-bind:src="img" />
      <div class="price">{{ price }} LKR</div>
      <div v-if="discount" class="disc">Discount {{ discount * 100 }}%</div>
    </div>
    <div class="text">
      <div class="name">{{ name }}</div>
      <div class="desc">{{ description }}</div>
      <div class="low">
        <div class="del" v-if="del==1" @click.stop="remove(index)">
          <font-awesome-icon class="icon" icon="trash-alt" />
        </div>
        <div v-if="!units" class="qty">Stock {{ qty }}</div>
        <div v-if="units">Units {{ units }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { mapActions } from "vuex";

library.add(faTrashAlt);

export default {
  name: "Item",
  props: [
    "id",
    "index",
    "units",
    "name",
    "description",
    "price",
    "discount",
    "img",
    "qty",
    "del"
  ],
  methods: {
    ...mapActions(["remove"]),
    openItem: function(id) {
      this.$router.push({ name: "item_details", params: { id: id } });
    }
  }
};
</script>

<style scoped>
.productImage {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.productImage img {
  width: 100%;
}
.text {
  padding: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.name {
  font-weight: bold;
  font-size: 1.1em;
}
.desc {
  color: #787878;
}
.price {
  position: absolute;
  bottom: 4px;
  left: 0;
  padding: 5px;
  background-color: red;
  color: white;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.disc {
  position: absolute;
  bottom: 4px;
  right: 0;
  padding: 5px;
  background-color: red;
  color: white;
  font-weight: bold;
  font-size: 0.8em;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.qty {
  font-style: italic;
  font-weight: bold;
  text-align: right;
  color: #787878;
}
.item {
  cursor: pointer;
  box-shadow: #aaaaaa 0px 0px 5px;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.1s ease-in;
  font-size: 1em;
  background-color: white;
}
.item:hover {
  transform: scale(1.1);
}
.low {
  display: flex;
  justify-content: space-between;
}
.del {
  font-size: 1em;
}
.del:hover {
  color: red;
}
</style>
