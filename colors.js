/*!
 * angular-ratio.js v0.0.1 - A standalone AngularJS implementation to resize elements into certain ratios
 * Copyright (c) 2016 Sil van Diepen - http://github.com/silvandiepen/angular-ratio
 * License: MIT
 */

(function(window, angular, undefined) {
    angular.module('colors', [])
        .service('colors', [function() {
            'use strict';

            var self = this;

            // Variables
            var validHex = '01234567890ABCDEFabcdef';

            //	define colors
            function CMYK(c, m, y, k) {
                if (c <= 0) {
                    c = 0;
                }
                if (m <= 0) {
                    m = 0;
                }
                if (y <= 0) {
                    y = 0;
                }
                if (k <= 0) {
                    k = 0;
                }

                if (c > 100) {
                    c = 100;
                }
                if (m > 100) {
                    m = 100;
                }
                if (y > 100) {
                    y = 100;
                }
                if (k > 100) {
                    k = 100;
                }

                this.c = c;
                this.m = m;
                this.y = y;
                this.k = k;
            }

            function RGB(r, g, b) {
                if (r <= 0) {
                    r = 0;
                }
                if (g <= 0) {
                    g = 0;
                }
                if (b <= 0) {
                    b = 0;
                }

                if (r > 255) {
                    r = 255;
                }
                if (g > 255) {
                    g = 255;
                }
                if (b > 255) {
                    b = 255;
                }

                this.r = r;
                this.g = g;
                this.b = b;
            }

            function HSV(h, s, v) {
                if (h <= 0) {
                    h = 0;
                }
                if (s <= 0) {
                    s = 0;
                }
                if (v <= 0) {
                    v = 0;
                }

                if (h > 360) {
                    h = 360;
                }
                if (s > 100) {
                    s = 100;
                }
                if (v > 100) {
                    v = 100;
                }

                this.h = h;
                this.s = s;
                this.v = v;
            }

            // RGB to CMYK

            self.hexToCmyk = function hexToCmyk(hex) {
                var RGB = self.hexToRgb(hex);
                var result = new CMYK(0, 0, 0, 0);
                var r, g, b;
                r = RGB.red / 255;
                g = RGB.green / 255;
                b = RGB.blue / 255;

                result.k = Math.min(1 - r, 1 - g, 1 - b);
                result.c = (1 - r - result.k) / (1 - result.k);
                result.m = (1 - g - result.k) / (1 - result.k);
                result.y = (1 - b - result.k) / (1 - result.k);

                result.c = Math.round(result.c * 100);
                result.m = Math.round(result.m * 100);
                result.y = Math.round(result.y * 100);
                result.k = Math.round(result.k * 100);

                return result;

            };
            // RGB to HEX

            self.rgbToHex = function rgbToHex(input) {
                var rgb = self.hexToRgb(input);
                var color = (rgb && rgb.length === 3) ? "#" +
                    ("0" + parseInt(rgb[0], 10).toString(16)).slice(-2) +
                    ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                    ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) : '';
                return color;
            };

            // RGB to Pantone

            self.rgbToPantone = function rgbToPantone(input) {
                var color = input;
                return color;
            };

            // Hex to RGB

            self.hexToRgb = function hexToRgb(hex, opacity) {
                var tint = tint | 'all';
                opacity = opacity | 1;
                hex = hex.replace('#', '');
                var color = {
                    red: parseInt(hex.substring(0, 2), 16),
                    green: parseInt(hex.substring(2, 4), 16),
                    blue: parseInt(hex.substring(4, 6), 16)
                };
                return color;
            };


            self.isHex = function isHex(input) {
                if (input.length === 7) {
                    if (input.charAt(0) === '#') {
                        return isValidHex(input.substr(1, 7));
                    } else {
                        return false;
                    }
                } else if (input.length === 6) {
                    return isValidHex(input);
                } else {
                    return false;
                }

                function isValidHex(hex) {
                    var pass = true;
                    for (var i = 0; i < 6; i++) {
                        if (validHex.indexOf(hex.charAt(i)) === -1) {
                            pass = false;
                        }
                    }
                    if (pass) {
                        return true;
                    }
                }
            };

            self.returnHex = function isHex(input) {
                if (self.isHex(input)) {
                    if (input.charAt(0) === '#') {
                        return input.substr(1, 7);
                    } else {
                        return input;
                    }
                } else {
                    return false;
                }
            };

            self.makeArray = function makeList(input) {
                var list;
                if (input.split(' ').length > 0) {
                    return input.split(' ');
                } else if (input.split(',').length > 0) {
                    return input.split(',');
                } else if (input.split(', ').length > 0) {
                    return input.split(', ');
                } else {
                    return false;
                }
            };

            self.isRgb = function isRgb(input, returner) {
	              var rgb = self.makeArray(input);
                if (rgb.length === 3) {
                    var pass = true;
                    angular.forEach(rgb, function(value, key) {
                        if (value > 255 && value < 0) {
                            pass = false;
                        }
                    });
                    if (pass && returner) {
                        return rgb;
                    } else if (pass) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            };
            self.returnRgb = function returnRgb(input) {
                return isRgb(input, true);
            };

            return self;

        }]);

})(window, window.angular);