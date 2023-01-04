<script lang="ts" setup>
interface IProps {
  year?: number
  month?: number
  header: string
  animtaion?: string
}
withDefaults(defineProps<IProps>(), {
  animtaion: 'fade-up-right',
})
</script>
<template>
  <div class="event">
    <div class="date tags has-addons" v-show="year && month">
      <span class="year tag">{{ year }}</span>
      <span class="month tag is-cus-primary">{{
        month?.toString().padStart(2, '0')
      }}</span>
    </div>
    <div class="box" :data-aos="animtaion">
      <article class="media">
        <div class="media-content has-text-left">
          <div class="content">
            <p class="subtitle has-text-weight-bold">
              {{ header }}
            </p>
            <p class="is-marginless">
              <slot />
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.event {
  width: 46%;
  padding: 1rem 0;
  margin: 1rem 0;
  position: relative;
  display: flex;
  flex-direction: column;

  @include xs {
    display: block;
    width: 90%;
  }

  &:nth-of-type(odd) {
    align-self: flex-start;
    align-items: flex-end;
    .box {
      display: flex;
      justify-content: flex-end;
    }
  }
  &:nth-of-type(even) {
    align-self: flex-end;
    @include xs {
      align-self: flex-start;
    }
  }
}
.month {
  background: $navyblue;
  color: $lightgray;
}
</style>
