define([
    'jquery'
], function($){
    (function( $ ) {
        function validColor (color) {
            return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(color);
        }

        function colorLuminance(hex, lum) {
            hex = String(hex).replace(/[^0-9a-f]/gi, '');

            if (hex.length < 6) {
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }

            lum = lum || 0;

            var rgb = '#';
            var c;

            for (var i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ('00' + c).substr(c.length);
            }

            return rgb;
        }

        $.fn.toggler = function () {
            return this.each(function () {
                var input = $(this);
                var checked = input.prop('checked');
                var position = $(this).data('toggle-position') || '';
                var background = $(this).data('toggle-color') || '';
                var toggle = $('<div class="toggle"><div class="toggle-dot"></div></div>');

                input.addClass('toggler');

                $(this).hide().wrap('<div class="toggle-wrapper ' + position + '"></div>')
                              .after(toggle);

                toggle.click(function () {
                    checked = !checked;
                    input.prop('checked', checked);

                    if (checked && validColor(background)) {
                        toggle.css('background-color', colorLuminance(background, 0.3))
                              .find('.toggle-dot').css('background-color', background);
                    } else {
                        toggle.css('background-color', '')
                              .find('.toggle-dot').css('background-color', '');
                    }

                });
            });
        };

    }( $ ));

    return $;
});
