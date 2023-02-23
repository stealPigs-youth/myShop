<template>
  <div class="type-nav">
            <div class="container" v-on:mouseleave="notShowList">
                <h2 class="all" v-on:mouseenter="showList">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <div class="all-sort-list2" v-on:mouseleave="leaveIndex" v-on:click="goSearch">
                            <div class="item" v-for="(c,index) in categoryList " :key="c.categoryId" :class="{cur:currentIndex===index}">
                                <h3 v-on:mouseenter="changeIndex(index)">
                                    <a href="#" :data-categoryName="c.categoryName" :data-category1Id="c.categoryId">{{c.categoryName}}</a>
                                </h3>
                                <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                                    <div class="subitem" v-for="cc in c.categoryChild" :key="cc.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a href="#" :data-categoryName="cc.categoryName" :data-category2Id="c.categoryId">{{cc.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="ccc in cc.categoryChild" :key="ccc.categoryId">
                                                    <a href="#" :data-categoryName="ccc.categoryName" :data-category3Id="c.categoryId">{{ccc.categoryName}}</a>
                                                </em>
                                            </dd>
                    
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'
export default {
  data () {
    return {
        currentIndex:-1,
        isShow:true
    }
  },
  methods:{
    notShowList(){
        if(this.$route.path!='/home'){
            this.isShow=false
        }
    },
    showList(){
        this.isShow=true
    },
    goSearch(e){
        e.preventDefault()
        let el=e.target
        let {categoryname,category1id,category2id,category3id}=el.dataset
        if(categoryname){
            let location={name:'search'}
            let query={categoryName:categoryname}
            if(category1id){
                query.category1Id=category1id
            }
            else if(category2id){
                query.category2Id=category2id
            }
            else if(category3id){
                query.category3Id=category3id
            }
            if(this.$route.params){
                location.params=this.$route.params
            }
            location.query=query
            this.$router.push(location)
        }
    },
    changeIndex:throttle(function(index){
        this.currentIndex=index
    },50), 
    leaveIndex(){
        this.currentIndex=-1
    }
  },
  computed:{
    ...mapState({
        categoryList:state=>state.home.categoryList
    })
  },
  mounted(){
    if(this.$route.path!='/home'){
        this.isShow=false
    }
  }
}
</script>

<style lang='less' scoped>

    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 510px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;
                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .cur{
                        background-color: skyblue;
                    }
                }
            }
            @keyframes sort {
                0%{
                    height: 0px;
                }   
                100%{
                    height: 510px;
                }             
            }
            .sort-enter-active{
                animation: sort 1s;
            }
            .sort-leave-active{
                animation: sort 1s reverse;
            }
        }
    }
</style>