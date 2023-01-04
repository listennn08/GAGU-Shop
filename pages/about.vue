<script lang="ts" setup>
import { timeline } from '~~/assets/about/about.json'
</script>

<template>
  <section class="static">
    <div class="container">
      <TimelineEvent
        v-for="obj in timeline"
        :year="obj.year"
        :month="obj.month"
        :header="obj.header"
        :animtaion="obj.animation"
      >
        {{ obj.content }}
      </TimelineEvent>
    </div>
    <div class="in_right">
      <img src="/img/photo-1591822459440-5db10556435a.jpg" alt="" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    right: 50%;
    top: 0;
    bottom: 0;
    border: 1px solid $navyblue;
    @include xs {
      border-color: transparent;
    }
  }
}

.in_right {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -20;
  & > img {
    height: 100vh;
    position: relative;
    z-index: -21;
  }
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    position: absolute;
    background: linear-gradient(90deg, #fff, transparent);
  }
}
</style>
