<template lang="pug">
  section.hero-body.pt-5
    .container
      .columns.is-centered
        .column.is-two-thirds
          .has-text-success.is-size-3.has-text-weight-bold(
            data-aos="fade-down"
            data-aos-delay="500"
          ) 付款成功
          .custom__icon.icon__order--success.svg.inlinesvg
            svg(
              xmlns="http://www.w3.org/2000/svg"
              width="36px"
              height="36px"
            )
              g(
                fill="none"
                stroke="#48c774"
                stroke-width="2"
              )
                circle(
                  cx="18"
                  cy="18"
                  r="17"
                  style="stroke-dasharray:240px, 240px; stroke-dashoffset: 480px;"
                )
                path(
                  d="M6.417,18.778l7.93,7.909l15.444-15.393"
                  style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0px;"
                )
          Order(
            data-aos="fade-in-up"
            data-aos-delay="1500"
          )
          router-link.my-5.button.is-primary(
              to="/products/"
              data-aos="fade-in-up"
            ) 再去購物
</template>
<script>
import Order from '@/components/Order.vue';

export default {
  name: 'PaySuccess',
  components: {
    Order,
  },
};
</script>
<style lang="sass" scoped>

  @keyframes checkmark
    0%
      stroke-dashoffset: 50px
    100%
      stroke-dashoffset: 0

  @keyframes checkmark-circle
    0%
      stroke-dashoffset: 240px
    100%
      stroke-dashoffset: 480px

  .inlinesvg svg
    display: inline
  .icon__order--success svg path
    animation: checkmark 0.25s ease-in-out 0.7s backwards
    animation-delay: 1.6s

  .icon__order--success svg circle
    animation: checkmark-circle 0.6s ease-in-out backwards
    animation-delay: 1s
</style>
