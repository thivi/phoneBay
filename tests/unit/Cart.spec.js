import {shallowMount, createLocalVue} from "@vue/test-utils";
import Cart from "../../src/views/Cart";
import Vuex from "vuex";
import VueRouter from "vue-router";

const localVue=createLocalVue();

localVue.use(Vuex);
//localVue.use(VueRouter);

describe("Testing Item component",()=>{
    let store;
    let state;
    beforeEach(()=>{
        state={
            cart:[{item:{name:"Item1",discount:0,price:500,stock:10,id:1},qty:5},{item:{name:"Item2",price:200,discount:0,stock:5,id:2},qty:5}]
        }
        store=new Vuex.Store({state})
    })
    it("See if item is rendered",()=>{
        const wrapper=shallowMount(Cart,{
            store,
            localVue,
            stubs:['router-link','font-awesome-icon']
        })


        expect(wrapper.find(".item").exists()).toBeTruthy();
    })
    it("Checking if total is correct",()=>{
        const wrapper=shallowMount(Cart,{
            store,
            localVue,
            stubs:['router-link','font-awesome-icon']
        })
        let total=3500;
        let vat=420;
        let discount=total>=500?(total*0.02):0;
        let gross=total+vat-discount
        expect(wrapper.find(".total").text()).toEqual("Total "+total+" LKR");
        expect(wrapper.find(".vat").text()).toEqual("VAT (12%) "+vat+" LKR");
        expect(wrapper.find(".disc").text()).toEqual("(Discount) "+discount+" LKR");
        expect(wrapper.find(".gross").text()).toEqual("Amount to be paid "+gross+" LKR");
    })

})