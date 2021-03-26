<template>
    <div style="height: 100%">
        <Header :languages="languages"
                :language-selected="language"
                :running="running"
                :participants="participants"
                :colorAssigner="colorAssigner"
                @save="save"
                @run="run"
                @change:language="changeLanguage" />

        <golden-layout id="app-container" :showPopoutIcon="false">
            <gl-row>
                <gl-component title="EDITOR" closable>
                    <MonacoEditor :convergenceElement="this.model?this.model.elementAt('code'):null"
                                  :language="language.language"
                                  :color-assigner="colorAssigner"
                                  ref="editor" />
                </gl-component>
                <gl-col width="25">
                    <gl-component title="STDIN" width="10" closable>
                        <MonacoEditor :convergenceElement="this.model?this.model.elementAt('stdin'):null"
                                      :color-assigner="colorAssigner"
                                      ref="stdin"></MonacoEditor>
                    </gl-component>
                    <gl-stack v-model="openedTab">
                        <gl-component title="STDOUT" :closable="false" id="stdout" tab-id="stdout">
                            <MonacoEditor ref="stdout"
                                          :read-only="true"></MonacoEditor>
                        </gl-component>
                        <gl-component title="STDERR" :closable="false" id="stderr" tab-id="stderr">
                            <MonacoEditor ref="stderr"
                                          :read-only="true"></MonacoEditor>
                        </gl-component>
                        <gl-component title="COMPILE OUTPUT" :closable="false" id="compile-output" tab-id="compOut">
                            <MonacoEditor ref="compileOutput"
                                          :read-only="true"></MonacoEditor>
                        </gl-component>
                    </gl-stack>
                </gl-col>
                <gl-stack width="15">
                    <gl-component title="CHAT" closable>
                        <Chat :room="this.room" />
                    </gl-component>
                    <gl-component title="AUDIO" closable>
                        <Peer :participants="participants"
                              :activity="activity" />
                    </gl-component>
                </gl-stack>
            </gl-row>
        </golden-layout>
    </div>
</template>

<script>
import MonacoEditor from '../components/MonacoEditor'
import Chat from '../components/chat/Chat'
import Peer from '../components/Peer'
import Header from '../components/Header'
import {Convergence} from '@convergence/convergence'
import {saveAs} from 'file-saver'
import {ColorAssigner} from '@convergence/color-assigner'
import languages from '../languages.yaml'

export default {
    name: 'Home',
    props: ['id'],
    components: {
        MonacoEditor,
        Chat,
        Peer,
        Header,
    },
    data() {
        return  {
            colorAssigner: new ColorAssigner(),
            username: null,
            domain: null,
            model: null,
            room: null,
            activity: null,
            participants: [],
            languages: languages,
            language: languages.find(e => e.id === 81), // Scala
            running: false,
            openedTab: 'stout',
        }
    },
    mounted() {
        while (!this.username) {
            this.username = prompt('Entrez un pseudo')
        }
        this.handleConnect()
    },
    methods: {
        handleConnect() {
            Convergence.connectAnonymously(process.env.PROTOCOL + '://' + process.env.CONVERGENCE_HOSTNAME, this.username).then(domain => {
                this.domain = domain

                // Création du modèle
                this.domain.models().openAutoCreate({
                    collection: 'editor',
                    id: this.id,
                    data: {
                        'code': '',
                        'stdin': '',
                        'languageId': this.language.id,
                    },
                }).then((model) => {
                    this.model = model
                    this.language = this.languages.find(e => e.id === this.model.elementAt('languageId').value())
                    this.model.elementAt('languageId').on('value', (event) => {
                        this.language = this.languages.find(e => e.id === event.element.value())
                    })
                }).catch(error => {
                    console.log('Could not open model ', error)
                })

                // Création de l'activité
                this.domain.activities().join(this.id).then(activity => {
                    this.activity = activity
                    this.activity.participantsAsObservable().subscribe(p => {
                        this.participants = p
                    })
                })

                // Création de la room
                this.domain.chat().create({
                    id: this.id,
                    type: 'room',
                    membership: 'public',
                    ignoreExistsError: true,
                })
                    .then(channelId => this.domain.chat().join(channelId))
                    .then(room => {
                        this.room = room
                    })
                    .catch(error => {
                        console.log('Could not join chat room: ' + error)
                    })
            })
        },
        changeLanguage(language) {
            this.language = language
            this.model.elementAt('languageId').value(language.id)
        },
        save() {
            const blob = new Blob(
                [this.$refs.editor.editor.getValue()],
                {type: 'text/plain;charset=utf-8'},
            )
            saveAs(blob, 'main.' + this.language.extension)
        },
        run() {
            this.running = true
            const sourceValue = this.encode(this.$refs.editor.editor.getValue())
            if (sourceValue.trim() === '') {
                this.running = false
                alert('Your code is empty !')
                return
            }

            const stdin = this.encode(this.$refs.stdin.editor.getValue())
            const languageId = this.language.id
            const compilerOptions = ''
            const commandLineArguments = ''

            const data = {
                source_code: sourceValue,
                language_id: languageId,
                stdin: stdin,
                compiler_options: compilerOptions,
                command_line_arguments: commandLineArguments,
                redirect_stderr_to_stdout: 'false',
            }

            this.$http.post(process.env.PROTOCOL + '://' + process.env.JUDGE0_HOSTNAME + '/submissions?base64_encoded=true&wait=false', data)
                .then(res => {
                    setTimeout(this.fetchSubmission.bind(null, res.data.token), 200)
                })
                .catch(err => {
                    console.log(err)
                    this.running = false
                })
        },
        encode(message) {
            return btoa(unescape(encodeURIComponent(message || '')))
        },
        decode(bytes) {
            const escaped = escape(atob(bytes || ''))
            try {
                return decodeURIComponent(escaped)
            } catch {
                return unescape(escaped)
            }
        },
        fetchSubmission(token) {
            this.$http.get(process.env.PROTOCOL + '://' + process.env.JUDGE0_HOSTNAME + '/submissions/' + token + '?base64_encoded=true')
                .then(res => {
                    if (res.data.status.id <= 2) { // In queue or processing
                        setTimeout(this.fetchSubmission.bind(null, token), 200)
                        return
                    }
                    this.handleResult(res.data)
                })
                .catch(err => {
                    console.log(err)
                    this.running = false
                })
        },
        handleResult(data) {
            //const status = data.status
            const stdout = this.decode(data.stdout)
            const stderr = this.decode(data.stderr)
            const compile_output = this.decode(data.compile_output)

            //const sandbox_message = decode(data.message)
            //const time = (data.time === null ? "-" : data.time + "s")
            //const memory = (data.memory === null ? "-" : data.memory + "KB")

            this.$refs.stdout.editor.setValue(stdout)
            this.$refs.stderr.editor.setValue(stderr)
            this.$refs.compileOutput.editor.setValue(compile_output)

            this.openedTab = stdout ? 'stdout' : stderr ? 'stderr' : 'compOut'

            this.running = false
        },

    },
}
</script>

<style scoped>
    #app-container {
        height: calc(100% - 40px);
    }
</style>
