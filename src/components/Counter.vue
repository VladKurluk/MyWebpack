<template>
    <div>
        <h1>Счетчик кликов: {{count}}</h1>
        <button @click="count++">Кликер</button>
    </div>
</template>

<script>
export default {
    data: () => ({
        count: 0
    })
}
</script>

<style lang="scss" scoped>
h1 {
    color: goldenrod
}
</style>