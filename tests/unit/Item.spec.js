import {shallowMount, createLocalVue} from "@vue/test-utils";
import Item from "../../src/components/Item";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const localVue=createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(FontAwesomeIcon);

describe("Testing Item component",()=>{
    let state;
    let store;
    let actions;

    beforeEach(()=>{
      
        actions={
            remove:jest.fn()
        }
        store=new Vuex.Store({state,actions})
    })
    it("Checking if Item is displayed properly",()=>{
        const wrapper=shallowMount(Item,{
            store,localVue,stubs:['router-link','font-awesome-icon'],
            propsData:{
                "id":1,
                "index":1,
                "units":0,
                "name":"Item",
                "description":"desc",
                "price":500,
                "discount":0.5,
                "img":"url",
                "qty":5
            }
        })
        expect(wrapper.find(".name").text()).toEqual("Item");
        expect(wrapper.find(".desc").text()).toEqual("desc");
        expect(wrapper.find(".price").text()).toEqual("500 LKR");
        expect(wrapper.find(".disc").text()).toEqual("Discount 50%");
        expect(wrapper.find("#pim").attributes('src')).toBe("url");
        expect(wrapper.find(".del").exists()).toBeFalsy();
    })
    it("Deleting an item from the cart",()=>{
        const wrapper=shallowMount(Item,{
            store,localVue,stubs:['router-link','font-awesome-icon'],
            propsData:{
                "id":1,
                "index":1,
                "units":2,
                "name":"Item",
                "description":"desc",
                "price":500,
                "discount":0.5,
                "img":"url",
                "qty":5,
                "del":1
            }
        })
        expect(wrapper.find(".del").exists()).toBeTruthy();
        expect(wrapper.find(".del").trigger("click"));
        expect(actions.remove).toHaveBeenCalled();
    })

})