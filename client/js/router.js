Meteor.startup(function() {
	$('.projectName').each(function(element) {
		$(this).html(siteName);
	});
});

Meteor.Router.add(routesMap);

/*
 * Once the page is rendered, make sure the menu bar shows the current menu/page
 */
Template.site.rendered = function() {
	var page = Meteor.Router.page();
	var oldEl = $(".nav li.active"); 

	var currentRoute;
	//Find the route in the table
	_.each((_.keys(routesMap)), function(key) {
		if(page === routesMap[key]) {
			currentRoute = key;
		}
	});

	//Now find the href in the dom
	var href = (".nav li a[href$='" + currentRoute + "']"); 

	oldEl.removeClass('active');
	//The <li> is the parent of the href
	$(href).parent().addClass('active');

	//Match the login colors to the bootstrap theme
	var navbarTextColor = $(".brand").css("color");
	$("#login-name-link").css('color', navbarTextColor);
	$("#login-sign-in-link").css('color', navbarTextColor);
};

