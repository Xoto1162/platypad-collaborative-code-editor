<template>
    <div class="card chat-messages">
        <div class="card-content">
            <ul class="collection">
                <chat-message v-for="(message, id) in messages" :key="id" :message="message" />
            </ul>
        </div>
    </div>
</template>

<script>
import ChatMessage from './ChatMessage'

export default {
    name: 'ChatMessages',
    components: {
        ChatMessage,
    },
    props: {
        messages: Array,
    },
}
</script>

<style scoped>
    ul.collection {
        list-style: none;
        margin: 15px;
        padding: 0;
    }

    div.chat-messages {
        overflow: auto;
        height: calc(100% - 60px);
        padding: 0;
        margin-top: 0;
    }

    div.chat-messages .card-content {
        padding: 0;
        overflow: auto;
        margin-top: 0;
    }

</style>