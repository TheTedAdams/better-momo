(function($) {
	var modules = [],
		css = ''; // All module styles can be added to this string variable.

	/*******************
	 * DECLARE MODULES *
	 *******************/
	/** Module code will be executed in the order in which it is added to the modules array **/

	/*
	 * MODULE: Day Correction
	 * DESCRIPTION: Corrects current day for those not living in NZ
	 * 				Should run BEFORE Time Tracking module
	 */
	modules.push(function DayCorrection() {
		// TODO: Move to correct week (Friday in US starts at wrong week)
		// Remove current day
		$('.Today').removeClass('Today');
		$('.Red:not(.DayTotal:last-child .Red)').removeClass('Red');
		$('.Day img[src$=On.gif]').each(function() {
			var $t = $(this);
			$t.attr('src', $t.attr('src').replace('On.gif', '.gif'));
		});

		// Add localized day
		var t = new Date(),
			y = '' + t.getFullYear(),
			m = ('0' + (t.getMonth() + 1)).slice(-2),
			d = ('0' + t.getDate()).slice(-2);
		$('input[id$=' + y + m + d + ']').addClass('Today');
		var e = $('.Today:first').parent(),
			i = e.parent().children().index(e);
		$('.Date:nth-child(' + i + '),.DayTotal:nth-child(' + (i + 1) + ')').each(function() {
			var $t = $(this);
			$t.html('<span class="Red">' + $t.html() + '</span>');
		});
		var day;
		switch (t.getDay()) {
			case 0:
				day = 'Sunday';
				break;
			case 1:
				day = 'Monday';
				break;
			case 2:
				day = 'Tuesday';
				break;
			case 3:
				day = 'Wednesday';
				break;
			case 4:
				day = 'Thursday';
				break;
			case 5:
				day = 'Friday';
				break;
			case 6:
				day = 'Saturday';
				break;
		}
		$('.Day img[src$=' + day + '.gif]').each(function() {
			var $t = $(this);
			$t.attr('src', $t.attr('src').replace('.gif', 'On.gif'));
		});
	});


	/*
	 * MODULE: Time Tracking
	 * DESCRIPTION: Adds functionality to MOMO to track time during the day
	 */
	modules.push(function TimeTracking () {
		// Module Variables
		var activeTimer = 0,
			interval = 360000;

		// Module Styles
		css += ".js-trackTime { cursor:pointer;display:inline-block;vertical-align:middle;width:12px;height:12px;background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABxSURBVChTY6AE+EAx0SABiP8DcT8Qc4AECAGYBhA+D8QaQIwBmKA0OjAA4tNAnALm4QDINiDj5UAsAMRggMsGZCADxERp+APELUDsCMQPQALoANlJj4HYAYgxADYbNgCxIRAfAPPwgAggzoEwqQYYGACqahYQId2KYAAAAABJRU5ErkJggg==') no-repeat center center }";
		css += ".js-trackTime.active { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAjSURBVChTYxj8YD8Q/wfiBCgGsUFicMAEpYkGw0HDoAMMDADrZgRHMFH1hQAAAABJRU5ErkJggg=='); }";

		// Module Code
		addButtons();

		//TODO: Add click handlers to last week and next week to call addButtons

		function addButtons() {
			$('input[type=text].Today').each(function() {
				var $t = $(this),
					$e = $('<span class="js-trackTime"></span>');
				$e.data('timeInput', this); // Store associated input in data for button
				$t.closest('td.Time').append($e); // Add buttons
			});
			$('.js-trackTime').click(function(e) {
				var $t = $(this),
					$i = $($t.data('timeInput'));
				window.clearInterval(activeTimer); // Stop iterating old time
				if($t.hasClass('active')) {
					$t.removeClass('active');
					$i.focus().blur(); // Sloppy way to trigger existing comment code
					return;
				}
				var $a = $('.js-trackTime.active');
				$($a.data('timeInput')).focus().blur(); // Sloppy way to trigger existing comment code
				$a.removeClass('active');
				$t.addClass('active');
				activeTimer = window.setInterval(function() {
					$i.val(+$i.val() + 1);
				}, interval);
			});
		}
	});

	/***************
	 * RUN MODULES *
	 ***************/
	// Execute Modules
	while(modules.length)
		modules.shift().call();

	// Add Styles
	var head = document.head || document.getElementsByTagName('head')[0],
    	style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet)
		style.styleSheet.cssText = css;
	else
		style.appendChild(document.createTextNode(css));
	head.appendChild(style); // Add custom style element to document
})(jQuery);