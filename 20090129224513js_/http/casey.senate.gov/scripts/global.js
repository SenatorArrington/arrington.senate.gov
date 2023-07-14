var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

initNavIE = function() {
	if (document.all && document.getElementById) {
		nav_root = document.getElementById("nav").firstChild;
		for (i = 0; i < nav_root.childNodes.length; i++) {
			node = nav_root.childNodes[i];
			if (node.id && node.id.indexOf("nav_") != -1) {
				node.onmouseover = function() {
					this.className += " over";
					// hack for IE6 and the page_top select
					if (this.id == "nav_about") if (pt = document.getElementById("page_top")) pt.style.visibility = "hidden";
				}
				node.onmouseout = function() {
					this.className = this.className.replace(" over", "");
					// hack for IE6 and the page_top select
					if (this.id == "nav_about") if (pt = document.getElementById("page_top")) pt.style.visibility = "visible";
				}
			}
		}
	}
}
window.onload = initNavIE;

//var opacity_change;

function validateNewsletterSignup() {
	n = $("notice");
	n.style.display = "none";
	
	var firstName = document.getElementById("newsletter_first_name").value;
	var lastName = document.getElementById("newsletter_last_name").value;
	
	if(firstName=="") {
		n.innerHTML = "Please enter your first name!";
		n.style.display = "block";
		return false;
	}
	
	if(lastName=="") {
	   n.innerHTML = "Please enter your last name!";
		n.style.display = "block";
	    return false;

	}
	
	var e = document.getElementById("newsletter_email").value;

	if (e == "") {
		//alert("Please enter an email address in the field provided!");
		n.innerHTML = "Please enter an email address!";
		n.style.display = "block";
	} else if (e.indexOf("@") == -1 || e.indexOf(".") == -1) {
		//alert("Please enter a valid email address in the field provided!");
		$("notice").innerHTML = "Please enter a valid email address!";
		n.style.display = "block";
	} else {
		$("newsletter_email").disabled = true;
		$("newsletter_first_name").disabled = true;
		$("newsletter_last_name").disabled = true;
		$("sign_me_up").disabled = true;
		$("signup_indicator").style.display = "block";
		/*
		opacity_change = new Fx.Style("signup_indicator", "opacity", { duration:125 });
		opacity_change.start(0,1.0);
		*/
		new Ajax(site_webroot + "cfc_extensions/com/creativengine/newsletter.cfc", {
			postBody: "method=signup&first_name=" + encodeURIComponent(firstName) + "&last_name=" + encodeURIComponent(lastName) + "&email=" + encodeURIComponent(e),
			onComplete: addedEmail,
			evalScripts: true
		}).request();
	}
	return false;
}

function addedEmail(request) {
	//opacity_change.start(1.0,0);
	$("signup_indicator").style.display = "none";
	$("newsletter_email").disabled = false;
	$("newsletter_first_name").disabled = false;
	$("newsletter_last_name").disabled = false;
	$("sign_me_up").disabled = false;
	
	$("confirmed_email").innerHTML = request;
	$("signup_text").style.display = "none";
	$("signup_form").style.display = "none";
	$("signup_confirmation").style.display = "block";
}


function address(which) {
	document.getElementById("addresses").className = "sel_" + which;
}

//font size functions

function Set_Cookie( name, value, expires, path, domain, secure ) {
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	
	/*
	if the expires variable is set, make the correct 
	expires time, the current script below will set 
	it for x number of days, to make it for hours, 
	delete * 24, for minutes, delete * 60 * 24
	*/
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	
	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
	( ( path ) ? ";path=" + path : "" ) + 
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}

// this function gets the cookie, if it exists
function Get_Cookie( name ) {
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}

function CE_LoadPageFont() {
	if(Get_Cookie("font_size")) {
		fs = Get_Cookie("font_size");
		document.body.className = "body_" + fs;
		document.getElementById("supra_nav_links").className = fs;
		
		// IE6 hack
		if (document.all && !window.XMLHttpRequest) {
			CE_FixIE6(fs);
		}
	}
}

function CE_FixIE6(which) {
	document.getElementById("font_select").style.cssText = "background-position:0px 0px";
	document.getElementById("font_select_med").style.cssText = "background-position:0px 0px";
	document.getElementById("font_select_large").style.cssText = "background-position:0px 0px";
	if (which == "") {
		document.getElementById("font_select").style.cssText = "background-position:0px -14px";
	} else {
		document.getElementById("font_select_" + which).style.cssText = "background-position:0px -14px";
	}
}

function CE_SetPageFont(which) {
	document.body.className = "body_" + which;
	document.getElementById("supra_nav_links").className = which;
	document.getElementById("supra_nav_links").setAttribute("className", which);

	// IE6 hack
	if (document.all && !window.XMLHttpRequest) {
		CE_FixIE6(which);
	}
	
	var domain = site_webroot.substring(site_webroot.indexOf("http://") + 7, site_webroot.length - 1);
	Set_Cookie("font_size", which, 1, "/", domain, false);
}

//leaving the senate servers so we have to display this message:
//function openWin(urlToOpen) {
//	window.open("https://web.archive.org/web/20090129224513/http://www.senate.gov/cgi-bin/exitmsg?url=" + urlToOpen);	
//}

function openWin(urlToOpen) {
	window.open(urlToOpen);	
}

//leaving the current site, but staying on senate servers.
function openSenateWin(urlToOpen) {
	window.open(urlToOpen);	
}


}
/*
     FILE ARCHIVED ON 22:45:13 Jan 29, 2009 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:39:07 Jul 14, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 442.125
  exclusion.robots: 0.253
  exclusion.robots.policy: 0.24
  cdx.remote: 0.068
  esindex: 0.011
  LoadShardBlock: 402.119 (3)
  PetaboxLoader3.datanode: 55.462 (4)
  PetaboxLoader3.resolve: 525.662 (2)
  load_resource: 201.164
*/