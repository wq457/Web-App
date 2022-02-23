<template>
<div>
  <TypeNav/>
  <ListContainer/>
  <Recommend/>
  <Rank/>
  <Like/>
  <Floor v-for="(f,index) in floorList" :key="f.id" :list="f"/>
  <Brand/>
</div>
</template>

<script>
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
  name:'Home',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    this.$store.dispatch('getFloorList')
  },
  computed:{
    ...mapState({
      floorList:(state)=>state.home.floorList
    })
  }
}
</script>

<style>

</style>