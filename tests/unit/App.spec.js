import {shallowMount, createLocalVue} from "@vue/test-utils";
import App from "../../src/App";
import Vuex from "vuex";
import VueRouter from "vue-router";

const localVue=createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("Testing App view",()=>{
    let getters;
    let store;

    beforeEach(()=>{
        getters={
            cartItems:()=>0
        }
        store=new Vuex.Store({getters})
    })
    it("Logo is displayed",()=>{
        const wrapper=shallowMount(App,{
            store,localVue,stubs:['router-link']
        })
        expect(wrapper.find(".logo").text()).toEqual("The Phone Bay")

    })
    it("Number of items should not be displayed when there are no items in the cart",()=>{
        const wrapper=shallowMount(App,{
            store,localVue,stubs:['router-link']
        })
        expect(wrapper.find(".items").exists()).toBeFalsy()
        
    })
    let getters2;
    let store2;
    beforeEach(()=>{
        getters2={
            cartItems:()=>10
        }
        store2=new Vuex.Store({getters:getters2})
    })
    it("Number of items displayed correctly",()=>{
        const wrapper=shallowMount(App,{
            store:store2,localVue,stubs:['router-link']
        })
        expect(wrapper.find(".items").exists()).toBeTruthy()
        expect(wrapper.find(".items").text()).toEqual("10")
        
    })

})