export default class Geometric
{
  static draw(p)
  {
    Geometric.translateByMouse(p)
    Geometric.generateGeometric(p)
  }

  static generateGeometric(p)
  {
    p.normalMaterial()

    const radianX2 = Math.PI * 2
    const radius   = p.width * 1
    const xMax     = 17
    const yMax     = 17

    for (let x = 0; x <= xMax; ++x) {
      p.push()

      for (let y = 0; y <= yMax; ++y) {
        const xMapped1   = x / xMax
        const yMapped1   = y / yMax
        const xRadian    = xMapped1 * radianX2
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
        Geometric.addGeometric(p, x)
        p.pop()

        p.rotateX(p.frameCount * -0.0005 + 1000)
        p.rotateY(p.frameCount * 0.0010)
        p.rotateZ(p.frameCount * 0.0010)

        Geometric.moveLightByMouse(p)
      }

      p.pop()
    }
  }

  static addGeometric(p, unique)
  {
    const type = unique % 6

    if (type === 0) {
      p.plane(16)
    } else if (type === 1) {
      p.box(8, 8, 8)
    } else if (type === 2) {
      p.cylinder(8, 16)
    } else if (type === 3) {
      p.cone(8, 16)
    } else if (type === 4) {
      p.torus(16, 4)
    } else if (type === 5) {
      p.sphere(8)
    } else if (type === 6) {
      p.ellipsoid(8, 16, 32)
    }
  }

  static moveLightByMouse(p)
  {
      const y = ((p.mouseY / p.height) - 0.5) * 2
      const x = ((p.mouseX / p.width) - 0.5) * 2

      p.directionalLight(160, 160, 180, x, -y, 0.25)
      p.specularMaterial(50)
  }

  static translateByMouse(p)
  {
    p.orbitControl()
  }
}
