<template lang="pug">
    .modal
      .modal-background(@click="togglePage()")
      .modal-card
        header.modal-card-head
            h4.is-size-4 新增圖片
        .modal-card-body
          div(v-for="i in inputLen")
            input.input(
              :data-i="i-1"
              :key="i-1"
              type="file" name="upload[]"
              @change="onFileChange"
            )
            template(v-if="url[i-1]")
              img(:src="url[i-1]")
          button.button(@click="inputLen += 1")
            span.icon.is-small: font-awesome-icon(:icon="['fas', 'plus']")
        footer.modal-card-foot
          button.button.is-cus-primary(
            :class="{'is-loading': loading}"
          ) 上傳
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      url: [],
      inputLen: 1,
    };
  },
  computed: mapGetters(['page']),
  methods: {
    ...mapActions(['togglePage']),
    onFileChange(e) {
      const file = e.target.files[0];
      const { i } = e.target.dataset;
      this.url[i] = URL.createObjectURL(file);
      this.$forceUpdate();
    },
    cancel() {
      this.togglePage();
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Raleway:wght@500;700&display=swap)
*
  font-family: 'Noto Sans TC', sans serif
</style>
