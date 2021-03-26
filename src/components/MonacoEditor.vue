<template>
    <div class="editor" :id="'monaco-editor-' + id"></div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import {MonacoConvergenceAdapter} from '../monaco-adapter'

export default {
    name: 'MonacoEditor',
    props: {
        convergenceElement: {
            type: Object,
        },
        colorAssigner: {
            type: Object,
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
        language: {
            type: String,
            default: 'plaintext',
        },
    },
    data() {
        return {
            editor: null,
            id: this.generateId(5),
        }
    },
    mounted() {
        this.editor = monaco.editor.create(document.getElementById('monaco-editor-' + this.id), {
            theme: 'vs-dark',
            language: this.language,
            fixedOverflowWidgets: true,
            readOnly: this.readOnly,
        })

        setInterval(() => {
            this.editor.layout()
        }, 100)
    },
    watch: {
        convergenceElement(newVal) {
            if (newVal) {
                const adapter = new MonacoConvergenceAdapter(this.editor, newVal, this.colorAssigner)
                adapter.bind()
            }
        },
        language(newVal) {
            monaco.editor.setModelLanguage(this.editor.getModel(), newVal)
        },
    },
    methods: {
        generateId(lenght) {
            let res = ''
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            for (let i = 0; i < lenght; i++) {
                res += chars.charAt(Math.floor(Math.random() * chars.length))
            }
            return res
        },
    },
}
</script>

<style scoped>
    .editor {
      height: 100%;
    }
</style>

<style>
    .monaco-remote-cursor {
        width: 2px;
    }

    .monaco-remote-cursor-tooltip {
        position: absolute;
    }
</style>