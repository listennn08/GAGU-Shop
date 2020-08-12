<template lang="pug">
  .section
    .carousel
      button.button.is-fixed-left(@click="changeIndex('minus')")
        font-awesome-icon.icon.is-small(:icon="['fas', 'angle-left']")
      button.button.is-fixed-right(@click="changeIndex('plus')")
        font-awesome-icon.icon.is-small(:icon="['fas', 'angle-right']")
      div
        img(:src="images[index]")
        .under
          .line(
            v-for="(_, index) in images"
            :class="{focus: current(index)}"
          )
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    current() {
      return (i) => i === this.index;
    },
  },
  methods: {
    changeIndex(action) {
      switch (action) {
        case 'plus':
          if (this.index < this.images.length - 1) {
            this.index += 1;
          }
          break;
        case 'minus':
          if (this.index > 0) {
            this.index -= 1;
          }
          break;
        default:
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.carousel
  position: relative
.button
  position: absolute
  top: 50%
  bottom: 50%
.is-fuxed-left
  left: 0
.is-fixed-right
  right: 0
.under
  position: absolute
  bottom: 0
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  .line
    margin: 0 2px
    width: 20px
    height: 5px
    border: 1px solid #888
    border-radius: 5px
    background: transparent
    &.focus
      background: #888

</style>
