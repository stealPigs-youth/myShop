<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchData.categoryName" v-on:click="removeCategoryName">{{searchData.categoryName}}<i>-</i></li>
            <li class="with-x" v-if="searchData.keywords" v-on:click="removeKeyWords">{{searchData.keywords}}<i>-</i></li>
            <li class="with-x" v-if="searchData.trademark" v-on:click="removeTradeMark">{{searchData.trademark.split(':')[1]}}<i>-</i></li>
           <li class="with-x" v-for="(prop,index) in searchData.props" v-on:click="removeProp(index)">{{prop.split(':')[1]}}<i>-</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector v-on:tradeMarkInfo="tradeMarkInfo" v-on:attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:searchData.order.indexOf('1')==0}" v-on:click="changeSort('1')">
                  <a>综合<font-awesome-icon icon="fa-arrow-up" v-show="searchData.order==='1:asc'" /><font-awesome-icon icon="fa-arrow-down" v-show="searchData.order==='1:desc'"/></a>
                </li>
                <li :class="{active:searchData.order.indexOf('2')==0}" v-on:click="changeSort('2')">
                  <a>价格<font-awesome-icon icon="fa-arrow-up" v-show="searchData.order==='2:asc'" /><font-awesome-icon icon="fa-arrow-down" v-show="searchData.order==='2:desc'"/></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡!【小米电视新品4A 58 火爆预约中】">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pager :total="301" :pageSize="searchData.pageSize" v-on:getPagerData="getPagerData"></Pager>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SearchSelector from './SearchSelector'
  export default {
    name: 'Search',
    components: {
      SearchSelector
    },
    data(){
      return {
        searchData:{
          "category1Id": "",
          "category2Id": "",
          "category3Id": "",
          "categoryName": "",
          "keywords": "",
          "order": "1:desc",
          "pageNo": 3,
          "pageSize": 5,
          "props": [],
          "trademark": ""
        },
      }
    },
    computed:{
      ...mapGetters(['goodsList'])
    },
    methods:{
      getPagerData(pageNo){
        this.searchData.pageNo=pageNo
        this.getData()
      },
      changeSort(pos){
        let orderStr=pos+':desc'
        if(this.searchData.order!=orderStr){
          this.searchData.order=orderStr
        }
        else{
          this.searchData.order=pos+':asc'
        }
        this.getData()
      },
      attrInfo(attr,attrValue){
        let propStr=`${attr.attrId}:${attrValue}:${attr.attrName}`
        if(this.searchData.props.indexOf(propStr)==-1){
          this.searchData.props.push(propStr)
          this.getData()
        }
      },
      getData(){
        this.$store.dispatch('getSearchList',this.searchData)
      },
      tradeMarkInfo(trademark){
        this.searchData.trademark=`${trademark.tmId}:${trademark.tmName}`
        this.getData()
      },
      removeProp(index){
        this.searchData.props.splice(index,1)
        this.getData()
      },
      removeTradeMark(){
        this.searchData.trademark=undefined
        this.getData()
      },
      removeCategoryName(){
        this.searchData.category1Id=undefined
        this.searchData.category2Id=undefined
        this.searchData.category3Id=undefined
        this.searchData.categoryName=undefined
        this.getData()
      },
      removeKeyWords(){
        this.searchData.keywords=undefined
        this.$bus.$emit('clear')
        this.getData()
      }
    },
    watch:{
      $route(newVal,oldVal){
        this.searchData.category1Id=undefined
        this.searchData.category2Id=undefined
        this.searchData.category3Id=undefined
        Object.assign(this.searchData,newVal.query,newVal.params)
        this.getData()
      }
    },
    beforeMount(){
      Object.assign(this.searchData,this.$route.query,this.$route.params)
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>