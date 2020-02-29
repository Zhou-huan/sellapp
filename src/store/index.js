import Vue from 'vue'
import Vuex from 'vuex'
import { getGoods } from '@/api/apis'
Vue.use(Vuex)
//使用vuex
//1. 创建store仓库 vuex把所有交互数据都存放在store中
export default new Vuex.Store({
    //当前仓库保存的值（状态） 记住，自己组件使用的数据还是存放在以前的data中！！要传递的数据才放在此处
    state: {
        goodsdata: []//商品数组
    },
    mutations: {//改变，mutation是改变state值的唯一方法
        //每一个mutation函数都会接受一个形参，而这个形参就是state本身
        getGoodsdata(state, val) {
            state.goodsdata = val//保存
        },
        //改变商品数量
        changeGoodsCount(state, data) {
            for (let obj of state.goodsdata) {
                for (let food of obj.foods) {
                    if (food.name == data.name) {
                        //找到了对应的商品！对商品数量进行修改
                        food.count += data.count
                        return
                    }
                }
            }
        },
        //清空购物车
        clearCount(state) {
            for (let objs of state.goodsdata) {
                for (let food of objs.foods) {
                    food.count = 0;
                }
            }
        }
    },
    //可以发出请求的通知
    //action和mutation很像，但是2个区别，1action可以支持所有异步  2action不能直接操作state
    actions: {
    getGoodsdata(context) {
        //发送异步请求，拿到数据后，把数据提交给mutation，让它去改变state
        getGoods().then(res => {
            //前端自己添加必要字段
            for (let obj of res.data.data) {
                for (let food of obj.foods) {
                    food.count = 0;
                }
            }
            context.commit('getGoodsdata', res.data.data)
        })
    }

},
    getters: {
    //获取购物车的列表
    getshopcarlist(state) {
        let arr = [];
        for (let obj of state.goodsdata) {
            for (let food of obj.foods) {
                if (food.count > 0) {
                    arr.push(food)//把商品数量>0的数据放入购物车
                }
            }
        }
        return arr
    }
}
})
//将实例暴露出去