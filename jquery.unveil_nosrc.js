/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;
(function($) {

    $.fn.unveil_nosrc = function(threshold, callback) {

        var $w = $(window),
            th = threshold || 0,
            retina = window.devicePixelRatio > 1,
            attrib = retina ? "data-src-retina" : "data-src",
            images = this,
            loaded;

        this.one("unveil_nosrc", function() {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) {
                // Do not set source here, only use event to call cloudinary_update
                //this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
            }
        });

        function unveil_nosrc() {
            var inview = images.filter(function() {
                var $e = $(this);
                // Also preload hidden images, use visibility : hidden instead of display: none;
                //if ($e.is(":hidden")) return;

                var wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();

                return eb >= wt - th && et <= wb + th;
            });

            loaded = inview.trigger("unveil_nosrc");
            images = images.not(loaded);
        }

        $w.on("scroll.unveil_nosrc resize.unveil_nosrc lookup.unveil_nosrc", unveil_nosrc);

        unveil_nosrc();

        return this;

    };

})(window.jQuery || window.Zepto);