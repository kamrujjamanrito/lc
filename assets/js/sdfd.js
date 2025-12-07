	$(function () {
		const panels = $(".panel");
		let isAnimating = false;
		let currentIndex = 0;

		function scrollToPanel(index) {
			if (index < 0) index = 0;
			if (index >= panels.length) index = panels.length - 1;

			isAnimating = true;
			$("html, body")
				.stop()
				.animate(
					{
						scrollTop: $(panels[index]).offset().top,
					},
					800,
					"swing",
					function () {
						isAnimating = false;
						currentIndex = index;
					}
				);
		}

		// Wheel/scroll
		$(window).on("wheel", function (e) {
			if (isAnimating) return;
			const delta = e.originalEvent.deltaY;
			if (delta > 0) {
				scrollToPanel(currentIndex + 1);
			} else {
				scrollToPanel(currentIndex - 1);
			}
			e.preventDefault();
		});

		// Keyboard arrows
		$(window).on("keydown", function (e) {
			if (isAnimating) return;
			if (e.key === "ArrowDown") scrollToPanel(currentIndex + 1);
			if (e.key === "ArrowUp") scrollToPanel(currentIndex - 1);
		});
	});