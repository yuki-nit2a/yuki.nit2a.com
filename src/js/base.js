import Graphic from './graphic/graphic.js'

class Base
{
  static init()
  {
    Graphic.draw()
  }
}

window.onload = () => Base.init()
