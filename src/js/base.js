import Graphic from './graphic/graphic.js'

class Base
{
  static init()
  {
    const graphic = new Graphic()
    graphic.draw()
  }
}

$(document).ready(() => Base.init())
