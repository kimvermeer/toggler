/**
 * toggler.js <https://github.com/kimvermeer/toggler>
 * Copyright (c) 2016 Kim Vermeer
 * @author Kim Vermeer <kimmeeeeeh@gmail.com>
 * @license MIT License <https://github.com/kimvermeer/toggler/blob/master/LICENSE>
 */

function validColor (color) {
    if (!color) { return; }
    return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(color);
}

function hexToRgba(hex, opacity) {
    var c;

    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');

        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }

        c = '0x' + c.join('');
        return 'rgba(' + [(c>>16) & 255, (c>>8) & 255, c & 255].join(',') + ',' + opacity + ')';
    }

    throw new Error('Hex not valid');
}

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.toggler = function () {
        return this.each(function () {
            var input = $(this);
            var checked = input.prop('checked');
            var position = input.data('toggle-position');
            var background = input.data('toggle-color');
            var toggle = $('<div class="toggle"><div class="toggle-dot"></div></div>');

            input.addClass('toggler');

            input.hide()
                 .wrap('<div class="toggle-wrapper"></div>')
                 .after(toggle);

            if (position) {
                input.closest('.toggle-wrapper').addClass(position);
            }

            toggle.on('click', function () {
                checked = !checked;
                input.prop('checked', checked);

                if (checked && validColor(background)) {
                    toggle.css('background-color', hexToRgba(background, '.4'))
                          .find('.toggle-dot')
                          .css('background-color', background);
                } else {
                    toggle.css('background-color', '')
                          .find('.toggle-dot')
                          .css('background-color', '');
                }
            });
        });
    };
}));
