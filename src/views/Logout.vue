<template lang="pug">
  div
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { Logout } from '@/apis/auth';
import cookies from '@/cookies';

export default {
  created() {
    this.doLogout();
  },
  computed: {
    ...mapGetters({
      token: 'loginModule/token',
    }),
  },
  methods: {
    ...mapActions({
      clearLoginInfo: 'loginModule/clearLoginInfo',
    }),
    doLogout() {
      if (this.token) {
        Logout().then(() => {
          this.clearLoginInfo();
          cookies.removeItem('token');
          this.$router.push('/');
        });
      }
    },
  },
};
</script>
