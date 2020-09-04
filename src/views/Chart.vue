<template lang="pug">
#show
  //- m-chart(
  //-   :width="400",
  //-   :height="300",
  //-   chartStyle="barchart",
  //-   :detail="boxs",
  //-   :colors="color",
  //-   :gridScale="5"
  //-   label
  //- )
  //- m-chart(
  //-   :width="400",
  //-   :height="300",
  //-   chartStyle="piechart",
  //-   :detail="boxs",
  //-   :doughnutHoleSize="0.5",
  //-   :colors="color",
  //-   textcolor="white",
  //-   label
  //- )
  //- m-chart(
  //-   :width="400",
  //-   :height="300",
  //-   chartStyle="linechart",
  //-   :detail="datas",
  //-   :colors="color",
  //-   label,
  //-   :gridScale="50"
  //- )
  test(
    :width="400",
    :height="300",
    chartName="bar",
    :detail="asd",
    :feilds="feilds"
  )

</template>
<script>
import test from '../components/test'
export default {
  components: {
    test
  },
  data () {
    return {
      boxs: [
        { name: '雞排', value: 10 },
        { name: '飲料', value: 15 },
        { name: '娛樂', value: 2 },
        { name: '討債', value: 8 }
      ],
      color: ['red', 'blue', 'green', 'black', '#EAE6DA', '#F7F6EE'],
      asd: [
        {
          name: '雞排',
          value: [50, 100, 150, 200, 250]
        },
        {
          name: '珍奶',
          value: [500, 250, 200, 150, 100]
        }
      ],
      feilds: ['我', '是', '大', '帥', '哥']
    }
  }
}
</script>

<style lang="scss" scoped>
#show {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>
