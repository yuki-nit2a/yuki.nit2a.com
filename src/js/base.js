import Graphic from './graphic.js'

class Base
{
  static init()
  {
    const graphic = new Graphic()
    graphic.draw()
  }
}

$(document).ready(() => Base.init())
