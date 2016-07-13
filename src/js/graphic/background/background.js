export default class Background {
  static draw(p)
  {
    p.orbitControl()
    p.normalMaterial()
    p.translate(p.frameCount * -0.01, 0, -600)

    let radius = p.width * 1.0

    for (let i = 0; i < 18; ++i) {
      p.push()

      for (let j = 0; j < 18; ++j) {
        p.push()

        let a = i / 18 * Math.PI
        let b = j / 18 * Math.PI
        p.translate(p.sin(2 * a) * radius * p.sin(b),
                    p.cos(b) * radius / 2,
                    p.cos(2 * a) * radius * p.sin(b))

        p = Background.addGeometric(p, i % 6)

        p.pop()

        p.rotateX(p.frameCount * -0.0002)
        p.rotateY(p.frameCount * 0.0001)
        p.rotateZ(p.frameCount * 0.0001)

        let dirY = (p.mouseY / p.height - 0.5) * 2;
        let dirX = (p.mouseX / p.width - 0.5) * 2;
        p.directionalLight(250, 250, 250, dirX, -dirY, 0.25);
        p.ambientMaterial(50)
      }

      p.pop()
    }
  }

  static addGeometric(p, type)
  {
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

    return p
  }
}
