<template>
    <select v-model="selected">
        <option v-for="option in options" :key="option.id" :value="option.id">{{ option.text }}</option>
    </select>
</template>

<script>
export default {
    name: 'Select',
    props: {
        options: {
            type: Array,
            required: true,
        },
        default: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            selected: this.default,
        }
    },
    watch: {
        selected(newVal) {
            this.$emit('change', this.options.find(e => e.id === newVal))
        },
        default(newVal) {
            this.selected = newVal
        },
    },
}
</script>

<style scoped>
    select {
        background: #1e1e1e;
        color: white;
        border: 0;
        padding-left: 10px;
    }
</style>