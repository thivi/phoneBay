import {shallowMount, createLocalVue} from "@vue/test-utils";
import Home from "../../src/views/Home";
import Vuex from "vuex";
import VueRouter from "vue-router";

const localVue=createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("Testing Home view",()=>{
    let state;
    let store;
    let actions;

    beforeEach(()=>{
        state={
            items:[{name:"Item"},{name:"Item2"}]
        }
        actions={
            getItems:jest.fn()
        }
        store=new Vuex.Store({state,actions})
    })
    it("Calling getItems action",()=>{
        const wrapper=shallowMount(Home,{
            store,localVue,stubs:['router-link']
        })
        expect(actions.getItems).toHaveBeenCalled();

    })
    it("Items properly displayed",()=>{
        const wrapper=shallowMount(Home,{
            store,localVue,stubs:['router-link']
        })
        expect(wrapper.find(".item").exists()).toBeTruthy();
    })
 

})