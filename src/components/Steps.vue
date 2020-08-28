<template lang="pug">
  .steps
    .step-item(
      v-for="step in steps"
      :key="step.no"
      :class="inStep(step.no)"
    )
      .step-marker {{ step.no }}
      .step-details
        p.step-title {{ step.text }}
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Steps',
  computed: {
    ...mapGetters(['currentStep']),
    inStep() {
      return (index) => (this.currentStep >= index
        ? 'is-active is-success'
        : '');
    },
  },
  data() {
    return {
      steps: [
        {
          no: 1,
          text: '填寫訂單',
        },
        {
          no: 2,
          text: '訂單確認',
        },
        {
          no: 3,
          text: '確認付款',
        },
      ],
    };
  },
};
</script>
