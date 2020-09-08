<template lang="pug">
  #avatar
    .dropzone-preview(v-if="image")
      img(:src="image")
      //- button(@click="removeImage" v-if="image") Remove
    .dropzone-area(
      drag-over="handleDragOver"
      @dragenter="dragging=true"
      @dragleave="dragging=false"
      :class="{addBorder: !image}")
      .imgbg.bg-beige(v-if="!image")
        img(:src="imgSrc").bgImg
      .dropzone-text
        span(class="dropzone-title")
        span(class="dropzone-info" v-if="help") help
      input(type="file" @change="onFileChange")
</template>

<script>
export default {
  data () {
    return {
      image: '',
      dragging: false,
      imgSrc: './images/avatar-01.svg'
    }
  },
  methods: {
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      const reader = new FileReader()
      const vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
    // removeImage: function (e) {
    //   this.image = ''
    // }
  }
}
</script>

<style lang="scss" scoped>
#avatar{
  position: relative;
}

.addBorder{
  border:2px dashed #CBCBCB !important;
}

.dropzone-area {
    width: 200px;
    height: 200px;
    border-radius: 20px;
    position: absolute;
    // border: 2px dashed #CBCBCB;
    cursor: pointer;
    &:hover {
      // border: 2px dashed #2E94C4;
      .dropzone-title {
        color: #1975A0;
      }
      &::after{
        content:'拖曳或是選取圖片';
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width:100%;
        height:100%;
        pointer-events: none;
        backdrop-filter: brightness(50%);
        color: white;
        border-radius: 20px;
      }
    }
}
.dropzone-area input {
    position: absolute;
    cursor: pointer;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
.imgbg{
  position: absolute;
  width: 100%;
  height:100%;
  border-radius:20px;
}
.dropzone-text {
    position: absolute;
    top: 50%;
    text-align: center;
    transform: translate(0, -50%);
    width: 100%;
    span {
        display: block;
        font-family: Arial, Helvetica;
        line-height: 1.9;
    }
}
.dropzone-title {
    font-size: 13px;
    color: #787878;
    letter-spacing: 0.4px;
}
.dropzone-info {
    font-size: 13px;
    font-size: 0.8125rem;
    color: #A8A8A8;
    letter-spacing: 0.4px;
}
.dropzone-button {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
}
.dropzone-preview {
    width: 200px;
    height: 200px;
    border-radius: 20px;
    position: absolute;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
}
</style>
