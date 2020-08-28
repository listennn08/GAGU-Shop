<template lang="pug">
  section
    .hero-body
      .container
        .columns.is-centered
          .column.is-two-thirds
            Steps
            Order
            router-link.my-5.button.is-primary(
              v-if="currentStep === 3"
              to="/products/"
            ) 再去購物
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
