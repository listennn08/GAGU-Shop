<template lang="pug">
  div
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { Logout } from '@/apis/auth';
import cookies from '@/cookies';

export default {
  name: 'Logout',
  created() {
    this.doLogout();
  },
  computed: {
    ...mapGetters({
      token: 'login/token',
    }),
  },
  methods: {
    ...mapActions({
      clearLoginInfo: 'login/clearLoginInfo',
    }),
    doLogout() {
      const loader = this.$loading.show();
      if (this.token) {
        Logout().then(() => {
          this.clearLoginInfo();
          cookies.removeItem('token');
          this.$router.push('/');
          loader.hide();
        });
      }
    },
  },
};
</script>
