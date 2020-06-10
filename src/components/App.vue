<template>
<div>
    <h1 class="vue-title">From vue</h1>
    <counter />
</div>
</template>

<script>

import Counter from './Counter'
export default {
    components: {
        Counter
    }
}
</script>

<style lang="scss" scoped>
.vue-title {
    color: lightgreen;
}
</style>