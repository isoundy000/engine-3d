import { vec3, random } from '../../../vmath';

export default class CircleShape {
  constructor(info) {
    // this._normalDir = vec3.new(0, 1, 0);

    // this._radius = info.radius !== undefined ? info.radius : 20.0;
    // this._arc = info.arc !== undefined ? info.arc : 2.0 * Math.PI;
    // this._emitFromEdge = info.emitFromEdge !== undefined ? info.emitFromEdge : false;
    // this._alignToDirection = info.alignToDirection !== undefined ? info.alignToDirection : false;
    // this._randomizeDirection = info.randomizeDirection !== undefined ? info.randomizeDirection : 0.0;
    // this._spherizeDirection = info.spherizeDirection !== undefined ? info.spherizeDirection : 0.0;
    // this._mode = info.mode !== undefined ? info.mode : 'random';
    // this._spread = info.spread !== undefined ? info.spread : 0.0;
  }

  generateEmitPosition() {
    let out = vec3.create();
    let angle = random() * this._arc;
    if (this._emitFromEdge) {
      vec3.set(out,
        -this._radius * Math.cos(angle),
        this._radius * Math.sin(angle),
        0
      );
    } else {
      let randomRadius = this._radius * Math.pow(random(), 1.0 / 2.0);
      vec3.set(out,
        -randomRadius * Math.cos(angle),
        randomRadius * Math.sin(angle),
        0
      );
    }

    vec3.normalize(this._normalDir, out);
    return out;
  }

  generateEmitDirection() {
    // TODO: randomize direction according to randomizeDirection property.
    if (true) {
      return this._normalDir;
    } else {
      return vec3.normalize(this._normalDir, this.generateEmitPosition());
    }
  }

}

CircleShape.schema = {
  radius: {
    type: 'number',
    default: 20,
  },

  arc: {
    type: 'number', // 0 ~ 360
    default: 2.0 * Math.PI,
    set(val) {
      this._arc = toRadian(val);
    }
  },

  emitFromEdge: {
    type: 'boolean',
    default: false,
  },

  alignToDirection: {
    type: 'boolean',
    default: false,
  },

  randomizeDirection: { // 0.0 ~ 1.0
    type: 'number',
    default: 0.0,
  },

  spherizeDirection: { // 0.0 ~ 1.0
    type: 'number',
    default: 0.0,
  },

  // TODO:
  mode: {
    type: 'enums',
    default: 'random',
    options: [
      'random',
      'loop',
      'ping-pong',
      'burst-spread'
    ],
  },

  spread: { // 0.0 ~ 1.0
    type: 'number',
    default: 0.0,
  }
};