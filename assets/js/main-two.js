(function ($) {
    "use strict";

    jQuery(function () {
        $("#fullpage").fullpage({
            navigation: false,
            scrollingSpeed: 1400,
        });

        var $firstTitle = $('.first-title');  // Target the sticky title element
        var $panelDF = $('.panel.section.df'); // Section where sticky should stop
        var firstTitleOffset = $firstTitle.offset().top; // Get initial offset of the title

        // Function to handle sticky effect
        function handleSticky() {
            var scrollPos = $(window).scrollTop();  // Get the current scroll position
            var panelDFOffset = $panelDF.offset().top; // Get the offset of the df panel

            // If scroll position passes the title element, make it sticky
            if (scrollPos > firstTitleOffset) {
                $firstTitle.addClass('sticky');
            } else {
                $firstTitle.removeClass('sticky');
            }

            // If the user reaches the df panel section, remove the sticky
            if (scrollPos > panelDFOffset - $firstTitle.outerHeight()) {
                $firstTitle.removeClass('sticky');
            }
        }

        // Initialize sticky effect on page load and scroll
        $(window).on('scroll', function () {
            handleSticky();
        });

        // Initial call in case the page is loaded already scrolled
        handleSticky();
    });
})(jQuery);
