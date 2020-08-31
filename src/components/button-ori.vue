<template lang="pug">
.container
  .button(@click="getposition")
    .pool(:style="{ top: y + 'px', left: x + 'px' }" :class="{show:show}")
    p Button
</template>

<script>
export default {
  data () {
    return {
      infos: [],
      currentPage: 1,
      pagination: '',
      x: '',
      y: '',
      show: false
    }
  },
  methods: {
    getposition (e) {
      this.x = e.clientX - e.target.getBoundingClientRect().left
      this.y = e.clientY - e.target.getBoundingClientRect().top
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 500)
    }
  }
}
</script>
