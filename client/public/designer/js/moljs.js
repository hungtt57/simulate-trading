(function($) {
"use strict";


$(document).ready(function(){

	//Modal backdrop fix

	$(document).on('show.bs.modal', '.modal', function () {
		/*var zIndex = Math.max.apply(null, Array.prototype.map.call(document.querySelectorAll('*'), function(el) {
		  return +el.style.zIndex;
		})) + 10;*/
		var zIndex = 1040 + (10 * $('.modal:visible').length);
		$(this).css('z-index', zIndex);
		setTimeout(function() {
			$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
		}, 0);
	});

	$(document).on('hidden.bs.modal', '.modal', function () {
		$('.modal:visible').length && $(document.body).addClass('modal-open');
	});

	//Check if have modal/tab content to show
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
		if (results==null){
		   return null;
		}
		else{
		   return results[1] || 0;
		}
	}
	if ($($.urlParam('modal')).length > 0)
		$($.urlParam('modal')).addClass('ontop').modal('show');
	if ($('.editpromenu *[tabtarget="'+ $.urlParam('tab') +'"]').length > 0)
	{
		var tab = $.urlParam('tab');
		var linktab = ".editpromenu *[tabtarget='"+tab+"']";
		$(".editpromenu li.cur").removeClass("cur");

		if($(linktab).closest("li.wdropdown").length>0)
			$(linktab).closest("li.wdropdown").addClass("cur");
		else
			$(linktab).addClass("cur");

		$(".editprosection").not(tab).css("display", "none");
		$(tab).fadeIn();
	}

	$('[data-toggle="popover"]').popover({
			trigger: 'hover',
			html: true
	  	});
	$(".gallery > a").fancybox();

	$('.bxslider').bxSlider({
	  auto: true
	});

	$().UItoTop({ easingType: 'easeOutCubic' });

	//pop-up fix

	$('body').on('hidden.bs.modal', function () {
		if($('.modal.in').length > 0)
		{
			$('body').addClass('modal-open');
		}
	});

	//Showing panel box on top

	$( ".mainmenu .numnav a" ).click(function() {
			var tab = $(this).attr("paneltarget");
			$(".panelbox").not(tab).css("display", "none");
			$(tab).slideToggle();
	});

	//Showing post owner action
    $( ".owneractionswitch" ).click(function() {
	  $(this).toggleClass("up");
	  $(this).next(".owneraction").slideToggle("fast");
	});

	//Showing post comment area
    $( ".comment" ).click(function() {
	  $(this).parents(".post, li").children(".postcomment").slideToggle( "normal", function() {
	  });
	});

	$( ".comtreply, .comtreplynum" ).click(function() {
	  $(this).parents(".comtcont").children(".commentreply").slideToggle( "normal", function() {
	  });
	});

	//Showing more infosection

	$('.longlist')
	  .find('li:gt(2)')
	  .hide()
	  .end()
	  .append(
		$('<li><a href="#/" class="light">Show more</a></li>').click( function(){
		  $(this).siblings(':hidden').show().end().remove();
		})
	);

	//Longlist show/hide


	$('.longlist-toggle .trigger').click( function(){
		  $(this).closest('.longlist-toggle').toggleClass('showfull');
	});

	//Handle tab menu

	//$(".editpromenu li:not(.wdropdown):not(.link):not(.nolink), .editpromenu .dropdown .dropbtn, .editpromenu .dropdown a")
	$(".editpromenu *[tabtarget]").click(function() {
			$(".editpromenu > li.cur").removeClass("cur");
			if($(this).closest("li.wdropdown").length>0)
				$(this).closest("li.wdropdown").addClass("cur");
			else
				$(this).addClass("cur");
			var tab = $(this).attr("tabtarget");
			$(".editprosection").not(tab).css("display", "none");
			$(tab).fadeIn();
			//$('#calendar').fullCalendar('render');

	});

	$(".editpromenu li.link").click(function() {
		window.location.href = $(this).attr("href");
	});

	$(".weekdaylist li:not(.clearbut)").click(function() {
			$(".weekdaylist li").removeClass("cur");
			$(this).addClass("cur");

	});

	//select fix

	$("select").wrap( "<span class='selectwrap'></span>" );

	//Sign Up

	$('select.membertype, input[type=checkbox].membertype').each(function() {
		var tab = "." + $(this).val();
		$(".membertypeele").not(tab).css("display", "none");
		$(".membertypeele.general").fadeIn();
		$(tab).fadeIn();
	});

	$('input[type=radio].membertype:checked').each(function() {
		var tab = "." + $(this).val();
		$(".membertypeele").not(tab).css("display", "none");
		$(".membertypeele.general").fadeIn();
		$(tab).fadeIn();
	});

	$('.membertype').change(function(e) {
		var tab = "." + $(this).val();
		$(".membertypeele").not(tab).css("display", "none");
		$(".membertypeele.general").fadeIn();
		$(tab).fadeIn();
	});

	$("#formmessage").modal('show');

	$('input[type=checkbox].yesnoselect').each(function() {
		var tab = "." + $(this).attr("grouptarget");
		if ($(this).is(':checked'))
			$(tab).fadeIn();
		else
			$(tab).css("display", "none");
	});
	$('input[type=checkbox].yesnoselect').change(function() {
		var tab = "." + $(this).attr("grouptarget");
		if ($(this).is(':checked'))
			$(tab).fadeIn();
		else
			$(tab).css("display", "none");
	});
	$('select.yesnoselect, input[type=radio].yesnoselect:checked').each(function() {
		if (($(this).is(':checked'))|| ($(this).is('select'))) {
			var tab = "." + $(this).val() + "." + $(this).attr("grouptarget");
		}

		var hiddentab = "." + $(this).attr("grouptarget");
		$(hiddentab).not(tab).css("display", "none");
		$(tab).fadeIn();
	});

	$('select.yesnoselect, input[type=radio].yesnoselect, .membertype').change(function(e) {
		var tab = "." + $(this).val() + "." + $(this).attr("grouptarget");
		var hiddentab = "." + $(this).attr("grouptarget");
		$(hiddentab).not(tab).css("display", "none");
		$(tab).fadeIn();
	});



		$('.time-block')
		  .find('li:gt(4)')
		  .hide()
		  .end()
		  .append(
			$('<li class="showmore"><em>More</em></li>').click( function(){
			  $(this).parents('.location-block').find('.time-block li:hidden').show();
			  $(this).parents('.location-block').find('.showmore').remove();
			})
		);


		$('.calendar:not(.cliniccal) .time-block li:not(.showmore)').wrap('<a href="appointment_step1.html" />');


	//Skin Test

	$('.patientchoose').change(function(e) {
		if ($(this).val() == "1")
		    $(".existpatdele").show();
		else
			$(".existpatdele").hide();
	});

	$('.newpatbut').click(function() {
		$('.newpat').slideToggle();
	});

	$('.conttoggle').click(function() {
		var tab = $(this).attr("conttarget");
		$(tab).slideToggle();
	});
	$('.preinput').each(function() {
		$(this).wrap( '<span class="preinput"></span>' );
		var tab = '<span class="pre">' + $(this).attr("pre") + '</span>';
		$(this).after(tab);
	});
	$('.valueunit').each(function() {
		$(this).wrap( '<span class="unitwrap"></span>' );
		var tab = '<span class="unit">' + $(this).attr("unit") + '</span>';
		$(this).after(tab);
	});


	//dropdown-menu handle
	$(document).on('click', '.dropdown-menu', function (e) {
	  e.stopPropagation();
	});

	//library
	$('.filelist > li > div > input:checkbox').change(function(){
		if($(this).is(':checked'))
       		$(this).parents('li').addClass('selected');
  		else
     		 $(this).parents('li').removeClass('selected')
	});
	$('.libaction a.view').click(function() {
		$(this).toggleClass('list');
		$('.filelist').toggleClass('gridview');
	});
	var head = $(".fancybox-iframe").contents().find("head");
	var css = '<style type="text/css">' +
			  '.ndfHFb-c4YZDc-Wrql6b{display:none}; ' +
			  '</style>';
	$(head).append(css);

	//PREVIEW!
	$(".filelist > li.img").children("div:nth-child(2), div:nth-child(3), div:nth-child(4)").fancybox({
		type: 'image',
		padding: 12,
		beforeLoad: function () {
			var url = $(this.element).parent('li').attr("href");
			this.href = url
		},
		//afterLoad: function() {
            //$(".fancybox-skin").after('<div class="previewmenu"><div class="itemaction">' + $(this.element).siblings( ".itemaction" ).html() + '</div></div>');
        //}
	});
	$(".filelist > li.pdf, .filelist > li.odt").children("div:nth-child(2), div:nth-child(3), div:nth-child(4)").fancybox({
		type: 'iframe',
		padding: 0,
		fitToView: false,
        autoSize: false,
        autoDimensions: false,
		height: 600,
		closeClick: false,
		beforeLoad: function () {
			var url = $(this.element).parent('li').attr("href");
			this.href = "PDFView/index.html#../" + url
		},
		//afterLoad: function() {
        //    $(".fancybox-skin").after('<div class="previewmenu"><div class="itemaction">' + $(this.element).siblings( ".itemaction" ).html() + '</div></div>');
        //}
	});
	$(".filelist > li.video").children("div:nth-child(2), div:nth-child(3), div:nth-child(4)").fancybox({
		autoScale: false,
		type: 'iframe',
		padding: 12,
		closeClick: false,
		beforeLoad: function () {
			var url = $(this.element).parent('li').attr("href");
			this.href = "library_video.html?url=" + url;
		},
		beforeShow: function(){
		   this.width = $('.fancybox-iframe').contents().find('.videopreviewwrap').width();
		   this.height = $('.fancybox-iframe').contents().find('.videopreviewwrap').height();
		  },
		//afterLoad: function() {
            //$(".fancybox-skin").after('<div class="previewmenu"><div class="itemaction">' + $(this.element).siblings( ".itemaction" ).html() + '</div></div>');
        //}
	});
	$(".filelist > li:not(.itemlisthead,.folderitem,.pdf,.img,.video,.odt)").children("div:nth-child(2), div:nth-child(3), div:nth-child(4)").fancybox({
		autoScale: false,
		type: 'iframe',
		padding: 0,
		height: 500,
		closeClick: false,
		beforeLoad: function () {
			var lastClass = $(this.element).parent('li').attr('class').split(' ').pop();
			this.href = "library_preview.html?type=" + lastClass
		},
		//afterLoad: function() {

            //$(".fancybox-skin").after('<div class="previewmenu"><div class="itemaction">' + $(this.element).siblings( ".itemaction" ).html() + '</div></div>');
        //}
	});

	//SNS Share
	$( ".theaction .sns" ).click(function() {
	  $(this).parents(".theaction").children(".snsshare").slideToggle('fast');
	});
	$( ".theaction .share" ).click(function() {
	  $(this).parents(".theaction").children(".washare").slideToggle('fast');
	});

	//Share post
	$( ".postmask .readmore a" ).click(function() {
	  $(this).parents(".postmask").hide();
	  $(this).parents(".sharedpost").css("height", "auto");
	});

	//Video ratio handle

	 $( ".galvideo video" ).bind("loadedmetadata", function () {
        var width = this.videoWidth;
        var height = this.videoHeight;
		if ((height / width) > 1)
	  	$(this).parents(".galvideo").addClass("ver");
      });

	  $( ".showtest").modal('show');

	 //Circle checkbox/radio button

	 $( ".circlechoice label > input").after('<span></span>');
	 $('.radiogroup input[type="radio"]').click(function()  {
			if ($(this).is(':checked'))
			 $(this).closest( '.radiogroup' ).find('input[type="radio"]').prop('checked', false);
			 $(this).prop('checked', true);
		});

	  //SELECT ALL CHECKBOX FOR .ITEMLISTABLE

		$( ".itemlisttable .select:not(.all) input:checkbox" ).change(function(){
			var listtarget = $(this).closest('ul');
			if($(this).is(':checked')) {
       			$(this).closest('li').addClass('selected');
				if ($(listtarget).find('.select:not(.all) input').length == $(listtarget).find('.select:not(.all) input:checked').length) {
					$(listtarget).find('.select.all input').prop('checked', true);
					$(this).closest('.editprosection').find('input.selectall').prop('checked', true);
				}

			}
  			else {
     		 	$(this).closest('li').removeClass('selected');
				$(listtarget).find('.select.all input').prop('checked', false);
				$(this).closest('.editprosection').find('input.selectall').prop('checked', false);
			}

		});

		$( ".itemlisttable .select.all input:checkbox" ).change(function(){
			var listtarget = $(this).closest('ul');
			if($(this).is(':checked')) {
       			$(listtarget).find('li:not(.itemlisthead)').addClass('selected');
				$(listtarget).find('.select input').prop('checked', true);
				$(this).closest('.editprosection').find('input.selectall').prop('checked', true);
			}
  			else {
     		 	$(listtarget).find('li:not(.itemlisthead)').removeClass('selected');
				$(listtarget).find('.select input').prop('checked', false);
				$(this).closest('.editprosection').find('input.selectall').prop('checked', false);
			}

		});
		$( ".itemlistcolumn .select:not(.all) input:checkbox" ).change(function(){
			var listtarget = $(this).closest('li');
			if($(this).is(':checked')) {
       	$(this).closest('div').addClass('selected');
				if ($(listtarget).find('.select:not(.all) input').length == $(listtarget).find('.select:not(.all) input:checked').length) {
					$(listtarget).find('.select.all input').prop('checked', true);
					$(listtarget).find('input.selectall').prop('checked', true);
				}

			}
  		else {
     		$(this).closest('div').removeClass('selected');
				$(listtarget).find('.select.all input').prop('checked', false);
				$(listtarget).find('input.selectall').prop('checked', false);
			}

		});

		$( ".itemlistcolumn .select.all input:checkbox" ).change(function(){
			var listtarget = $(this).closest('li');
			if($(this).is(':checked')) {
       	$(listtarget).find('div:not(.headnote)').addClass('selected');
				$(listtarget).find('.select input').prop('checked', true);
				$(listtarget).find('input.selectall').prop('checked', true);
			}
  			else {
     		$(listtarget).find('div:not(.headnote)').removeClass('selected');
				$(listtarget).find('.select input').prop('checked', false);
				$(listtarget).find('input.selectall').prop('checked', false);
			}

		});


		$( "input.selectall" ).change(function(){
			var listtarget = $(this).attr('listtarget');
			if($(this).is(':checked')) {
       			$(listtarget).find('li:not(.itemlisthead)').addClass('selected');
				$(listtarget).find('.select input').prop('checked', true);
			}
  			else {
     		 	$(listtarget).find('li:not(.itemlisthead)').removeClass('selected');
				$(listtarget).find('.select input').prop('checked', false);
			}

		});

		//animation on modal Shown

		$('.modal').on('shown.bs.modal', function() {
 				$(this).find('.animatelater').addClass('animatenow');
     });
 });

})(jQuery);


 /*
 * jQuery EasIng v1.1.2 - http://gsgd.co.uk/sandbox/jquery.easIng.php
 *
 * Uses the built In easIng capabilities added In jQuery 1.1
 * to offer multiple easIng options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

// t: current time, b: begInnIng value, c: change In value, d: duration

jQuery.extend( jQuery.easing,
{
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});


/*
|--------------------------------------------------------------------------
| UItoTop jQuery Plugin 1.1
| http://www.mattvarone.com/web-design/uitotop-jquery-plugin/
|--------------------------------------------------------------------------
*/

(function($){
	$.fn.UItoTop = function(options) {

 		var defaults = {
			text: 'To Top',
			min: 200,
			inDelay:600,
			outDelay:400,
  			containerID: 'w2btoTop',
			containerHoverID: 'w2btoTopHover',
			scrollSpeed: 1200,
			easingType: 'linear'
 		};

 		var settings = $.extend(defaults, options);
		var containerIDhash = '#' + settings.containerID;
		var containerHoverIDHash = '#'+settings.containerHoverID;

		$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');
		$(containerIDhash).hide().click(function(){
			$('html, body').animate({scrollTop:0}, settings.scrollSpeed, settings.easingType);
			$('#'+settings.containerHoverID, this).stop().animate({'opacity': 0 }, settings.inDelay, settings.easingType);
			return false;
		})
		.prepend('<span id="'+settings.containerHoverID+'"></span>')
		.hover(function() {
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 1
				}, 600, 'linear');
			}, function() {
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 0
				}, 700, 'linear');
			});

		$(window).scroll(function() {
			var sd = $(window).scrollTop();
			if(typeof document.body.style.maxHeight === "undefined") {

				$(containerIDhash).css({
					'position': 'absolute',
					'top': $(window).scrollTop() + $(window).height() - 50
				});
			}
			if ( sd > settings.min )
				$(containerIDhash).fadeIn(settings.inDelay);
			else
				$(containerIDhash).fadeOut(settings.Outdelay);
		});

};
})(jQuery);
