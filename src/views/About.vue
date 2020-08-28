<template lang="pug">
  section.section
    .container
      .event
        .date.tags.has-addons
          span.year.tag 2020
          span.month.tag.is-cus-primary 06
        .box
          article.media
            .media-content
              .content
                p  GAGU 誕生
                p GAGU 誕生於 2020 年 6 月，因為不知道要賣什麼又想裝潢家裡，
                  | 所以選擇賣傢俱，名稱來自於韓文的傢俱。
</template>
<script>
export default {
  name: 'About',
};
</script>
<style lang="sass" scoped>
$navyblue: #333D51
$lightgray: #F4F3EA
.container
  display: flex
  flex-direction: columns
  justify-content: flex-start
.event
  padding: 1%
  margin: 1%
  position: relative
.date
  &::before
    content: ''
    position: absolute
    left: -5px
    top: 0
    height: 100%
    border: 1px solid #888
.month
  background: $navyblue
  color: $lightgray
</style>
