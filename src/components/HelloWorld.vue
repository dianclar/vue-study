<template><div>
  <h1>Hello World</h1>
  {{ data }}
  <button @click="$emit('update:data', 'New Data')">Change Data</button>
</div></template>

<script>

export default {
  data() {
    return {
      
    };
  },
  methods:{
    
  },
  props: ['data']
}
</script>
<style lang="scss" scoped></style>