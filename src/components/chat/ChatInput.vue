<template>
    <div class="chat-input-containers">
        <input type="text" v-model="messageText" @keyup.enter="handleSubmit" placeholder="Type your message">
    </div>
</template>

<script>
export default {
    name: 'ChatInput',
    props: {
        inputAllowed: Boolean,
    },
    data() {
        return {
            messageText: '',
        }
    },
    methods: {
        handleSubmit() {
            this.$emit('submit', this.messageText)
            this.messageText = ''
        },
    },
}
</script>

<style scoped>
    div.chat-input-containers {
        height: 60px;
        text-align: center;
        line-height: 50px;
        width: 100%;
    }
</style>