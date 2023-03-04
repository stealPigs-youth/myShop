<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">商品</div>
        <div class="cart-th2">单价（元）</div>
        <div class="cart-th3">数量</div>
        <div class="cart-th4">合计(元)</div>
        <div class="cart-th5">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList">
          <li class="cart-list-con1">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con2">
            <span class="price">{{cartInfo.cartPrice}}</span>
          </li>
          <li class="cart-list-con3">
            <input type="text" :value="cartInfo.skuNum" minnum="1" v-on:blur="changeShopNum(cartInfo,$event)">
          </li>
          <li class="cart-list-con4">
            <span class="sum">{{cartInfo.cartPrice*cartInfo.skuNum}}</span>
          </li>
            
          <li class="cart-list-con5">
            <input type="checkbox" v-model="cartInfo.isChecked">
            <a href="#none" >删除</a>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">

      <div class="select-all">
        <a v-on:click="chooseAll">全选</a>
      </div>
      <div class="option">
        <a href="#">删除选中的商品</a>
        <a href="#">选中商品移到我的收藏</a>
      </div>
      <div class="money-box">
        <div >已选择{{checkedNum}}件商品</div>
        <div >总价(不含运费):{{totalPrice}}元</div>
        <div class="sumbtn"><a href="#" target="_blank">结算</a></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    computed:{
      ...mapGetters(['cartInfoList']),
      totalPrice(){
        return this.cartInfoList.reduce((sum,cartInfo)=>{
                 if(cartInfo.isChecked){
                  sum+=cartInfo.skuNum*cartInfo.cartPrice
                 }
                 return sum
               },0)
      },
      checkedNum(){
         return this.cartInfoList.reduce((sum,cartInfo)=>{
                 if(cartInfo.isChecked){
                  sum+=parseInt(cartInfo.skuNum)
                 }
                 return sum
               },0)
      }
    },
    methods:{
      chooseAll(){
        this.cartInfoList.map((cartInfo)=>{
          cartInfo.isChecked=true
          return cartInfo
        })
      },
      changeShopNum(cartInfo,e){
        let num=e.target.value*1
        if(num<=0||isNaN(num)){
          e.target.value=cartInfo.skuNum
        }
        else{
          const addOrReduceNum=num-cartInfo.skuNum
          this.$store.dispatch('addOrUpdateShopCart',{skuId:cartInfo.skuId,skuNum:addOrReduceNum})
          cartInfo.skuNum=num
        }
      }
    },
    mounted(){
      this.$store.dispatch('getCartList')
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
        display: flex;
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;
        justify-content: space-between;
        text-align: center;
        .cart-th1{
          flex:3;
        }
        .cart-th2,
        .cart-th3,
        .cart-th4,
        .cart-th5{
          flex:2;
        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;
        .cart-list {
          display: flex;
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          .cart-list-con1{
            display: flex;
            flex:3;
            align-items: center;
            img{
              width: 82px;
              height: 82px;
            }
          }
          .cart-list-con2,
          .cart-list-con3,
          .cart-list-con4{
            flex:2
          }
          .cart-list-con5{
            display: flex;
            justify-content: center;
            flex: 2;
            a{
              margin-left: 5px;
              border: 2px solid #045FD1 ;
              background-color: #045FD1;
              color: white;
              border-radius: 10%;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .select-all{
        display: flex;
        margin-right: 30px;
        a{
          margin-left: 5px;
          border: #045FD1 2px solid;
          border-radius: 10%;
          background-color: #045FD1;
          color: white;
        }
      }
      .option{
        margin-right: 30px;
        a{
          border: #045FD1 solid 2px;
          margin-right: 10px;
          background-color: #045FD1;
          color: white;
          border-radius: 10%;
        }
      }
      .money-box{
        display: flex;
        text-align: center;
        align-items: center;
        div{
          margin-left: 20px;
        }
        .sumbtn{
          display: flex;
          width: 50px;
          height: 50px;
          border: #EA4A36 2px solid;
          background-color:#EA4A36 ;
          color: white;
          border-radius: 5%;
          justify-content: center;
          align-items: center;
        }
      }
    }

  }
</style>