#  Structure of your web site

README.md -- this file

## Common
Files in the common directory are loaded by both the server and the client. Meteor actually loads files anywhere other than server, client, public and tests into both client and server, but we prefer to have an explicit directory for shared files.
* lib -- Gets loaded first
 * config -- Your site's configuration. Feel free to edit, but keep the structure.

## Server
Files used by the Meteor server. 
* lib -- server files that are loaded first

## Client
Files loaded into the client, the browser.
* lib -- client files that are loaded first

* css -- CSS files
 * style.css -- general CSS file. Feel free to edit.
 * spacelab.css -- The theme you chose for your site. Will probably be a different name. Change themes by replacing this file by one of the others in the XXX directory

* vendor -- Third party libraries
 * router -- Library to route to the correct page on your site https://github.com/tmeasday/meteor-router
  * router.js
  * router\_helpers.js
  * page.js

* js -- javascript files 
 * router.js -- loads the routes/pages for your site and adjusts the menu to show which page you are on

* html -- HTML files
 * layout -- HTML pages that control the layout of your site
  * header.html -- The header of your pages
  * footer.html -- The footer of your pages
  * main.html -- The main page that includes the others
  * login.html -- Display the Meteor login/signup
  * home.html -- Your home page
 * left.html -- left column. Not all layouts will have this
  * template.html -- A template your can adjust to create new pages
 * pages -- The pages for your site. Names depend on what you chose in the Wizard
  * about.html
  * contact.html
  * product.html

## public
* images --  put your images in here
* doc -- put your documentation in here
* robots.txt -- controls how spiders behave when they get to your web site: http://en.wikipedia.org/wiki/Robots\_exclusion\_standard
* themes -- other themes that you can use for your site


# Adding a new page

Let's say you want to add a new web page to your site, support.html

* Open html/layout/template.html 
* Copy the HTML into your clipboard
* Click on new file
* Enter 'support.html' as the name and put it under html/pages directory
* Paste into the file from your clipboard
* Change the template name to devwikSupport. Make any other changes to the HTML that you'd like and save the page.
* Go into common/lib/config.js and add a new entry. It should look like this. The second part needs to correspond to the template name in the previous step.
 *  '/support': 'devwikSupport',
* Finally, open client/html/layout/header.html and add an entry for the menu:
 * `<li><a href="/support">Support</a></li>`

# Changing your theme

Your theme is in client/css and will have a name such as spacelab.css. Just remove it and copy over one of the files in public/themes
