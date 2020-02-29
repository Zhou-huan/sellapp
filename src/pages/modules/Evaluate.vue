<template>
  <div class="evalute">
    <div class="views">
      <div class="viewsLeft">
        <h3>{{severdata.score}}</h3>
        <h5>综合评分</h5>
        <p>高于周边商家{{severdata.rankRate}}%</p>
      </div>
      <div class="star">
        <div class="starinner">
          <div class="server">
            <span class="starItem">服务态度</span>
            <img v-for="i in serverStarOpen" :key="i.name" src="img/star24_on@2x.png" alt />
            <img v-for="i in serveStarClose" :key="i.name" src="img/star24_off@2x.png" alt />
            <span class="gredes">{{severdata.serviceScore}}</span>
          </div>
          <div class="server">
            <span class="starItem">食品味道</span>
            <img v-for="i in foodStarOpen" :key="i.name" src="img/star24_on@2x.png" alt />
            <img v-for="i in foodStarClose" :key="i.name" src="img/star24_off@2x.png" alt />
            <span class="gredes">{{severdata.foodScore}}</span>
          </div>
          <div class="server">
            <span class="starItem">送达时间</span>
            <span class="sendTime">{{severdata.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <div class="gap"></div>
    <div class="viewsBox">
      <div class="sbnav">
        <a href class="all">
          全部
          <small>{{severdata.ratingCount}}</small>
        </a>
        <a href class="satisfied">
          满意
          <small>17</small>
        </a>
        <a href class="nosatisfied">
          不满意
          <small>7</small>
        </a>
      </div>
      <div class="content">
        <img src="img/gougou.jpg" alt />只看有内容的评价
      </div>
      <ul class="details">
        <li v-for="(val,index) in evaluatedata" :key="index">
          <div class="viewsleft">
            <img :src="val.avatar" alt />
          </div>
          <div class="viewsright">
            <p class="autherName">
              {{val.username}}
              <span>{{val.rateTime}}</span>
            </p>
            <img v-for="i in viewStarOpen" :key="i.name" src="img/star24_on@2x.png" alt />
            <img v-for="i in viewStarClose" :key="i.name" src="img/star24_off@2x.png" alt />
            <span class="times">{{val.deliveryTime}}分钟送达</span>
            <p class="words">{{val.text}}</p>
            <div class="foodtype">
              <span class="kind" v-for="(v,i) in val.recommend" :key="i">{{v}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getEvaluate, getSeller } from "@/api/apis";
export default {
  data() {
    return {
      evaluatedata: [],
      severdata: [],
      viewstarO:[],//暂时存放评论区中亮星星
      viewstarC:[]//暂时存放评论区中闭星星
    };
  },
  created() {
    getEvaluate().then(data => {
      // debugger
      this.evaluatedata = data.data.data;
    }),
      getSeller().then(res => {
        this.severdata = res.data.data;
      });
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
  computed: {
    //服务态度星星
    serverStarOpen() {
      return this.openStar(this.severdata.serviceScore);
    },
    serveStarClose(){
      return this.closeStar(this.severdata.serviceScore);
    },
    //食品味道星星
    foodStarOpen(){
      return this.openStar(this.severdata.foodScore);
    },
    foodStarClose(){
      return this.closeStar(this.severdata.foodScore);
    },
    //评论区星星
    viewStarOpen(){
      return this.openStar(this.evaluatedata[2].score);
    },
    viewStarClose(){
      return this.closeStar(this.evaluatedata[2].score);
    }
  }
};
</script>

<style lang="less" scoped>
.evalute {
  width: 100%;
  height: 100%;
  .views {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #ccc;
    display: flex;
    .viewsLeft {
      flex: 2;
      text-align: center;
      display: flex;
      font-size: 14px;
      justify-content: center;
      flex-direction: column;
      h3 {
        font-size: 20px;
        color: orange;
      }
      p {
        color: rgb(129, 125, 125);
        font-size: 12px;
      }
    }
    .star {
      flex: 4;
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: 600;
      .starinner {
        width: 100%;
        height: 60%;
        border-left: 1px solid #ccc;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 10%;
        .server {
          height: 30px;
          img {
            width: 16px;
            margin: 1%;
          }
          .starItem {
            padding-right: 5%;
          }
          .sendTime {
            color: rgb(112, 111, 111);
          }
          .gredes {
            padding-left: 5%;
            color: orange;
          }
        }
      }
    }
  }
  .gap {
    width: 100%;
    height: 15px;
    background-color: #f3f6f6;
    border-bottom: 1px solid #ccc;
  }
  .viewsBox {
    width: 100%;
    height: 700px;
    font-size: 12px;
    .sbnav {
      display: flex;
      padding-left: 5%;
      width: 90%;
      margin: 0 auto;
      height: 80px;
      border-bottom: 1px solid #ccc;
      align-items: center;
      a {
        width: 70px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        margin-right: 2%;
        color: #000;
      }
      .all {
        background-color: #00a1dc;
        color: #fff;
      }
      .satisfied {
        background-color: #cceef7;
      }
      .nosatisfied {
        background-color: #e9e9ec;
      }
    }
    .content {
      height: 50px;
      border-bottom: 1px solid #ccc;
      line-height: 50px;
      padding-left: 5%;
      color: rgb(145, 141, 141);
      img {
        width: 22px;
      }
    }
    .details {
      width: 100%;
      li {
        display: flex;
        width: 90%;
        margin: 0 auto;
        align-items: center;
        height: 160px;
        padding-top: 10px;
        border-bottom: 1px solid #ccc;
        .viewsleft {
          width: 15%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-top: 10px;
          }
        }
        .viewsright {
          width: 90%;
          height: 100%;
          img {
            width: 14px;
            margin-right: 1%;
          }
          .words {
            font-size: 14px;
            padding: 10px 0;
          }
          .autherName {
            margin: 10px 0 2px;
            span {
              float: right;
              color: #666;
            }
          }
          .times {
            color: #666;
            padding-left: 10px;
          }
          .foodtype {
            background: url("../../../public/img/good.jpg") no-repeat 1px 2px;
            background-size: 18px 18px;
            padding-left: 20px;
            .kind {
              display: inline-block;
              width: 30%;
              margin-right: 2%;
              text-align: center;
              border: 1px solid #ccc;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>