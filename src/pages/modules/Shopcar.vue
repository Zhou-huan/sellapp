<template>
  <div class="shopcar">
    <p class="sendprice">已满足起送价</p>
    <ul>
      <li class="liTitle">
        <span>购物车</span>
        <button @click="clearShop()">清空购物车</button>
      </li>
      <li v-for="(val,i) in getshopcarlist" :key="i">
        <span class="shopname">{{val.name}}</span>
        <img :src="val.image" alt="">
        <span class="redprice">￥{{val.price*val.count}}</span>
        <div>
          <button @click="changenum(-1,val.name)">-</button>&emsp;
          <span>{{val.count}}</span>&emsp;
          <button @click="changenum(1,val.name)">+</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getshopcarlist() {
      return this.$store.getters.getshopcarlist;
    }
  },
  methods: {
    changenum(count, name) {
      // console.log(count,name)
      this.$store.commit("changeGoodsCount", { count, name });
    },
    clearShop(){
        this.$store.commit('clearCount');
    }
  },
};
</script>

<style lang="less" scoped>
.shopcar {
  .sendprice {
    height: 20px;
    background-color: rgb(243, 235, 120);
    text-align: center;
    line-height: 20px;
    font-size: 12px;
  }
  ul {
    .liTitle {
      height: 40px;
      width: 100%;
      background-color: #eee;
      font-size: 12px;
      button {
        border-radius: 5px;
        height: 30px;
        margin-right:10%;
      }
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #ccc;
      padding: 0 5%;
      font-size: 14px;
      .shopname{
        width: 20%;
      }
      .redprice{
          color: #f00;
      }
      img{
        width: 40px;
      }
    button{
    background-color: rgb(67, 192, 10);
    border-radius: 50%;
    border:0;
    color: rgb(255, 255, 255);
    font-size: 16px;
    font-weight: 600;
    outline: 0;
          }
    }
  }
}
</style>