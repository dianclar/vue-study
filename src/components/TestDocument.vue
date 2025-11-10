<template><div>
    TestDocument
    <button @click="emitEvent">Emit Event</button>
    {{ data }}
    <slot>data</slot>
    <slot name="name" data="123">data</slot>
</div></template>

<script>

import EventBus from '@/utils/EventBus.js';
export default {
    inject:['data'],
    name: 'TestDocument',
    data() {
        return {
            
        }
    },
    methods: {
        emitEvent() {
            EventBus.$emit('adsf', 'test发送了asdf事件');
        }
    }
}
</script>

<style lang="scss" scoped>
div{
    color: red;
}
</style>