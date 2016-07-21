export default class Geometric
{
  static draw(p)
  {
    Geometric.generateGeometric(p)
  }

  static generateGeometric(p)
  {
    let xMax               = 10
    let yMax               = 10
    let geometricSizeMulti = 1
    let radius             = p.width * 1
    let rotateX            = p.frameCount * -0.0005 + 1000
    let rotateY            = p.frameCount * 0.0010
    let rotateZ            = p.frameCount * 0.0010
    
    if (window.screen.width < 600) {
      radius             *= 2
      xMax               = 10
      yMax               = 10
      geometricSizeMulti = 0.5
      rotateX            *= 3
      rotateY            *= 3
      rotateZ            *= 3
    }

    for (let x = 0; x <= xMax; ++x) {
      p.push()

      for (let y = 0; y <= yMax; ++y) {
        const xMapped1   = x / xMax
        const yMapped1   = y / yMax
        const xRadian    = xMapped1 * p.TWO_PI
        const yRadian    = yMapped1
        const xSine      = p.sin(xRadian)
        const ySine      = p.sin(yRadian)
        const xCos       = p.cos(xRadian)
        const yCos       = p.cos(yRadian)
        const xTranslate = radius * xSine * ySine
        const yTranslate = radius * xCos * yCos
        const zTranslate = radius * xSine * ySine

        p.push()
        p.translate(xTranslate, yTranslate, zTranslate)
        Geometric.addGeometric(p, x, geometricSizeMulti)
        p.pop()

        p.rotateX(rotateX)
        p.rotateY(rotateY)
        p.rotateZ(rotateZ)

        Geometric.moveLightByMouse(p)
      }

      p.pop()
    }
  }

  static addGeometric(p, unique, multi)
  {
    const type = unique % 6

    if (type === 0) {
      p.plane(16 * multi)
    } else if (type === 1) {
      p.box(8 * multi, 8 * multi, 8 * multi)
    } else if (type === 2) {
      p.cylinder(8 * multi, 16 * multi)
    } else if (type === 3) {
      p.cone(8 * multi, 16 * multi)
    } else if (type === 4) {
      p.torus(16 * multi, 4 * multi)
    } else if (type === 5) {
      p.sphere(8 * multi)
    } else if (type === 6) {
      p.ellipsoid(8 * multi, 16, 2)
    }
  }

  static moveLightByMouse(p)
  {
      const y = ((p.mouseY / p.height) - 0.5) * 2
      const x = ((p.mouseX / p.width) - 0.5) * 2

      p.directionalLight(160, 160, 180, x, -y, 0.25)
      p.specularMaterial(255, 255, 255, 235)
  }
}
