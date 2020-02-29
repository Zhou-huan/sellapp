<template>
  <div class="goods">
    <!-- 左侧栏标题 -->
    <ul class="aside">
      <ul class="content">
        <li
          v-for="(value,i) in goodsdata"
          :key="i"
          @click="clickLeft(i)"
          :class="{selected:curSelecte===i}"
        >
          <div class="liitem">{{value.name}}</div>
        </li>
      </ul>
    </ul>
    <!-- 右侧内容 -->
    <div class="info">
      <ul class="content">
        <div :id="i" class="productItem" v-for="(v,i) in goodsdata" :key="i">
          <h4>{{v.name}}</h4>
          <div class="msg" v-for="(item,index) in v.foods" :key="index">
            <div class="msgInner">
              <div class="productImgs">
                <img :src="item.image" alt />
              </div>
              <div class="details">
                <h5>{{item.name}}</h5>
                <span>{{item.description}}</span>
                <br />
                <span>月售{{item.sellCount}}份</span>
                <span>好评率{{item.goodcomment}}</span>
                <p>
                  <big>￥{{item.price}}</big>
                  <del>￥{{item.oldPrice}}</del>
                </p>
              </div>
              <div class="addIcons">
                <button v-show="item.count>0" @click="changenum(-1,item.name)">-</button>
                <span v-show="item.count>0">{{item.count}}</span>
                <button @click="changenum(1,item.name)">+</button>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
//引入滚动插件(一个基于原生JS的插件，它是专门针对移动端（现在也支持PC）各种滚屏场景制作的一个插件)
import BScroll from "better-scroll";
export default {
  data() {
    return {
      // goodsdata: [], //商品数组
      curSelecte: 0 ,//当前选中索引
      islove:true
    };
  },
  created() {},
  methods: {
    clickLeft(i) {
      //设置当前选中的索引
      this.curSelecte = i;
      //让右侧面板调用scrollToElementg滚动到指定元素上面
      this.rightScroll.scrollToElement(document.getElementById(i), 300);
      // console.log(i);
    },
    /*  //封装一个递归函数
      sumHeight(n){
        const vm=this;
        if(n==-1){
          return 0;
        }else{
          return vm.getDivHeight[n]+vm.sumHeight(n-1);
        }
      }, */
    changenum(count, name) {
      this.$store.commit("changeGoodsCount",{count,name});
      if(count==1){
        this.islove=false;
      }else{
        this.islove=true;
      }
    }
  },
  mounted() {
    //因为要获取真实DOM节点,只能放在这个位置，否则元素获取为null
    //1.绝对不能覆盖ul的class,而且ul的class只能是content
    //2.div一定要指定高度
    //3.注意div的class不要和其他页面的class重复了，这里建议new BScroll()时，使用id选择器#或者使用唯一class选择器（底层是document.queryselector）
    //4.参数1:：元素选择器  参数2：当前容器的配置对象
    //BetterScroll 默认会阻止浏览器的原生 click 事件。当设置为 true，BetterScroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
    this.leftScroll = new BScroll(".aside", {
      click: true //派发点击事件(当设置此属性以后，点击事件才会生效)
    }); //初始化左边栏
    this.rightScroll = new BScroll(".info", {
      probeType: 3 //让BetterScroll实时派发滚动事件
    }); //初始化右边栏
    //监听滚动事件， 使用实例对象.on('事件名') 参数1： 事件名  参数2：回调函数
    /*  this.rightScroll.on("scroll", obj => {
      //对滚动的高度处理成绝对值
      let _y = Math.abs(obj.y);
      let array=this.getDivHeight;
      // console.log(array);
      for(let i=0;i<array.length;i++){   
        if(this.sumHeight(i-1)<=_y && _y<this.sumHeight(i)){
          this.curSelecte=i;
        }
      } 
    }); */
    this.rightScroll.on("scroll", obj => {
      let _y = Math.abs(obj.y);
      for (let obj of this.getDivHeight) {
        //如果匹配坐标成功，则设置当前选中光标
        if (_y < obj.max && _y >= obj.min) {
          this.curSelecte = obj.index;
          // console.log(obj)
          break; //做了想做的事情以后，加上跳出，避免无意义的循环
        }
      }
    });
  },
  computed: {
    //使用计算属性计算DIV高度，极大提升代码性能，避免重复DOM操作引起性能问题
    getDivHeight() {
      let arr = [];
      //计算高度
      for (let i = 0; i < this.goodsdata.length; i++) {
        arr.push(document.getElementById(i).offsetHeight);
      }
      //可以先计算出我想要的区间段，累加高度 { max, min, index }
      let totalHeight = 0; //累加的高度
      let newarr = [];
      for (let n = 0; n < arr.length; n++) {
        newarr.push({ max: arr[n] + totalHeight, min: totalHeight, index: n });
        // {max: 当前div的高度 + 之前累计的高度, min: 之前累加的高度, index: n }
        totalHeight += arr[n]; //每循环一次就把高度加到总高度上
      }
      return newarr;
    },
    //拿到初始化的数据列表
    goodsdata() {
      return this.$store.state.goodsdata;
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  height: 100%;
  width: 100%;
  .aside {
    width: 100px;
    height: 430px;
    background-color: #f3f6f6;
    box-sizing: border-box;
    // overflow-y: scroll;//后下面相同效果
    overflow: auto;
    li {
      height: 60px;
      width: 100%;
      display: flex;
      justify-content: center;
      .liitem {
        height: 100%;
        width: 80%;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 10px;
      }
    }
    .selected {
      background-color: #fff;
    }
  }
  .info {
    flex: 1;
    overflow-y: scroll;
    height: 430px;
    h4 {
      width: 100%;
      background-color: #f3f6f6;
      color: rgb(104, 104, 104);
      height: 30px;
      border-left: 2px solid #ccc;
      text-indent: 20px;
      line-height: 30px;
      box-sizing: border-box;
      font-size: 14px;
    }
    .msg {
      padding: 6%;
      display: flex;
      box-sizing: border-box;
      .msgInner {
        border-bottom: 1px solid #ccc;
        display: flex;
        width: 100%;
        .productImgs {
          width: 20%;
          img {
            width: 60px;
          }
        }
        .details {
          width: 50%;
          margin-left: 10%;
          color: #888;
          font-size: 12px;
          h5 {
            font-size: 14px;
            color: #000;
            padding-bottom: 10px;
          }
          big {
            font-size: 18px;
            color: #f00;
            padding-right: 5%;
            box-sizing: border-box;
          }
        }
        .addIcons {
          width: 20%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          margin-bottom: 20px;
          img{
            width: 20px;
          }
          button{
            background-color: rgb(67, 192, 10);
            border-radius: 10%;
            border:0;
            color: rgb(255, 255, 255);
            font-size: 16px;
            font-weight: 600;
            outline: 0;
          }
        }
      }
    }
  }
}
</style>