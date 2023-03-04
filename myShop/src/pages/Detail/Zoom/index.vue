<template>
  <div class="spec-preview" ref="main">
    <img :src="skuImageListItem.imgUrl" v-on:mousemove="move" v-on:mouseenter="enter" v-on:mouseleave="leave" ref="sImg"/>
    <!-- <div class="event"></div> -->
    <div class="big" ref="bImgBox">
      <img :src="skuImageListItem.imgUrl" ref="bImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data(){
      return {
        index:0
      }
    },
    props:['skuImageList'],
    computed:{
      skuImageListItem(){
        return this.skuImageList[this.index]||{}
      }
    },
    methods:{
      getIndex(index){
        this.index=index
      },
      enter(){
        this.$refs['mask'].style.display='block'
        this.$refs['bImgBox'].style.display='block'
      },
      move(e){
        let x=e.clientX-this.$refs['main'].offsetLeft-this.$refs['mask'].offsetWidth/2
        let y=e.clientY-this.$refs['main'].offsetTop-this.$refs['mask'].offsetHeight/2
        if(x<0){
          x=0
        }
        else if(x>this.$refs['sImg'].offsetWidth-this.$refs['mask'].offsetWidth){
          x=this.$refs['sImg'].offsetWidth-this.$refs['mask'].offsetWidth
        }
         if(y<0){
          y=0
        }
        else if(y>this.$refs['sImg'].offsetHeight-this.$refs['mask'].offsetHeight){
          y=this.$refs['sImg'].offsetHeight-this.$refs['mask'].offsetHeight
        }
        this.$refs['mask'].style.left=x+'px'
        this.$refs['mask'].style.top=y+'px'
        this.$refs['bImg'].style.left=-x*2+'px'
        this.$refs['bImg'].style.top=-y*2+'px'
      },
      leave(){
        this.$refs['mask'].style.display='none'
        this.$refs['bImgBox'].style.display='none'
      },
    },
    mounted(){
      this.$bus.$on('getIndex',this.getIndex)
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }
    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
      pointer-events: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
</style>