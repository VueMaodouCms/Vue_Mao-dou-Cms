<template lang="pug">
.show
  canvas(
    :id="chartName"
    :width="width"
    :height="height"
  )
  //- ul(v-if="label")
</template>

<script>
export default {
  props: {
    // 資料內容
    detail: Array,
    // 圖表形式
    chartName: { type: String, default: 'bar' },
    // 圖表寬度
    width: { type: Number, default: 400 },
    // 圖表高度
    height: { type: Number, default: 300 },
    // 數值標籤
    feilds: Array,
    // 是否顯示圖例，預設值為否
    label: Boolean,
    colors: Array,
    textcolor: String,
    gridScale: Number,
    gridColor: String
  },
  methods: {
    // 標示數值
    drawText (ctx, value, positionX, positionY, color) {
      ctx.save()
      ctx.fillStyle = color
      ctx.font = 'bold 12px 微軟正黑體'
      ctx.textAlign = 'center'
      // 文字內容、x 位置、y 位置
      ctx.fillText(value, positionX, positionY)
      ctx.restore()
    },
    // 畫直線
    drawLine (ctx, startX, startY, endX, endY, color) {
      // 保存起始條件
      ctx.save()
      // 設定勾勒圖形時用的顏色
      ctx.strokeStyle = color
      // 類似開始畫圖起手式
      ctx.beginPath()
      // 移動至開始位置
      ctx.moveTo(startX, startY)
      // 畫線至指定位置
      ctx.lineTo(endX, endY)
      // 填滿畫筆顏色
      ctx.stroke()
      // 回復至起始條件
      ctx.restore()
    },
    // 畫長方形
    drawBar (ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
      ctx.save()
      // 設定填滿圖形時用的顏色
      ctx.fillStyle = color
      // 設定 x 位置，y 位置，寬度，高度
      ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height)
      ctx.restore()
    },
    // 畫長條圖
    drawBarChart (options) {
      // 先計算出此資料最大數值為多少
      let maxValue = 0
      for (const i of options.data) {
        // 兩者比較取出比較大的
        for (const j of i.value) {
          maxValue = Math.max(maxValue, j)
        }
      }
      // --------------------因為要有數值標示，所以需要壓縮圖表顯示空間--------------------
      // 實際圖表高度
      const canvasActualHeight = options.canvas.height - options.padding * 2
      // 實際圖表寬度
      const canvasActualWidth = options.canvas.width - options.padding * 2
      // 畫出 y 軸的線
      this.drawLine(
        options.ctx,
        options.padding,
        options.padding,
        options.padding,
        options.padding + canvasActualHeight,
        options.axis
      )
      // 畫出 x 軸的線
      this.drawLine(
        options.ctx,
        options.padding,
        options.padding + canvasActualHeight,
        options.padding + canvasActualWidth,
        options.padding + canvasActualHeight,
        options.axisColor
      )
      // --------------------畫出格線 Y--------------------
      // 由設定的間距來畫數值的線
      let gridValueY = options.gridScale
      // 畫線直到接近最大高度
      while (gridValueY < maxValue) {
        // 設置每次畫線的 y 軸位置
        const gridY =
          canvasActualHeight * (1 - gridValueY / maxValue) + options.padding
        this.drawLine(
          options.ctx,
          options.padding,
          gridY,
          options.canvas.width - options.padding,
          gridY,
          options.gridColor
        )
        // 標示出格線上的數值
        this.drawText(
          options.ctx,
          gridValueY,
          15,
          gridY + 5,
          'green'
        )
        gridValueY += options.gridScale
      }
      // --------------------畫出格線 X--------------------
      let gridValueX = canvasActualWidth / (options.feilds.length + 1)
      for (const i of options.feilds) {
        this.drawText(
          options.ctx,
          i,
          gridValueX + options.padding,
          options.padding + canvasActualHeight + 18,
          'red'
        )
        this.drawLine(
          options.ctx,
          gridValueX + options.padding,
          options.canvas.height - options.padding,
          gridValueX + options.padding,
          options.padding,
          options.gridColor
        )
        gridValueX += canvasActualWidth / (options.feilds.length + 1)
      }
      // --------------------畫出長方形--------------------
      // 長方形寬度
      const barSize = canvasActualWidth / ((options.data.length + 2) * options.feilds.length)
      for (const i in options.feilds) {
        this.drawBar(
          options.ctx,
          options.padding + i * canvasActualWidth / options.feilds.length,
          options.padding,
          barSize,
          canvasActualHeight,
          'red'
        )
        for (const j in options.data) {
          const barHeight = Math.round(canvasActualHeight * options.data[j].value[i] / maxValue)
          this.drawBar(
            options.ctx,
            options.padding + barSize * j + i * canvasActualWidth / options.feilds.length,
            options.canvas.height - barHeight - options.padding,
            barSize,
            barHeight,
            options.colors[j]
          )
        }
        this.drawBar(
          options.ctx,
          options.padding + i * canvasActualWidth / options.feilds.length + barSize * options.data.length,
          options.padding,
          barSize,
          canvasActualHeight,
          'red'
        )
        // const barHeight = Math.round(
        //   (canvasActualHeight * categ.value) / maxValue
        // )
        // this.drawBar(
        //   options.ctx,
        //   options.padding + (barIndex * 2) * barSize + 10,
        //   options.canvas.height - barHeight - options.padding,
        //   barSize,
        //   barHeight,
        //   options.colors[barIndex]
        // )

        // this.drawBar(
        //   options.ctx,
        //   options.padding + (barIndex + 1) * barSize,
        //   options.canvas.height - barHeight - options.padding,
        //   barSize,
        //   barHeight,
        //   'transparent'
        // )
        // barIndex++
      }
    }
  },
  mounted () {
    const barcanvas = document.getElementById('bar')
    const barLabel = document.getElementById('barlabel')
    this.drawBarChart({
      canvas: barcanvas,
      padding: 30,
      gridScale: 50,
      gridColor: 'blue',
      axisColor: 'black',
      data: this.detail,
      colors: ['#60827B', '#84A295', '#B7CDC2', '#EFDB96', '#EAE6DA', '#F7F6EE'],
      ctx: barcanvas.getContext('2d'),
      legend: barLabel,
      feilds: this.feilds
    })
  }
}
</script>

<style lang="scss" scoped>
.chart {
  flex: 0 0 33%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
