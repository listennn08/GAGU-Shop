<template lang="pug">
  div
    Navbar
    .home
      router-view
    Footer
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapGetters(['sticky']),
  },
  methods: {
    ...mapActions(['toggleSticky']),
    handleScroll() {
      if (window.scrollY > 300) {
        this.toggleSticky(true);
      } else {
        this.toggleSticky(false);
      }
    },
    debounce(func, delay = 250) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    },
  },
};
</script>
<style lang="sass" scoped>
.home
  height: 100%
  min-height: 70vh !important
  padding-bottom: 2%
</style>
