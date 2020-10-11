<template lang="pug">
  section
    .container
      .event
        .date.tags.has-addons
          span.year.tag 2020
          span.month.tag.is-cus-primary 08
        .box(data-aos="fade-up-right")
          article.media
            .media-content.has-text-left
              .content
                p.subtitle.has-text-weight-bold 全球市佔率前 5%
                p.is-marginless GAGU 營運 2 個月，傢俱全球銷售量來到 100 萬件，變成全球市佔率前 5% 的傢俱大廠
      .event
        .date.tags.has-addons
          span.year.tag 2020
          span.month.tag.is-cus-primary 07
        .box(data-aos="fade-up-left")
          article.media
            .media-content
              .content.has-text-left
                p.subtitle.has-text-weight-bold 榮獲台灣 10 大創意傢俱
                p.is-marginless GAGU 傢俱參加台灣粉紅點設計大獎，以創新的傢俱設計與獨特的配色，榮獲粉紅點設計大獎前 10 大創意傢俱
                p.is-marginless 由資深設計師王小明，傢俱界設計大佬陳阿華與資深媒體人何老師所組成的評審團隊給予 GAGU 極高的評價。
                p.is-marginless 資深設計師王小明說：「青春是一個普通的名稱，它是幸福美好的，但它也是充滿著艱苦的磨煉。這似乎解答了
                p.is-marginless 我的疑惑。可是，即使是這樣，GAGU 傢俱的出現仍然代表了一定的意義。」，傢俱界設計大佬陳阿華：「
                p.is-marginless 我們需要淘汰舊有的觀念，世界上若沒有 GAGU 的傢俱，對於人類的改變可想而知。」
      .event
        .date.tags.has-addons
        .box(data-aos="fade-up-right")
          article.media
            .media-content.has-text-left
              .content
                p.subtitle.has-text-weight-bold 通過 SGS 檢驗合格
                p.is-marginless GAGU 的產品，每一樣都有經過 SGS 檢驗，合格才會上架販售，我們賣得安心你們也用的安心
      .event
        .date.tags.has-addons
        .box(data-aos="fade-left")
          article.media
            .media-content
              .content.has-text-left
                p.subtitle.has-text-weight-bold  GAGU 理念
                p.is-marginless 創辦人對於傢俱有非常吹毛求疵的要求，傢俱是選用頂級台灣檜木製成，只使用活超過 100 年的台灣深山檜木
                p.is-marginless 檜木散發出來的香氣更是無法言喻的美妙。木材含有油份、木理通直、木肌稍粗。邊材為黃白色，邊、心材區分
                p.is-marginless 明顯，年輪明顯細密、機械性質極強、乾燥性良好，收縮率小、木質強韌、耐久性高、對菌類及蟲害抵抗力強。
      .event
        .date.tags.has-addons
          span.year.tag 2020
          span.month.tag.is-cus-primary 06
        .box(data-aos="fade-up-right")
          article.media
            .media-content
              .content.has-text-left
                p.subtitle.has-text-weight-bold  GAGU 誕生
                p.is-marginless GAGU 誕生於 2020 年 6 月，因為不知道要賣什麼又想裝潢家裡，所以選擇賣傢俱，名稱來自於韓文的傢俱。

    .in_right
      img(src="https://images.unsplash.com/photo-1591822459440-5db10556435a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80")
</template>
<script>
export default {
  name: 'About',
};
</script>
<style lang="sass" scoped>
$navyblue: #333D51
$lightgray: #F4F3EA

@mixin xl()
  @media screen and (min-width: 1550px)
    @content
@mixin lg()
  @media screen and (min-width: 1280px)
    @content
@mixin sm()
  @media screen and (max-width: 1024px)
    @content
@mixin xs()
  @media screen and (max-width: 560px)
    @content
@mixin mobile()
  @media screen and (max-width: 380px)
    @content
body
  overflow-x: hidden
.container
  display: flex
  flex-direction: column
  justify-content: center
.event
  box-sizing: border-box
  width: 46%
  padding: 1% 0
  margin: 1% 0
  position: relative
  display: flex
  flex-direction: column
  +sm
    // display: block
  +xs
    display: block
    width: 90%
  +mobile
    margin: .5em auto
    width: 90%
  &:nth-of-type(odd)
    align-self: flex-start
    align-items: flex-end
    .date
      &::before
        content: ''
        position: absolute
        right: -10%
        // top: -5%
        height: 150%
        border: 1px solid #888
        z-index: -10
        +sm
          // border: 0
    .box
      display: flex
      justify-content: flex-end
  &:nth-of-type(even)
    align-self: flex-end
    +sm
      // align-self: flex-start
      .date
        &::before
          left: -8% !important
          // right: -10% !important
          height: 150% !important
    .date
      &::before
        content: ''
        position: absolute
        left: -8%
        height: 150%
        border: 1px solid #888
        z-index: -10
        +xl
          left: -7.9%
        +lg
          left: -7.9%
        +xs
          left: -8.5%
        +mobile
          left: -8.5%
.month
  background: $navyblue
  color: $lightgray
.in_right
  position: absolute
  right: 0
  top: 0
  z-index: -20
  img
    position: relative
    z-index: -21
  &::before
    content: ''
    width: 100%
    height: 100%
    right: 0
    bottom: 0
    position: absolute
    background: linear-gradient(90deg, #fff, transparent)
.in_right
  position: absolute
  right: 0
  top: 0
  z-index: -20
  img
    position: relative
    z-index: -21
  &::before
    content: ''
    width: 100%
    height: 100%
    right: 0
    bottom: 0
    position: absolute
    background: linear-gradient(90deg, #fff, transparent)
.month
  background: $navyblue
  color: $lightgray
.in_right
  position: absolute
  right: 0
  top: 0
  z-index: -20
  img
    position: relative
    z-index: -21
  &::before
    content: ''
    width: 100%
    height: 100%
    right: 0
    bottom: 0
    position: absolute
    background: linear-gradient(90deg, #fff, transparent)
</style>
