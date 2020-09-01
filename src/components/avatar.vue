<template lang="pug">
  #avatar
    .dropzone-area(
      v-if="!image"
      drag-over="handleDragOver"
      @dragenter="dragging=true"
      @dragleave="dragging=false")
      .dropzone-text
        span(class="dropzone-title") 拖曳或是選取圖片
        span(class="dropzone-info" v-if="help") help
      input(type="file" @change="onFileChange")
    .dropzone-preview
      img(:src="image")
      button(@click="removeImage" v-if="image") Remove
</template>

<script>
export default {
  data () {
    return {
      image: '',
      dragging: false
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
    },
    removeImage: function (e) {
      this.image = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.dropzone-area {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
    border: 2px dashed #CBCBCB;
    &:hover {
        border: 2px dashed #2E94C4;
        .dropzone-title {
          color: #1975A0;
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
    width: 80%;
    position: relative;
    &:hover .dropzone-button {
        display: block;
    }
    img {
      display: block;
      height: auto;
      max-width: 100%;
    }
}
</style>
