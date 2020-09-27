<template lang="pug">
  #app
    Message
    router-view
</template>
<script>
import { mapActions } from 'vuex';
import { checkToken } from '@/apis/auth';
import cookies from './cookies';
import Message from './components/MessageModal.vue';

export default {
  name: 'App',
  components: {
    Message,
  },
  created() {
    checkToken()
      .then((resp) => {
        if (resp.data.success) {
          this.setLoginInfo(cookies.getItem('token') || '');
        }
      });
  },
  methods: {
    ...mapActions({
      setLoginInfo: 'login/setLoginInfo',
    }),
  },
};
</script>
<style lang="sass">
html, body
  height: 100vh
  min-height: 100vh
#app
  font-family: 'Noto Sanc TC', 'Raleway', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  display: flex
  flex-direction: column
  height: 100vh
  min-height: 100vh
</style>
