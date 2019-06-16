<template>
  <div class="home">
    <Item
      class="item"
      v-for="(item, i) in items"
      v-bind:index="i"
      v-bind:key="item.id"
      v-bind:id="item.id"
      v-bind:name="item.name"
      v-bind:description="item.description"
      v-bind:price="item.price"
      v-bind:discount="item.discount"
      v-bind:img="item.image"
      v-bind:qty="item.stock"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Item from "../components/Item";
import { mapActions, mapState } from "vuex";
export default {
  name: "home",
  components: {
    Item
  },
  methods: {
    ...mapActions(["getItems"])
  },
  created: function() {
    this.getItems();
  },
  computed: {
    ...mapState(["items"])
  }
};
</script>

<style scoped>
.home {
  padding: 30px;
  width: calc(100% - 60px);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 40px;
  row-gap: 40px;
}
</style>
