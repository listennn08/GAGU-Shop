<template lang="pug">
  .modal(
    :class="{'is-active': page.open}"
  )
    .modal-background(@click="cancel")
    .modal-card
      header.modal-card-head
        p.is-size-4.is-full {{ !tempProduct.id ? '新增' : '更新'}}商品
      section.modal-card-body
        .field.has-text-left
            .control
              input#enabled.switch(
                :class="{'is-success': tempProduct.enabled}"
                :id="tempProduct.id"
                type="checkbox"
                v-model="tempProduct.enabled"
              )
              label(
                :for="tempProduct.id"
              ) {{ checkEnabled(tempProduct.enabled) }}
            label(for="title") 名稱
            .control
              input#title.input.is-expended(type="text" v-model="tempProduct.title")
            label(for="ategory") 分類
            .control
              input#category.input(type="text" v-model="tempProduct.category")
            label(for="content") 商品敘述
            .control
              textarea#content.textarea(cols="25" rows="5" v-model="tempProduct.content")
            label(for="description") 商品說明
            .control
              textarea#description.textarea(cols="25" rows="5" v-model="tempProduct.description")
            label(for="origin_price") 原價
            .control
              input#origin_price.input(type="number" v-model="tempProduct.origin_price")
            label(for="price") 售價
            .control
              input#price.input(type="number" v-model="tempProduct.price")
            label(for="store") 庫存
            .control
              input#store.input(
                type="number"
                v-if="tempProduct.options"
                v-model="tempProduct.options.store"
                placeholder="0")
            label(for="unit") 單位
            .control
              input#unit.input(type="text" v-model="tempProduct.unit")
            label(for="imageUrl") 輸入圖片網址或上傳圖片
            .control(v-for=" (img, index) in tempProduct.imageUrl" :key="img")
              input.input(
                :id="`imageUrl-${index}`"
                type="text"
                v-model.lazy="tempProduct.imageUrl[index]")
            .control
              input#uploadImg.input(type="file")
            section.section(v-if="showImagePreview(tempProduct.imageUrl)")
              carousel(:images="tempProduct.imageUrl")
      footer.modal-card-foot
        button.button.is-cus-primary(
          v-if="!tempProduct.id"
          :class="{'is-loading': loading}"
          data-action="create"
          type="button"
          @click.prevent="edit"
        ) 新增
        button.button.is-cus-primary(
          v-else
          :class="{'is-loading': loading}"
          data-action="update"
          type="button"
          @click.prevent="edit") 更新
        button.button(
          @click="cancel"
          type="button") 取消
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import carousel from '@/components/Carousel.vue';
import {
  getBackendDataDetail, createData, updateData, uploadFile,
} from '@/apis/backend';

export default {
  name: 'product',
  components: {
    carousel,
  },
  props: {
    addNewItem: Boolean,
  },
  data() {
    return {
      formData: new FormData(),
    };
  },
  computed: {
    ...mapGetters({
      tempProduct: 'product/tempProduct',
      page: 'page',
      loading: 'loading',
    }),
    checkEnabled: () => (enabled) => (enabled ? '啟用' : '未啟用'),
    showImagePreview: () => (item) => (item.length > 0),
  },
  watch: {
    'page.open': {
      handler() {
        this.loadProduct();
      },
    },
  },
  methods: {
    ...mapActions({
      setMsg: 'setMsg',
      addProducts: 'product/addProducts',
      editProduct: 'product/editProduct',
      setTempProduct: 'product/setTempProduct',
      clearTempProduct: 'product/clearTempProduct',
      togglePage: 'togglePage',
      toggleLoading: 'toggleLoading',
    }),
    loadProduct() {
      if (this.tempProduct.id) {
        this.toggleLoading();
        getBackendDataDetail(this.tempProduct.id)
          .then((resp) => {
            const { data } = resp.data;
            if (!data.options) {
              data.options = {
                store: null,
              };
            } else {
              data.options = JSON.parse(data.options);
            }
            this.setTempProduct(data);
            this.toggleLoading();
          });
      }
    },
    async uploadImage() {
      const uFile = document.querySelector('#uploadImg').files[0];
      this.formData.append('file', uFile);
      if (!uFile) return null;
      try {
        const resp = await uploadFile(this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        document.querySelector('#uploadImg').value = '';
        return resp.data.data.path;
      } catch {
        /* 上傳失敗 */
        return null;
      }
    },
    async edit(e) {
      this.toggleLoading();
      const { action } = e.target.dataset;
      const uploadImagePath = await this.uploadImage();
      if (uploadImagePath) {
        this.tempProduct.imageUrl.push(uploadImagePath);
      }
      this.tempProduct.imageUrl = this.tempProduct.imageUrl.filter((el) => el);
      if (action === 'create') {
        this.tempProduct.options = JSON.stringify(this.tempProduct.options);
        createData(this.tempProduct)
          .then(() => {
            this.$emit('update:addNewItem', true);
            this.clearTempProduct();
            this.toggleLoading();
            this.togglePage();
            this.loading = false;
          })
          .catch(() => {
            this.tempProduct.options = JSON.parse(this.tempProduct.options);
            this.setMsg({
              msg: `上傳${this.tempProduct.title || ''}失敗`,
              type: false,
            });
            this.toggleLoading();
          });
      } else if (action === 'update') {
        this.tempProduct.options = JSON.stringify(this.tempProduct.options);
        updateData(this.tempProduct.id, this.tempProduct)
          .then((resp) => {
            const prod = resp.data.data;
            if (typeof prod.options === 'string') {
              prod.options = JSON.parse(prod.options);
            }
            this.editProduct({
              id: prod.id,
              data: prod,
            });
            this.toggleLoading();
            this.clearTempProduct();
            this.togglePage();
          })
          .catch(() => {
            this.tempProduct.options = JSON.parse(this.tempProduct.options);
            this.setMsg({
              msg: `更新${this.tempProduct.title}失敗`,
              type: false,
            });
            this.toggleLoading();
          });
      }
    },
    cancel() {
      this.clearTempProduct();
      this.togglePage();
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Raleway:wght@500;700&display=swap)
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$darkgrayn: #46505e
$lightgray: #F4F3EA
.modal
  font-family: 'Noto Sans TC', sans serif
  position: fixed
.is-full
  text-align: left
  width: 100%

</style>
