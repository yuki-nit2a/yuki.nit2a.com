import p5 from 'p5'
import Background from './background/background.js'

export default class Graphic
{
  draw()
  {
    this.canvas = new p5(this.getSketch(), document.body)

    $(window).on('resize', () => {
      this.canvas.resizeCanvas($(window).width(), $(window).height())
    })
  }

  getSketch()
  {
    return (p) => {
      p.setup = this.getSetup(p)
      p.draw = this.getDraw(p)
    }
  }

  getSetup(p)
  {
    return () => {
      const canvas = p.createCanvas($(window).width(), $(window).height(), p.WEBGL)
      canvas.parent('background')

      p.frameRate(60)
      p.background('#ececec')
    }
  }

  getDraw(p)
  {
    return () => {
      Background.draw(p)
    }
  }
}
