import Geometric from './geometric/geometric.js'

export default class Background
{
  static draw(p)
  {
    Background.changeColor(p)
    Background.translateCamera(p)
    Background.translateCameraByMouse(p)
    Background.rotateCameraByMouse(p)

    Geometric.draw(p)
  }

  static changeColor(p)
  {
    const hexColorMax          = 255
    const fps                  = 30
    const fpsGear              = 1 / 20

    const radianPerFrame       = p.TWO_PI / fps
    const radianPerFrameGeared = radianPerFrame * fpsGear
    const fpsReal              = fps / fpsGear
    const frame                = p.frameCount % fpsReal
    const radian               = radianPerFrameGeared * frame
    const sine                 = p.sin(radian)
    const sineMapped1          = (sine + 1) / 2
    const hexColor             = sineMapped1 * hexColorMax

    p.background(hexColor)
  }

  static translateCamera(p)
  {
    const xTranslate = p.frameCount * 0.01
    const yTranslate = 0
    let   zTranslate = -(p.width / 3)

    if (window.screen.width < 600) {
      zTranslate = window.screen.width / 5
    }

    p.translate(xTranslate, yTranslate, zTranslate)
  }

  static translateCameraByMouse(p)
  {
    const xTranslate = -p.mouseX / 10
    const yTranslate = -p.mouseY / 10

    p.translate(xTranslate, yTranslate)
  }

  static rotateCameraByMouse(p)
  {
    p.orbitControl()
  }
}
