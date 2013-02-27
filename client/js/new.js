/*
 * Create or update a post
 */

Template.devwikNew.rendered = function() {
	initEditor();

	var paramId = Devwik.Utils.getURLParameter('id'),
	tagData = [],
	allTags = [],
	tagInput;
	if(paramId) {
		var post = Posts.findOne({_id:paramId});
		if (post) {
			$('#postTitle').val(post.title);
			$('#postContent').val(post.content);
			//Add the ID to the post so we know it's an update
			$("#postForm").append('<div id="' + post._id + '" class="postId"></div>');
			tagData = post.tags;
		}
	}

 tagInput	= $('#tagList').tags({//Create the empty list
			tagData:tagData,
			suggestions:allTags,
			tagClass : 'btn-info'
	});
	console.log(tagData);
	var handle = Tags.find({}).observe({
			added: function (tag) {
				allTags.push(tag.name);
				tagInput = $('#tagList').tags({
						tagData:tagData,
						suggestions:allTags,
						tagClass : 'btn-info'
				});
			}
	});




	//Helper functions

	/**
	 * Save a post. Can be either insert a new one or update existing
	 * 
	 * @param {String} status: Status of the post: PUBLIC, DRAFT, TRASH, etc
	 * 
	 */

	var savePost = function(status) {
		var user = Meteor.user();
		var author = '';
		if(user) {
			author = user.username;
		}
		var postTitle = $('#postTitle').val(),
		postContent = $('#postContent').val(),
		postTags = tagInput.getTags(),
		postId = $('#postForm > .postId').attr('id');
		if (postId) { //update an existing post
			Posts.update({_id: postId}, {title: postTitle, author:author, status:status, content: postContent,
					tags: postTags, updated: new Date()}, function(error, result) {
						if (error) {
							console.log('update error:' + error);
							alert(_.values(error));
							console.log(_.values(error));
						} else {
							var message;
							switch (status) {
							case 'PUBLIC':
								message = 'published';
								break;
							case 'TRASH':
								message = 'trashed';
								break;
							case 'DRAFT':
								message = 'saved';
								break;
							default:
								break;
							}
							Devwik.Utils.message("Post " + message, 5000);
						}
			});
		} else { //create new post
		Posts.insert({title: postTitle, author:author, status:status, content: postContent, 
				tags: postTags, updated: new Date()}, function(error, result) {
					if (error) {
						console.log('insert error:' + error);
						alert(_.values(error));
						console.log(_.values(error));
					} else {
						console.log('insert :' + result);
						//create a div with the id that indicates that we've already inserted once
						$("#postForm").append('<div id="' + result + '" class="postId"></div>');
					}
		});
		}
		saveTags(postTags);
	};

	/**
	 * Save the tags into the db. 
	 * 
	 * @param {Array} tags: array of tags that this post uses
	 * 
	 */
	var saveTags = function(tags) {
		for (var ii = 0;ii< tags.length; ii++) {
			//Inserting all tags. Since there's a unique index, we'll fail to insert existings tags
			Tags.insert({name:tags[ii]});
		}
	};

	Devwik.Utils.clickButton('#saveDraft', function(event) {//when the Save Draft button is clicked
		savePost("DRAFT");
	});

	Devwik.Utils.clickButton('#publish', function(event) {//when the Publish button is clicked
		savePost("PUBLIC");
	});

	Devwik.Utils.clickButton('#trash', function(event) {//when the Trash button is clicked
		savePost("TRASH");
	});


	function initEditor() {
		$('#postContent').tinymce({
				// Location of TinyMCE script
				script_url : '/tinymce/jscripts/tiny_mce/tiny_mce.js',

				// General options
				theme : "advanced",
				skin : "bootstrap",
				plugins : "pagebreak,style,layer,table,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

				// Theme options
				theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
				theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
				theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
				theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
				theme_advanced_toolbar_location : "top",
				theme_advanced_toolbar_align : "left",
				theme_advanced_statusbar_location : "bottom",
				theme_advanced_resizing : true,

				// Example content CSS (should be your site CSS)
				content_css : "css/content.css",

				// Drop lists for link/image/media/template dialogs
				template_external_list_url : "lists/template_list.js",
				external_link_list_url : "lists/link_list.js",
				external_image_list_url : "lists/image_list.js",
				media_external_list_url : "lists/media_list.js",

				// Replace values for the template plugin
				template_replace_values : {
					username : "Some User",
					staffid : "991234"
				}
		});
	}
	};
