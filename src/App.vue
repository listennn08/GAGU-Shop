<template lang="pug">
  #app
    message
    router-view
</template>
<script>
import { mapActions } from 'vuex';
import { checkToken } from '@/apis/auth';
import cookies from './cookies';
import message from './components/MessageModal.vue';

export default {
  components: {
    message,
  },
  created() {
    checkToken()
      .then((resp) => {
        if (resp.data.success) {
          this.setLoginInfo(cookies.getItem('token') || '');
        }
      })
      .catch(() => {});
  },
  methods: {
    ...mapActions({
      setLoginInfo: 'login/setLoginInfo',
    }),
  },
};
</script>
<style lang="sass">
@import '~bulma/bulma.sass'
@import './assets/main'

#app
  font-family: 'Noto Sanc TC', 'Raleway', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100vh
</style>
