/*
 * Home link. Show all  posts
 */
"use strict";

Template.devwikHome.posts = function () {
	//TODO: content is unescaped. Injection issues?
	var tag = Session.get('tagValue');
	if(tag) { //TODO redirect to url like /tags/foo
		return Posts.find({status:'PUBLIC', 'tags' : tag}, {sort: {updated: -1}});
	} else {
		return Posts.find({status:'PUBLIC'}, {sort: {updated: -1}});
	}
};

//When a tag is clicked, only show the posts that contain that tag
function filterTags(tag) {
	Session.set('tagValue', tag);
}



//Display the tag cloud
Template.devwikHome.tags = function () { 
	return Tags.find({}, {sort: {name: 1}});
};



Template.post.helpers ( { 
		//Show relative time for posts
		postDate: function () {
			return (this.updated.toRelativeTime());
		}
});
