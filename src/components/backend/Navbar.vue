<template lang="pug">
  nav.hero-head
    .columns.is-mobile.is-marginless
      .column.left
        h1.is-size-2.has-text-weight-bold: router-link.logo(to="/admin") GAGU
          small.is-size-6 manage
      .column.center.desktop
          router-link.navbar-item(to="/admin/products") 商品管理
          router-link.navbar-item(to="/admin/coupons") 優惠管理
          router-link.navbar-item(to="/admin/orders") 訂單管理
          router-link.navbar-item(to="/admin/files") 圖片管理
      .column.right
        router-link.navbar-item.desktop(to="/") 去前台
        router-link.navbar-item.desktop(v-if="!isLogin" to="/login") 登入
        router-link.navbar-item.desktop(v-else to="/logout") 登出
        .dropdown.is-right.mobile(:class="{'is-active': hide}")
          .dropdown-trigger(@click="toggleDrop")
            button.button.is-dark(aria-haspopup="true" aria-controls="dropdown-menu")
              span: font-awesome-icon(:icon="['fas', 'bars']")
              span.icon.is-small
                font-awesome-icon(:icon="['fas', 'angle-down']")
          #dropdown-menu.dropdown-menu(role="menu")
            .dropdown-content
              router-link.navbar-item(to="/admin/products") 商品管理
              router-link.navbar-item(to="/admin/coupons") 優惠管理
              router-link.navbar-item(to="/admin/orders") 訂單管理
              router-link.navbar-item(to="/admin/files") 圖片管理
              hr.dropdown-divider
              router-link.navbar-item(to="/") 去前台
              router-link.dropdown-item(v-if="!isLogin" to="/login") 登入
              router-link.dropdown-item(v-else to="/logout") 登出
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      drop: false,
    };
  },
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin',
    }),
    hasLogin() {
      return this.isLogin;
    },
    hide() {
      return this.drop;
    },
  },
  methods: {
    toggleDrop() {
      this.drop = !this.drop;
    },
  },
};
</script>
<style lang="sass" scoped>

$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$lightgray: #F4F3EA

@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Raleway:wght@500;700&display=swap)

.hero-head
  background: $navyblue
  font-family: 'Noto Sans TC', sans serif
  .router-link-exact-active:not(.logo)
    color: $goldyellow
  .column
    padding: 0 0.75rem
.logo
  color: $lightgray
  font-family: 'Raleway', sans-serif
.navbar-item
  padding: 0 0.75rem
  color: $lightgray
  &::after
    content: ''
    position: absolute
    height: 0
    bottom: 0
    border-bottom: 1px solid $goldyellow
    transition: .3s
  &:hover
    color: $goldyellow
    background: none
  &:focus
    color: $goldyellow
    background: none
  &::after
    left: 10%
    right: 90%
  &:hover::after
    right: 10%
.dropdown, .dropdown-menu, .dropdown-content
  background: $navyblue
.dropdown-item
  padding: 0.375rem 3rem
  color: $lightgray
.is-dark
  background: $navyblue
  &:hover, &:focus
    background: $hnavyblue
</style>
