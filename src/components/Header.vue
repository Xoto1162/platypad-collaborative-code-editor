<template>
    <nav>
        <div class="item" @click="$emit('save')">
            Save File
            <font-awesome-icon icon="download" />
        </div>
        <div class="item" @click="$emit('run')">
            Run
            <font-awesome-icon v-if="running" icon="spinner" class="rotate" />
            <font-awesome-icon v-if="!running" icon="play" />
        </div>
        <Select id="language-selector" :options="languages" :default="languageSelected.id" @change="changeLanguage"/>

        <div class="item dropdown" style="float: right">
            {{ participants.length }}
            <font-awesome-icon icon="users" />
            <div class="dropdown-content">
                <ul>
                    <li v-for="(p, i) in participants" :key="i" >
                        <font-awesome-icon icon="user"
                                           style="margin-right: 20px;"
                                           :style="{color: colorAssigner.getColorAsHex(p.sessionId)}" />
                        {{ p.user.displayName }}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import Select from './Select'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload, faSpinner, faPlay, faUsers, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faDownload, faSpinner, faPlay, faUsers, faUser)

export default {
    name: 'Header',
    components: {
        Select,
    },
    props: {
        languages: {
            type: Array,
            required: true,
        },
        languageSelected: {
            type: Object,
            required: true,
        },
        running: {
            type: Boolean,
            required: true,
        },
        participants: {
            type: Array,
            required: true,
        },
        colorAssigner: {
            type: Object,
            required: true,
        },
    },
    methods: {
        changeLanguage(language) {
            this.$emit('change:language', language)
        },
    },
}
</script>

<style scoped>
    nav {
        height: 40px;
        background: #1e1e1e;
    }

    nav .item {
        display: inline-block;
        font-size: 12px;
        color: white;
        line-height: 40px;
        height: 100%;
        padding: 0 20px 0 20px;
        font-family: sans-serif;
        cursor: pointer;
        border-right: 1px solid #515151;
    }

    nav .item:hover {
        background: #515151;
    }

    #language-selector {
        height: 100%;
        width: 200px;
    }

    svg {
        margin-left: 10px;
    }

    .rotate {
        animation-name: spin;
        animation-duration: 4000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        } to {
              transform: rotate(360deg);
          }
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        min-width: 200px;
        padding: 0 16px;
        z-index: 10;
        right: -1px;
        background: #1e1e1e;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    ul {
        padding: 0;
        list-style: none;
    }
</style>