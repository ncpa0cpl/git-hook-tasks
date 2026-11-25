#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e2) {
    throw mod = 0, e2;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/minimist/index.js
var require_minimist = __commonJS({
  "node_modules/minimist/index.js"(exports2, module2) {
    "use strict";
    function hasKey(obj, keys) {
      var o = obj;
      keys.slice(0, -1).forEach(function(key2) {
        o = o[key2] || {};
      });
      var key = keys[keys.length - 1];
      return key in o;
    }
    __name(hasKey, "hasKey");
    function isNumber(x) {
      if (typeof x === "number") {
        return true;
      }
      if (/^0x[0-9a-f]+$/i.test(x)) {
        return true;
      }
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }
    __name(isNumber, "isNumber");
    function isConstructorOrProto(obj, key) {
      return key === "constructor" && typeof obj[key] === "function" || key === "__proto__";
    }
    __name(isConstructorOrProto, "isConstructorOrProto");
    module2.exports = function(args, opts) {
      if (!opts) {
        opts = {};
      }
      var flags = {
        bools: {},
        strings: {},
        unknownFn: null
      };
      if (typeof opts.unknown === "function") {
        flags.unknownFn = opts.unknown;
      }
      if (typeof opts.boolean === "boolean" && opts.boolean) {
        flags.allBools = true;
      } else {
        [].concat(opts.boolean).filter(Boolean).forEach(function(key2) {
          flags.bools[key2] = true;
        });
      }
      var aliases = {};
      function aliasIsBoolean(key2) {
        return aliases[key2].some(function(x) {
          return flags.bools[x];
        });
      }
      __name(aliasIsBoolean, "aliasIsBoolean");
      Object.keys(opts.alias || {}).forEach(function(key2) {
        aliases[key2] = [].concat(opts.alias[key2]);
        aliases[key2].forEach(function(x) {
          aliases[x] = [key2].concat(aliases[key2].filter(function(y) {
            return x !== y;
          }));
        });
      });
      [].concat(opts.string).filter(Boolean).forEach(function(key2) {
        flags.strings[key2] = true;
        if (aliases[key2]) {
          [].concat(aliases[key2]).forEach(function(k) {
            flags.strings[k] = true;
          });
        }
      });
      var defaults = opts.default || {};
      var argv = { _: [] };
      function argDefined(key2, arg2) {
        return flags.allBools && /^--[^=]+$/.test(arg2) || flags.strings[key2] || flags.bools[key2] || aliases[key2];
      }
      __name(argDefined, "argDefined");
      function setKey(obj, keys, value2) {
        var o = obj;
        for (var i2 = 0; i2 < keys.length - 1; i2++) {
          var key2 = keys[i2];
          if (isConstructorOrProto(o, key2)) {
            return;
          }
          if (o[key2] === void 0) {
            o[key2] = {};
          }
          if (o[key2] === Object.prototype || o[key2] === Number.prototype || o[key2] === String.prototype) {
            o[key2] = {};
          }
          if (o[key2] === Array.prototype) {
            o[key2] = [];
          }
          o = o[key2];
        }
        var lastKey = keys[keys.length - 1];
        if (isConstructorOrProto(o, lastKey)) {
          return;
        }
        if (o === Object.prototype || o === Number.prototype || o === String.prototype) {
          o = {};
        }
        if (o === Array.prototype) {
          o = [];
        }
        if (o[lastKey] === void 0 || flags.bools[lastKey] || typeof o[lastKey] === "boolean") {
          o[lastKey] = value2;
        } else if (Array.isArray(o[lastKey])) {
          o[lastKey].push(value2);
        } else {
          o[lastKey] = [o[lastKey], value2];
        }
      }
      __name(setKey, "setKey");
      function setArg(key2, val, arg2) {
        if (arg2 && flags.unknownFn && !argDefined(key2, arg2)) {
          if (flags.unknownFn(arg2) === false) {
            return;
          }
        }
        var value2 = !flags.strings[key2] && isNumber(val) ? Number(val) : val;
        setKey(argv, key2.split("."), value2);
        (aliases[key2] || []).forEach(function(x) {
          setKey(argv, x.split("."), value2);
        });
      }
      __name(setArg, "setArg");
      Object.keys(flags.bools).forEach(function(key2) {
        setArg(key2, defaults[key2] === void 0 ? false : defaults[key2]);
      });
      var notFlags = [];
      if (args.indexOf("--") !== -1) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
      }
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        var key;
        var next;
        if (/^--.+=/.test(arg)) {
          var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
          key = m[1];
          var value = m[2];
          if (flags.bools[key]) {
            value = value !== "false";
          }
          setArg(key, value, arg);
        } else if (/^--no-.+/.test(arg)) {
          key = arg.match(/^--no-(.+)/)[1];
          setArg(key, false, arg);
        } else if (/^--.+/.test(arg)) {
          key = arg.match(/^--(.+)/)[1];
          next = args[i + 1];
          if (next !== void 0 && !/^(-|--)[^-]/.test(next) && !flags.bools[key] && !flags.allBools && (aliases[key] ? !aliasIsBoolean(key) : true)) {
            setArg(key, next, arg);
            i += 1;
          } else if (/^(true|false)$/.test(next)) {
            setArg(key, next === "true", arg);
            i += 1;
          } else {
            setArg(key, flags.strings[key] ? "" : true, arg);
          }
        } else if (/^-[^-]+/.test(arg)) {
          var letters = arg.slice(1, -1).split("");
          var broken = false;
          for (var j = 0; j < letters.length; j++) {
            next = arg.slice(j + 2);
            if (next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && next[0] === "=") {
              setArg(letters[j], next.slice(1), arg);
              broken = true;
              break;
            }
            if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
              setArg(letters[j], next, arg);
              broken = true;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg);
              broken = true;
              break;
            } else {
              setArg(letters[j], flags.strings[letters[j]] ? "" : true, arg);
            }
          }
          key = arg.slice(-1)[0];
          if (!broken && key !== "-") {
            if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !flags.bools[key] && (aliases[key] ? !aliasIsBoolean(key) : true)) {
              setArg(key, args[i + 1], arg);
              i += 1;
            } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
              setArg(key, args[i + 1] === "true", arg);
              i += 1;
            } else {
              setArg(key, flags.strings[key] ? "" : true, arg);
            }
          }
        } else {
          if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
            argv._.push(flags.strings._ || !isNumber(arg) ? arg : Number(arg));
          }
          if (opts.stopEarly) {
            argv._.push.apply(argv._, args.slice(i + 1));
            break;
          }
        }
      }
      Object.keys(defaults).forEach(function(k) {
        if (!hasKey(argv, k.split("."))) {
          setKey(argv, k.split("."), defaults[k]);
          (aliases[k] || []).forEach(function(x) {
            setKey(argv, x.split("."), defaults[k]);
          });
        }
      });
      if (opts["--"]) {
        argv["--"] = notFlags.slice();
      } else {
        notFlags.forEach(function(k) {
          argv._.push(k);
        });
      }
      return argv;
    };
  }
});

// node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/color-name/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/color-convert/conversions.js"(exports2, module2) {
    "use strict";
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    module2.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      let h;
      let s;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = /* @__PURE__ */ __name(function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      }, "diffc");
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    __name(comparativeDistance, "comparativeDistance");
    convert.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = Math.floor(args / 36) / 5 * 255;
      const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      let colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer = parseInt(colorString, 16);
      const r = integer >> 16 & 255;
      const g = integer >> 8 & 255;
      const b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max = Math.max(Math.max(r, g), b);
      const min = Math.min(Math.min(r, g), b);
      const chroma = max - min;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      const val = Math.round(gray[0] / 100 * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/color-convert/route.js"(exports2, module2) {
    "use strict";
    var conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          // http://jsperf.com/1-vs-infinity
          // micro-opt, but this is simple.
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    __name(buildGraph, "buildGraph");
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    __name(deriveBFS, "deriveBFS");
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    __name(link, "link");
    function wrapConversion(toModel, graph) {
      const path11 = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path11.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path11;
      return fn;
    }
    __name(wrapConversion, "wrapConversion");
    module2.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/color-convert/index.js"(exports2, module2) {
    "use strict";
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = /* @__PURE__ */ __name(function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      }, "wrappedFn");
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    __name(wrapRaw, "wrapRaw");
    function wrapRounded(fn) {
      const wrappedFn = /* @__PURE__ */ __name(function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      }, "wrappedFn");
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    __name(wrapRounded, "wrapRounded");
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/ansi-styles/index.js"(exports2, module2) {
    "use strict";
    var wrapAnsi16 = /* @__PURE__ */ __name((fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${code + offset}m`;
    }, "wrapAnsi16");
    var wrapAnsi256 = /* @__PURE__ */ __name((fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${38 + offset};5;${code}m`;
    }, "wrapAnsi256");
    var wrapAnsi16m = /* @__PURE__ */ __name((fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    }, "wrapAnsi16m");
    var ansi2ansi = /* @__PURE__ */ __name((n) => n, "ansi2ansi");
    var rgb2rgb = /* @__PURE__ */ __name((r, g, b) => [r, g, b], "rgb2rgb");
    var setLazyProperty = /* @__PURE__ */ __name((object, property, get) => {
      Object.defineProperty(object, property, {
        get: /* @__PURE__ */ __name(() => {
          const value = get();
          Object.defineProperty(object, property, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        }, "get"),
        enumerable: true,
        configurable: true
      });
    }, "setLazyProperty");
    var colorConvert;
    var makeDynamicStyles = /* @__PURE__ */ __name((wrap, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert();
      }
      const offset = isBackground ? 10 : 0;
      const styles = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles;
    }, "makeDynamicStyles");
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
      setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
      return styles;
    }
    __name(assembleStyles, "assembleStyles");
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    var os3 = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    __name(translateLevel, "translateLevel");
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os3.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    __name(supportsColor, "supportsColor");
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    __name(getSupportLevel, "getSupportLevel");
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/chalk/source/util.js
var require_util = __commonJS({
  "node_modules/chalk/source/util.js"(exports2, module2) {
    "use strict";
    var stringReplaceAll = /* @__PURE__ */ __name((string, substring, replacer) => {
      let index = string.indexOf(substring);
      if (index === -1) {
        return string;
      }
      const substringLength = substring.length;
      let endIndex = 0;
      let returnValue = "";
      do {
        returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string.indexOf(substring, endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    }, "stringReplaceAll");
    var stringEncaseCRLFWithFirstIndex = /* @__PURE__ */ __name((string, prefix, postfix, index) => {
      let endIndex = 0;
      let returnValue = "";
      do {
        const gotCR = string[index - 1] === "\r";
        returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
        endIndex = index + 1;
        index = string.indexOf("\n", endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    }, "stringEncaseCRLFWithFirstIndex");
    module2.exports = {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    };
  }
});

// node_modules/chalk/source/templates.js
var require_templates = __commonJS({
  "node_modules/chalk/source/templates.js"(exports2, module2) {
    "use strict";
    var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */ new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"]
    ]);
    function unescape(c) {
      const u = c[0] === "u";
      const bracket = c[1] === "{";
      if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      if (u && bracket) {
        return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    __name(unescape, "unescape");
    function parseArguments(name, arguments_) {
      const results = [];
      const chunks = arguments_.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        const number = Number(chunk);
        if (!Number.isNaN(number)) {
          results.push(number);
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    __name(parseArguments, "parseArguments");
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          const args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    __name(parseStyle, "parseStyle");
    function buildStyle(chalk7, styles) {
      const enabled = {};
      for (const layer of styles) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk7;
      for (const [styleName, styles2] of Object.entries(enabled)) {
        if (!Array.isArray(styles2)) {
          continue;
        }
        if (!(styleName in current)) {
          throw new Error(`Unknown Chalk style: ${styleName}`);
        }
        current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
      }
      return current;
    }
    __name(buildStyle, "buildStyle");
    module2.exports = (chalk7, temporary) => {
      const styles = [];
      const chunks = [];
      let chunk = [];
      temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter2, inverse, style, close, character) => {
        if (escapeCharacter2) {
          chunk.push(unescape(escapeCharacter2));
        } else if (style) {
          const string = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? string : buildStyle(chalk7, styles)(string));
          styles.push({ inverse, styles: parseStyle(style) });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk7, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(character);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMessage);
      }
      return chunks.join("");
    };
  }
});

// node_modules/chalk/source/index.js
var require_source = __commonJS({
  "node_modules/chalk/source/index.js"(exports2, module2) {
    "use strict";
    var ansiStyles = require_ansi_styles();
    var { stdout: stdoutColor, stderr: stderrColor } = require_supports_color();
    var {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    } = require_util();
    var { isArray } = Array;
    var levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    var styles = /* @__PURE__ */ Object.create(null);
    var applyOptions = /* @__PURE__ */ __name((object, options = {}) => {
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    }, "applyOptions");
    var ChalkClass = class {
      static {
        __name(this, "ChalkClass");
      }
      constructor(options) {
        return chalkFactory(options);
      }
    };
    var chalkFactory = /* @__PURE__ */ __name((options) => {
      const chalk8 = {};
      applyOptions(chalk8, options);
      chalk8.template = (...arguments_) => chalkTag(chalk8.template, ...arguments_);
      Object.setPrototypeOf(chalk8, Chalk.prototype);
      Object.setPrototypeOf(chalk8.template, chalk8);
      chalk8.template.constructor = () => {
        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
      };
      chalk8.template.Instance = ChalkClass;
      return chalk8.template;
    }, "chalkFactory");
    function Chalk(options) {
      return chalkFactory(options);
    }
    __name(Chalk, "Chalk");
    for (const [styleName, style] of Object.entries(ansiStyles)) {
      styles[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles.visible = {
      get() {
        const builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
    for (const model of usedModels) {
      styles[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    for (const model of usedModels) {
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, {
      ...styles,
      level: {
        enumerable: true,
        get() {
          return this._generator.level;
        },
        set(level) {
          this._generator.level = level;
        }
      }
    });
    var createStyler = /* @__PURE__ */ __name((open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    }, "createStyler");
    var createBuilder = /* @__PURE__ */ __name((self, _styler, _isEmpty) => {
      const builder = /* @__PURE__ */ __name((...arguments_) => {
        if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
          return applyStyle(builder, chalkTag(builder, ...arguments_));
        }
        return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      }, "builder");
      Object.setPrototypeOf(builder, proto);
      builder._generator = self;
      builder._styler = _styler;
      builder._isEmpty = _isEmpty;
      return builder;
    }, "createBuilder");
    var applyStyle = /* @__PURE__ */ __name((self, string) => {
      if (self.level <= 0 || !string) {
        return self._isEmpty ? "" : string;
      }
      let styler = self._styler;
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.indexOf("\x1B") !== -1) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    }, "applyStyle");
    var template;
    var chalkTag = /* @__PURE__ */ __name((chalk8, ...strings) => {
      const [firstString] = strings;
      if (!isArray(firstString) || !isArray(firstString.raw)) {
        return strings.join(" ");
      }
      const arguments_ = strings.slice(1);
      const parts = [firstString.raw[0]];
      for (let i = 1; i < firstString.length; i++) {
        parts.push(
          String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"),
          String(firstString.raw[i])
        );
      }
      if (template === void 0) {
        template = require_templates();
      }
      return template(chalk8, parts.join(""));
    }, "chalkTag");
    Object.defineProperties(Chalk.prototype, styles);
    var chalk7 = Chalk();
    chalk7.supportsColor = stdoutColor;
    chalk7.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
    chalk7.stderr.supportsColor = stderrColor;
    module2.exports = chalk7;
  }
});

// node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS({
  "node_modules/ansi-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = ({ onlyFirst = false } = {}) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
      ].join("|");
      return new RegExp(pattern, onlyFirst ? void 0 : "g");
    };
  }
});

// node_modules/strip-ansi/index.js
var require_strip_ansi = __commonJS({
  "node_modules/strip-ansi/index.js"(exports2, module2) {
    "use strict";
    var ansiRegex = require_ansi_regex();
    module2.exports = (string) => typeof string === "string" ? string.replace(ansiRegex(), "") : string;
  }
});

// node_modules/async-await-queue/cjs/index.cjs
var require_cjs = __commonJS({
  "node_modules/async-await-queue/cjs/index.cjs"(exports2) {
    "use strict";
    var t = class _t {
      static {
        __name(this, "t");
      }
      constructor(t2) {
        this.compare = t2, this.heapArray = [], this._limit = 0;
      }
      static getChildrenIndexOf(t2) {
        return [2 * t2 + 1, 2 * t2 + 2];
      }
      static getParentIndexOf(t2) {
        if (t2 <= 0) return -1;
        const e3 = t2 % 2 ? 1 : 2;
        return Math.floor((t2 - e3) / 2);
      }
      push(t2) {
        return this._sortNodeUp(this.heapArray.push(t2) - 1), true;
      }
      length() {
        return this.heapArray.length;
      }
      peek() {
        return this.heapArray[0];
      }
      pop() {
        const t2 = this.heapArray.pop();
        return this.length() > 0 && void 0 !== t2 ? this.replace(t2) : t2;
      }
      replace(t2) {
        const e3 = this.heapArray[0];
        return this.heapArray[0] = t2, this._sortNodeDown(0), e3;
      }
      size() {
        return this.length();
      }
      _moveNode(t2, e3) {
        [this.heapArray[t2], this.heapArray[e3]] = [this.heapArray[e3], this.heapArray[t2]];
      }
      _sortNodeDown(e3) {
        let i = e3 < this.heapArray.length - 1;
        const n = this.heapArray[e3], s = /* @__PURE__ */ __name((t2, e4) => (this.heapArray.length > e4 && this.compare(this.heapArray[e4], this.heapArray[t2]) < 0 && (t2 = e4), t2), "s");
        for (; i; ) {
          const r = _t.getChildrenIndexOf(e3), h = r.reduce(s, r[0]), a = this.heapArray[h];
          void 0 !== a && this.compare(n, a) > 0 ? (this._moveNode(e3, h), e3 = h) : i = false;
        }
      }
      _sortNodeUp(e3) {
        let i = e3 > 0;
        for (; i; ) {
          const n = _t.getParentIndexOf(e3);
          n >= 0 && this.compare(this.heapArray[n], this.heapArray[e3]) > 0 ? (this._moveNode(e3, n), e3 = n) : i = false;
        }
      }
    };
    function e2(t2, e3) {
      return t2.prio - e3.prio || t2.counter - e3.counter;
    }
    __name(e2, "e");
    exports2.Queue = class {
      constructor(i, n) {
        this.maxConcurrent = i || 1, this.minCycle = n || 0, this.queueRunning = /* @__PURE__ */ new Map(), this.queueWaiting = new t(e2), this.lastRun = 0, this.nextTimer = null, this.counter = 0;
      }
      tryRun() {
        for (; this.queueWaiting.size() > 0 && this.queueRunning.size < this.maxConcurrent; ) {
          if (Date.now() - this.lastRun < this.minCycle) return void (null === this.nextTimer && (this.nextTimer = new Promise(((t3) => setTimeout((() => {
            this.nextTimer = null, this.tryRun(), t3();
          }), this.minCycle - Date.now() + this.lastRun)))));
          const t2 = this.queueWaiting.pop();
          if (void 0 !== t2) {
            let e3;
            const i = { wait: new Promise(((t3) => {
              e3 = t3;
            })), signal: e3 }, n = { hash: t2.hash, prio: t2.prio, finish: i };
            if (this.queueRunning.has(t2.hash)) throw new Error("async-await-queue: duplicate hash " + t2.hash);
            this.queueRunning.set(t2.hash, n), this.lastRun = Date.now(), t2.start.signal();
          }
        }
      }
      end(t2) {
        const e3 = this.queueRunning.get(t2);
        if (void 0 === e3) throw new Error("async-await-queue: queue desync for " + t2);
        this.queueRunning.delete(t2), e3.finish.signal(), this.tryRun();
      }
      async wait(t2, e3) {
        const i = null != e3 ? e3 : 0;
        let n;
        const s = new Promise(((t3) => {
          n = t3;
        })), r = { hash: t2, prio: i, start: { signal: n, wait: s }, counter: this.counter++ };
        this.queueWaiting.push(r), this.tryRun(), await s, this.lastRun = Date.now();
      }
      run(t2, e3) {
        const i = null != e3 ? e3 : 0, n = /* @__PURE__ */ Symbol();
        return this.wait(n, i).then(t2).finally((() => {
          this.end(n);
        }));
      }
      stat() {
        return { running: this.queueRunning.size, waiting: this.queueWaiting.size(), last: this.lastRun };
      }
      async flush(t2) {
        for (; this.queueRunning.size > 0 || this.queueWaiting.size() > 0; ) {
          const e3 = this.queueWaiting.peek();
          if (e3 && await e3.start.wait, void 0 !== t2 && this.queueWaiting.size() < t2) return;
          if (this.queueRunning.size > 0) {
            const t3 = this.queueRunning.values().next().value;
            await t3.finish.wait;
          }
        }
      }
    };
  }
});

// node_modules/clify.js/dist/esm/clify.mjs
var __defProp2 = Object.defineProperty;
var __defNormalProp = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __publicField = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField");
function defaultStdinReader() {
  return {
    read() {
      let data = "";
      const stdin = process.stdin;
      const orgEncoding = stdin.readableEncoding ?? void 0;
      stdin.setEncoding("utf8");
      const onData = /* @__PURE__ */ __name((chunk) => {
        data += chunk;
      }, "onData");
      stdin.on("data", onData);
      return new Promise((resolve) => {
        stdin.once("end", () => {
          stdin.removeListener("data", onData);
          stdin.setEncoding(orgEncoding);
          resolve(data);
        });
      });
    },
    getIterator() {
      let done = false;
      let onNextQueue = [];
      const chunks = [];
      const stdin = process.stdin;
      const onData = /* @__PURE__ */ __name((chunk) => {
        const onNext = onNextQueue.shift();
        if (onNext) {
          onNext(chunk);
        } else {
          chunks.push(chunk);
        }
      }, "onData");
      const onEnd = /* @__PURE__ */ __name(() => {
        done = true;
        stdin.removeListener("data", onData);
        onNextQueue.splice(0, onNextQueue.length).forEach((cb) => cb(chunks.shift()));
      }, "onEnd");
      stdin.on("data", onData);
      stdin.once("end", onEnd);
      return {
        done() {
          return done && !chunks.length;
        },
        next() {
          if (chunks.length) {
            return Promise.resolve(chunks.shift());
          }
          if (done) {
            return Promise.resolve("done");
          }
          return new Promise((resolve) => {
            onNextQueue.push((nextChunk) => {
              if (nextChunk) {
                return resolve(nextChunk);
              }
              return resolve("done");
            });
          });
        }
      };
    }
  };
}
__name(defaultStdinReader, "defaultStdinReader");
function defaultArgGetter() {
  return process.argv.slice(2);
}
__name(defaultArgGetter, "defaultArgGetter");
function defaultLogger(type, message) {
  switch (type) {
    case "info":
      console.log(...message);
      break;
    case "error":
      console.error(...message);
      break;
    case "warning":
      console.warn(...message);
      break;
  }
}
__name(defaultLogger, "defaultLogger");
var ClifyGlobals = class {
  static {
    __name(this, "ClifyGlobals");
  }
  static setArgGetter(arggetter) {
    this.argGetter = arggetter;
  }
  static setLogger(logger) {
    this.logger = logger;
  }
  static setStdinReader(getReader) {
    this.getStdinReader = getReader;
  }
  static getArgs() {
    return this.argGetter();
  }
  static err(...message) {
    this.logger("error", message);
  }
  static log(...message) {
    this.logger("info", message);
  }
  static warn(...message) {
    this.logger("warning", message);
  }
  static getStdin() {
    return this.getStdinReader();
  }
};
__publicField(ClifyGlobals, "getStdinReader", defaultStdinReader);
__publicField(ClifyGlobals, "argGetter", defaultArgGetter);
__publicField(ClifyGlobals, "logger", defaultLogger);
var Clify = ClifyGlobals;

// node_modules/clify.js/dist/esm/options/option-error.mjs
var __defProp3 = Object.defineProperty;
var __defNormalProp2 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __publicField2 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField");
var OptionError = class extends Error {
  static {
    __name(this, "OptionError");
  }
  constructor(msg, optionName) {
    super(msg);
    __publicField2(this, "optionName", optionName);
    __publicField2(this, "customMessage");
  }
  toPrintable() {
    return `${this.customMessage ?? this.message}: ${this.optionName}`;
  }
};
var InvalidOptionError = class extends OptionError {
  static {
    __name(this, "InvalidOptionError");
  }
  constructor(optName, received, expected, customMessage) {
    super(
      expected ? `Invalid option, expected '${expected}', but received '${received}'` : "Invalid option",
      optName
    );
    __publicField2(this, "received", received);
    __publicField2(this, "expected", expected);
    __publicField2(this, "customMessage", customMessage);
    this.name = "InvalidOptionError";
  }
};
var UnspecifiedOptionError = class extends OptionError {
  static {
    __name(this, "UnspecifiedOptionError");
  }
  constructor(optionName) {
    super(`Unspecified option`, optionName);
    __publicField2(this, "optionName", optionName);
    this.name = "UnspecifiedOptionError";
  }
};

// node_modules/clify.js/dist/esm/options/convert-option-value.mjs
var TRUTHY = ["true", "True", "TRUE", 1, ""];
var FALSY = ["false", "False", "FALSE", 0];
function convertOptionValue(value, optType, optName) {
  if (Array.isArray(optType)) {
    if (!Array.isArray(value)) {
      const result = convertOptionValue(value, optType[0], optName);
      if (typeof result === "object") {
        return result;
      }
      return [result];
    }
    const mapped = [];
    for (const v of value) {
      const result = convertOptionValue(v, optType[0], optName);
      if (typeof result === "object") {
        return result;
      }
      mapped.push(result);
    }
    return mapped;
  } else {
    if (Array.isArray(value)) {
      return new InvalidOptionError(optName, "multiple", "single value");
    }
    switch (optType) {
      case "string":
        return String(value);
        break;
      case "boolean":
        if (TRUTHY.includes(value)) {
          value = true;
        } else if (FALSY.includes(value)) {
          value = false;
        }
        if (typeof value !== "boolean") {
          return new InvalidOptionError(optName, typeof value, "boolean");
        }
        return value;
        break;
      case "number":
        if (typeof value !== "number" || Number.isNaN(value)) {
          return new InvalidOptionError(optName, typeof value, "number");
        }
        return value;
        break;
      case "int":
        if (typeof value !== "number" || Number.isNaN(value)) {
          return new InvalidOptionError(optName, typeof value, "integer");
        }
        if (!Number.isInteger(value)) {
          return new InvalidOptionError(optName, "float", "integer");
        }
        return value;
        break;
      case "unknown":
        return value;
        break;
    }
  }
  throw Error("unreachable");
}
__name(convertOptionValue, "convertOptionValue");

// node_modules/clify.js/dist/esm/options/option.mjs
var __defProp4 = Object.defineProperty;
var __defNormalProp3 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __publicField3 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp3(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField");
var DEFAULT_CATEGORY = /* @__PURE__ */ Symbol("default_category");
var Opt = class _Opt {
  static {
    __name(this, "_Opt");
  }
  constructor(command) {
    __publicField3(this, "command", command);
    __publicField3(this, "initParams");
    __publicField3(this, "_value");
    __publicField3(this, "_isSet", false);
    __publicField3(this, "_default");
    __publicField3(this, "_probramInitialized", false);
    this.initParams = this.getInitParams();
  }
  /** @internal */
  static notifyParsingComplete(opt) {
    opt._probramInitialized = true;
  }
  static define(params) {
    return class extends _Opt {
      getInitParams() {
        return params;
      }
    };
  }
  get value() {
    if (!this._probramInitialized) {
      throw new Error(
        `'${this.getName()}' value is being accessed before initialization phase. Make sure you only access the option within the command body.`
      );
    }
    return this._isSet ? this._value : this._default;
  }
  get isSet() {
    return this._isSet;
  }
  setDefault(value) {
    this._default = value;
    return this;
  }
  init() {
    const name = this.getName();
    const parsedArgs = this.command.getParsedArgs();
    this._default = this.initParams.default;
    if (this.initParams.name in parsedArgs) {
      const v = convertOptionValue(
        parsedArgs[this.initParams.name],
        this.initParams.type,
        name
      );
      if (v instanceof OptionError) {
        return v;
      }
      this._isSet = true;
      this._value = v;
    } else if (this.initParams.char != null && this.initParams.char in parsedArgs) {
      this._isSet = true;
      const v = convertOptionValue(
        parsedArgs[this.initParams.char],
        this.initParams.type,
        name
      );
      if (v instanceof OptionError) {
        return v;
      }
      this._isSet = true;
      this._value = v;
    } else if (this.initParams.required && this._default == null) {
      return new UnspecifiedOptionError(name);
    }
    return this.validate();
  }
  validate() {
    if (this.initParams.validate && this._isSet) {
      const result = this.initParams.validate(this.value);
      if (result === "ok") {
        return null;
      }
      return new InvalidOptionError(
        this.getName(),
        String(this.value),
        result.expected,
        result.message
      );
    }
    return null;
  }
  nameMatches(name) {
    return this.initParams.name === name || name.length === 1 && this.initParams.char === name;
  }
  getName() {
    if (this.initParams.char != null) {
      return `--${this.initParams.name}, -${this.initParams.char}`;
    }
    return `--${this.initParams.name}`;
  }
  getNameWithType() {
    if (this.initParams.type === "boolean") {
      if (this.initParams.char != null) {
        return `--${this.initParams.name}, -${this.initParams.char}`;
      }
      return `--${this.initParams.name}`;
    }
    let typeStr;
    if (Array.isArray(this.initParams.type)) {
      typeStr = "..." + this.initParams.type[0];
    } else {
      typeStr = this.initParams.type;
    }
    if (this.initParams.char != null) {
      return `--${this.initParams.name}, -${this.initParams.char} <${typeStr}>`;
    }
    return `--${this.initParams.name} <${typeStr}>`;
  }
  getDescription() {
    return this.initParams.description || "";
  }
  getCategory() {
    if (this.initParams.category == null) {
      return DEFAULT_CATEGORY;
    }
    return this.initParams.category;
  }
};
function defineOption(params) {
  return Opt.define(params);
}
__name(defineOption, "defineOption");

// node_modules/clify.js/dist/esm/commands/command-input.mjs
var __defProp5 = Object.defineProperty;
var __defNormalProp4 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __publicField4 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp4(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField");
var CmdInputBase = class {
  static {
    __name(this, "CmdInputBase");
  }
  constructor(command, options = {}) {
    __publicField4(this, "command", command);
    __publicField4(this, "options", options);
    __publicField4(this, "argumentInput", null);
    __publicField4(this, "stdinInput", null);
    __publicField4(this, "_source", null);
  }
  setOptions(options) {
    this.options = options;
  }
  setArgumentInput(value) {
    this.argumentInput = value;
    if (value != null) {
      this._source = "argument";
    }
  }
  async prepare() {
    if (this.argumentInput != null) {
      return false;
    }
    if (this.options.stdin === false) {
      return false;
    }
    if (this.options.stdin === "non-tty-only") {
      if (process.stdin.isTTY) {
        return false;
      }
    }
    return true;
  }
  validate() {
    return this.argumentInput != null || this.stdinInput != null;
  }
  get() {
  }
  getName() {
    return this.options.name;
  }
  get source() {
    return this._source;
  }
};
var CmdInput = class extends CmdInputBase {
  static {
    __name(this, "CmdInput");
  }
  async prepare() {
    if (await super.prepare()) {
      const stdin = ClifyGlobals.getStdin();
      this._source = "stdin";
      this.stdinInput = await stdin.read();
      return true;
    }
    return false;
  }
  get() {
    return this.argumentInput ?? this.stdinInput ?? null;
  }
};
var CmdInputStream = class extends CmdInputBase {
  static {
    __name(this, "CmdInputStream");
  }
  constructor() {
    super(...arguments);
    __publicField4(this, "stdinIter", null);
  }
  async prepare() {
    if (await super.prepare()) {
      const stdin = ClifyGlobals.getStdin();
      this._source = "stdin";
      this.stdinIter = await stdin.getIterator();
      return true;
    }
    return false;
  }
  get() {
    return this.argumentInput ?? this.stdinIter ?? null;
  }
};

// node_modules/clify.js/dist/esm/utils/group-by.mjs
if (typeof Object.groupBy === "undefined") {
  Object.groupBy = /* @__PURE__ */ __name(function groupBy(iterable, callback) {
    const grouped = {};
    let index = 0;
    for (const item of iterable) {
      const key = callback(item, index++);
      if (key in grouped) {
        grouped[key].push(item);
      } else {
        grouped[key] = [item];
      }
    }
    return grouped;
  }, "groupBy");
}

// node_modules/clify.js/dist/esm/commands/command.mjs
var __defProp6 = Object.defineProperty;
var __defNormalProp5 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __publicField5 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp5(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField");
var alphasort = /* @__PURE__ */ __name((a, b) => a.localeCompare(b), "alphasort");
var Cmd = class _Cmd {
  static {
    __name(this, "_Cmd");
  }
  constructor(cmdName, parentCommand) {
    __publicField5(this, "cmdName", cmdName);
    __publicField5(this, "parentCommand", parentCommand);
    __publicField5(this, "ownOptions", []);
    __publicField5(this, "ownAction");
    __publicField5(this, "subCommands", []);
    __publicField5(this, "parsedArgs");
    __publicField5(this, "ownInput");
    __publicField5(this, "description", "");
  }
  command(name, initCallback) {
    const cmd = new _Cmd(name, this);
    cmd.ownAction = initCallback(cmd);
    this.subCommands.push(cmd);
    return cmd;
  }
  option(Option2) {
    const option = new Option2(this);
    this.ownOptions.push(option);
    return option;
  }
  input(options) {
    if (this.ownInput != null) {
      if (options != null) {
        this.ownInput.setOptions(options);
      }
      return this.ownInput;
    }
    return this.ownInput = new CmdInput(this, options);
  }
  inputStream(options) {
    if (this.ownInput != null) {
      if (options != null) {
        this.ownInput.setOptions(options);
      }
      return this.ownInput;
    }
    return this.ownInput = new CmdInputStream(this, options);
  }
  setDescription(description) {
    this.description = description;
  }
  findSubcommand(command) {
    if (command.length === 0) {
      return [this, null];
    }
    const [firstCommand] = command;
    const subCommand = this.subCommands.find(
      (cmd) => cmd.cmdName === firstCommand
    );
    if (subCommand == null) {
      if (this.ownInput && command.length === 1) {
        return [this, command[0]];
      }
      return [null, null];
    }
    return subCommand.findSubcommand(command.slice(1));
  }
  getName() {
    let parentName = this.parentCommand?.getName();
    if (parentName != null) {
      return parentName + " " + this.cmdName;
    }
    return this.cmdName;
  }
  printHelp() {
    const log = ClifyGlobals.log.bind(ClifyGlobals);
    let usage = `Usage: ${this.getName()}`;
    let state = 0;
    if (this.subCommands.length > 0) {
      state |= 1;
    }
    if (this.ownInput) {
      state |= 2;
    }
    if (this.ownAction) {
      state |= 4;
    }
    const inputName = this.ownInput?.getName() ?? "INPUT";
    switch (state) {
      case 0:
      case 4:
        break;
      case 2:
      case 6:
        usage += ` ${inputName}`;
        break;
      case 1:
        usage += " COMMAND";
        break;
      case 5:
        usage += " COMMAND?";
        break;
      case 3:
        usage += ` COMMAND|${inputName}`;
        break;
      case 7:
        usage += ` COMMAND|${inputName}?`;
        break;
    }
    if (this.ownOptions.length > 0) {
      usage += " [...OPTIONS]";
    }
    let commandsList = [];
    if (this.subCommands.length > 0) {
      const cmdNames = this.subCommands.map((cmd) => {
        return `  ${cmd.cmdName}`;
      });
      const longestLen = cmdNames.reduce(
        (a, b) => a.length > b.length ? a : b,
        ""
      ).length;
      commandsList = cmdNames.map((cmd, i) => {
        return cmd.padEnd(longestLen + 4) + this.subCommands[i].description;
      }).sort(alphasort);
    }
    let defOptsList = [];
    const categorisedOpts = [];
    if (this.ownOptions.length > 0) {
      const optionsByCategory = Object.groupBy(
        this.ownOptions,
        (opt) => opt.getCategory()
      );
      for (const category of Reflect.ownKeys(optionsByCategory)) {
        const options = optionsByCategory[category];
        const optNames = options.map((arg) => {
          return `  ${arg.getNameWithType()}`;
        });
        const longestLen = optNames.reduce(
          (a, b) => a.length > b.length ? a : b,
          ""
        ).length;
        const lines = optNames.map((arg, i) => {
          return arg.padEnd(longestLen + 4) + options[i].getDescription();
        }).sort(alphasort);
        if (category === DEFAULT_CATEGORY) {
          defOptsList = lines;
        } else {
          categorisedOpts.push([category, lines]);
        }
      }
    }
    log(usage);
    if (this.description) {
      log("");
      log(this.description);
    }
    if (commandsList.length > 0) {
      log("");
      log("Commands:");
      for (const cmd of commandsList) {
        log(cmd);
      }
    }
    if (defOptsList.length > 0 || categorisedOpts.length > 0) {
      log("");
      log("Options:");
      for (const opt of defOptsList) {
        log(opt);
      }
      for (const [category, lines] of categorisedOpts) {
        log("");
        log(category + ":");
        for (const l of lines) {
          log(l);
        }
      }
    }
  }
  printUnknownArgsMsg(unknownArgs) {
    const logErr = ClifyGlobals.err.bind(ClifyGlobals);
    logErr("Unknown options:");
    unknownArgs.forEach((arg) => {
      if (arg.length === 1) {
        logErr(`  -${arg}`);
      } else {
        logErr(`  --${arg}`);
      }
    });
  }
  printArgumentErrors(errors) {
    const logErr = ClifyGlobals.err.bind(ClifyGlobals);
    logErr("Invalid options:");
    errors.forEach((err) => {
      logErr(`  ${err.toPrintable()}`);
    });
  }
  async prepare() {
    if ("help" in this.parsedArgs) {
      this.printHelp();
      return "skip";
    }
    const argNames = Object.keys(this.parsedArgs).filter(
      (key) => key !== "_" && key !== "__"
    );
    const unknownArgs = [];
    for (let i = 0; i < argNames.length; i++) {
      const name = argNames[i];
      if (this.ownOptions.some((a) => a.nameMatches(name))) {
        continue;
      }
      unknownArgs.push(name);
    }
    if (unknownArgs.length > 0) {
      this.printUnknownArgsMsg(unknownArgs);
      return "fail";
    }
    const validationErrors = [];
    for (let i = 0; i < this.ownOptions.length; i++) {
      const err = this.ownOptions[i].init();
      if (err != null) {
        validationErrors.push(err);
      }
    }
    if (validationErrors.length > 0) {
      this.printArgumentErrors(validationErrors);
      return "fail";
    }
    for (const opt of this.ownOptions) {
      Opt.notifyParsingComplete(opt);
    }
    if (this.ownInput) {
      await this.ownInput.prepare();
      return this.ownInput.validate() ? "ok" : "fail";
    }
    return "ok";
  }
  runAction() {
    if (this.ownAction == null) {
      ClifyGlobals.warn("Nothing to do.");
      return Promise.resolve(new Error("Nothing to do."));
    }
    return this.ownAction();
  }
  getParsedArgs() {
    return this.parsedArgs;
  }
  async start(parsedArgs, input) {
    this.parsedArgs = parsedArgs;
    this.ownInput?.setArgumentInput(input);
    const r = await this.prepare();
    if (r === "ok") {
      return this.runAction();
    } else if (r === "fail") {
      return Promise.resolve(new Error("Command failed"));
    }
  }
};

// node_modules/clify.js/dist/esm/program.mjs
var import_minimist = __toESM(require_minimist(), 1);
var __defProp7 = Object.defineProperty;
var __defNormalProp6 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __publicField6 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp6(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField");
var ClifyProgram = class {
  static {
    __name(this, "ClifyProgram");
  }
  constructor(mainCommand) {
    __publicField6(this, "mainCommand", mainCommand);
  }
  init(command, args) {
    if (command != null) {
      const parsedArgs = {
        _: command.split(" "),
        ...args
      };
      return parsedArgs;
    }
    return (0, import_minimist.default)(ClifyGlobals.getArgs());
  }
  findCommand(command) {
    return this.mainCommand.findSubcommand(command);
  }
  run(command, args) {
    const parsedArgs = this.init(command, args);
    if (parsedArgs.version) {
      this.mainCommand.printVersionInfo();
      return Promise.resolve();
    }
    const [cmd, input] = this.findCommand(parsedArgs._);
    if (cmd == null) {
      const errMsg = `Unknown command: ${parsedArgs._.join(" ")}`;
      ClifyGlobals.err(errMsg);
      return Promise.resolve(new Error(errMsg));
    }
    return cmd.start(parsedArgs, input);
  }
};

// node_modules/clify.js/dist/esm/utils/assert-not-async.mjs
function assertNotAsync(fnr, name) {
  if (fnr instanceof Promise) {
    throw new Error(`'${name}' cannot be asynchronous.`);
  }
}
__name(assertNotAsync, "assertNotAsync");

// node_modules/clify.js/dist/esm/configure.mjs
var __defProp8 = Object.defineProperty;
var __defNormalProp7 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __publicField7 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp7(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField");
var MainCmd = class extends Cmd {
  static {
    __name(this, "MainCmd");
  }
  constructor() {
    super(...arguments);
    __publicField7(this, "version");
    __publicField7(this, "programName");
  }
  printVersionInfo() {
    let msg = "";
    if (this.programName != null) {
      msg = `${this.programName} `;
    }
    if (this.version != null) {
      msg += `${this.version} `;
    }
    ClifyGlobals.log(msg);
  }
  setVersion(version) {
    this.version = version;
  }
  setName(name) {
    this.programName = name;
  }
  main(initCallback) {
    this.ownAction = initCallback(this);
  }
  getName() {
    return this.programName ?? "";
  }
};
function configure(configureCallback) {
  const mainCommand = new MainCmd("");
  assertNotAsync(configureCallback(mainCommand), "configureCallback");
  return new ClifyProgram(mainCommand);
}
__name(configure, "configure");

// node_modules/clify.js/dist/esm/index.mjs
var default_export = {
  Clify,
  configure,
  defineOption
};
var index_default = default_export;

// src/arguments/package-manager.ts
var PM = defineOption({
  char: "p",
  name: "package-manager",
  type: "string",
  required: true
});

// src/config/create-config-file.ts
var import_promises2 = __toESM(require("fs/promises"));
var import_path5 = __toESM(require("path"));

// src/config/read-config.ts
var import_promises = __toESM(require("fs/promises"));
var import_path4 = __toESM(require("path"));

// node_modules/dilswer/dist/esm/utilities/is-field-descriptor.mjs
var isFieldDescriptor = /* @__PURE__ */ __name((v) => {
  const isObject = typeof v === "object";
  if (isObject) {
    const hasSymbol = DataTypeSymbol in v;
    if (!hasSymbol)
      return true;
  }
  return false;
}, "isFieldDescriptor");

// node_modules/dilswer/dist/esm/data-types/data-types.mjs
var __defProp9 = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp8 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __spreadValues = /* @__PURE__ */ __name((a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp8(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp8(a, prop, b[prop]);
    }
  return a;
}, "__spreadValues");
var DataTypeSymbol = /* @__PURE__ */ Symbol();
var MetadataSymbol = /* @__PURE__ */ Symbol("metadata");
var BasicDataTypes = {
  Unknown: "unknown",
  String: "string",
  Number: "number",
  Int: "integer",
  Boolean: "boolean",
  Symbol: "symbol",
  Function: "function",
  Null: "null",
  Undefined: "undefined",
  StringNumeral: "stringnumeral",
  StringInt: "stringinteger"
};
var _a;
var _b;
var BaseDataType = class {
  static {
    __name(this, "BaseDataType");
  }
  constructor() {
    this[_a] = {};
    this[_b] = true;
  }
  /** Will return a copy. */
  static getMetadata(dt) {
    return __spreadValues({}, dt[MetadataSymbol]);
  }
  /** @internal */
  static getOriginalMetadata(dt) {
    return dt[MetadataSymbol];
  }
  copy() {
    const proto = Object.getPrototypeOf(this);
    const copy = Object.create(proto);
    Object.assign(copy, this);
    copy[MetadataSymbol] = __spreadValues({}, this[MetadataSymbol]);
    return copy;
  }
  /**
   * Sets a metadata `description` property. This property can be
   * later read by `getMetadata` and is also used by
   * `toJsonSchema` to generate a JSON Schema.
   */
  setDescription(description) {
    this[MetadataSymbol].description = description;
    return this;
  }
  /**
   * Sets a metadata `title` property. This property can be later
   * read by `getMetadata` and is also used by `toJsonSchema` to
   * generate a JSON Schema.
   */
  setTitle(name) {
    this[MetadataSymbol].title = name;
    return this;
  }
  /**
   * Sets a metadata `format` property. This property can be
   * later read by `getMetadata` and is also used by
   * `toJsonSchema` to generate a JSON Schema.
   */
  setFormat(format) {
    this[MetadataSymbol].format = format;
    return this;
  }
  /**
   * Sets the extra metadata. The extra metadata can be anything.
   * This metadata is not used by Dilswer, but can be by the
   * Dilswer consumer.
   */
  setExtra(extra) {
    this[MetadataSymbol].extra = extra;
    return this;
  }
};
_a = MetadataSymbol, _b = DataTypeSymbol;
var SimpleDataType = class extends BaseDataType {
  static {
    __name(this, "SimpleDataType");
  }
  constructor(simpleType) {
    super();
    this.simpleType = simpleType;
    this.kind = "simple";
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    return visitor.visit(this);
  }
};
var RecordOf = class extends BaseDataType {
  static {
    __name(this, "RecordOf");
  }
  constructor(recordOf) {
    super();
    this.recordOf = recordOf;
    this.kind = "record";
    this.keys = Object.keys(this.recordOf);
    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[i];
      const entry = this.recordOf[key];
      if (isFieldDescriptor(entry)) {
        Object.freeze(entry);
      }
    }
    Object.freeze(this.keys);
    Object.freeze(this.recordOf);
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    const children = [];
    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[i];
      const entry = this.recordOf[key];
      const descriptor = isFieldDescriptor(entry) ? __spreadValues({ required: true }, entry) : { type: entry, required: true };
      children.push({
        _isRecordOfVisitChild: true,
        child: descriptor.type._acceptVisitor(visitor),
        propertyName: key,
        required: !!descriptor.required
      });
    }
    return visitor.visit(this, children);
  }
};
var ArrayOf = class extends BaseDataType {
  static {
    __name(this, "ArrayOf");
  }
  constructor(arrayOf) {
    super();
    this.arrayOf = arrayOf;
    this.kind = "array";
    Object.freeze(this.arrayOf);
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    const children = [];
    for (let i = 0; i < this.arrayOf.length; i++) {
      children.push(this.arrayOf[i]._acceptVisitor(visitor));
    }
    return visitor.visit(this, children);
  }
};
var Tuple = class extends BaseDataType {
  static {
    __name(this, "Tuple");
  }
  constructor(tuple) {
    super();
    this.tuple = tuple;
    this.kind = "tuple";
    Object.freeze(this.tuple);
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    const children = [];
    for (let i = 0; i < this.tuple.length; i++) {
      children.push(this.tuple[i]._acceptVisitor(visitor));
    }
    return visitor.visit(this, children);
  }
};
var Dict = class extends BaseDataType {
  static {
    __name(this, "Dict");
  }
  constructor(dict) {
    super();
    this.dict = dict;
    this.kind = "dictionary";
    Object.freeze(this.dict);
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    const children = [];
    for (let i = 0; i < this.dict.length; i++) {
      children.push(this.dict[i]._acceptVisitor(visitor));
    }
    return visitor.visit(this, children);
  }
};
var SetOf = class extends BaseDataType {
  static {
    __name(this, "SetOf");
  }
  constructor(setOf) {
    super();
    this.setOf = setOf;
    this.kind = "set";
    Object.freeze(this.setOf);
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    const children = [];
    for (let i = 0; i < this.setOf.length; i++) {
      children.push(this.setOf[i]._acceptVisitor(visitor));
    }
    return visitor.visit(this, children);
  }
};
var OneOf = class extends BaseDataType {
  static {
    __name(this, "OneOf");
  }
  constructor(oneOf) {
    super();
    this.oneOf = oneOf;
    this.kind = "union";
    Object.freeze(this.oneOf);
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    const children = [];
    for (let i = 0; i < this.oneOf.length; i++) {
      children.push(this.oneOf[i]._acceptVisitor(visitor));
    }
    return visitor.visit(this, children);
  }
};
var AllOf = class extends BaseDataType {
  static {
    __name(this, "AllOf");
  }
  constructor(allOf) {
    super();
    this.allOf = allOf;
    this.kind = "intersection";
    Object.freeze(this.allOf);
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    const children = [];
    for (let i = 0; i < this.allOf.length; i++) {
      children.push(this.allOf[i]._acceptVisitor(visitor));
    }
    return visitor.visit(this, children);
  }
};
var Literal = class extends BaseDataType {
  static {
    __name(this, "Literal");
  }
  constructor(literal) {
    super();
    this.literal = literal;
    this.kind = "literal";
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    return visitor.visit(this);
  }
};
var _a2;
var Enum = class extends BaseDataType {
  static {
    __name(this, "Enum");
  }
  constructor(enumInstance) {
    super();
    this[_a2] = {};
    this.kind = "enumUnion";
    this.enumInstance = enumInstance;
    Object.freeze(this);
  }
  /** @internal */
  static getOriginalMetadata(dt) {
    return dt[MetadataSymbol];
  }
  /**
   * Sets the metadata for the enum name. This is used for
   * generating appropriate TypeScript declarations (via
   * `toTsType()`).
   */
  setEnumName(name) {
    this[MetadataSymbol].enumName = name;
    return this;
  }
  /** @internal */
  _acceptVisitor(visitor) {
    return visitor.visit(this);
  }
};
_a2 = MetadataSymbol;
var _a3;
var EnumMember = class extends BaseDataType {
  static {
    __name(this, "EnumMember");
  }
  constructor(enumMember) {
    super();
    this.enumMember = enumMember;
    this[_a3] = {};
    this.kind = "enumMember";
    Object.freeze(this);
  }
  /** @internal */
  static getOriginalMetadata(dt) {
    return dt[MetadataSymbol];
  }
  /**
   * Sets the metadata for the enum name. This is used for
   * generating appropriate TypeScript declarations (via
   * `toTsType()`).
   */
  setEnumName(name) {
    this[MetadataSymbol].enumName = name;
    return this;
  }
  /**
   * Sets the metadata for the enum member name. This is used for
   * generating appropriate TypeScript declarations (via
   * `toTsType()`).
   */
  setMemberName(name) {
    this[MetadataSymbol].memberName = name;
    return this;
  }
  /** @internal */
  _acceptVisitor(visitor) {
    return visitor.visit(this);
  }
};
_a3 = MetadataSymbol;
var InstanceOf = class extends BaseDataType {
  static {
    __name(this, "InstanceOf");
  }
  constructor(instanceOf) {
    super();
    this.instanceOf = instanceOf;
    this.kind = "instanceOf";
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    return visitor.visit(this);
  }
};
var Custom = class extends BaseDataType {
  static {
    __name(this, "Custom");
  }
  constructor(custom) {
    super();
    this.custom = custom;
    this.kind = "custom";
    Object.freeze(this);
  }
  /** @internal */
  _acceptVisitor(visitor) {
    return visitor.visit(this);
  }
};
var _a4;
var StringMatching = class extends BaseDataType {
  static {
    __name(this, "StringMatching");
  }
  constructor(pattern) {
    super();
    this.pattern = pattern;
    this[_a4] = {};
    this.kind = "stringMatching";
    Object.freeze(this);
  }
  /** @internal */
  static getOriginalMetadata(dt) {
    return dt[MetadataSymbol];
  }
  /** @internal */
  _acceptVisitor(visitor) {
    return visitor.visit(this);
  }
  /**
   * Sets the metadata for the TypeScript pattern. This is used
   * for generating appropriate TypeScript declarations (via
   * `toTsType()`).
   *
   * This value must use the same syntax as the type literal
   * types in TypeScript.
   *
   * @example
   *   const type =
   *     DataType.StringMatching<`${string}.${string}`>(
   *       /^.+\..+$/
   *     ).setTsPattern("${string}.${string}");
   */
  setTsPattern(tsPattern) {
    this[MetadataSymbol].tsPattern = tsPattern;
    return this;
  }
};
_a4 = MetadataSymbol;
var CircularRef = class extends BaseDataType {
  static {
    __name(this, "CircularRef");
  }
  constructor(parent) {
    super();
    this.parent = parent;
    this.kind = "circularRef";
  }
  /** This is the type this reference points to. */
  get type() {
    return this.parent.type;
  }
  /** @internal */
  _getReferencedType() {
    return this.parent.type;
  }
  _acceptVisitor(visitor) {
    return visitor.visit(this);
  }
};
var Circular = class extends BaseDataType {
  static {
    __name(this, "Circular");
  }
  constructor(getDataType) {
    super();
    this.kind = "circular";
    this.type = getDataType(new CircularRef(this));
  }
  /** @internal */
  _acceptVisitor(visitor) {
    const c = this.type._acceptVisitor(visitor);
    return visitor.visit(this, [c]);
  }
};
var DataType = {
  get Unknown() {
    return new SimpleDataType(BasicDataTypes.Unknown);
  },
  get String() {
    return new SimpleDataType(BasicDataTypes.String);
  },
  get Number() {
    return new SimpleDataType(BasicDataTypes.Number);
  },
  get Int() {
    return new SimpleDataType(BasicDataTypes.Int);
  },
  get Boolean() {
    return new SimpleDataType(BasicDataTypes.Boolean);
  },
  get Symbol() {
    return new SimpleDataType(BasicDataTypes.Symbol);
  },
  get Function() {
    return new SimpleDataType(BasicDataTypes.Function);
  },
  get Null() {
    return new SimpleDataType(BasicDataTypes.Null);
  },
  get Undefined() {
    return new SimpleDataType(BasicDataTypes.Undefined);
  },
  get StringNumeral() {
    return new SimpleDataType(BasicDataTypes.StringNumeral);
  },
  get StringInt() {
    return new SimpleDataType(BasicDataTypes.StringInt);
  },
  RecordOf(args) {
    return new RecordOf(args);
  },
  Dict(...args) {
    return new Dict(args);
  },
  ArrayOf(...args) {
    return new ArrayOf(args);
  },
  Tuple(...args) {
    return new Tuple(args);
  },
  SetOf(...args) {
    return new SetOf(args);
  },
  OneOf(...args) {
    return new OneOf(args);
  },
  AllOf(...args) {
    return new AllOf(args);
  },
  Literal(value) {
    return new Literal(value);
  },
  EnumMember(enumMember) {
    return new EnumMember(enumMember);
  },
  Enum(enumInstance) {
    return new Enum(enumInstance);
  },
  InstanceOf(instanceOf) {
    return new InstanceOf(instanceOf);
  },
  Custom(validateFunction) {
    return new Custom(validateFunction);
  },
  StringMatching(pattern) {
    return new StringMatching(pattern);
  },
  Circular(getDataType) {
    return new Circular(getDataType);
  }
};

// node_modules/dilswer/dist/esm/ts-type-generator/name-generator.mjs
var ReservedNames = /* @__PURE__ */ new Set([
  "Array",
  "Set",
  "Map",
  "Promise",
  "Date",
  "RegExp",
  "Error",
  "Symbol",
  "Function",
  "Object",
  "Boolean",
  "Number",
  "String",
  "Record",
  "any",
  "unknown",
  "never",
  "void",
  "null",
  "undefined",
  "boolean",
  "number",
  "string",
  "bigint",
  "symbol"
]);
var NameGenerator = class {
  static {
    __name(this, "NameGenerator");
  }
  static generate(name) {
    if (ReservedNames.has(name)) {
      name = name + "Type";
    }
    const count = this.names.get(name);
    if (count === void 0) {
      this.names.set(name, 1);
      return name;
    }
    this.names.set(name, count + 1);
    return name + count.toString();
  }
  static clear() {
    this.names.clear();
  }
};
NameGenerator.names = /* @__PURE__ */ new Map();

// node_modules/dilswer/dist/esm/ts-type-generator/template-builder.mjs
var TemplateBuilder = class {
  static {
    __name(this, "TemplateBuilder");
  }
  constructor(template) {
    this.template = template;
  }
  build(wildcards) {
    let result = this.template;
    for (const [key, value] of Object.entries(wildcards)) {
      result = result.replace(`{{${key}}}`, value);
    }
    return result;
  }
};

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/array-builder.mjs
var ARRAY_TEMPLATE = new TemplateBuilder("Array<{{types}}>");
var EXPORT_ARRAY_TEMPLATE = new TemplateBuilder(
  `{{description}}
{{export}}type {{name}} = Array<{{types}}>;`
);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/dictionary-builder.mjs
var DICT_TEMPLATE = new TemplateBuilder("Record<string | number, {{type}}>");
var EXPORTED_DICT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = Record<string | number, {{type}}>`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/enum-builder.mjs
var ENUM_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = {{type}};`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/enum-member-builder.mjs
var ENUM_EXPORT_TEMPLATE2 = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = {{type}};`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/external-type-reference.mjs
var EXTERNAL_TYPE_REF_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{alias}} = {{refName}};`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/instanceof-builder.mjs
var INSTANCEOF_TEMPLATE = new TemplateBuilder(
  "InstanceType<typeof {{type}}>"
);
var EXPORTED_INSTANCEOF_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = InstanceType<typeof {{type}}>`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/intersection-builder.mjs
var INTERSECTION_TEMPLATE = new TemplateBuilder("{{types}}");
var EXPORT_INTERSECTION_TEMPLATE = new TemplateBuilder(
  `{{description}}
{{export}}type {{name}} = {{types}};`
);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/literal-builder.mjs
var LITERAL_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = {{type}};`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/record-builder.mjs
var RECORD_TEMPLATE = new TemplateBuilder(`{
{{properties}}
}`);
var EXTENDED_RECORD_TEMPLATE = new TemplateBuilder(`{{extends}} & {
{{properties}}
}`);
var EXPORTED_RECORD_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = {
{{properties}}
};`);
var EXPORTED_EXTENDED_RECORD_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = {{extends}} & {
{{properties}}
};`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/set-builder.mjs
var SET_TEMPLATE = new TemplateBuilder("Set<{{types}}>");
var EXPORT_SET_TEMPLATE = new TemplateBuilder(
  `{{description}}
{{export}}type {{name}} = Set<{{types}}>;`
);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/simple-types/boolean-builder.mjs
var BOOLEAN_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = boolean;`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/simple-types/function-builder.mjs
var FUNCTION_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = (...args: any[]) => unknown;`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/simple-types/null-builder.mjs
var NULL_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = null;`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/simple-types/number-builder.mjs
var NUMBER_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = number;`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/simple-types/string-builder.mjs
var STRING_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = string;`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/simple-types/symbol-builder.mjs
var SYMBOL_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = symbol;`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/simple-types/undefined-builder.mjs
var UNDEFINED_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = undefined;`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/simple-types/unknown-builder.mjs
var UNKNOWN_EXPORT_TEMPLATE = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = unknown;`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/string-matching-builder.mjs
var STRING_EXPORT_TEMPLATE2 = new TemplateBuilder(`{{description}}
{{export}}type {{name}} = {{type}};`);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/tuple-builder.mjs
var TUPLE_TEMPLATE = new TemplateBuilder("[{{types}}]");
var EXPORT_TUPLE_TEMPLATE = new TemplateBuilder(
  `{{description}}
{{export}}type {{name}} = [{{types}}];`
);

// node_modules/dilswer/dist/esm/ts-type-generator/type-builders/union-builder.mjs
var UNION_TEMPLATE = new TemplateBuilder("{{types}}");
var EXPORT_UNION_TEMPLATE = new TemplateBuilder(
  `{{description}}
{{export}}type {{name}} = {{types}};`
);

// node_modules/dilswer/dist/esm/validation-algorithms/compile-fast-validator.mjs
var e = eval;
var every = (
  /* js */
  `
    const _$every = (_$arr, _$predicate) => {
      for (let _$i = 0; _$i < _$arr.length; _$i++) {
        if (!_$predicate(_$arr[_$i]))
          return false;
      }
      return true;
    };
`.trim()
);
var everyInSet = (
  /* js */
  `
    const _$everyInSet = (_$set, _$predicate) => {
      for (let _$item of _$set) {
        if (!_$predicate(_$item))
          return false;
      }
      return true;
    };
`.trim()
);
var everyObjectValue = (
  /* js */
  `
    const _$everyObjectValue = (_$obj, _$predicate) => {
      for (let _$key in _$obj) {
        if (!_$predicate(_$obj[_$key]))
          return false;
      }
      return true;
    };
`.trim()
);
var strNumeralValidator = (
  /* js */
  `
    const _$STRING_NUMERAL_ALLOWED_CHARS = ["0","1","2","3","4","5","6","7","8","9","."];
    const _$validateStringNumeral = (_$d) => typeof _$d === "string" &&
        _$d.length !== 0 &&
        _$d.split(".").length < 3 &&
        _$every(_$d, (_$char) => _$STRING_NUMERAL_ALLOWED_CHARS.includes(_$char));
`.trim()
);
var strIntValidator = (
  /* js */
  `
    const _$STRING_INTEGER_ALLOWED_CHARS = ["0","1","2","3","4","5","6","7","8","9"];
    const _$validateStringInteger = (_$d) => typeof _$d === "string" &&
        _$d.length !== 0 &&
        _$every(_$d, (_$char) => _$STRING_INTEGER_ALLOWED_CHARS.includes(_$char));
`.trim()
);
var circTracker = (
  /* js */
  `
    const _$validatedCircularValues = new Map();
    const _$wasCircValidated = (_$tn, _$d) => {
      let _$set = _$validatedCircularValues.get(_$tn);
      if (!_$set) {
        _$set = new Set([_$d]);
        _$validatedCircularValues.set(_$tn, _$set);
        return false;
      }
      if (_$set.has(_$d)) {
        return true;
      }
      _$set.add(_$d);
      return false;
    };
`.trim()
);

// node_modules/dilswer/dist/esm/validation-algorithms/path.mjs
var Path = class {
  static {
    __name(this, "Path");
  }
  static init(root) {
    const path11 = new Path();
    path11.part = root;
    return path11;
  }
  concat(nextPart) {
    const next = new Path();
    next.previous = this;
    next.part = nextPart;
    return next;
  }
  flatten() {
    const parts = [];
    let current = this;
    while (current) {
      parts.push(current.part.toString());
      current = current.previous;
    }
    return parts.reverse();
  }
};

// node_modules/dilswer/dist/esm/validation-algorithms/validators/helper-validated-circ-values.mjs
var validatedCircularValues = /* @__PURE__ */ new Map();
var wasCircValidated = /* @__PURE__ */ __name((type, data) => {
  let set = validatedCircularValues.get(type);
  if (!set) {
    set = /* @__PURE__ */ new Set([data]);
    validatedCircularValues.set(type, set);
    return false;
  }
  if (set.has(data)) {
    return true;
  }
  set.add(data);
  return false;
}, "wasCircValidated");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-all-of.mjs
var validateAllOf = /* @__PURE__ */ __name((path11, type, data) => {
  for (let i = 0; i < type.allOf.length; i++) {
    const dataType = type.allOf[i];
    validatorsLookupMap.get(dataType.kind)(path11, dataType, data);
  }
}, "validateAllOf");

// node_modules/dilswer/dist/esm/utilities/concat-object-path.mjs
var concatPathSegments = /* @__PURE__ */ __name((path11, key) => {
  key = key.toString();
  if (/^[0-9]+$/.test(key)) {
    return `${path11}[${key}]`;
  }
  if (/[^a-zA-Z0-9]/.test(key)) {
    return `${path11}["${key.replace(/"/g, '\\"')}"]`;
  }
  return `${path11}.${key}`;
}, "concatPathSegments");
var concatPath = /* @__PURE__ */ __name((segments) => {
  var _a6;
  return segments.slice(1).reduce(concatPathSegments, (_a6 = segments[0]) != null ? _a6 : "");
}, "concatPath");

// node_modules/dilswer/dist/esm/validation-algorithms/validation-error/validation-error.mjs
var ValidationErrorSymbol = /* @__PURE__ */ Symbol("ValidationError");
var _a5;
var ValidationError = class extends TypeError {
  static {
    __name(this, "ValidationError");
  }
  constructor(path11, expected, value, customMessage) {
    super(
      customMessage != null ? customMessage : "Value does not conform the data type structure definition."
    );
    this[_a5] = true;
    this.fieldPathCache = null;
    this.expectedValueType = expected;
    this.path = path11;
    this.receivedValue = value;
  }
  static isValidationError(e2) {
    return typeof e2 === "object" && e2 !== null && e2 instanceof Error && ValidationErrorSymbol in e2;
  }
  get fieldPath() {
    if (this.fieldPathCache == null) {
      this.fieldPathCache = concatPath(this.path.flatten());
    }
    return this.fieldPathCache;
  }
};
_a5 = ValidationErrorSymbol;

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-one-of.mjs
var validateOneOf = /* @__PURE__ */ __name((path11, type, data) => {
  if (type.oneOf.length === 1) {
    const oneOfType = type.oneOf[0];
    return validatorsLookupMap.get(oneOfType.kind)(path11, oneOfType, data);
  }
  for (let i = 0; i < type.oneOf.length; i++) {
    try {
      const oneOfType = type.oneOf[i];
      validatorsLookupMap.get(oneOfType.kind)(path11, oneOfType, data);
      return;
    } catch (error) {
      continue;
    }
  }
  throw new ValidationError(path11, type, data);
}, "validateOneOf");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-array.mjs
var validateArray = /* @__PURE__ */ __name((path11, type, data) => {
  if (!Array.isArray(data))
    throw new ValidationError(path11, type, data);
  const elemType = DataType.OneOf(...type.arrayOf);
  for (let index = 0; index < data.length; index++) {
    validateOneOf(path11.concat(index), elemType, data[index]);
  }
}, "validateArray");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-circular.mjs
var validateCircular = /* @__PURE__ */ __name((path11, type, data) => {
  if (wasCircValidated(type, data)) {
    return;
  }
  const childType = type.type;
  return validatorsLookupMap.get(childType.kind)(path11, childType, data);
}, "validateCircular");
var validateCircularRef = /* @__PURE__ */ __name((path11, type, data) => {
  if (wasCircValidated(type._getReferencedType(), data)) {
    return;
  }
  const refType = type._getReferencedType();
  return validatorsLookupMap.get(refType.kind)(path11, refType, data);
}, "validateCircularRef");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-custom.mjs
var validateCustom = /* @__PURE__ */ __name((path11, type, data) => {
  if (!type.custom(data))
    throw new ValidationError(path11, type, data);
}, "validateCustom");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-dict.mjs
var validateDict = /* @__PURE__ */ __name((path11, type, data) => {
  if (typeof data !== "object" || data === null || Array.isArray(data))
    throw new ValidationError(path11, type, data);
  const keys = Object.keys(data);
  const elemType = DataType.OneOf(...type.dict);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    validateOneOf(
      path11.concat(key),
      elemType,
      data[key]
    );
  }
}, "validateDict");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-enum.mjs
var validateEnum = /* @__PURE__ */ __name((path11, type, data) => {
  const enumKeys = Object.keys(type.enumInstance);
  for (let i = 0; i < enumKeys.length; i++) {
    const key = enumKeys[i];
    const member = type.enumInstance[key];
    if (Number.isNaN(Number(key)) && member === data) {
      return;
    }
  }
  throw new ValidationError(path11, type, data);
}, "validateEnum");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-enum-member.mjs
var validateEnumMember = /* @__PURE__ */ __name((path11, type, data) => {
  if (type.enumMember !== data) {
    throw new ValidationError(path11, type, data);
  }
}, "validateEnumMember");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-instance-of.mjs
var validateInstanceOf = /* @__PURE__ */ __name((path11, type, data) => {
  if (typeof data !== "object" || data === null)
    throw new ValidationError(path11, type, data);
  if (!(data instanceof type.instanceOf))
    throw new ValidationError(path11, type, data);
}, "validateInstanceOf");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-literal.mjs
var validateLiteral = /* @__PURE__ */ __name((path11, type, data) => {
  if (type.literal === data)
    return;
  throw new ValidationError(path11, type, data);
}, "validateLiteral");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-string-integer.mjs
var AllowedChars = /* @__PURE__ */ new Set([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
]);
var validateStringInteger = /* @__PURE__ */ __name((path11, data) => {
  const throwError = /* @__PURE__ */ __name(() => {
    throw new ValidationError(path11, "stringinteger", data);
  }, "throwError");
  if (typeof data !== "string")
    throwError();
  for (let i = 0; i < data.length; i++) {
    if (!AllowedChars.has(data[i])) {
      throwError();
    }
  }
  if (data.length === 0)
    throwError();
  return;
}, "validateStringInteger");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-string-numeral.mjs
var AllowedChars2 = /* @__PURE__ */ new Set([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "."
]);
var validateStringNumeral = /* @__PURE__ */ __name((path11, data) => {
  const throwError = /* @__PURE__ */ __name(() => {
    throw new ValidationError(path11, "stringnumeral", data);
  }, "throwError");
  if (typeof data !== "string")
    throwError();
  for (let i = 0; i < data.length; i++) {
    if (!AllowedChars2.has(data[i])) {
      throwError();
    }
  }
  if (data.split(".").length > 2)
    throwError();
  if (data.length === 0)
    throwError();
  return;
}, "validateStringNumeral");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-primitive.mjs
var validatePrimitive = /* @__PURE__ */ __name((path11, type, data) => {
  const typeName = type.simpleType;
  const throwError = /* @__PURE__ */ __name(() => {
    throw new ValidationError(path11, typeName, data);
  }, "throwError");
  if (typeName === "number") {
    if (typeof data !== "number" || Number.isNaN(data))
      return throwError();
    return;
  }
  if (typeName === "integer") {
    if (typeof data !== "number" || !Number.isInteger(data))
      return throwError();
    return;
  }
  if (typeof data === typeName)
    return;
  if (typeName === "stringnumeral") {
    return validateStringNumeral(path11, data);
  }
  if (typeName === "stringinteger") {
    return validateStringInteger(path11, data);
  }
  if (typeName === "unknown")
    return;
  if (typeName === "null" && data === null)
    return;
  throwError();
}, "validatePrimitive");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-record.mjs
var __defProp10 = Object.defineProperty;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp9 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp10(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __spreadValues2 = /* @__PURE__ */ __name((a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp9(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp9(a, prop, b[prop]);
    }
  return a;
}, "__spreadValues");
var validateRecord = /* @__PURE__ */ __name((path11, type, data) => {
  if (typeof data !== "object" || data === null || Array.isArray(data) || // @ts-expect-error
  data[Symbol.toStringTag] === "Set")
    throw new ValidationError(path11, type, data);
  const keys = type.keys;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const fieldDescriptor = type.recordOf[key];
    const isADescriptor = isFieldDescriptor(fieldDescriptor);
    const descriptor = isADescriptor ? __spreadValues2({ required: true }, fieldDescriptor) : { type: fieldDescriptor, required: true };
    if (!(key in data)) {
      if (descriptor.required !== true) {
        continue;
      } else {
        throw new ValidationError(path11.concat(key), type, void 0);
      }
    }
    const value = data[key];
    if (value === void 0 && descriptor.required !== true) {
      continue;
    }
    validatorsLookupMap.get(descriptor.type.kind)(
      path11.concat(key),
      descriptor.type,
      value
    );
  }
}, "validateRecord");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-set.mjs
var validateSet = /* @__PURE__ */ __name((path11, type, data) => {
  if (!(typeof data === "object" && data !== null && // @ts-expect-error
  data[Symbol.toStringTag] === "Set"))
    throw new ValidationError(path11, type, data);
  const elemType = DataType.OneOf(...type.setOf);
  for (const elem of data) {
    validateOneOf(path11.concat("SET_ELEMENT"), elemType, elem);
  }
}, "validateSet");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-string-matching.mjs
var validateStringMatching = /* @__PURE__ */ __name((path11, type, data) => {
  if (typeof data !== "string" || !type.pattern.test(data)) {
    throw new ValidationError(path11, type, data);
  }
}, "validateStringMatching");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-tuple.mjs
var validateTuple = /* @__PURE__ */ __name((path11, type, data) => {
  if (!Array.isArray(data) || data.length !== type.tuple.length)
    throw new ValidationError(path11, type, data);
  for (let index = 0; index < type.tuple.length; index++) {
    const elem = data[index];
    const elemtType = type.tuple[index];
    validatorsLookupMap.get(elemtType.kind)(
      path11.concat(index),
      elemtType,
      elem
    );
  }
}, "validateTuple");

// node_modules/dilswer/dist/esm/validation-algorithms/validators/validate-type.mjs
var validatorsLookupMap = /* @__PURE__ */ new Map([
  ["simple", validatePrimitive],
  ["array", validateArray],
  ["tuple", validateTuple],
  ["record", validateRecord],
  ["dictionary", validateDict],
  ["union", validateOneOf],
  ["intersection", validateAllOf],
  ["literal", validateLiteral],
  ["enumMember", validateEnumMember],
  ["enumUnion", validateEnum],
  ["set", validateSet],
  ["instanceOf", validateInstanceOf],
  ["custom", validateCustom],
  ["stringMatching", validateStringMatching],
  ["circular", validateCircular],
  ["circularRef", validateCircularRef]
]);

// node_modules/dilswer/dist/esm/validation-algorithms/create-validated-function.mjs
var DEFAULT_ROOT = Path.init("$");
var createTypeGuardedFunction = /* @__PURE__ */ __name((dataType, onValidationSuccess, onValidationError) => {
  const caller = /* @__PURE__ */ __name((data) => {
    try {
      validatorsLookupMap.get(dataType.kind)(DEFAULT_ROOT, dataType, data);
      return onValidationSuccess(data);
    } catch (e2) {
      return onValidationError ? onValidationError(e2, data) : void 0;
    } finally {
      validatedCircularValues.clear();
    }
  }, "caller");
  return caller;
}, "createTypeGuardedFunction");
var createValidatedFunction = createTypeGuardedFunction;

// node_modules/dilswer/dist/esm/validation-algorithms/create-validator.mjs
var DEFAULT_ROOT2 = Path.init("$");

// node_modules/dilswer/dist/esm/validation-algorithms/ensure-data-type.mjs
var DEFAULT_ROOT3 = Path.init("$");

// node_modules/dilswer/dist/esm/index.mjs
var Type = DataType;

// src/config/validate-config.ts
var HookTaskTypeDef = Type.OneOf(
  Type.String,
  Type.ArrayOf(
    Type.RecordOf({
      name: Type.String,
      script: Type.String,
      mustRunAlone: { type: Type.Boolean, required: false }
    }),
    Type.RecordOf({
      name: Type.String,
      taskFile: Type.String,
      mustRunAlone: { type: Type.Boolean, required: false }
    })
  )
);
var ConfigTypeDef = Type.RecordOf({
  packageManager: Type.OneOf(
    Type.Literal("yarn"),
    Type.Literal("npm"),
    Type.Literal("bun")
  ),
  parallel: {
    required: false,
    type: Type.OneOf(
      Type.Boolean,
      Type.RecordOf({
        "pre-push": { required: false, type: Type.Boolean },
        "pre-commit": { required: false, type: Type.Boolean },
        "post-commit": { required: false, type: Type.Boolean }
      })
    )
  },
  parallelPoolSize: { required: false, type: Type.Number },
  hooks: {
    required: false,
    type: Type.RecordOf({
      "pre-push": { required: false, type: HookTaskTypeDef },
      "pre-commit": { required: false, type: HookTaskTypeDef },
      "post-commit": { required: false, type: HookTaskTypeDef }
    })
  }
});
var validateConfig = createValidatedFunction(
  ConfigTypeDef,
  (data) => data,
  (err) => {
    throw new Error(
      `Config file incorrect. Option '${err.fieldPath}' is not of the expected type.`
    );
  }
);

// src/config/read-config.ts
var CONFIG_FILE_NAME = "git-hook-tasks.config.json";
var readConfig = /* @__PURE__ */ __name(async (cwd) => {
  const files = await import_promises.default.readdir(cwd);
  if (!files.includes(CONFIG_FILE_NAME)) {
    throw new Error("Config file not found!");
  }
  const config = JSON.parse(
    await import_promises.default.readFile(import_path4.default.resolve(cwd, CONFIG_FILE_NAME), {
      encoding: "utf-8"
    })
  );
  return validateConfig(config);
}, "readConfig");

// src/config/create-config-file.ts
var createConfig = /* @__PURE__ */ __name(async (cwd, pm) => {
  const files = await import_promises2.default.readdir(cwd);
  if (!files.includes(CONFIG_FILE_NAME)) {
    await import_promises2.default.writeFile(
      import_path5.default.resolve(cwd, CONFIG_FILE_NAME),
      /* json */
      `{
  "packageManager": "${pm}",
  "hooks": {
    "pre-push": [],
    "pre-commit": [],
    "post-commit": []
  }
}
`
    );
  }
  const vscodeDir = import_path5.default.resolve(cwd, ".vscode");
  const vscodeSettingsFile = import_path5.default.resolve(vscodeDir, "settings.json");
  await import_promises2.default.mkdir(vscodeDir, { recursive: true });
  let settings = {};
  const vscodeFiles = await import_promises2.default.readdir(vscodeDir);
  if (vscodeFiles.includes("settings.json")) {
    const f = await import_promises2.default.readFile(vscodeSettingsFile, { encoding: "utf-8" });
    settings = JSON.parse(f);
  }
  if (!settings["json.schemas"]) {
    settings["json.schemas"] = [];
  }
  if (!settings["json.schemas"].some((s) => {
    const isObject = typeof s === "object" && s !== null;
    if (isObject) {
      const fileMatch = s.fileMatch;
      if (Array.isArray(fileMatch)) {
        return fileMatch.includes(CONFIG_FILE_NAME);
      }
      return fileMatch === CONFIG_FILE_NAME;
    }
    return false;
  })) {
    settings["json.schemas"].push({
      fileMatch: [CONFIG_FILE_NAME],
      url: "./node_modules/git-hook-tasks/dist/config/json-schema.json"
    });
    await import_promises2.default.writeFile(vscodeSettingsFile, JSON.stringify(settings, null, 2));
  }
}, "createConfig");

// src/utilities/output/output-line.ts
var OutputEntry = class {
  constructor(manager, initialContent) {
    this.separator = " ";
    this._isClosed = false;
    this._isDeleted = false;
    this.manager = manager;
    this.content = initialContent;
  }
  static {
    __name(this, "OutputEntry");
  }
  setSeparator(separator, rerender) {
    const prev = this.separator;
    this.separator = separator;
    this.contentMemo = void 0;
    if (rerender && prev !== separator) this.manager._rerender();
  }
  getContent() {
    if (this.contentMemo) {
      return this.contentMemo;
    }
    this.contentMemo = this.content.filter((e2) => e2).map((e2) => String(e2)).join(this.separator).split("\n").map((txt) => new OutputLine(this, txt));
    return this.contentMemo;
  }
  update(value) {
    if (this._isClosed) return;
    this.contentMemo = void 0;
    try {
      if (typeof value === "function") {
        this.content = value(this.content);
      } else {
        this.content = value;
      }
      this.manager._rerender();
    } catch {
    }
  }
  delete() {
    this._isClosed = true;
    this._isDeleted = true;
    this.contentMemo = void 0;
    this.content = [];
    this.manager._rerender();
  }
  close() {
    this._isClosed = true;
  }
  get isClosed() {
    return this._isClosed;
  }
  get isDeleted() {
    return this._isDeleted;
  }
};
var OutputLine = class {
  constructor(entry, content) {
    this.entry = entry;
    this.content = content;
    this.entryClosed = entry.isClosed;
  }
  static {
    __name(this, "OutputLine");
  }
};

// src/utilities/output/throttle.ts
function throttle(func, wait, options = {}) {
  let context, args, result;
  let timeout = null;
  let previous = 0;
  if (!options) options = {};
  const later = /* @__PURE__ */ __name(function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  }, "later");
  const fn = /* @__PURE__ */ __name(function(...a) {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = a;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  }, "fn");
  fn.setWait = (ms) => {
    wait = ms;
  };
  return fn;
}
__name(throttle, "throttle");

// src/utilities/output/output-manager.ts
var runThrottled = throttle((fn) => fn(), 1e3, {
  leading: true,
  trailing: true
});
var OutputBuffer = class {
  constructor() {
    this.lines = [];
    this.firstOpenLineIdx = 0;
  }
  static {
    __name(this, "OutputBuffer");
  }
  put(lines) {
    let checkClosed = true;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      this.lines.push(l);
      if (checkClosed && !l.entryClosed) {
        checkClosed = false;
        this.firstOpenLineIdx = i;
      }
    }
  }
  findFirstDifferentLine(buff) {
    const lim = Math.max(this.lines.length, buff.lines.length);
    for (let i = this.firstOpenLineIdx; i < lim; i++) {
      if (this.lines[i]?.content !== buff.lines[i]?.content) return i;
    }
    return null;
  }
  lineCount() {
    return this.lines.length;
  }
  slice(fromLineIdx) {
    return this.lines.slice(fromLineIdx);
  }
};
var OutputManager = class {
  static {
    __name(this, "OutputManager");
  }
  static {
    this.outEntries = [];
  }
  static {
    this.currentBuffer = new OutputBuffer();
  }
  static replaceStdoutLine(lineIdx, replacement) {
    process.stdout.moveCursor(0, -lineIdx);
    process.stdout.clearLine(0);
    process.stdout.write("\r" + replacement + "\r");
    process.stdout.moveCursor(0, lineIdx);
  }
  static {
    this.isRenderQueued = false;
  }
  static _rerender() {
    if (this.isRenderQueued) {
      return;
    }
    this.isRenderQueued = true;
    setTimeout(() => {
      this.isRenderQueued = false;
      runThrottled(() => {
        const newBuffer = new OutputBuffer();
        for (let i = 0; i < this.outEntries.length; i++) {
          const entry = this.outEntries[i];
          if (!entry.isDeleted) {
            newBuffer.put(entry.getContent());
          }
        }
        const startIdx = this.currentBuffer.findFirstDifferentLine(newBuffer);
        if (startIdx === null) {
          return;
        }
        const linesToClear = this.currentBuffer.lineCount() - startIdx;
        const replacementLines = newBuffer.slice(startIdx);
        for (let i = linesToClear; i > 0; i--) {
          const replacement = replacementLines.shift();
          if (replacement != null) {
            this.replaceStdoutLine(i, replacement.content);
          } else {
            process.stdout.write("\x1B[T\x1B[2K");
          }
        }
        for (let i = 0; i < replacementLines.length; i++) {
          const line = replacementLines[i];
          process.stdout.write(line.content + "\n");
        }
        this.currentBuffer = newBuffer;
      });
    }, 25);
  }
  static setMaxFps(fps) {
    runThrottled.setWait(Math.max(1, Math.floor(1e3 / fps)));
  }
  static dynamicLine(initialContent, separator) {
    const line = new OutputEntry(this, initialContent);
    this.outEntries.push(line);
    if (separator !== void 0) {
      line.setSeparator(separator, false);
    }
    this._rerender();
    return line;
  }
  static staticLine(content, separator) {
    const line = new OutputEntry(this, content);
    this.outEntries.push(line);
    if (separator) {
      line.setSeparator(separator, false);
    }
    line.close();
    this._rerender();
  }
};

// src/utilities/exec.ts
var import_child_process = __toESM(require("child_process"));
var exec = /* @__PURE__ */ __name((command, args, options) => {
  return new Promise((resolve, reject) => {
    const proc = import_child_process.default.spawn(command, args, options);
    let out = "";
    proc.stdout.on("data", (data) => {
      out += data.toString();
    });
    proc.stderr.on("data", (data) => {
      out += data.toString();
    });
    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`exited with error code ${code}:
${out}`));
      } else {
        resolve();
      }
    });
  });
}, "exec");

// src/package-manager-bindings/shared.ts
var import_promises3 = __toESM(require("fs/promises"));
var import_path6 = __toESM(require("path"));
var parseArgs = /* @__PURE__ */ __name((args) => args.map((p) => {
  if (p.includes(" ") && p[0] !== '"' && p[0] !== '"' && p[0] !== "`") {
    return `"${p}"`;
  }
  return p;
}).join(" "), "parseArgs");
var pkgjson;
function getPackageJSON(cwd) {
  if (pkgjson) return pkgjson;
  const packageFile = import_path6.default.resolve(cwd, "package.json");
  return import_promises3.default.readFile(packageFile, { encoding: "utf-8" }).then((fileData) => {
    pkgjson = JSON.parse(fileData);
    return pkgjson;
  });
}
__name(getPackageJSON, "getPackageJSON");

// src/package-manager-bindings/bun.ts
var BunPM = class BunPM2 {
  static {
    __name(this, "BunPM");
  }
  static {
    this.cwd = process.cwd();
  }
  static async execute(...command) {
    return exec(command[0], command.slice(1), { cwd: BunPM2.cwd });
  }
  static {
    this.label = "bun";
  }
  static setCwd(cwd) {
    BunPM2.cwd = cwd;
  }
  static install(pkg) {
    const args = [];
    args.push(pkg);
    return BunPM2.execute("bun", "add", ...args);
  }
  static installDev(pkg) {
    const args = ["-D"];
    args.push(pkg);
    return BunPM2.execute("bun", "add", ...args);
  }
  static async run(script, ...args) {
    return BunPM2.execute(...await BunPM2.generateCommand(script, ...args));
  }
  static async generateCommand(script, ...args) {
    const scripts = [];
    try {
      const settings = await getPackageJSON(BunPM2.cwd);
      scripts.push(...Object.keys(settings["scripts"] ?? {}));
    } catch (e2) {
    }
    if (scripts.includes(script)) {
      const a = ["bun", "run", script, ...args];
      return a;
    }
    return ["bun", "x", script, ...args];
  }
};

// src/package-manager-bindings/npm.ts
var Npm = class Npm2 {
  static {
    __name(this, "Npm");
  }
  static {
    this.cwd = process.cwd();
  }
  static execute(...command) {
    return exec(command[0], command.slice(1), { cwd: Npm2.cwd });
  }
  static {
    this.label = "npm";
  }
  static setCwd(cwd) {
    Npm2.cwd = cwd;
  }
  static install(pkg) {
    return Npm2.execute("npm", "install", pkg);
  }
  static installDev(pkg) {
    return Npm2.execute("npm", "install", "-D", pkg);
  }
  static async run(script, ...args) {
    return Npm2.execute(...await Npm2.generateCommand(script, ...args));
  }
  static async generateCommand(script, ...args) {
    const scripts = [];
    try {
      const settings = await getPackageJSON(Npm2.cwd);
      scripts.push(...Object.keys(settings["scripts"] ?? {}));
    } catch (e2) {
    }
    if (scripts.includes(script)) {
      const a = ["npm", "run", script];
      if (args.length > 0) {
        a.push("--");
        a.push(...args);
      }
      return a;
    }
    return ["npx", script, ...args];
  }
};

// src/package-manager-bindings/yarn.ts
var Yarn = class Yarn2 {
  static {
    __name(this, "Yarn");
  }
  static {
    this.cwd = process.cwd();
  }
  static async execute(...command) {
    return exec(command[0], command.slice(1), { cwd: Yarn2.cwd });
  }
  static {
    this.label = "yarn";
  }
  static setCwd(cwd) {
    Yarn2.cwd = cwd;
  }
  static install(pkg) {
    const args = [];
    args.push(pkg);
    return Yarn2.run("add", ...args);
  }
  static installDev(pkg) {
    const args = ["-D"];
    args.push(pkg);
    return Yarn2.run("add", ...args);
  }
  static async run(script, ...args) {
    return Yarn2.execute(...await Yarn2.generateCommand(script, ...args));
  }
  static async generateCommand(script, ...args) {
    return ["yarn", script, ...args];
  }
};

// src/package-manager-bindings/get-package-manager.ts
var getPackageManager = /* @__PURE__ */ __name((pm) => {
  if (pm === "yarn") return Yarn;
  if (pm === "npm") return Npm;
  if (pm === "bun") return BunPM;
  OutputManager.staticLine([`Invalid package manager argument: (${pm})`]);
  throw new Error(`Invalid package manager argument: (${pm})`);
}, "getPackageManager");

// src/utilities/find-project-root.ts
var import_promises4 = __toESM(require("fs/promises"));
var import_os = __toESM(require("os"));
var import_path7 = __toESM(require("path"));
var isWindows = import_os.default.platform() === "win32";
var findProjectRoot = /* @__PURE__ */ __name(async () => {
  let location = import_path7.default.resolve(__dirname, "..");
  while (true) {
    if (isWindows && location.length < 4 || location.length < 2) {
      throw new Error("Project root directory not found!");
    }
    const files = await import_promises4.default.readdir(location);
    if (files.some((f) => f === "package.json")) {
      const fpath = import_path7.default.resolve(location, "package.json");
      const packagejson = await import_promises4.default.readFile(fpath, "utf8").then((f) => JSON.parse(f));
      if (packagejson.name !== "git-hook-tasks") {
        return location;
      }
    }
    location = import_path7.default.resolve(location, "..");
  }
}, "findProjectRoot");

// src/commands/install.ts
var InstallCommand = /* @__PURE__ */ __name((cmd) => {
  const selectedPm = cmd.option(PM);
  return async () => {
    const pm = getPackageManager(selectedPm.value);
    const cwd = await findProjectRoot();
    pm.setCwd(cwd);
    createConfig(cwd, selectedPm.value);
    await pm.run("husky", "install");
    await Promise.all([
      pm.run(
        "husky",
        "add",
        ".husky/pre-commit",
        parseArgs(await pm.generateCommand("git-hook-tasks", "pre-commit"))
      ),
      pm.run(
        "husky",
        "add",
        ".husky/pre-push",
        parseArgs(await pm.generateCommand("git-hook-tasks", "pre-push"))
      ),
      pm.run(
        "husky",
        "add",
        ".husky/post-commit",
        parseArgs(await pm.generateCommand("git-hook-tasks", "post-commit"))
      )
    ]);
    await Promise.all([
      exec("git", ["add", ".husky/pre-commit"], { cwd }),
      exec("git", ["add", ".husky/pre-push"], { cwd }),
      exec("git", ["add", ".husky/post-commit"], { cwd })
    ]);
  };
}, "InstallCommand");

// src/utilities/execute-hooks.ts
var import_chalk5 = __toESM(require_source());
var import_promises7 = __toESM(require("fs/promises"));
var import_path11 = __toESM(require("path"));

// src/utilities/loading-line.ts
var import_chalk = __toESM(require_source());
var import_strip_ansi = __toESM(require_strip_ansi());
var SUCCESS_ICON = `[${import_chalk.default.green("\u2713")}]`;
var FAILURE_ICON = `[${import_chalk.default.red("\u2715")}]`;
var TIMEFRAMES = {
  ".  ": ".. ",
  ".. ": "...",
  "...": ".  ",
  [SUCCESS_ICON]: SUCCESS_ICON,
  [FAILURE_ICON]: FAILURE_ICON
};
var loadingLine = /* @__PURE__ */ __name((label, progress) => {
  const line = OutputManager.dynamicLine([
    ".  ",
    label,
    `(${import_chalk.default.blue(progress)})`
  ]);
  const loadingInterval = setInterval(() => {
    line.update(([lineLoader, lineLabel, progress2]) => [
      TIMEFRAMES[lineLoader],
      lineLabel,
      progress2
    ]);
  }, 700);
  const finishSuccess = /* @__PURE__ */ __name(() => {
    clearInterval(loadingInterval);
    line.update(([, lineLabel]) => [SUCCESS_ICON, lineLabel]);
    line.close();
  }, "finishSuccess");
  const finishFailure = /* @__PURE__ */ __name(() => {
    clearInterval(loadingInterval);
    line.update(([, lineLabel, progress2]) => [
      FAILURE_ICON,
      lineLabel,
      progress2 ? `(${import_chalk.default.red((0, import_strip_ansi.default)(progress2).slice(1, -1))})` : void 0
    ]);
    line.close();
  }, "finishFailure");
  const updateProgress = /* @__PURE__ */ __name((progress2) => {
    line.update(([lineLoader, lineLabel]) => [
      lineLoader,
      lineLabel,
      `(${import_chalk.default.blue(progress2)})`
    ]);
  }, "updateProgress");
  return {
    finishSuccess,
    finishFailure,
    updateProgress
  };
}, "loadingLine");

// src/utilities/on-all-task-success.ts
var import_chalk2 = __toESM(require_source());
var onAllTasksSuccess = /* @__PURE__ */ __name(() => {
  OutputManager.staticLine([
    import_chalk2.default.greenBright("\nAll git hook tasks finished successfully!\n")
  ]);
}, "onAllTasksSuccess");

// src/utilities/operation-error.ts
var import_chalk3 = __toESM(require_source());
var OperationError = class extends Error {
  constructor(data, noPrint = false) {
    super("Operation Error");
    this._isOperationError = true;
    if (!noPrint) {
      OutputManager.staticLine(["\n"]);
      OutputManager.staticLine([data]);
      OutputManager.staticLine(["\n"]);
      OutputManager.staticLine([
        import_chalk3.default.redBright("Git hook task has failed. Exiting.")
      ]);
    }
  }
  static {
    __name(this, "OperationError");
  }
  static isOperationError(e2) {
    if ("_isOperationError" in e2) {
      return e2._isOperationError === true;
    }
    return false;
  }
};
var PostponedOperationError = class extends Error {
  constructor(errorData) {
    super("Operation Error");
    this._isPostponedOperationError = true;
    this.errorData = errorData;
  }
  static {
    __name(this, "PostponedOperationError");
  }
  static isPostponedOperationError(e2) {
    if ("_isPostponedOperationError" in e2) {
      return e2._isPostponedOperationError === true;
    }
    return false;
  }
  static print(por) {
    OutputManager.staticLine(["\n"]);
    OutputManager.staticLine([por.errorData]);
    OutputManager.staticLine(["\n"]);
  }
};

// src/utilities/run-script-task.ts
var import_chalk4 = __toESM(require_source());
var import_path10 = __toESM(require("path"));

// src/utilities/console-interceptor.ts
var ConsoleInterceptor = class _ConsoleInterceptor {
  constructor() {
    this.buffer = [];
  }
  static {
    __name(this, "ConsoleInterceptor");
  }
  static {
    this.originals = {
      log: console.log,
      error: console.error,
      info: console.info,
      warn: console.warn,
      debug: console.debug,
      clear: console.clear,
      table: console.table
    };
  }
  static restore() {
    console.clear = this.originals.clear;
    console.debug = this.originals.debug;
    console.error = this.originals.error;
    console.info = this.originals.info;
    console.log = this.originals.log;
    console.table = this.originals.table;
    console.warn = this.originals.warn;
  }
  static intercept() {
    const interceptor = new _ConsoleInterceptor();
    console.clear = (...args) => interceptor.intercept("clear", args);
    console.debug = (...args) => interceptor.intercept("debug", args);
    console.error = (...args) => interceptor.intercept("error", args);
    console.info = (...args) => interceptor.intercept("info", args);
    console.log = (...args) => interceptor.intercept("log", args);
    console.table = (...args) => interceptor.intercept("table", args);
    console.warn = (...args) => interceptor.intercept("warn", args);
    return interceptor;
  }
  intercept(loglevel, args) {
    this.buffer.push([loglevel, args]);
  }
  read() {
    return [...this.buffer];
  }
};

// src/utilities/prepare-ts-file.ts
var import_promises6 = __toESM(require("fs/promises"));

// node_modules/node-os-walk/dist/esm/walk.mjs
var import_path8 = __toESM(require("path"), 1);

// node_modules/node-os-walk/dist/esm/read-dir.mjs
var import_promises5 = __toESM(require("fs/promises"), 1);
async function readDir(root, ignoreErrors) {
  try {
    const dirEntries = await import_promises5.default.readdir(root, { withFileTypes: true });
    const directories = [];
    const files = [];
    for (const entry of dirEntries) {
      if (entry.isDirectory()) {
        directories.push(entry);
      } else if (entry.isFile()) {
        files.push(entry);
      }
    }
    return [root, directories, files];
  } catch (e2) {
    if (ignoreErrors)
      return [root, [], []];
    throw e2;
  }
}
__name(readDir, "readDir");

// node_modules/node-os-walk/dist/esm/walk.mjs
async function* walk(root, options = {}) {
  var _a6, _b2;
  (_a6 = options.followSymlinks) != null ? _a6 : options.followSymlinks = false;
  (_b2 = options.ignoreErrors) != null ? _b2 : options.ignoreErrors = false;
  const result = await readDir(root, options.ignoreErrors);
  yield result;
  const [currentRoot, subDirectories] = result;
  for (const directory of subDirectories) {
    if (!options.followSymlinks && directory.isSymbolicLink())
      continue;
    const subDirPath = import_path8.default.resolve(currentRoot, directory.name);
    for await (const result2 of walk(subDirPath, options)) {
      yield result2;
    }
  }
}
__name(walk, "walk");

// src/utilities/prepare-ts-file.ts
var import_path9 = __toESM(require("path"));
var prepareTsFile = /* @__PURE__ */ __name(async (pm, cwd, location) => {
  const p = import_path9.default.parse(location);
  const cacheDir = import_path9.default.resolve(
    cwd,
    "node_modules/.cache/git-hook-tasks",
    p.name
  );
  await import_promises6.default.mkdir(cacheDir, { recursive: true });
  await pm.run(
    "tsc",
    location,
    "-m",
    "commonjs",
    "--noImplicitUseStrict",
    "--esModuleInterop",
    "--skipLibCheck",
    "--allowJs",
    "--incremental",
    "--tsBuildInfoFile",
    import_path9.default.join(cacheDir, "tsbuildinfo"),
    "--outDir",
    cacheDir
  );
  for await (const [root, _, files] of walk(cacheDir)) {
    for (const file of files) {
      if (import_path9.default.extname(file.name) === ".js") {
        const filepath = import_path9.default.join(root, file.name);
        const originalDirPath = import_path9.default.dirname(filepath).replace(cacheDir, p.dir);
        let fileContent = await import_promises6.default.readFile(filepath, {
          encoding: "utf-8"
        });
        if (fileContent.startsWith("__dirname =")) {
          fileContent = fileContent.replace(
            /^__dirname\s=\s.+?;/,
            `__dirname = ${JSON.stringify({
              path: originalDirPath
            })}.path;`
          );
        } else {
          fileContent = `__dirname = ${JSON.stringify({
            path: originalDirPath
          })}.path;
` + fileContent;
        }
        await import_promises6.default.writeFile(filepath, fileContent, { encoding: "utf-8" });
      }
    }
  }
  return import_path9.default.join(cacheDir, p.name + ".js");
}, "prepareTsFile");

// src/utilities/run-script-task.ts
var runScriptTask = /* @__PURE__ */ __name(async (pm, cwd, scriptLocation, onProgress = (msg) => {
}, outputManager = OutputManager) => {
  const scriptExt = import_path10.default.extname(scriptLocation);
  onProgress("identifying file type");
  if (![".js", ".jsx", ".ts", ".tsx"].includes(scriptExt)) {
    throw new Error(
      `Unsupported script file type: ${scriptLocation}
Script must be a JavaScript file.`
    );
  }
  const isTsFile = [".ts", ".tsx"].includes(scriptExt);
  if (isTsFile) {
    onProgress("transpiling to js");
  }
  const scriptAbsPath = isTsFile ? await prepareTsFile(pm, cwd, import_path10.default.resolve(cwd, scriptLocation)) : import_path10.default.resolve(cwd, scriptLocation);
  const scriptLogs = ConsoleInterceptor.intercept();
  try {
    onProgress("loading script");
    const script = require(scriptAbsPath);
    onProgress("executing");
    if ("default" in script && typeof script["default"] === "function") {
      await script["default"](onProgress);
    }
    return null;
  } catch (e2) {
    for (const [level, log] of scriptLogs.read()) {
      const color = level === "error" ? import_chalk4.default.redBright : level === "warn" ? import_chalk4.default.yellow : (a) => a;
      switch (level) {
        case "clear":
          break;
        default:
          outputManager.staticLine(
            [
              import_path10.default.parse(scriptLocation).name + ":",
              ...log.map((elem) => color(elem.toString()))
            ],
            " "
          );
      }
    }
    return e2;
  } finally {
    ConsoleInterceptor.restore();
  }
}, "runScriptTask");

// src/utilities/execute-hooks.ts
var onTaskStart = /* @__PURE__ */ __name(() => OutputManager.staticLine([import_chalk5.default.green("\nRunning Git Hook Tasks\n")]), "onTaskStart");
var executeHooks = /* @__PURE__ */ __name(async (pm, cwd, config, hookLabel) => {
  if (config.hooks) {
    const hook = config.hooks[hookLabel];
    if (hook) {
      if (typeof hook === "string") {
        onTaskStart();
        const files = await import_promises7.default.readdir(hook);
        for (const scriptFile of files) {
          const line = loadingLine(import_path11.default.basename(scriptFile), "starting");
          const err = await runScriptTask(
            pm,
            cwd,
            import_path11.default.resolve(cwd, hook, scriptFile),
            line.updateProgress
          );
          if (!err) {
            line.finishSuccess();
          } else {
            line.finishFailure();
            throw new OperationError(err.message);
          }
        }
        onAllTasksSuccess();
      } else {
        if (hook.length > 0) {
          onTaskStart();
        }
        for (const task of hook) {
          if ("script" in task) {
            const line = loadingLine(task.name, "running script");
            try {
              await pm.run(...task.script.split(" "));
              line.finishSuccess();
            } catch (e2) {
              line.finishFailure();
              throw new OperationError(e2.message);
            }
          } else {
            const line = loadingLine(task.name, "starting");
            const err = await runScriptTask(
              pm,
              cwd,
              task.taskFile,
              line.updateProgress
            );
            if (!err) {
              line.finishSuccess();
            } else {
              line.finishFailure();
              throw new OperationError(err.message);
            }
          }
        }
        if (hook.length > 0) {
          onAllTasksSuccess();
        }
      }
    }
  }
}, "executeHooks");

// src/utilities/exit-on-throw.ts
var runTasks = /* @__PURE__ */ __name(async (fn) => {
  process.stdout.write("\x1B[?25l");
  process.on("exit", function() {
    process.stdout.write("\x1B[?25h");
  });
  process.on("SIGINT", async function() {
    process.exit(1);
  });
  try {
    await fn();
  } catch (e2) {
    if (!(e2 instanceof Error && OperationError.isOperationError(e2))) {
      new OperationError(`${e2.message}`);
    }
    await new Promise((r) => setTimeout(r, 1e3));
    process.exit(1);
  }
}, "runTasks");

// src/utilities/parallel-tasks/execute-hooks-in-parallel.ts
var import_async_await_queue = __toESM(require_cjs());
var import_chalk6 = __toESM(require_source());
var import_promises8 = __toESM(require("fs/promises"));
var import_os2 = __toESM(require("os"));
var import_path13 = __toESM(require("path"));

// src/utilities/parallel-tasks/run-task-worker.ts
var import_node_worker_threads = require("node:worker_threads");
var import_path12 = __toESM(require("path"));

// src/utilities/parallel-tasks/worker-events.ts
var createListener = /* @__PURE__ */ __name((event, handler) => {
  return [
    "message",
    (data) => {
      if (typeof data === "object" && data !== null && "topic" in data && data.topic === event) {
        handler(data.payload);
      }
    }
  ];
}, "createListener");

// src/utilities/parallel-tasks/run-task-worker.ts
var runTaskWorker = /* @__PURE__ */ __name((pm, cwd, scriptPath, name) => {
  return new Promise((resolve, reject) => {
    const w = new import_node_worker_threads.Worker(import_path12.default.resolve(__dirname, "./task.worker.js"), {
      workerData: {
        cwd,
        scriptPath,
        packageManager: pm.label
      }
    });
    const line = loadingLine(name, "starting");
    const close = /* @__PURE__ */ __name((success) => {
      w.removeAllListeners();
      w.terminate();
      if (success) {
        line.finishSuccess();
      } else {
        line.finishFailure();
      }
    }, "close");
    w.addListener(
      ...createListener("newLine" /* NEW_LINE */, ({ content, separator }) => {
        OutputManager.staticLine(content, separator);
      })
    );
    w.addListener(
      ...createListener("progress" /* PROGRESS */, (progress) => {
        line.updateProgress(progress);
      })
    );
    w.addListener("error" /* ERROR */, (err) => {
      close(false);
      reject(err);
    });
    w.addListener(
      ...createListener("finishFailure" /* FINISH_FAILURE */, (err) => {
        close(false);
        reject(new PostponedOperationError(err.message));
      })
    );
    w.addListener(
      ...createListener("finishSuccess" /* FINISH_SUCCESS */, () => {
        close(true);
        resolve();
      })
    );
  });
}, "runTaskWorker");

// src/utilities/parallel-tasks/execute-hooks-in-parallel.ts
var onTaskStart2 = /* @__PURE__ */ __name(() => OutputManager.staticLine([import_chalk6.default.green("\nRunning Git Hook Tasks\n")]), "onTaskStart");
var executeHooksInParallel = /* @__PURE__ */ __name(async (pm, cwd, config, hookLabel) => {
  if (config.hooks) {
    const hook = config.hooks[hookLabel];
    if (hook) {
      const queue = new import_async_await_queue.Queue(
        config.parallelPoolSize ?? Math.max(1, import_os2.default.cpus().length - 1)
      );
      const errors = [];
      const processErrors = /* @__PURE__ */ __name(() => {
        for (const err of errors) {
          if (PostponedOperationError.isPostponedOperationError(err)) {
            PostponedOperationError.print(err);
          } else {
            new OperationError(`${err.message}`);
          }
        }
        OutputManager.staticLine([
          import_chalk6.default.redBright("Some Git hook tasks have failed. Exiting.")
        ]);
        throw new OperationError("", true);
      }, "processErrors");
      if (typeof hook === "string") {
        onTaskStart2();
        const files = await import_promises8.default.readdir(hook);
        for (const scriptFile of files) {
          const name = import_path13.default.basename(scriptFile);
          queue.run(
            () => runTaskWorker(
              pm,
              cwd,
              import_path13.default.resolve(cwd, hook, scriptFile),
              name
            ).catch((e2) => {
              errors.push(e2);
            })
          );
        }
        await queue.flush();
        if (errors.length === 0) {
          onAllTasksSuccess();
        } else {
          return processErrors();
        }
      } else {
        const aloneScripts = [];
        if (hook.length > 0) {
          onTaskStart2();
        }
        for (const task of hook) {
          if ("script" in task) {
            if (task.mustRunAlone) {
              aloneScripts.push(async () => {
                const line = loadingLine(task.name, "running script");
                try {
                  await pm.run(...task.script.split(" "));
                  line.finishSuccess();
                } catch (e2) {
                  line.finishFailure();
                  throw new OperationError(e2.message);
                }
              });
              continue;
            }
            queue.run(() => {
              const line = loadingLine(task.name, "running script");
              return pm.run(...task.script.split(" ")).then(() => {
                line.finishSuccess();
              }).catch((e2) => {
                line.finishFailure();
                errors.push(e2);
              });
            });
          } else {
            if (task.mustRunAlone) {
              aloneScripts.push(async () => {
                const line = loadingLine(task.name, "starting");
                const err = await runScriptTask(
                  pm,
                  cwd,
                  task.taskFile,
                  line.updateProgress
                );
                if (!err) {
                  line.finishSuccess();
                } else {
                  line.finishFailure();
                  throw new OperationError(err.message);
                }
              });
              continue;
            }
            queue.run(
              () => runTaskWorker(pm, cwd, task.taskFile, task.name).catch((e2) => {
                errors.push(e2);
              })
            );
          }
        }
        await queue.flush();
        if (errors.length > 0) {
          return processErrors();
        }
        for (const aloneScript of aloneScripts) {
          await aloneScript();
        }
        if (hook.length > 0) {
          onAllTasksSuccess();
        }
      }
    }
  }
}, "executeHooksInParallel");

// src/commands/postcommit.ts
var PostCommitCommand = /* @__PURE__ */ __name(() => {
  return async () => {
    await runTasks(async () => {
      const cwd = await findProjectRoot();
      const config = await readConfig(cwd);
      const pm = getPackageManager(config.packageManager);
      pm.setCwd(cwd);
      if (config.parallel === true || typeof config.parallel === "object" && config.parallel["post-commit"] === true) {
        await executeHooksInParallel(pm, cwd, config, "post-commit");
      } else {
        await executeHooks(pm, cwd, config, "post-commit");
      }
    });
  };
}, "PostCommitCommand");

// src/commands/precommit.ts
var PreCommitCommand = /* @__PURE__ */ __name((cmd) => {
  return async () => {
    await runTasks(async () => {
      const cwd = await findProjectRoot();
      const config = await readConfig(cwd);
      const pm = getPackageManager(config.packageManager);
      pm.setCwd(cwd);
      if (config.parallel === true || typeof config.parallel === "object" && config.parallel["pre-commit"] === true) {
        await executeHooksInParallel(pm, cwd, config, "pre-commit");
      } else {
        await executeHooks(pm, cwd, config, "pre-commit");
      }
    });
  };
}, "PreCommitCommand");

// src/commands/prepush.ts
var PrePushCommand = /* @__PURE__ */ __name(() => {
  return async () => {
    await runTasks(async () => {
      const cwd = await findProjectRoot();
      const config = await readConfig(cwd);
      const pm = getPackageManager(config.packageManager);
      pm.setCwd(cwd);
      if (config.parallel === true || typeof config.parallel === "object" && config.parallel["pre-push"] === true) {
        await executeHooksInParallel(pm, cwd, config, "pre-push");
      } else {
        await executeHooks(pm, cwd, config, "pre-push");
      }
    });
  };
}, "PrePushCommand");

// src/bin/bin.ts
index_default.configure((main) => {
  OutputManager.setMaxFps(2.86);
  main.setName("git-hook-tasks");
  main.setDescription(
    "A runner for git hooks with support for parallel tasks."
  );
  main.command("install", InstallCommand);
  main.command("pre-commit", PreCommitCommand);
  main.command("pre-push", PrePushCommand);
  main.command("post-commit", PostCommitCommand);
}).run();
