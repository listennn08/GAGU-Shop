<template lang="pug">
  .banner(:class="{show: msg.text}")
    .message(:class="showItem")
      font-awesome-icon(:icon="['fas', 'exclamation-circle']")
      | {{ msg.text }}
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Message',
  computed: {
    ...mapGetters(['msg']),
    showItem() {
      if (this.msg.text) {
        return this.msg.type ? 'show green' : 'show red';
      }
      return '';
    },
  },
};
</script>
<style lang="sass" scoped>
  $navyblue: #333D51
  @keyframes show
    0%
      transform: scale(0) translate(-50%, -50%)
    100%
      transform: scale(1) translate(-50%, -50%)
  .banner
    position: absolute
    width: 100%
    height: 100vh
    overflow: hidden
    display: flex
    align-items: center
    justify-content: center
    z-index: -999
    &.show
      z-index: 1000
    .message
      width: auto
      padding: 1%
      border: 1px solid rgba($navyblue, .8)
      box-shadow: 5px 5px 10px rgba($navyblue, .8)
      background: #fff
      transform: scale(0)
      font-size: 16px
      transition: .5s
      &.show
        transform: scale(1)
        &.red
          color: rgba(red, .8)
        &.green
          color: rgba(green, .8)
</style>
