<template lang="pug">
  div
    Navbar
    .home(@click="toggleOpen()")
      router-view.view
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
    ...mapActions(['toggleSticky', 'toggleMenuOpen']),
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
    toggleOpen() {
      this.toggleMenuOpen(false);
    },
  },
};
</script>
<style lang="sass" scoped>
.home
  min-height: 80%
  padding-bottom: 2%
  overflow-x: hidden
.footer
  position: sticky
  height: 100px
  padding: 25px
  display: flex
  align-items: center
  justify-content: center
.view
  min-height: 60vh
</style>
