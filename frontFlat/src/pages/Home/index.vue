<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floorList" :key="item.id" :item="item"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from "@/pages/Home/Recommend"
import Rank from "@/pages/Home/Rank"
import Like from "@/pages/Home/Like"
import Floor from "@/pages/Home/Floor"
import Brand from "@/pages/Home/Brand"
import {mapState} from 'vuex'
export default {
  data () {
    return {
    };
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  },
  components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
  mounted(){
    this.$store.dispatch('getFloorList')
    
  }
}
</script>

<style lang='less' scoped>

</style>