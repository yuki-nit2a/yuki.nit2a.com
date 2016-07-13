export default class Graphic {
  constructor()
  {
    this.app = new p5(this.getSketch(), document.body)
  }

  draw()
  {
    //this.app
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
      p.createCanvas(710, 400)
    }
  }

  getDraw(p)
  {
    let yoff = 0.0

    return () => {
      p.background(30)

      p.fill(255)

      p.beginShape()

      let xoff = 0
      //let xoff = yoff
      let width = 710
      let height = 400

      for (let x = 0; x <= width; x += 10) {
        let y = p.map(p.noise(xoff, yoff), 0, 1, 200,300)
        //let y = p.map(p.noise(xoff), 0, 1, 200,300)

        p.vertex(x, y)
        xoff += 0.05
      }
      yoff += 0.01
      p.vertex(width, height)
      p.vertex(0, height)

      p.endShape(p.CLOSE);
    }
  }
}
