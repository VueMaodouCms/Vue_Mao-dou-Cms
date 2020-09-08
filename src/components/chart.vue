<template lang="pug">
.chart
  canvas(:id="chartName", :width="width", :height="height")
  .label(v-if="stack && chartName === 'bar'")
    .item(
      v-for="(feild, index) in feilds",
      :key="index",
      :style="{ '--bgcolor': feild.color ? feild.color : defaultColor[index] }"
    )
      | {{ feild.label }}
  .label(v-else)
    .item(
      v-for="(data, index) in detail",
      :key="index",
      :style="{ '--bgcolor': data.color ? data.color : defaultColor[index] }"
    )
      | {{ data.name }}
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
    // 資料標籤
    feilds: Array,
    // 是否顯示圖例，預設值為否
    label: Boolean,
    // 文字顏色
    textcolor: { type: String, default: 'black' },
    // 格線間距
    gridScale: { type: Number, default: 50 },
    // 格線顏色
    gridColor: { type: String, default: 'rgba(0,0,0,0.1)' },
    // 坐標軸顏色
    axisColor: { type: String, default: 'black' },
    // 內距
    padding: { type: Number, default: 30 },
    // 長條圖是否改為水平
    horizon: Boolean,
    // 長條圖是否改為疊加
    stack: Boolean,
    // 圓餅圖是否為中空
    hollow: Boolean
  },
  data () {
    return {
      defaultColor: [
        '#60827B',
        '#EFDB96',
        '#B7CDC2',
        '#84A295',
        '#EAE6DA',
        '#F7F6EE'
      ]
    }
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
    // 畫圈圈
    drawPie (ctx, centerX, centerY, radius, startAngle, endAngle, color) {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      // 中心 x,中心 y,半徑,起始角度,結束角度
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()
    },
    // 畫長條圖
    drawBarChart (options) {
      // 先計算出此資料最大數值為多少
      let maxValue = 0
      if (this.stack && !this.horizon) {
        for (const i of this.detail) {
          let stackValue = 0
          for (const j of i.value) {
            stackValue += j
          }
          maxValue = Math.max(maxValue, stackValue)
        }
      } else {
        for (const i of this.detail) {
          // 兩者比較取出比較大的
          for (const j of i.value) {
            maxValue = Math.max(maxValue, j)
          }
        }
      }
      // --------------------因為要有數值標示，所以需要壓縮圖表顯示空間--------------------
      // 實際圖表高度
      const canvasActualHeight = options.canvas.height - options.padding * 2
      // 實際圖表寬度
      const canvasActualWidth = options.canvas.width - options.padding * 2
      // 畫出水平長條圖
      if (this.horizon) {
        // --------------------畫出格線 X--------------------
        // 由設定的間距來畫數值的線
        let gridValueX = this.gridScale
        // 畫線直到接近最大高度
        while (gridValueX < maxValue) {
          // 設置每次畫線的 x 軸位置
          const gridX =
            canvasActualWidth * (gridValueX / maxValue) + options.padding
          this.drawLine(
            options.ctx,
            gridX,
            options.canvas.height - options.padding,
            gridX,
            options.padding,
            this.gridColor
          )
          // 標示出格線上的數值
          this.drawText(
            options.ctx,
            gridValueX,
            gridX,
            options.canvas.height - 15,
            this.textcolor
          )
          gridValueX += this.gridScale
        }
        // --------------------畫出格線 Y--------------------
        let gridValueY = canvasActualHeight / (this.feilds.length + 1)
        for (const i of this.feilds) {
          // 標示出格線上的數值
          this.drawText(
            options.ctx,
            i.label,
            15,
            gridValueY + options.padding,
            this.textcolor
          )
          this.drawLine(
            options.ctx,
            options.padding,
            gridValueY + options.padding,
            options.canvas.width - options.padding,
            gridValueY + options.padding,
            this.gridColor
          )
          gridValueY += canvasActualHeight / (this.feilds.length + 1)
        }
        // --------------------畫出長方形--------------------
        // 長方形寬度
        const barSize =
          canvasActualHeight /
          ((this.detail.length + 2) * (this.feilds.length + 1))
        for (const i in this.feilds) {
          // 畫出各類別長方形
          for (const j in this.detail) {
            // 計算各類別的值
            const barHeight = Math.round(
              (canvasActualWidth * this.detail[j].value[i]) / maxValue
            )
            this.drawBar(
              options.ctx,
              options.padding,
              options.padding +
                barSize * (parseInt(j) + 1) +
                (i * canvasActualHeight) / (this.feilds.length + 1) +
                canvasActualHeight / (this.feilds.length + 1) / 2,
              barHeight - barSize / 2,
              barSize,
              this.detail[j].color ? this.detail[j].color : this.defaultColor[j]
            )
            this.drawPie(
              options.ctx,
              options.padding + barHeight - barSize / 2,
              options.padding +
                barSize * (parseInt(j) + 1) +
                (i * canvasActualHeight) / (this.feilds.length + 1) +
                canvasActualHeight / (this.feilds.length + 1) / 2 + barSize / 2,
              barSize / 2,
              0,
              2 * Math.PI,
              this.detail[j].color ? this.detail[j].color : this.defaultColor[j]
            )
          }
        }
      // 畫出疊加長條圖
      } else if (this.stack) {
        // --------------------畫出格線 Y--------------------
        // 由設定的間距來畫數值的線
        let gridValueY = this.gridScale
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
            this.gridColor
          )
          // 標示出格線上的數值
          this.drawText(options.ctx, gridValueY, 15, gridY + 5, this.textcolor)
          gridValueY += this.gridScale
        }
        // --------------------畫出格線 X--------------------
        let gridValueX = canvasActualWidth / (this.detail.length * 2 + 1)
        for (const i of this.detail) {
          // 標示出格線上的數值
          this.drawText(
            options.ctx,
            i.name,
            gridValueX + options.padding + canvasActualWidth / (this.detail.length * 2 + 1) / 2,
            options.padding + canvasActualHeight + 15,
            this.textcolor
          )
          gridValueX += canvasActualWidth / (this.detail.length * 2 + 1) * 2
        }
        // --------------------畫出長方形--------------------
        // 長方形寬度
        const barSize =
          canvasActualWidth /
          (this.detail.length * 2 + 1)
        for (const i in this.detail) {
          // 畫出各類別長方形
          let heightLevel = 0
          for (const j in this.feilds) {
            // 定義現在的高度
            // 計算各類別的值
            const barHeight = Math.round(
              (canvasActualHeight * this.detail[i].value[j]) / maxValue
            )
            this.drawBar(
              options.ctx,
              options.padding + barSize * (parseInt(i) * 2 + 1),
              options.canvas.height - barHeight - options.padding - heightLevel,
              barSize,
              barHeight,
              this.feilds[j].color ? this.feilds[j].color : this.defaultColor[i]
            )
            heightLevel += barHeight
          }
        }
      // 畫出預設長條圖
      } else {
        // --------------------畫出格線 Y--------------------
        // 由設定的間距來畫數值的線
        let gridValueY = this.gridScale
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
            this.gridColor
          )
          // 標示出格線上的數值
          this.drawText(options.ctx, gridValueY, 15, gridY + 5, this.textcolor)
          gridValueY += this.gridScale
        }
        // --------------------畫出格線 X--------------------
        let gridValueX = canvasActualWidth / (this.feilds.length + 1)
        for (const i of this.feilds) {
          // 標示出格線上的數值
          this.drawText(
            options.ctx,
            i.label,
            gridValueX + options.padding,
            options.padding + canvasActualHeight + 15,
            this.textcolor
          )
          this.drawLine(
            options.ctx,
            gridValueX + options.padding,
            options.canvas.height - options.padding,
            gridValueX + options.padding,
            options.padding,
            this.gridColor
          )
          gridValueX += canvasActualWidth / (this.feilds.length + 1)
        }
        // --------------------畫出長方形--------------------
        // 長方形寬度
        const barSize =
          canvasActualWidth /
          ((this.detail.length + 2) * (this.feilds.length + 1))
        for (const i in this.feilds) {
          // 畫出各類別長方形
          for (const j in this.detail) {
            // 計算各類別的值
            const barHeight = Math.round(
              (canvasActualHeight * this.detail[j].value[i]) / maxValue
            )
            this.drawBar(
              options.ctx,
              options.padding +
                barSize * (parseInt(j) + 1) +
                (i * canvasActualWidth) / (this.feilds.length + 1) +
                canvasActualWidth / (this.feilds.length + 1) / 2,
              options.canvas.height - barHeight - options.padding,
              barSize,
              barHeight,
              this.detail[j].color ? this.detail[j].color : this.defaultColor[j]
            )
          }
        }
      }
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
        this.axisColor
      )
    },
    // 畫圓餅圖
    drawPieChart (options) {
      let totalValue = 0
      // 計算總值
      for (const i of this.detail) {
        totalValue += i.value
      }
      // 以弧度計算 (Math.PI / 180) * deg = rad
      let startAngle = (-90 * Math.PI) / 180
      // 圖形半徑會以 canvas 的寬或高取最小值
      const pieRadius = Math.min(
        options.canvas.width / 2 - options.padding,
        options.canvas.height / 2 - options.padding
      )
      if (this.hollow) {
        for (const i in this.detail) {
          // 計算每個值所佔的角度
          const sliceAngle = (2 * Math.PI * this.detail[i].value) / totalValue
          this.drawPie(
            options.ctx,
            options.canvas.width / 2,
            options.canvas.height / 2,
            pieRadius,
            startAngle,
            startAngle + sliceAngle,
            this.detail[i].color ? this.detail[i].color : this.defaultColor[i]
          )
          this.drawText(
            options.ctx,
            Math.round((100 * this.detail[i].value) / totalValue) + '%',
            // 計算數值 x 位置
            options.canvas.width / 2 +
                (pieRadius * 3 / 4) * Math.cos(startAngle + sliceAngle / 2),
            // 計算數值 y 位置
            options.canvas.height / 2 +
                (pieRadius * 3 / 4) * Math.sin(startAngle + sliceAngle / 2),
            this.textcolor
          )
          startAngle += sliceAngle
        }
        this.drawPie(
          options.ctx,
          options.canvas.width / 2,
          options.canvas.height / 2,
          pieRadius * 0.5,
          0,
          Math.PI * 2,
          'white'
        )
      } else {
        for (const i in this.detail) {
          // 計算每個值所佔的角度
          const sliceAngle = (2 * Math.PI * this.detail[i].value) / totalValue
          this.drawPie(
            options.ctx,
            options.canvas.width / 2,
            options.canvas.height / 2,
            pieRadius,
            startAngle,
            startAngle + sliceAngle,
            this.detail[i].color ? this.detail[i].color : this.defaultColor[i]
          )
          this.drawText(
            options.ctx,
            Math.round((100 * this.detail[i].value) / totalValue) + '%',
            // 計算數值 x 位置
            options.canvas.width / 2 +
                (pieRadius / 2) * Math.cos(startAngle + sliceAngle / 2),
            // 計算數值 y 位置
            options.canvas.height / 2 +
                (pieRadius / 2) * Math.sin(startAngle + sliceAngle / 2),
            this.textcolor
          )
          startAngle += sliceAngle
        }
      }
    },
    // 畫折線圖
    drawLineChart (options) {
      // 先計算出此資料最大數值為多少
      let maxValue = 0
      for (const i of this.detail) {
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
      // --------------------畫出格線 Y--------------------
      // 由設定的間距來畫數值的線
      let gridValueY = this.gridScale
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
          this.gridColor
        )
        // 標示出格線上的數值
        this.drawText(options.ctx, gridValueY, 15, gridY + 5, this.textcolor)
        gridValueY += this.gridScale
      }
      // --------------------畫出格線 X--------------------
      let gridValueX = canvasActualWidth / (this.feilds.length + 1)
      for (const i of this.feilds) {
        this.drawText(
          options.ctx,
          i.label,
          gridValueX + options.padding,
          options.padding + canvasActualHeight + 15,
          this.textcolor
        )
        this.drawLine(
          options.ctx,
          gridValueX + options.padding,
          options.canvas.height - options.padding,
          gridValueX + options.padding,
          options.padding,
          this.gridColor
        )
        gridValueX += canvasActualWidth / (this.feilds.length + 1)
      }
      // 畫折線
      for (const i in this.feilds) {
        for (const j in this.detail) {
          this.drawLine(
            options.ctx,
            options.padding +
              (canvasActualWidth / (this.feilds.length + 1)) *
                (parseInt(i) + 1),
            options.canvas.height -
              options.padding -
              (canvasActualHeight * this.detail[j].value[i]) / maxValue,
            options.padding +
              (canvasActualWidth / (this.feilds.length + 1)) *
                (parseInt(i) + 2),
            options.canvas.height -
              options.padding -
              (canvasActualHeight * this.detail[j].value[parseInt(i) + 1]) /
                maxValue,
            this.detail[j].color ? this.detail[j].color : this.defaultColor[j]
          )
          this.drawPie(
            options.ctx,
            options.padding +
              (canvasActualWidth / (this.feilds.length + 1)) *
                (parseInt(i) + 1),
            options.canvas.height -
              options.padding -
              (canvasActualHeight * this.detail[j].value[i]) / maxValue,
            8,
            0,
            2 * Math.PI,
            this.detail[j].color ? this.detail[j].color : this.defaultColor[j]
          )
        }
      }
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
        this.axisColor
      )
    }
  },
  mounted () {
    const canvas = document.getElementById(this.chartName)
    if (this.chartName === 'bar') {
      this.drawBarChart({
        canvas: canvas,
        padding: 30,
        ctx: canvas.getContext('2d')
      })
    } else if (this.chartName === 'pie') {
      this.drawPieChart({
        canvas: canvas,
        padding: 30,
        ctx: canvas.getContext('2d')
      })
    } else {
      this.drawLineChart({
        canvas: canvas,
        padding: 30,
        ctx: canvas.getContext('2d')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  flex: 1 0 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.label {
  display: flex;
  align-items: center;
  justify-content: center;
  .item {
    margin: 0 5px;
    text-indent: 1rem;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: var(--bgcolor);
      left: 0;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
