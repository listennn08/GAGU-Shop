<template lang="pug">
  section
    .hero-body
      .container
        .columns.is-centered
          .column.is-two-thirds
            Steps
            Order
</template>
<script>
import { mapGetters } from 'vuex';
import Steps from '@/components/Steps.vue';
import Order from '@/components/Order.vue';

export default {
  name: 'PayFlow',
  components: {
    Steps,
    Order,
  },
  computed: {
    ...mapGetters(['currentStep']),
  },
};
</script>
<style lang="sass" scoped>

</style>
