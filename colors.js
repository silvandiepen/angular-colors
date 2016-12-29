/*!
 * angular-ratio.js v0.0.1 - A standalone AngularJS implementation to resize elements into certain ratios
 * Copyright (c) 2016 Sil van Diepen - http://github.com/silvandiepen/angular-ratio
 * License: MIT
*/

(function(window, angular, undefined) {
  angular.module('colors',[])
    .service('colors', [function() {
        'use strict';

        var self = this;

        // RGB to CMYK

        self.hexToCmyk = function hexToCmyk(hex) {
            var tint = tint | 'all';
            var rgb = self.hexToRgb(hex);
            var r, g, b, c, m, y, max, k;
            r = rgb.r / 255;
            g = rgb.g / 255;
            b = rgb.b / 255;
            max = Math.max(r, g, b);
            k = 1 - max;

            if (k !== 1) {
                c = (1 - r - k) / (1 - k);
                m = (1 - g - k) / (1 - k);
                y = (1 - b - k) / (1 - k);
            } else {
                c = 0;
                m = 0;
                y = 0;
            }

            var color = {
                cyan: parseInt(c),
                magenta: parseInt(m),
                yellow: parseInt(y),
                black: parseInt(k)
            };
            return color;
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
                    if (validHex.indexOf(hex.charAt(i)) != -1) {
                        hex += input.charAt(i);
                    } else {
                        pass = false;
                    }
                }
                if (pass) {
                  return true;
                }
            }
        };
        
        self.returnHex = function isHex(input) {
					if(self.isHex(input)){
						if (hex.charAt(0) === '#') {
	           return input.substr(1, 7);
            } else {
	           return input;
	          }
					} else {
						return false;
					}
        };
        
        return self;

    }]);
    
})(window, window.angular);
