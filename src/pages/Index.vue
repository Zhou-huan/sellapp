<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <div class="headerTop">
        <div class="imgBox">
          <img :src="details.avatar" alt />
        </div>
        <div class="headerCenter">
          <h3 class="title">
            <img src="img/brand@2x.png" alt />
            {{details.name}}
          </h3>
          <p>{{details.description}}/{{details.deliveryTime}}分钟送达啦啦啦</p>
          <p class="description" @click="isShow=true">
            <img src="img/decrease_1@2x.png" alt />
            <template v-for="(v,i) in details.supports">
              <span :key="i">{{v.description}}</span>
            </template>
            <!--  <span class="description">
              <span v-for="(v,i) in details.supports" :key="i">{{v.description}}</span>
            </span>-->
          </p>
        </div>
        <div class="num">
          <div class="numitem">5个&gt;</div>
        </div>
      </div>
      <div class="headerBottom">
        <img src="img/bulletin@2x.png" alt />
        <p>{{details.bulletin}}</p>&gt;
      </div>
    </div>
    <div class="router-nav">
      <router-link to="/" :class="{actived:isActived==0}">
        <span>商品</span>
      </router-link>
      <router-link to="/evaluate" :class="{actived:isActived==1}">
        <span>评论</span>
      </router-link>
      <router-link to="/business" :class="{actived:isActived==2}">
        <span>商家</span>
        <!-- <span @click="clickTitle(2)">商家</span> -->
      </router-link>
    </div>
    <!-- 中间切换的子页面 -->
    <div class="center">
      <router-view />
    </div>
    <transition name="slide-fade">
      <div class="shopcar-board" v-show="getNumber>0?showBoard:showBoard=false">
        <Shopcar />
      </div>
    </transition>
    <!-- vue事件支持直接书写JS代码，可以不用给一个函数，但是仅限于简短1行代码 -->
    <div class="footer" @click="getNumber>0?showBoard=!showBoard:showBoard=false">
      <div class="shopnum" v-show="getNumber>0">{{getNumber}}</div>
      <div class="shopCar">
        <div class="innerBox">
          <img :src="getIconURL" class="iconCar" />
        </div>
      </div>
      <div class="leftFooter">
        ￥
        <span>{{getTotalPrice}}</span>
      </div>
      <div class="centerFooter">
        另需配送费￥
        <span>{{details.deliveryPrice}}</span>元
      </div>
      <div class="rightFooter" v-show="getNumber==0">
        ￥
        <span>{{details.minPrice}}</span>起送
      </div>
      <div class="rightFooter gopay" v-show="getNumber>0">去结算</div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-show="showBoard"></div>
    <!-- 优惠信息遮罩层 -->
    <div class="maskInfo" v-show="isShow">
      <h3>{{details.name}}</h3>
      <div class="imgstar">
        <img src="img/star24_on@2x.png" alt />
        <img src="img/star24_on@2x.png" alt />
        <img src="img/star24_on@2x.png" alt />
        <img src="img/star24_on@2x.png" alt />
        <img src="img/star24_off@2x.png" alt />
      </div>
      <div class="pressureline">
        <h4>优惠信息</h4>
      </div>
      <ul>
        <li v-for="(value,n) in details.supports" :key="n">
          <img src alt />
          {{value.description}}
        </li>
      </ul>
      <div class="pressureline">
        <h4>商家公告</h4>
      </div>
      <p>
        {{details.bulletin}}
      </p>
      <p class="back" @click="isShow=false">X</p>
    </div>
  </div>
</template>

<script>
import { getSeller } from "@/api/apis";
import Shopcar from "@/pages/modules/Shopcar.vue";
export default {
  data() {
    return {
      isActived: 0,
      details: [],
      showBoard: false, //购物车面板是否隐藏 true显示 false隐藏
      isShow:false//优惠信息是否显示
    };
  },
  components: {
    Shopcar
  },
  created() {
    getSeller().then(res => {
      this.details = res.data.data; //保存数据
      localStorage.setItem("id", this.details.id);
    }),
      //一进入页面，立即初始化vuex的列表数据
      this.$store.dispatch("getGoodsdata"); //触发action(action用法和mutation一模一样，只是触发的东西不同)
  },
  watch: {
    //对路由切换进行侦听
    $route(newValue) {
      this.isActived = newValue.meta.isActive;
    }
  },
  computed: {
    //购物车图片的切换
    getIconURL() {
      if (this.$store.getters.getshopcarlist.length > 0)
        return "img/gouwuche01.jpg";
      return "img/gouwuche02.jpg";
    },
    //获取购物车商品的总价
    getTotalPrice() {
      let price = 0;
      for (let obj of this.$store.getters.getshopcarlist) {
        price += obj.price * obj.count;
      }
      return price;
    },
    //获取购物车商品的数量
    getNumber() {
      let counts = 0;
      for (let obj of this.$store.getters.getshopcarlist) {
        counts += obj.count;
      }
      return counts;
    }
  }
};
</script>

<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.6s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    flex: 0 0 148px;
    background: url(../../public/img/headerbgc.jpg) no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    color: #fff;
    .headerTop {
      padding: 5% 5% 0;
      height: 100px;
      display: flex;
      flex-direction: row;
      .imgBox {
        width: 25%;
        img {
          width: 70px;
          height: 70px;
        }
      }
      .headerCenter {
        width: 60%;
        .title {
          font-size: 16px;
          img {
            width: 30px;
          }
        }
        p {
          font-size: 12px;
          width: 100%;
          padding: 4px 0;
          img {
            width: 16px;
          }
        }
        .description {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
      }
      .num {
        width: 15%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        font-size: 12px;
        margin-bottom: 30px;
        .numitem {
          width: 40px;
          height: 25px;
          border-radius: 10px;
          background-color: rgba(36, 32, 29, 0.651);
          text-align: center;
          line-height: 25px;
        }
      }
    }
    .headerBottom {
      height: 30px;
      font-size: 12px;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.479);
      padding: 0 4%;
      img {
        width: 30px;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 4px;
      }
    }
  }
  .router-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 0 0 40px;
    border-bottom: 1px solid #ccc;
    .actived {
      color: #f00;
    }
  }
  .center {
    flex: 1;
  }
  .shopcar-board {
    width: 100%;
    background-color: rgb(255, 255, 255);
    position: fixed;
    z-index: 2;
    bottom: 48px;
  }
  .footer {
    flex: 0 0 50px;
    width: 100%;
    background-color: rgb(23, 43, 53);
    color: rgba(255, 255, 255, 0.74);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    font-size: 14px;
    position: fixed;
    z-index: 2;
    bottom: 0;
    left: 0;
    .shopnum {
      position: fixed;
      bottom: 40px;
      left: 46px;
      background-color: #f00;
      color: #fff;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    .shopCar {
      width: 20%;
      .innerBox {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #fff;
        background-size: 40px 40px;
        margin-top: -10px;
        margin-left: 6%;
        display: flex;
        border: 4px solid rgb(23, 43, 53);
        align-items: center;
        justify-content: center;
        .iconCar {
          width: 35px;
          height: 35px;
        }
      }
    }
    .leftFooter {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .rightFooter {
      width: 30%;
      background-color: rgb(141, 144, 145);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .gopay {
      background-color: rgb(255, 217, 0);
      color: #000;
    }
    .centerFooter {
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.63);
  }
  .maskInfo{
      padding: 40px 10%;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: rgba(14, 13, 13, 0.856);
      position: fixed;
      z-index: 999;
      color: #fff;
      font-size: 14px;
      h3{
        text-align: center;
        padding-bottom:20px;
      }
      .imgstar{
        width: 100%;
        text-align: center;
        img{
          margin:0 2%;
        }
      }
      .pressureline{
        width: 100%;
        border-bottom: 2px solid #fff;
        display: flex;
        justify-content: center;
        margin:40px 0;
        h4{
          margin-bottom:-16px;
          width: 30%;
          height:30px;
          text-align: center;
          padding:0 5%;
          background: rgb(233, 113, 33);
          border-radius: 10px;
          line-height: 30px;
        }
      }
        li {
        text-indent: 15px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        &:nth-child(1) {
          background: url("../../public/img/decrease2.png") no-repeat 0 5px;
          background-size: 18px 18px;
        }
        &:nth-child(2) {
          background: url("../../public/img/discount2.png") no-repeat 0 5px;
          background-size: 18px 18px;
        }
        &:nth-child(3) {
          background: url("../../public/img/special2.png") no-repeat 0 5px;
          background-size: 18px 18px;
        }
      }
      .back{
      text-align: center;
      font-size: 20px;
    }
  }
}
</style>