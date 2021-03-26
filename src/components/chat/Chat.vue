<template>
    <div class="chat-container">
        <chat-messages :messages="messages"  />
        <chat-input :input-allowed="room != null" @submit="handleMessageSubmission" />
    </div>
</template>

<script>
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

export default {
    name: 'Chat',
    props: {
        room: {
            type: Object,
        },
    },
    components: {
        ChatMessages,
        ChatInput,
    },
    data() {
        return {
            messages: [],
        }
    },
    watch: {
        room(newVal) {
            if (newVal) {
                this.handleConnect()
            }
        },
    },
    methods: {
        handleConnect() {
            this.room.on('message', this.appendMessage)

            this.room.getHistory({
                limit: 25,
                eventFilter: ['message'],
            }).then(response => {
                const data = [...response.data]
                data.reverse().forEach(event => {
                    this.appendMessage(event)
                })
            })
        },
        appendMessage(event) {
            let messages = this.messages.slice(0)
            messages.push({
                username: event.user.displayName,
                message: event.message,
                timestamp: event.timestamp,
            })
            // don't mutate the array, replace it
            this.messages = messages
        },
        handleMessageSubmission: function(messageText) {
            try {
                this.room.send(messageText)
            } catch (e) {
                // handle errors.  say, the user isn't currently connected
                this.displayError(e)
            }
        },
        handleLeave() {
            this.room.leave().then(() => {
                this.room = null
                this.messages = []
                return this.domain.dispose()
            })
        },
        displayError(msg, detail) {
            alert(msg + ' ' + detail)
        },
    },
}
</script>

<style scoped>
    .chat-container {
        width: 100%;
        height: 100%;
    }
</style>