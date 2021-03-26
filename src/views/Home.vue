<template>
  <div class="login-page">
    <div class="form">
    <p>Bienvenue sur Platypad</p>
    <button @click="createPad()">Créer un nouveau pad</button>
    <div class="join">
      <input type="text" v-model="extId" @keyup.enter="handleJoin" placeholder="ID DU PAD A REJOINDRE" />
      <button @click="handleJoin()">Rejoindre un Pad existant</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Home',
    data: function() {
        return {
            extId: '',
        }
    },
    methods: {
        handleJoin() {
            if (!this.extId) {
                alert('Vous devez renseigner un ID !')
                return
            }
            this.$router.push('/editor/' + this.extId)
            this.extId = ''
        },
        createPad() {
            const id = this.generateId(12)
            this.$router.push('/editor/' + id)
        },
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

<style scoped >
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
  font-family: "Roboto", sans-serif;

}
.join {
  padding-top: 80px;
}
input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
button {
  text-transform: uppercase;
  outline: 0;
  background: rgb(113, 121, 113);
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
button:hover,
button:active,
button:focus {
  background: #43a047;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
</style>