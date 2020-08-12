<template lang="pug">
  .container.is-fluid
    .is-pulled-right.my-2
      button.button.is-cus-primary(
        data-action="add"
        @click="openPage()"
      )
        span.icon.is-small: font-awesome-icon(:icon="['fas', 'plus']")
        span 新增
    button.button.circle(
      title="新增商品"
      data-action="add"
      @click="openPage()"
      :class="{show: addShow}"
      track-by='$index'
    )
      font-awesome-icon(:icon="['fas', 'plus']")
    table.table.is-fullwidth
      tr.has-cus-background-dark
        th.has-text-light 分類
        th.has-text-light 圖片
        th.has-text-light 標題
        th.has-text-light 描述
        th.has-text-light 啟用狀態
        th.has-text-light 原價
        th.has-text-light 售價
        th.has-text-light 庫存
        th.has-text-light 編輯
      tr.item-list(
        v-for="(item, index) in products"
        :key="item.id"
        :data-id="item.id"
        :data-index="index"
      )
        td.col
          .text {{ item.category }}
        td.col
          figure.img.is-128x128
            img(:src="item.imageUrl[0]")
        td.col
          .text {{ item.title }}
        td.col
          .text {{ item.content }}
        td.col
          font-awesome-icon(
            :class="item.enabled ? 'check' : 'times'"
            :icon="item.enabled ? ['fas', 'check'] : ['fas', 'times']")
        td.col {{ item.origin_price | cash }}
        td.col {{ item.price | cash }}
        td.col {{ item.options ? item.options.store : 0 }}
        td.col
          .buttons.are-small.is-centered
            button.button(
              data-action="update"
              @click="openPage(index)"
            )
              span.icon.is-small: font-awesome-icon(:icon="['fas', 'edit']")
              span 修改
            button.button(
              :class="{'is-loading': loading}"
              @click="deleteProduct(index)"
            )
              span.icon.is-small: font-awesome-icon(:icon="['fas', 'trash-alt']")
              span 刪除
    productPage(
      :class="{open: page.open}"
      :addNewItem.sync="addNewItem"
    )
    template(v-if="pagination.current_page")
      pagination(:pagination="pagination")
    vue-confirm-dialog
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import pagination from '@/components/Pagination.vue';
import { getBackendAllData, deleteData } from '@/apis/backend';
import productPage from './Product.vue';

export default {
  components: {
    productPage,
    pagination,
  },
  data() {
    return {
      loading: false,
      pagination: {
        current_page: 1,
      },
      windowTop: null,
      addShow: false,
      addNewItem: false,
      checkProduct: [],
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  computed: {
    ...mapGetters({
      products: 'product/products',
      page: 'page',
    }),
  },
  watch: {
    product() {
      this.getData();
    },
    'pagination.current_page': {
      handler() {
        const { current_page: cur } = this.pagination;
        const loader = this.$loading.show();
        getBackendAllData(cur)
          .then((resp) => {
            const products = resp.data.data.map((el) => {
              const tmpEl = el;
              const { options } = tmpEl;
              if (typeof options !== 'object') {
                tmpEl.options = tmpEl.options
                  ? JSON.parse(tmpEl.options)
                  : { store: null };
              }
              return tmpEl;
            });
            this.setProducts(products);
            loader.hide();
          });
      },
    },
    addNewItem: {
      handler() {
        if (this.addNewItem) {
          this.getData();
          this.addNewItem = false;
        }
      },
    },
  },
  methods: {
    ...mapActions({
      setProducts: 'product/setProducts',
      delProduct: 'product/delProduct',
      setTempProduct: 'product/setTempProduct',
      clearTempProduct: 'product/clearTempProduct',
      togglePage: 'togglePage',
    }),
    getData() {
      const loader = this.$loading.show();
      getBackendAllData()
        .then((resp) => {
          const products = resp.data.data.map((el) => {
            const tmpEl = el;
            const { options } = tmpEl;
            if (typeof options !== 'object') {
              tmpEl.options = tmpEl.options
                ? JSON.parse(tmpEl.options)
                : { store: null };
            }
            return tmpEl;
          });
          this.setProducts(products);
          loader.hide();
          this.pagination = resp.data.meta.pagination;
        });
    },
    openPage(index) {
      if (index || index === 0) {
        this.setTempProduct(this.products[index]);
      } else {
        this.clearTempProduct();
      }
      this.togglePage();
    },
    deleteProduct(index) {
      const { title } = this.products[index];
      this.$confirm({
        title: '刪除',
        message: `確認刪除 ${title}？\r\n（刪除後無法復原）`,
        button: {
          no: '取消',
          yes: '刪除',
        },
        callback: (confirm) => {
          if (confirm) {
            this.loading = true;
            deleteData(this.products[index].id)
              .then(() => {
                this.delProduct(index);
                this.loading = false;
                this.$confirm({
                  message: `已刪除 ${title}`,
                  button: {
                    no: 'OK',
                  },
                });
              });
          }
        },
      });
    },
    onScroll() {
      this.windowTop = window.top.scrollY; /* or: e.target.documentElement.scrollTop */
      if (this.windowTop > 200) {
        this.addShow = true;
      } else {
        this.addShow = false;
      }
    },
  },
  beforeDestroy() {
    if (this.page.open) {
      this.togglePage();
    }
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
.col
  border: 1px solid $navyblue
  width: 8%
  height: 200px
  background-position: left
  background-repeat: no-repeat
  background-size: cover
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

.newDataPage
  transform-origin: center
  transition: .5s
  transform: scale(0)
  &.open
    transform: scale(1)
    background: rgba(0, 0, 0, .4)
</style>
