<template><div>
  <HelloWorld :data="data" @update:data="data = $event"/>
  <TestDocument ref="test">value<template #name="data"
    > {{data}}</template></TestDocument>
  <asdf v-model="input" :data.sync="input"/>
  {{ data }} | {{ input }}
  <router-link to="/music/data?data=music">music</router-link>
  <a href="#/ruok"> ruok</a>
  <Router-view></Router-view>
</div></template>

<script>
import TestDocument from './components/TestDocument.vue';
import asdf from './components/asdf.vue';
export default {
  provide(){
    return{
      data:this.data
    }
  },
  data() {
    return {
      data: 'Hello',
      input:'input'
    }
  },
  components:{TestDocument, asdf},
  mounted(){
    console.log('ref:'+this.$refs.test);
    console.log(this.$store.getters['user/userup'],this.$store.state)
  }
}
</script>

<style lang="scss">

</style>