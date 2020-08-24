<template lang="pug">
  #btn
    .ripple Button
</template>

<style lang="scss">
  #btn{
    width: 160px;
    height: 50px;
    background: green;
    border-radius: 30px;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    font-family: 'Noto Sans TC', sans-serif;
    color: white;
    letter-spacing: 2px;
    position: relative;
    &:hover{
      background: rgb(75, 150, 75);
    }
    .ripple{
      position: relative;
      overflow: hidden;
      &::after{
        content: '';
      // display: block;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 30px;
      background: red;
      width: 100%;
      height: 100%;
      }
    }
  }
</style>
