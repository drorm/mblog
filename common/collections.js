Posts = new Meteor.Collection("Posts");
Tags = new Meteor.Collection("Tags");
if (Meteor.isServer) {
	Tags._ensureIndex({ name : 1}, {unique:true});
}
