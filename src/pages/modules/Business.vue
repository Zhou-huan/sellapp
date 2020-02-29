<template>
  <div class="business">
    <div class="header">
      <div class="headerLeft">
        <h3>粥品香坊(大运村)</h3>
        <p>
            <img v-for="i in lastStarOpen" :key="i.name" src="img/star24_on@2x.png" alt />
            <img v-for="i in lastStarClose" :key="i.name" src="img/star24_off@2x.png" alt />
          <span>（661）月售690单</span>
        </p>
      </div>
      <div class="headerRight">
        <img v-show="isShowImg" src="img/shoucang01.gif" alt @click="isShowImg=!isShowImg"/>
        <img v-show="!isShowImg" src="img/shoucang02.gif" alt @click="isShowImg=!isShowImg"/>
        <br />
        <p v-show="isShowImg">已收藏</p>
        <p v-show="!isShowImg">点收藏</p>
      </div>
    </div>
    <div class="prices">
      <div class="priceItem specials">
        <p class="priceTitle">起送价</p>
        <h3>
          20
          <small>元</small>
        </h3>
      </div>
      <div class="priceItem">
        <p class="priceTitle">商家配送</p>
        <h3>
          4
          <small>元</small>
        </h3>
      </div>
      <div class="priceItem">
        <p class="priceTitle">平均配送时长</p>
        <h3>
          39
          <small>分钟</small>
        </h3>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="main">
      <div class="gap"></div>
      <div class="notice mainitem">
        <h3>公告与活动</h3>
        <p>{{details.bulletin}}</p>
        <ul>
          <li v-for="(value,n) in details.supports" :key="n">
            <img src alt />
            {{value.description}}
          </li>
        </ul>
      </div>
      <div class="gap"></div>
      <div class="scenery mainitem">
        <h3>商家实景</h3>
        <div class="sceneryImgs">
          <img v-for="(imgitem,i) in details.pics" :key="i" :src="imgitem" alt />
        </div>
      </div>
      <div class="gap"></div>
      <div class="message mainitem">
        <h3>商家信息</h3>
        <ul>
          <li v-for="(val,index) in details.infos" :key="index">{{val}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getSeller} from '@/api/apis'
    export default {
        data() {
            return {
                details: [],
                myname:"",
                isShowImg:true
            }
        },
        created(){
            getSeller().then((res)=>{
                this.details=res.data.data;
            })
        },
        methods:{
              //封装亮星星的方法
          openStar(m){
                let arrstar=[]
                for(let n=0;n<Math.round(m);n++){
                    arrstar.push(n);
                }
                return arrstar
            },
            //封装闭星星的方法
            closeStar(h){
                let arrstar=[]
                for(let n=0;n<5-Math.round(h);n++){
                    arrstar.push(n);
                }
                return arrstar
            }
        },
        computed:{
            //设置综合评分星星
            lastStarOpen(){
                return this.openStar(this.details.score);
            },
            lastStarClose(){
                return this.closeStar(this.details.score);
            }
        }
    }
</script>

<style lang="less" scoped>
.business {
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  .header {
    display: flex;
    width: 90%;
    height: 70px;
    border-bottom: 1px solid #ccc;
    margin: 0 auto;
    .headerLeft {
      width: 80%;
      padding: 3%;
      color: #666;
      h3 {
        font-size: 14px;
        color: #000;
      }
      img {
        width: 14px;
        margin: 1%;
      }
      span {
        font-size: 12px;
      }
    }
    .headerRight {
      width: 20%;
      padding-top: 15px;
      font-size: 12px;
      text-align: right;
      img {
        width: 20px;
        margin-right: 8%;
      }
    }
  }
  .prices {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .priceItem {
      height: 70%;
      flex: 1;
      text-align: center;
      .priceTitle {
        color: #666;
        font-size: 12px;
      }
      h3 {
        font-size: 18px;
        font-weight: 500;
        small {
          font-size: 18px;
        }
      }
    }
    .specials {
      border-right: 1px solid #ccc;
    }
  }
  .main {
    width: 100%;
    .gap {
      width: 100%;
      height: 15px;
      background-color: #f3f6f6;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
    }
    .mainitem {
      width: 100%;
      padding: 20px 20px 0;
      box-sizing: border-box;
      h3 {
        font-size: 14px;
        margin-bottom: 10px;
        margin-left: -5px;
      }
      ul {
        width: 100%;
        li {
          height: 40px;
          line-height: 40px;
          font-size: 12px;
          border-bottom: 1px solid #ccc;
          &:last-child {
            border-bottom: 0;
          }
        }
      }
    }
    .notice {
      p {
        color: #f00;
        font-size: 12px;
        line-height: 1.5em;
      }
      li {
        text-indent: 15px;
        &:nth-child(1) {
          background: url("../../../public/img/decrease2.png") no-repeat 0 10px;
          background-size: 18px 18px;
        }
        &:nth-child(2) {
          background: url("../../../public/img/discount2.png") no-repeat 0 10px;
          background-size: 18px 18px;
        }
        &:nth-child(3) {
          background: url("../../../public/img/special2.png") no-repeat 0 10px;
          background-size: 18px 18px;
        }
      }
    }
    .scenery {
      .sceneryImgs {
        display: flex;
        justify-content: space-around;
        align-items: center;
        img {
          width: 60px;
          height: 50px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>