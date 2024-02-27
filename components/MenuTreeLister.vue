<script setup lang="ts">
const props = defineProps({
    list: []
})
</script>

<template>
    <ul>
        <li v-for="(list, listIndex) in props.list" :key="listIndex">
            <NuxtLink v-if="list.children == null" :to="`${list._path}`" class="group">
                <span>{{list.title}}</span>
                <span v-if="list.badge != null" class="badge badge-sm font-mono null">{{list.badge}}</span>
            </NuxtLink>
            <details open v-else>
                <summary class="group"><span v-if="list.icon != null">{{list.icon}}</span>{{list.title}}</summary>
                <MenuTreeLister :list="list.children"/>
            </details>
        </li>
    </ul>
</template>

<style scoped>

</style>