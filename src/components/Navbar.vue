<template lang="pug">
  nav.hero-head.has-background-light(:class="{'is-fixed-top': sticky}")
    .columns.is-mobile.is-marginless
      .column.left
        h1.is-size-2.has-text-weight-bold: router-link.logo(to="/") GAGU
      .column.center.desktop
        router-link.navbar-item(to="/about") 關於我們
        router-link.navbar-item(to="/products") 產品列表
        router-link.navbar-item(to="/shopcart") 購物車
        router-link.navbar-item(to="/orders") 我的訂單
      .column.right
        router-link.navbar-item.desktop(v-if="hasLogin" to="/admin") 去後台
        router-link.navbar-item.desktop(v-if="!hasLogin" to="/login") 登入
        router-link.navbar-item.desktop(v-else to="/logout") 登出
        .dropdown.is-right.mobile(:class="{'is-active': hide}")
          .dropdown-trigger(@click="toggleDrop")
            button.button.is-text(aria-haspopup="true" aria-controls="dropdown-menu")
              span: font-awesome-icon(:icon="['fas', 'bars']")
              span.icon.is-small
                font-awesome-icon(:icon="['fas', 'angle-down']")
          #dropdown-menu.dropdown-menu(role="menu")
            .dropdown-content
              router-link.dropdown-item(to="/about") 關於我們
              router-link.dropdown-item(to="/products") 產品列表
              router-link.dropdown-item(to="/shopcart") 購物車
              router-link.dropdown-item(to="/orders") 我的訂單
              hr.dropdown-divider
              router-link.dropdown-item(v-if="hasLogin" to="/admin") 去後台
              router-link.dropdown-item(v-if="!hasLogin" to="/login") 登入
              router-link.dropdown-item(v-else to="/logout") 登出
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      drop: false,
    };
  },
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin',
      sticky: 'sticky',
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
$goldyellow: #986602

*
  font-family: 'Noto Sans TC', sans serif
.is-fixed-top
  width: 100%
  position: fixed
  top: 0
  z-index: 5
.hero-head
  .router-link-exact-active:not(.logo)
    color: $goldyellow
  .column
    padding: 0 0.75rem
.logo
  font-family: 'Diplomata', 'Lobster', sans-serif
.navbar-item
  padding: 0 0.75rem
  color: $navyblue
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
.dropdown-item
  padding: 0.375rem 3rem
</style>
