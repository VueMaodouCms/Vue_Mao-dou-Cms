<template lang="pug">
  #avatar
    label#circle(for="input") 請選擇檔案
      img(:src="image")
    input#input(type="file" @change="onFileChange")
</template>

<script>
export default {
  data () {
    return {
      image: null
    }
  },
  methods: {
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
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
#circle{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  color: gray;
}
#input{
  display: none;
}
img{
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
