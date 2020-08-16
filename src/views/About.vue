<template lang="pug">
  section.body
    .container
      .event
        .date.tags.has-addons
          span.year.tag 2020
          span.month.tag.is-cus-primary 06
        .card
          .card-content
            header.card-header
              p GAGU 誕生

</template>
<script>
export default {
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
