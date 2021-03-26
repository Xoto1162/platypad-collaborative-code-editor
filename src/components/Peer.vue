<template>
    <div id="audio">
        <h2>Connected to audio :</h2>
        <div id="peers-audio">
            <ul>
                <li v-for="(p, i) in connectedToAudio" :key="i">
                    {{ p.user.displayName }}
                    <font-awesome-icon icon="volume-up" style="float: right;"></font-awesome-icon>
                </li>
            </ul>
        </div>
        <button @click="connect"  v-if="!connected">Connection</button>
        <button @click="disconnect" v-if="connected">Disconnect</button>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'

library.add(faVolumeUp)

export default {
    name: 'Peer',
    props: {
        participants: {
            type: Array,
            required: true,
        },
        activity: {
            type: Object,
        },
    },
    data() {
        return {
            connections: [],
            connected: false,
            myStream: null,
        }
    },
    computed: {
        connectedToAudio() {
            return this.participants.filter(p => p.state.has('peer'))
        },
    },
    methods: {
        connect() {
            navigator.mediaDevices.getUserMedia({ video: false, audio: true })
                .then(localAudioStream => {
                    this.connected = true
                    this.myStream = localAudioStream

                    // Pour tout les peers connecté on les appels
                    this.connectedToAudio.forEach(p => {
                        if (!p.local) {
                            const outgoing = this.$peer.call(p.state.get('peer'), localAudioStream)
                            this.connections.push(outgoing)
                            outgoing.on('error', err => {
                                this.connections.remove(outgoing)
                                console.log(err)
                            })
                            outgoing.on('stream', stream => {
                                this.playStream(stream)
                            })
                        }
                    })

                    // On ajoute un evenement pour quand on nous appelera
                    this.$peer.on('call', incoming => {
                        this.connections.push(incoming)
                        incoming.answer(localAudioStream)
                        incoming.on('error', err => {
                            this.connections.remove(incoming)
                            console.log(err)
                        })
                        incoming.on('stream', stream => {
                            this.playStream(stream)
                        })
                    })

                    // On s'ajoute a la liste des peers
                    this.activity.setState('peer', this.$peer.id)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        disconnect() {
            this.connected = false
            this.myStream?.getTracks().forEach(t => t.stop())
            this.activity.removeState('peer')
            this.connections.forEach(c => {
                c.close()
            })
            this.connections = []
        },
        playStream(stream) {
            const audio = document.createElement('audio')
            audio.autoplay = true
            document.getElementById('peers-audio').appendChild(audio)
            audio.srcObject = stream
        },
    },
}
</script>

<style scoped>
    div#audio {
        padding: 20px 20px;
        color: white;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        color: white;
        padding: 5px 0;
    }
</style>