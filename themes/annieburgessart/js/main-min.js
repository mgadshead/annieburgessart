function initializeLightGallery(){$("#gallery").lightGallery({download:!1,counter:!1})}function removeTrailingSlash(e){if(e)return e.replace(/\/+$/,"")}function currentPageLink(){$(".menu a").each((function(){$(this).removeClass("current-page-link"),removeTrailingSlash($(this).attr("href"))==removeTrailingSlash(window.location.href)&&$(this).addClass("current-page-link")}))}function imageLoad(){var e=$("img");e&&e.each((function(){$(this).on("load",(function(){$(this).addClass("animate-images")}))}))}function resolveAfterDelay(){return new Promise((function(e){setTimeout((function(){e()}),500)}))}function toggleMenu(){$(".hamburger").toggleClass("is-active"),$(".menu-container").toggleClass("menu-open"),$(".false-header").toggleClass("menu-open"),$(".menu-container").hasClass("menu-open")&&gsap.fromTo(".menu > li",{opacity:0,transform:"translateX(-40px)"},{opacity:1,transform:"translateX(0)",duration:.5,stagger:.1})}$(document).ready((function(){$(".container").length&&gsap.to(".container",{autoAlpha:1,y:0,duration:.5}),$("#gallery").length&&(initializeLightGallery(),imageLoad()),currentPageLink(),$(".current-menu-ancestor").length&&$(".current-menu-ancestor").addClass("arrow-up").find(".sub-menu").show()})),$(".menu-item-has-children > a").click((function(){$(this).parent(".menu-item-has-children").hasClass("arrow-up")&&$(this).parent(".menu-item-has-children").find(".current-page-link").length?$(this).addClass("current-page-link"):$(this).removeClass("current-page-link")})),$(".hamburger").click((function(){toggleMenu()})),$(".menu li:not(.menu-item-has-children) a").click((function(){toggleMenu()})),$(".menu-item-has-children > a").click((function(){$(this).closest(".menu-item-has-children").find(".sub-menu").slideToggle(),$(this).closest(".menu-item-has-children").toggleClass("arrow-up")})),$(".menu-container").touchwipe({wipeLeft:function(){$(".menu-container").hasClass("menu-open")&&toggleMenu()},wipeRight:function(){$(".menu-container").hasClass("menu-open")||toggleMenu()},min_move_x:20,min_move_y:20,preventDefaultEvents:!1}),barba.init({transitions:[{name:"page-transition",async leave(){gsap.to(".container",{autoAlpha:0,y:40,duration:.5}),await resolveAfterDelay()},enter(){gsap.from(".container",{autoAlpha:0,y:40,duration:.5})}}],views:[{namespace:"portfolio",beforeEnter(e){imageLoad(),initializeLightGallery()},afterLeave(e){$("#gallery").remove()}}]}),barba.hooks.enter(()=>{$(window).scrollTop(0),currentPageLink()}),barba.hooks.before(()=>{$(".menu-container").hasClass("menu-open")&&toggleMenu()});