<template lang="pug">
  section
    .hero-body
      .container
        .columns.is-centered
          .column.is-two-thirds
            Order
</template>
<script>
import Order from '@/components/Order.vue';

export default {
  name: 'Payment',
  components: {
    Order,
  },
};
</script>
<style lang="sass" scoped>

</style>
