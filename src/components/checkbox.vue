<template lang="pug">
  #checkbox
    input(type="checkbox" mouseover="hover")
</template>

<script>
export default {
  methods: {
    hover () {

    }
  }
}
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');
  @font-face{
    font-family: 'check';
    src: url('/public/Inter-Light-slnt=0.ttf');
  }

  input[type=checkbox] {
  // margin-right: 5px;
  cursor: pointer;
  font-size: 14px;
  width: 14px;
  height: 12px;
  position: relative;
}

input[type=checkbox]::after {
  content: " ";
  position: absolute;
  width: 6px;
  height: 12px;
  top: 0;
  background-color: #eee;
  border:1px solid #777;
  color: #fff;
  display: inline-block;
  visibility: visible;
  padding: 0px 3px;
  border-radius: 3px;
}

input[type=checkbox]:hover::after {
  content: " ";
  position: absolute;
  width: 6px;
  height: 12px;
  top: 0;
  background-color: #eee;
  border:1px solid #777;
  box-shadow:0 0 1px 2px rgba(96, 130, 123,0.4);
  color: #fff;
  display: inline-block;
  visibility: visible;
  padding: 0px 3px;
  border-radius: 3px;
}

input[type=checkbox]:checked::after {
  // content: "v";
  content: "✓";
  // font-family: 'Inter', sans-serif;
  font-family: 'check';
  // font-family: Arial;
  font-size: 8px;
  line-height: 12px;
  position: absolute;
  width: 6px;
  height: 12px;
  top: 0;
  background-color: #84A295;
  border:1px solid #777;
  color: #fff;
  display: inline-block;
  visibility: visible;
  border-radius: 3px;
}

</style>
