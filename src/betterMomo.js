(function() {
	var activeTimer = 0;

	var css = ".js-trackTime { cursor:pointer;display:inline-block;vertical-align:middle;width:12px;height:12px;background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABxSURBVChTY6AE+EAx0SABiP8DcT8Qc4AECAGYBhA+D8QaQIwBmKA0OjAA4tNAnALm4QDINiDj5UAsAMRggMsGZCADxERp+APELUDsCMQPQALoANlJj4HYAYgxADYbNgCxIRAfAPPwgAggzoEwqQYYGACqahYQId2KYAAAAABJRU5ErkJggg==') no-repeat center center }" +
			  ".js-trackTime.active { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAjSURBVChTYxj8YD8Q/wfiBCgGsUFicMAEpYkGw0HDoAMMDADrZgRHMFH1hQAAAABJRU5ErkJggg=='); }";

    var head = document.head || document.getElementsByTagName('head')[0],
    	style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet)
		style.styleSheet.cssText = css;
	else
		style.appendChild(document.createTextNode(css));
	head.appendChild(style);

	$('input[type=text]').each(function() {
		var $t = $(this),
			$e = $('<span class="js-trackTime"></span>');

		$e.data('timeInput', this);
		$t.closest('td.Time').append($e);
	});

	$('.js-trackTime').click(function(e) {
		var $t = $(this),
			$i = $($t.data('timeInput'));
		window.clearInterval(activeTimer);
		if($t.hasClass('active')) {
			$t.removeClass('active');
			$i.focus().blur();
			return;
		}
		var $a = $('.js-trackTime.active');
		$($a.data('timeInput')).focus().blur();
		$a.removeClass('active');
		$t.addClass('active');
		activeTimer = window.setInterval(function() {
			$i.val(+$i.val() + 1);
		}, 2000);
	});
})();