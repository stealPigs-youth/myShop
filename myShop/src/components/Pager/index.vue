<template>
  <div class="pager">
    <button v-on:click="flipForward">上一页</button>
    <button v-show="curPageNo>1" v-on:click="curPageNo=1">1</button>
    <button v-show="curPageNo>2" v-on:click="curPageNo=2">2</button>
    <button v-show="curPageNo>5">···</button>
    <button v-show="curPageNo>4" v-on:click="curPageNo=curPageNo-2">{{curPageNo-2}}</button>
    <button v-show="curPageNo>3" v-on:click="curPageNo=curPageNo-1">{{curPageNo-1}}</button>
    <button class="active">{{curPageNo}}</button>
    <button v-show="curPageNo<maxPage" v-on:click="curPageNo=curPageNo+1">{{curPageNo+1}}</button>
    <button v-show="curPageNo<maxPage-1" v-on:click="curPageNo=curPageNo+2">{{curPageNo+2}}</button>
    <button v-show="curPageNo<maxPage-2">···</button>
    <button v-on:click="flipBack">下一页</button>
    
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pager",
    data(){
      return {
        curPageNo:1
      }
    },
    computed:{
      maxPage(){
        return Math.ceil(this.total/this.pageSize)
      }
    },
    watch:{
      curPageNo(newVal,oldVal){
        this.$emit('getPagerData',newVal)
      }
    },
    methods:{
      flipBack(){
        if(this.curPageNo<this.maxPage){
          this.curPageNo++
        }
      },
      flipForward(){
        if(this.curPageNo>1){
          this.curPageNo--
        }
      }
    },
    props:['pageSize','total'],

  }
</script>

<style lang="less" scoped>
  .pager {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;
    }
    .active {
        background-color:#EA4A36;
      }
    
  }
</style>
