<template lang="pug">
  footer.footer
    .container
      .content.has-text-centered
        p
          | &copy; 2020 | &nbsp;
          small GAGU Shop
          a.mx-1(href='https://github.com/listennn08')
              font-awesome-icon(:icon="['fab', 'instagram']")
          a.mx-1(href='https://github.com/listennn08')
              font-awesome-icon(:icon="['fab', 'facebook']")
          a.mx-1(href='https://github.com/listennn08')
            font-awesome-icon(:icon="['fab', 'github']")
</template>
<script>
export default {
  name: 'Footer',
};
</script>
