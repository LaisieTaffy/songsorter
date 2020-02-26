$(document).ready(function() {

	$("#btn-rawtext, .menu-link").hover(function() {
		$(this).css("background-color", "4d0000");
	},function() {
		$(this).css("background-color", "330000");
	});

	$("#fldLeft, #fldMiddleT, #fldRight, #fldMiddleB").hover(function() {
		$(this).css("background-color", "#ff6666");
	}, function() {
		$(this).css("background-color", "ghostwhite");
	});

	$("#menu-restart").click(function() {
		location.reload();
	});

});
