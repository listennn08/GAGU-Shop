<template lang="pug">
  div
    navbar
    section.hero.is-fullheight
      router-view
</template>
<script>
import navbar from '@/components/backend/Navbar.vue';

export default {
  components: {
    navbar,
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Raleway:wght@500;700&display=swap)
*
  font-family: 'Noto Sans TC', sans serif
</style>
