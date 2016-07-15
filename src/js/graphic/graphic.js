import p5 from 'p5'
import Background from './background/background.js'

export default class Graphic
{
  static draw()
  {
    const c = new p5(Graphic.getSketch(), document.body)

    Graphic.listenEvent(c)
  }

  static getSketch()
  {
    return (p) => {
      p.setup = Graphic.getSetup(p)
      p.draw = Graphic.getDraw(p)
    }
  }

  static getSetup(p)
  {
    return () => {
      const width  = Graphic.getWidth(p)
      const height = Graphic.getHeight(p)
      const fps    = 30

      const c = p.createCanvas(width, height, p.WEBGL)
      c.parent('background')

      p.perspective(fps / 60 * p.PI, width / height, 0.1, 100)

      p.frameRate(fps)
      p.background('#ececec')
    }
  }

  static getWidth(p)
  {
    return p.windowWidth * 0.90
  }

  static getHeight(p)
  {
    let   height    = p.windowHeight * 1.00
    const heightMin = 500

    if (height < heightMin) {
      height = heightMin
    }

    return height
  }

  static getDraw(p)
  {
    return () => {
      Background.draw(p)
    }
  }

  static listenEvent(canvas)
  {
    window.onresize = () => Graphic.resizeCanvas(canvas)
  }

  static resizeCanvas(c)
  {
    const width  = Graphic.getWidth(c)
    const height = Graphic.getHeight(c)
    console.log(height)

    c.resizeCanvas(width, height)
  }
}
