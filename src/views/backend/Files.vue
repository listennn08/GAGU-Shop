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
              type="file"
              name="upload[]"
              @change="onFileChange"
            )
            template(v-if="url[i-1]")
              img(:src="url[i-1]")
          button.button(@click="inputLen += 1")
            span.icon.is-small: font-awesome-icon(:icon="['fas', 'plus']")
        footer.modal-card-foot
          button.button.is-cus-primary(
            :class="{'is-loading': loading}"
            @click="upload"
          ) 上傳
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { uploadFile } from '@/apis/backend';

export default {
  name: 'File',
  data() {
    return {
      loading: false,
      url: [],
      fileValue: [],
      inputLen: 1,
    };
  },
  computed: mapGetters({
    page: 'page',
  }),
  methods: {
    ...mapActions({
      togglePage: 'togglePage',
      setFiles: 'file/setFiles',
      addFile: 'file/addFile',
      setMsg: 'setMsg',
    }),
    onFileChange(e) {
      const file = e.target.files[0];
      const { i } = e.target.dataset;
      this.fileValue[i] = file;
      this.url[i] = URL.createObjectURL(file);
      this.$forceUpdate();
    },
    upload() {
      this.loading = true;
      this.fileValue.forEach((el) => {
        const formData = new FormData();
        formData.append('file', el);
        uploadFile(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((resp) => {
            this.addFile(resp.data.data);
            this.loading = false;
            this.cancel();
          })
          .catch(() => {
            this.setMsg({
              msg: '上傳失敗',
              type: false,
            });
            this.cancel();
            this.loading = false;
          });
      });
    },
    cancel() {
      this.url = [];
      this.fileValue = [];
      this.inputLen = 1;
      this.togglePage();
    },
  },
};
</script>
<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Raleway:wght@500;700&display=swap')
*
  font-family: 'Noto Sans TC', sans serif
.modal
    position: fixed
</style>
