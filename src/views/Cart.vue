<template>
  <div>
    <div class="invoice">
      <div class="total">Total {{ invoice.total }} LKR</div>
      <div class="vat">VAT (12%) {{ invoice.vat }} LKR</div>
      <div class="disc">(Discount) {{ invoice.discount }} LKR</div>
      <div class="gross">Amount to be paid {{ invoice.gross }} LKR</div>
    </div>
    <div class="cartWrap">
      <Item
        class="item"
        v-for="(item, i) in items"
        v-bind:key="item.item.id"
        v-bind:index="i"
        v-bind:id="item.item.id"
        v-bind:name="item.item.name"
        v-bind:description="item.item.description"
        v-bind:price="item.item.price"
        v-bind:discount="item.item.discount"
        v-bind:img="item.item.image"
        v-bind:qty="item.item.stock"
        v-bind:units="item.qty"
        del="1"
      />
    </div>
  </div>
</template>

<script>
import Item from "../components/Item";
import { mapState } from "vuex";

export default {
  name: "Cart",
  components: { Item },
  computed: {
    ...mapState(["cart"]),
    items: function() {
      return this.cart;
    },
    invoice: function() {
      let tot = 0;
      this.cart &&
        this.cart.forEach(c => {
          tot += (c.item.price + c.item.price * c.item.discount) * c.qty;
        });

      let vat = tot * 0.12;
      let discount = 0;
      if (tot >= 500) {
        discount = tot * 0.02;
      } else {
        discount = 0;
      }
      let gross = tot + vat - discount;
      return { total: tot, gross: gross, discount: discount, vat: vat };
    }
  }
};
</script>

<style scoped>
.cartWrap {
  padding: 30px;
  width: calc(100% - 60px);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 40px;
  row-gap: 40px;
}
.invoice {
  font-weight: bold;
  font-size: 1.1em;
  background-color: red;
  color: white;
  width: calc(100% - 100px);
  margin: 30px;
  padding: 20px;
  text-align: right;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
