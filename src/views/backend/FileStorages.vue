<template lang="pug">
  .container.is-fluid
    button.button.is-cus-primary.is-pulled-right(
      data-action="add"
      @click="openPage()"
    )
      span.icon.is-small: font-awesome-icon(:icon="['fas', 'plus']")
      span 新增
    table.table.is-fullwidth
      tr.has-cus-background-dark.has-text-wieght-bold
        th.has-text-light 預覽
        th.has-text-light id
        th.has-text-light 路徑
        th.has-text-light 編輯
      tr.item-list(
        v-for="(item, index) in files"
        :key="item.id"
        :data-id="item.id"
        :data-index="index"
      )
        td.col
          .is-cus-centered
            figure.image.is-128x128
              img(:src="item.path")
        td.col
          .text {{ item.id }}
        td.col
          .text {{ item.path }}
        td.col
            button.button(
              :class="{'is-loading': loading}"
              @click="removeFile(index)"
            )
              span.icon.is-small: font-awesome-icon(:icon="['fas', 'trash-alt']")
              span 刪除
    Files(:class="{'is-active': page.open}")
    vue-confirm-dialog
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { getFile, deleteFile } from '@/apis/backend';
import Files from './Files.vue';

export default {
  components: {
    Files,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    const loader = this.$loading.show();
    getFile()
      .then((resp) => {
        this.setFiles(resp.data.data);
        loader.hide();
      });
  },
  computed: {
    ...mapGetters({
      files: 'file/files',
      page: 'page',
    }),
  },
  methods: {
    ...mapActions({
      setFiles: 'file/setFiles',
      delFile: 'file/delFile',
      togglePage: 'togglePage',
    }),
    removeFile(index) {
      const { id } = this.files[index];
      this.$confirm({
        title: '刪除',
        message: '確認刪除？\r\n（刪除後無法復原）',
        button: {
          no: '取消',
          yes: '刪除',
        },
        callback: (confirm) => {
          if (confirm) {
            this.loading = true;
            deleteFile(id)
              .then((resp) => {
                if (resp) {
                  this.delFile(index);
                  this.$confirm({
                    message: '已刪除',
                    button: {
                      no: 'OK',
                    },
                  });
                }
                this.loading = false;
              })
              .catch(() => {
                this.$confirm({
                  message: '刪除失敗',
                  button: {
                    no: 'OK',
                  },
                });
                this.loading = false;
              });
          }
        },
      });
    },
    openPage() {
      this.togglePage();
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&family=Raleway:wght@500;700&display=swap)
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$darkgrayn: #46505e
$lightgray: #F4F3EA
*
  font-family: 'Noto Sans TC', sans serif
.is-cus-primary
  background: $navyblue
  color: $lightgray
  transition: .2s
  &:hover
    background: $hnavyblue
    color: #fff
  &:focus
    background: $hnavyblue
    color: #fff
.table
  border: 1px solid $navyblue
  td
    padding: 0.5rem
    vertical-align: middle
.has-cus-background-dark
  background: $navyblue
.has-text-light
  border: 1px solid $lightgray
  &:first-of-type
    border-left: 1px solid $navyblue
  &:last-of-type
    border-right: 1px solid $navyblue
.circle
  position: fixed
  box-shadow: 2px 2px 5px $navyblue
  width: 36px
  border-radius: 50%
  bottom: 2%
  right: 2%
  z-index: 888
  transition: .5s
  transform: translate(210%, 0)
  &.show
    transform: translate(0, 0)
  &:hover
    transform: translate(0, -10%)
.item-list
  border-top: 1px solid $navyblue
  border-left: 1px solid $navyblue
  font-weight: 500
  font-family: 'Noto Sans TC', sans-serif
.raleway
  font-family: 'Raleway', sans-serif
.col
  border: 1px solid $navyblue
  width: 8%
  height: 200px
  max-width: 100px
  white-space: nowrap
  &:first-of-type, &:nth-of-type(6), &:nth-of-type(7),  &:nth-of-type(8)
    text-transform: uppercase
    font-family: 'Raleway', sans-serif
  .text
    width: 100%
    padding: 2%
    text-align: center
    overflow: hidden
    text-overflow: ellipsis
  .check
    color: green
  .times
    color: red
.is-cus-centered
  display: flex
  justify-content: center
  align-items: center
</style>

</style>
