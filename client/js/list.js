Template.devwikList.posts = function () {
	var user = Meteor.user(),
		author = '',
		showTrashed = Session.get('showTrashed');

	if(user) {
		author = user.username;
	}
	if(showTrashed) {
		return Posts.find({author:author}, {sort: {updated: -1}});
	} else {
		return Posts.find({author:author, status:{$not:'TRASH'}}, {sort: {updated: -1}});
	}
};

Template.devwikList.rendered = function() {
	$('#showTrashed').on("click", function(event){
		Session.set('showTrashed', $('#showTrashed').is(':checked'));
	});
};

