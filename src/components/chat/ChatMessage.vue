<template>
    <li class="collection-item">
        <p>{{ message.message }}</p>
        <span class="secondary-content">{{ message.username }} • {{ displayDate }}</span>
    </li>
</template>

<script>
import moment from 'moment/src/moment'

export default {
    name: 'ChatMessage',
    props: {
        message: Object,
    },
    computed: {
        displayDate: function() {
            return moment(this.message.timestamp).fromNow()
        },
    },
    mounted() {
        this.$el.scrollIntoView()
    },
}
</script>

<style scoped>
.collection-item {
    background: #8f8f8f;
    margin-bottom: 10px;
    border-radius: 2px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    padding: 10px;
}
</style>