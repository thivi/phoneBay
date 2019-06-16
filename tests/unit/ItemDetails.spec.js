import {shallowMount, createLocalVue} from "@vue/test-utils";
import ItemDetails from "../../src/views/ItemDetails";
import Vuex from "vuex";
import VueRouter from "vue-router";

const localVue=createLocalVue();

localVue.use(Vuex);
//localVue.use(VueRouter);

describe("Testing Item component",()=>{
    let store;
    let actions;

    beforeEach(()=>{
      
        actions={
            addToCart:jest.fn()
        }
        store=new Vuex.Store({actions})
    })
    it("See if item is rendered",()=>{
        const id=1;
        const wrapper=shallowMount(ItemDetails,{
            store,
            localVue,
            mocks:{
                $route:{
                    params:{id}
                }
            },
            stubs:['router-link','font-awesome-icon']
        })
        const item={name:"Hello"}
        wrapper.setData({item:item})
        expect(wrapper.find(".name").text()).toEqual("Hello");
    })
    it("Check if add to cart action is fired",()=>{
        const id=1;

        const wrapper=shallowMount(ItemDetails,{
            store,
            localVue,
            mocks:{
                $route:{
                    params:{id}
                }
            },
            stubs:['router-link','font-awesome-icon']
        })
        wrapper.find(".add").trigger("click");
        expect(actions.addToCart).toHaveBeenCalled()
    })
    it("Check if qty can be chnaged",()=>{
        const id=1;

        const wrapper=shallowMount(ItemDetails,{
            store,
            localVue,
            mocks:{
                $route:{
                    params:{id}
                }
            },
            stubs:['router-link','font-awesome-icon']
        })
        wrapper.setData({qty:5})
        expect(wrapper.find(".qty").element.value).toEqual("5");
    })

})