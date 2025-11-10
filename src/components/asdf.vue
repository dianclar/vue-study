<template><div>
    adsf
    <input :value="value" @input="$emit('input',$event.target.value)"/>
    <input :value="data" @input="$emit('update:data',$event.target.value)" v-focus="123"/>
</div></template>

<script>

import EventBus from '@/utils/EventBus.js';
export default {
    props:['value','data'],
    data() {
        return {
            
        }
    },
    created() {
        EventBus.$on('adsf', (data) => {
            console.log('adsf收到：', data);
        });
    },
    methods:{
        
    },
    directives:{focus:{inserted(el,binding){el.focus(),console.log(binding.value)}}}
}
</script>

<style lang="scss">
div{
    border: 1px solid black;
}
</style>