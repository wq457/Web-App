<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="(item,index) in cartList" :key="item.id">
        <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked==1" @change="changeChecked(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl"/>
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum('sub',-1,item)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="item.skuNum" @change="changeNum('change',item.skuNum*1.0,item)">
            <a href="javascript:void(0)" class="plus" @click="changeNum('add',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuPrice*item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAll&& cartList.length>1" @click="changeAll($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteSelected">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{total}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import throttle from "lodash/throttle"
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        this.$store.dispatch('getCart')
      },
      changeNum:throttle(function(type,disNum,cart){
        switch(type){
          case 'add':
            disNum = 1
            break
          case 'sub':
            disNum = cart.skuNum > 1? -1 : 0
            break
          default:
            if(isNaN(disNum) || disNum < 1){
              disNum = 0
            }else{
              disNum = parseInt(disNum) - cart.skuNum
            }
        }
        try{
          this.$store.dispatch('sendCart',{skuId:cart.skuId,skuName:disNum})
          this.getData()
        }catch(error){
          alert(error.message)
        }
      },1000),
      async deleteCart(id){
        try{
         await this.$store.dispatch('deleteCartList',id)
          this.getData()
        }catch(error){
          alert(error.message)
        }
      },
      async changeChecked(cart,event){
        let isChecked = event.target.checked?1:0
        try{
          await this.$store.dispatch('changeCheck',{skuId:cart.skuId,isChecked})
          this.getData()
        }catch(error){
          alert(error.message)
        }
      },
      async deleteSelected(){
        try {
          await this.$store.dispatch('deleteAllSelected')
          this.getData()
        }catch(error){
          alert(error.message)
        }
        
      },
      async changeAll(event){
        try{
          let isChecked = event.target.checked?'1':'0'
          await this.$store.dispatch('changeAll',isChecked)
          this.getData()
        }catch(error){
          alert(error.message)
        }
        
      }
    },
    computed:{
      ...mapGetters(['cartData']),
      cartList(){
        return this.cartData.cartInfoList || []
      },
      total(){
        let sum = 0
        this.cartList.forEach(element => {
          sum += element.skuPrice * element.skuNum
        });
        return sum
      },
      isAll(){
        return this.cartList.every(item => item.isChecked==1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 3%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>