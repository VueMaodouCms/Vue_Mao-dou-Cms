<template lang="pug">
.chart
  canvas(
    :id="chartStyle ? chartStyle : barchart",
    :width="width ? width : 400",
    :height="height ? height : 300"
  )
  div(:id="chartStyle ? chartStyle + 'label' : barchart + 'label'", v-if="label")
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number,
    chartStyle: String,
    detail: Array,
    label: Boolean,
    doughnutHoleSize: Number,
    colors: Array,
    textcolor: String,
    gridScale: Number,
    gridColor: String
  },
  methods: {
    drawLine (ctx, startX, startY, endX, endY, color) {
      ctx.save()
      ctx.strokeStyle = color
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
      ctx.restore()
    },
    drawBar (ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
      ctx.save()
      ctx.fillStyle = color
      ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height)
      ctx.restore()
    },
    drawPieSlice (ctx, centerX, centerY, radius, startAngle, endAngle, color) {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()
    },
    PieChart (options) {
      let totalValue = 0
      let colorIndex = 0
      for (const categ of options.data) {
        totalValue += categ.value
      }

      let startAngle = (-90 * Math.PI) / 180
      for (const categ of options.data) {
        const sliceAngle = (2 * Math.PI * categ.value) / totalValue
        const pieRadius = Math.min(
          options.canvas.width / 2,
          options.canvas.height / 2
        )
        this.drawPieSlice(
          options.ctx,
          options.canvas.width / 2,
          options.canvas.height / 2,
          pieRadius,
          startAngle,
          startAngle + sliceAngle,
          options.colors[colorIndex % options.colors.length]
        )
        // 新增 數值%
        let labelX =
          options.canvas.width / 2 +
          (pieRadius / 2 + 30) * Math.cos(startAngle + sliceAngle / 2)
        let labelY =
          options.canvas.height / 2 +
          (pieRadius / 2 + 30) * Math.sin(startAngle + sliceAngle / 2)
        if (options.doughnutHoleSize) {
          const offset = (pieRadius * options.doughnutHoleSize) / 2
          labelX =
            options.canvas.width / 2 +
            (offset + pieRadius / 2) * Math.cos(startAngle + sliceAngle / 2)
          labelY =
            options.canvas.height / 2 +
            (offset + pieRadius / 2) * Math.sin(startAngle + sliceAngle / 2)
        }
        const labelText = Math.round((100 * categ.value) / totalValue)
        options.ctx.fillStyle = 'white'
        options.ctx.font = 'bold 20px Arial'
        options.ctx.textAlign = 'center'
        options.ctx.fillText(labelText + '%', labelX, labelY + 10)

        startAngle += sliceAngle
        colorIndex++
      }
      if (options.doughnutHoleSize) {
        this.drawPieSlice(
          options.ctx,
          options.canvas.width / 2,
          options.canvas.height / 2,
          options.doughnutHoleSize *
            Math.min(options.canvas.width / 2, options.canvas.height / 2),
          0,
          2 * Math.PI,
          this.textcolor
        )
      }
      if (options.legend !== null) {
        colorIndex = 0
        let legendHTML = ''
        for (const categ of options.data) {
          legendHTML +=
            "<div><span style='display:inline-block;width:20px;background-color:" +
            options.colors[colorIndex++] +
            ";'>&nbsp;</span> " +
            categ.name +
            '</div>'
        }
        options.legend.innerHTML = legendHTML
      }
    },
    BarChart (options) {
      let maxValue = 0
      for (const categ of options.data) {
        maxValue = Math.max(maxValue, categ.value)
      }
      const canvasActualHeight = options.canvas.height - options.padding * 2
      const canvasActualWidth = options.canvas.width - options.padding * 2

      // drawing the grid lines
      let gridValue = options.gridScale
      while (gridValue <= maxValue) {
        const gridY =
          canvasActualHeight * (1 - gridValue / maxValue) + options.padding
        this.drawLine(
          options.ctx,
          options.padding,
          gridY,
          options.canvas.width - options.padding,
          gridY,
          options.gridColor
        )

        // writing grid markers
        options.ctx.save()
        options.ctx.fillStyle = 'black'
        options.ctx.font = 'bold 14px 微軟正黑體'
        options.ctx.textAlign = 'center'
        options.ctx.fillText(gridValue, 12, gridY + 2)
        options.ctx.restore()

        gridValue += options.gridScale
      }

      // drawing the bars
      let barIndex = 0
      const result = []
      for (const i of options.data) {
        result.push(i)
      }
      for (let i = 1; i < options.data.length; i++) {
        result.splice(i * 2 - 1, 0, { name: '', value: 0 })
      }
      const barSize = (canvasActualWidth - options.padding) / result.length
      for (const categ of result) {
        const barHeight = Math.round(
          (canvasActualHeight * categ.value) / maxValue
        )
        this.drawBar(
          options.ctx,
          options.padding + barIndex * barSize + 10,
          options.canvas.height - barHeight - options.padding,
          barSize,
          barHeight,
          options.colors[barIndex % options.colors.length]
        )

        barIndex++
      }

      options.ctx.beginPath()
      options.ctx.moveTo(options.padding, options.padding)
      options.ctx.lineTo(options.padding, options.padding + canvasActualHeight)
      options.ctx.moveTo(options.padding, options.padding + canvasActualHeight)
      options.ctx.lineTo(options.padding + canvasActualWidth, options.padding + canvasActualHeight)
      options.ctx.closePath()
      options.ctx.stroke()

      barIndex = 0
      let legendHTML = ''
      for (const categ of options.data) {
        legendHTML +=
          "<div><span style='display:inline-block;width:20px;background-color:" +
          options.colors[barIndex++] +
          ";'>&nbsp;</span> " +
          categ.name +
          '</div>'
      }
      options.legend.innerHTML = legendHTML
    },
    LineChart (options) {
      let maxValue = 0
      for (const i of options.data) {
        for (const j in i.value) {
          maxValue = Math.max(maxValue, i.value[j])
        }
      }
      const canvasActualHeight = options.canvas.height - options.padding * 2
      const canvasActualWidth = options.canvas.width - options.padding * 2

      const scale = canvasActualHeight / maxValue
      // y 座標
      let gridYValue = 0
      while (gridYValue <= maxValue) {
        const gridY = (maxValue > canvasActualHeight)
          ? canvasActualHeight - gridYValue * scale + options.padding : canvasActualHeight - gridYValue + options.padding
        this.drawLine(
          options.ctx,
          options.padding,
          gridY,
          options.canvas.width - options.padding,
          gridY,
          options.gridColor
        )

        // writing grid markers
        options.ctx.save()
        options.ctx.fillStyle = 'black'
        options.ctx.textAlign = 'center'
        options.ctx.font = 'bold 14px 微軟正黑體'
        options.ctx.fillText(gridYValue, 12, gridY + 2)
        options.ctx.restore()

        gridYValue += options.gridScale
      }
      // x 座標
      const valueField = Object.keys(options.data[0].value)
      for (const i in valueField) {
        options.ctx.font = 'bold 14px 微軟正黑體'
        options.ctx.textAlign = 'center'
        options.ctx.fillText(valueField[i], canvasActualWidth / valueField.length * i + options.padding * 2, options.canvas.height)
      }

      // 線連結
      for (const i of options.data) {
        for (let j = 0; j < Object.keys(i.value).length; j++) {
          // 畫直線
          this.drawLine(
            options.ctx,
            canvasActualWidth / valueField.length * (j + 1) - 10,
            (maxValue > canvasActualHeight) ? canvasActualHeight + options.padding - i.value[Object.keys(i.value)[j]] * scale : canvasActualHeight + options.padding - i.value[Object.keys(i.value)[j]],
            canvasActualWidth / valueField.length * (j + 2) - 10,
            (maxValue > canvasActualHeight) ? canvasActualHeight + options.padding - i.value[Object.keys(i.value)[j + 1]] * scale : canvasActualHeight + options.padding - i.value[Object.keys(i.value)[j + 1]],
            options.colors[options.data.indexOf(i)]
          )
          // 畫圈圈
          options.ctx.fillStyle = '#60827B'
          options.ctx.beginPath()
          options.ctx.arc(canvasActualWidth / valueField.length * (j + 1) - 10, (maxValue > canvasActualHeight) ? canvasActualHeight + options.padding - i.value[Object.keys(i.value)[j]] * scale : canvasActualHeight + options.padding - i.value[Object.keys(i.value)[j]], 5, 0, Math.PI * 2)
          options.ctx.fill()
        }
      }

      options.ctx.beginPath()
      options.ctx.moveTo(options.padding, options.padding)
      options.ctx.lineTo(options.padding, options.padding + canvasActualHeight)
      options.ctx.moveTo(options.padding, options.padding + canvasActualHeight)
      options.ctx.lineTo(options.padding + canvasActualWidth, options.padding + canvasActualHeight)
      options.ctx.closePath()
      options.ctx.stroke()

      let lineIndex = 0
      let legendHTML = ''
      for (const categ of options.data) {
        legendHTML +=
          "<div><span style='display:inline-block;width:20px;background-color:" +
          options.colors[lineIndex++] +
          ";'>&nbsp;</span> " +
          categ.name +
          '</div>'
      }
      options.legend.innerHTML = legendHTML
    }
  },
  mounted () {
    const barcanvas = document.getElementById('barchart')
    const piecanvas = document.getElementById('piechart')
    const linecanvas = document.getElementById('linechart')
    const barLegend = document.getElementById('barchartlabel')
    const pieLegend = document.getElementById('piechartlabel')
    const lineLegend = document.getElementById('linechartlabel')
    if (this.chartStyle === 'piechart') {
      this.PieChart({
        canvas: piecanvas,
        data: this.detail,
        colors: this.colors
          ? this.colors
          : ['#60827B', '#84A295', '#B7CDC2', '#EFDB96', '#EAE6DA', '#F7F6EE'],
        ctx: piecanvas.getContext('2d'),
        doughnutHoleSize: this.doughnutHoleSize,
        legend: pieLegend
      })
    } else if (this.chartStyle === 'barchart') {
      this.BarChart({
        canvas: barcanvas,
        padding: 30,
        gridScale: this.gridScale ? this.gridScale : 2,
        gridColor: this.gridColor ? this.gridColor : 'gray',
        data: this.detail,
        colors: this.colors
          ? this.colors
          : ['#60827B', '#84A295', '#B7CDC2', '#EFDB96', '#EAE6DA', '#F7F6EE'],
        ctx: barcanvas.getContext('2d'),
        legend: barLegend
      })
    } else if (this.chartStyle === 'linechart') {
      this.LineChart({
        canvas: linecanvas,
        padding: 30,
        gridScale: this.gridScale ? this.gridScale : 2,
        gridColor: this.gridColor ? this.gridColor : 'gray',
        data: this.detail,
        colors: this.colors
          ? this.colors
          : ['#60827B', '#84A295', '#B7CDC2', '#EFDB96', '#EAE6DA', '#F7F6EE'],
        ctx: linecanvas.getContext('2d'),
        legend: lineLegend
      })
    }
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
