(function($) {
    "use strict";
  
    const $documentOn = $(document);
    const $windowOn = $(window);
  
    $documentOn.ready( function() {
  
      /* ================================
       Mobile Menu Js Start
    ================================ */
    
      $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "1199",
        meanExpand: ['<i class="far fa-plus"></i>'],
    });

       $('#mobile-menus').meanmenu({
        meanMenuContainer: '.mobile-menus',
        meanScreenWidth: "19920",
        meanExpand: ['<i class="far fa-plus"></i>'],
    });

     $documentOn.on("click", ".mean-expand", function () {
        let icon = $(this).find("i");

        if (icon.hasClass("fa-plus")) {
            icon.removeClass("fa-plus").addClass("fa-minus"); 
        } else {
            icon.removeClass("fa-minus").addClass("fa-plus"); 
        }
    });

    /* ================================
        Sidebar Toggle & Sticky Item Logic
        ================================ */

        // Open offcanvas
        $(".sidebar__toggle").on("click", function () {
        $(".offcanvas__info").addClass("info-open");
        $(".offcanvas__overlay").addClass("overlay-open");

        // Hide sticky item
        $(".sidebar-sticky-item").fadeOut().removeClass("active");
        });

        // Close offcanvas
        $(".offcanvas__close, .offcanvas__overlay").on("click", function () {
        $(".offcanvas__info").removeClass("info-open");
        $(".offcanvas__overlay").removeClass("overlay-open");

        // Show sticky item
        $(".sidebar-sticky-item").fadeIn().addClass("active");
        });

        /* ================================
        Body Overlay Js Start
        ================================ */

        $(".body-overlay").on("click", function () {
        $(".offcanvas__area").removeClass("offcanvas-opened");
        $(".df-search-area").removeClass("opened");
        $(".body-overlay").removeClass("opened");

        // Show sticky item when overlay clicked
        $(".sidebar-sticky-item").fadeIn().addClass("active");
        });

        /* ================================
        Offcanvas Link Click (Optional)
        ================================ */

        $(".offcanvas a").on("click", function () {
        $(".sidebar-sticky-item").fadeIn().addClass("active");
    });

    


    // Open offcanvas
    $(".sidebar__toggle-2").on("click", function () {
    $(".offcanvas__info-2").addClass("info-open");
    $(".offcanvas__overlay-2").addClass("overlay-open");
});

$(".offcanvas__close, .offcanvas__overlay-2").on("click", function () {
    $(".offcanvas__info-2").removeClass("info-open");
    $(".offcanvas__overlay-2").removeClass("overlay-open");
});



      /* ================================
       Sticky Header Js Start
    ================================ */

       $windowOn.on("scroll", function () {
        if ($(this).scrollTop() > 250) {
          $("#header-sticky").addClass("sticky");
        } else {
          $("#header-sticky").removeClass("sticky");
        }
      });      


      ////////////////////////////////////////////////////
	// 05. Search Js
	$(".search_btn").on("click", function () {
		$(".search_popup").addClass("search-opened");
		$(".search-popup-overlay").addClass("search-popup-overlay-open");
		$("body").addClass("overflow-hidden");
	});

	$(".search_close_btn").on("click", function () {
		$(".search_popup").removeClass("search-opened");
		$(".search-popup-overlay").removeClass("search-popup-overlay-open");
		$("body").removeClass("overflow-hidden");
	});
	$(".search-popup-overlay").on("click", function () {
		$(".search_popup").removeClass("search-opened");
		$(this).removeClass("search-popup-overlay-open");
		$("body").removeClass("overflow-hidden");
	});

      
       /* ================================
       Video & Image Popup Js Start
    ================================ */

      $(".img-popup").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });

      $(".video-popup").magnificPopup({
        type: "iframe",
        callbacks: {},
      });
  
      /* ================================
       Counterup Js Start
    ================================ */

      $(".count").counterUp({
        delay: 15,
        time: 4000,
      });
  
      /* ================================
       Wow Animation Js Start
    ================================ */

      new WOW().init();
  
      /* ================================
       Nice Select Js Start
    ================================ */

    if ($('.single-select').length) {
        $('.single-select').niceSelect();
    }

     
 
    /* ================================
     Scrolldown Js Start
    ================================ */
    $("#scrollDown").on("click", function () {
        setTimeout(function () {
            $("html, body").animate({ scrollTop: "+=1000px" }, "slow");
        }, 1000);
    });

   const mapPoints = document.querySelectorAll('.map-point');

    if (mapPoints.length > 0) {
        
        mapPoints[0].classList.add('active');

        mapPoints.forEach(point => {
            point.addEventListener('mouseenter', () => {
                mapPoints.forEach(p => p.classList.remove('active'));
                point.classList.add('active');
            });
        });
    }

    /* ================================
     Service Box Js Start
    ================================ */

    const serviceItems = document.querySelectorAll(".service-card-items");

    serviceItems.forEach((box) => {
    const hoverImg = box.querySelector(".hover-image");
    if (!hoverImg) return;

    box.addEventListener("mousemove", (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        hoverImg.style.opacity = "1";
        hoverImg.style.visibility = "visible";
        hoverImg.style.transform = `translate(${x}px, ${y}px) rotate(15deg)`;
    });

    box.addEventListener("mouseleave", () => {
        hoverImg.style.opacity = "0";
        hoverImg.style.visibility = "hidden";
    });
    });

    //>> Hero-1 Slider Start <<//
         const sliderActive2 = ".hero-slider";
         const sliderInit2 = new Swiper(sliderActive2, {
            loop: true,
            speed: 1200,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            allowTouchMove: true,
            
             autoplay: {
                 delay: 5000,
                 disableOnInteraction: false,
             },
             navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
             pagination: {
                 el: ".dot3",
                 clickable: true,
             },
         });

          function animated_swiper(selector, init) {
            const animated = function animated() {
                $(selector + " [data-animation]").each(function () {
                    let anim = $(this).data("animation");
                    let delay = $(this).data("delay");
                    let duration = $(this).data("duration");
                    $(this)
                        .removeClass("anim" + anim)
                        .addClass(anim + " animated")
                        .css({
                            webkitAnimationDelay: delay,
                            animationDelay: delay,
                            webkitAnimationDuration: duration,
                            animationDuration: duration,
                        })
                        .one("animationend", function () {
                            $(this).removeClass(anim + " animated");
                        });
                });
            };
            animated();
            init.on("slideChange", function () {
                $(sliderActive2 + " [data-animation]").removeClass("animated");
            });
            init.on("slideChange", animated);
        }
        animated_swiper(sliderActive2, sliderInit2);

       
    /* ================================
      Brand Slider Js Start
    ================================ */

   if ($('.brand-slider').length > 0) {
    const brandSlider = new Swiper(".brand-slider", {
        spaceBetween: 30,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-next",
            prevEl: ".array-prev",
        },
        breakpoints: {
            1399: {
                slidesPerView: 6,
            },
            1199: {
                slidesPerView: 5,
            },
            991: {
                slidesPerView: 4,
            },
            767: {
                slidesPerView: 3,
            },
            575: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 2,
            },
        },
    });
   }


        if (document.querySelectorAll(".portfolio-4").length > 0) {
        const interleaveOffset = 0.75;

        function updateCustomPagination(swiper) {
            const customEl = document.querySelector('.portfolio-4-pagination-custom');
            if (customEl) {
                const current = swiper.realIndex + 1;
            
                const total = swiper.slides.filter(slide => !slide.classList.contains('swiper-slide-duplicate')).length;
                
                customEl.innerHTML = `
                    <span class="current">${current}</span>
                    <span class="separator">/</span>
                    <span class="total">${total}</span>
                `;
            }
        }

        var portfolio_4_activ = new Swiper('.portfolio-4-activ', {
            loop: true,
            direction: "vertical",
            autoplay: false,
            speed: 2000,
            watchSlidesProgress: true,
            navigation: {
                prevEl: ".portfolio-4-prev",
                nextEl: ".portfolio-4-next",
            },
        
            pagination: {
                el: ".portfolio-4-pagination", 
                clickable: true,
            },
            on: {
                init: function () {
                    var swiper = this;
                
                    updateCustomPagination(swiper);

                    var paginationEl = document.querySelector('.portfolio-4-pagination-custom');
                    if (paginationEl) {
                        paginationEl.addEventListener('click', function () {
                            swiper.slideNext();
                        });
                    }
                },
                
                slideChange: function () {
                    updateCustomPagination(this);
                },
                progress: function () {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        let slideProgress = swiper.slides[i].progress;
                        let innerOffset = swiper.height * interleaveOffset;
                        let innerTranslate = slideProgress * innerOffset;
                        let slideInner = swiper.slides[i].querySelector(".slide-inner");
                        if (slideInner) {
                            TweenMax.set(slideInner, { y: innerTranslate });
                        }
                    }
                },
                setTransition: function (slider, speed) {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + "ms";
                        let slideInner = swiper.slides[i].querySelector(".slide-inner");
                        if (slideInner) {
                            slideInner.style.transition = speed + "ms";
                        }
                    }
                }
            }
        });
    }

    /* ================================
      Testimonial Slider Js Start
    ================================ */

   if ($('.testimonial-slider').length > 0) {
    const TestimonialSlider = new Swiper(".testimonial-slider", {
        spaceBetween: 30,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".dot2",
            clickable: true,
        },
        breakpoints: {
            1399: {
                slidesPerView: 3,
            },
            1199: {
                slidesPerView: 1.7,
            },
            991: {
                slidesPerView: 1.4,
            },
            767: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
   }

    //>> Hero-Image Slider Start <<//
       if($('.yacht-slider').length > 0) {
        const YachtSlider = new Swiper(".yacht-slider", {
            spaceBetween: 30,
            speed: 1000,
            loop: true,
            effect: "fade", // smooth fade change
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: ".dots",
                clickable: true,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    }

    /* ================================
      Testimonial Slider Js Start
    ================================ */

   if ($('.testimonial-slider-2').length > 0) {
    const TestimonialSlider2 = new Swiper(".testimonial-slider-2", {
        spaceBetween: 30,
        speed: 1300,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
       navigation: {
            prevEl: ".array-next",
            nextEl: ".array-prev",
        },
        breakpoints: {
            1399: {
                slidesPerView: 3,
            },
            1199: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2,
            },
            575: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
   }

     if ($('.service-slider-2').length > 0) {
    const ServiceSlider2 = new Swiper(".service-slider-2", {
        spaceBetween: 30,
        speed: 1300,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".dot4",
            clickable: true,
        },
        breakpoints: {
            1399: {
                slidesPerView: 5,
            },
            1199: {
                slidesPerView: 3,
            },
            991: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2,
            },
            575: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
   }

    //>> CountDown Start <<//
         let targetDate = new Date("2026-12-12 00:00:00").getTime();
         const countdownInterval = setInterval(function () {
             let currentDate = new Date().getTime();
             let remainingTime = targetDate - currentDate;
 
             if (remainingTime <= 0) {
                 clearInterval(countdownInterval);
                 // Display a message or perform any action when the countdown timer reaches zero
                 $("#countdown-container").text("Countdown has ended!");
             } else {
                 let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                 let hours = Math.floor(
                     (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                 );
                 let minutes = Math.floor(
                     (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
                 );
                 let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
 
                 // Pad single-digit values with leading zeros
                 $("#day").text(days.toString().padStart(2, "0"));
                 $("#hour").text(hours.toString().padStart(2, "0"));
                 $("#min").text(minutes.toString().padStart(2, "0"));
                 $("#sec").text(seconds.toString().padStart(2, "0"));
             }
         }, 1000);

   /* ================================
      Courses Slider Js Start
    ================================ */

   if ($('.courses-slider').length > 0) {
    const CoursesSlider = new Swiper(".courses-slider", {
        spaceBetween: 30,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".dot",
            clickable: true,
        },
        breakpoints: {
            1199: {
                slidesPerView: 3,
            },
            991: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2,
            },
            575: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
   }

   /* ================================
      Card Slider Js Start
    ================================ */
    if ($('.card-slider').length > 0) {
    const CardSlider = new Swiper(".card-slider", {
        spaceBetween: 30,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".dot5",
            clickable: true,
        },
        breakpoints: {
            1199: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
   }

   /* ================================
      Card Slider Js Start
    ================================ */
    if ($('.testimonial-slider-3').length > 0) {
    const TestimonialSlider3 = new Swiper(".testimonial-slider-3", {
        spaceBetween: 30,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            prevEl: ".array-next",
            nextEl: ".array-prev",
        },
        breakpoints: {
            1199: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
   }

   //>> Instagram Slider Start <<//
        if($('.instagram-banner-slider').length > 0) {
            const instagrambannerSlider = new Swiper(".instagram-banner-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1399: {
                        slidesPerView: 7,
                    },
                    1199: {
                        slidesPerView: 5,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                    767: {
                        slidesPerView: 3,
                    },
                    650: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 3,
                    },
                    0: {
                        slidesPerView: 3,
                    },
                },
            });
        }

    /* ================================
      Custom Accordion Js Start
    ================================ */

   if ($('.accordion-box').length) {
        $(".accordion-box").on('click', '.acc-btn', function () {
            var outerBox = $(this).closest('.accordion-box');
            var target = $(this).closest('.accordion');
            var accBtn = $(this);
            var accContent = accBtn.next('.acc-content');

            if (target.hasClass('active-block')) {
                // Already open, so close it
                accBtn.removeClass('active');
                target.removeClass('active-block');
                accContent.slideUp(300);
            } else {
                // Close all others
                outerBox.find('.accordion').removeClass('active-block');
                outerBox.find('.acc-btn').removeClass('active');
                outerBox.find('.acc-content').slideUp(300);

                // Open clicked one
                accBtn.addClass('active');
                target.addClass('active-block');
                accContent.slideDown(300);
            }
        });
    }

    /* ================================
        Mouse Cursor Animation Js Start
    ================================ */

    if ($(".mouseCursor").length > 0) {
        function itCursor() {
            var myCursor = jQuery(".mouseCursor");
            if (myCursor.length) {
                if ($("body")) {
                    const e = document.querySelector(".cursor-inner"),
                        t = document.querySelector(".cursor-outer");
                    let n, i = 0, o = !1;
                    window.onmousemove = function(s) {
                        if (!o) {
                            t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)";
                        }
                        e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)";
                        n = s.clientY;
                        i = s.clientX;
                    };
                    $("body").on("mouseenter", "button, a, .cursor-pointer", function() {
                        e.classList.add("cursor-hover");
                        t.classList.add("cursor-hover");
                    });
                    $("body").on("mouseleave", "button, a, .cursor-pointer", function() {
                        if (!($(this).is("a", "button") && $(this).closest(".cursor-pointer").length)) {
                            e.classList.remove("cursor-hover");
                            t.classList.remove("cursor-hover");
                        }
                    });
                    e.style.visibility = "visible";
                    t.style.visibility = "visible";
                }
            }
        }
        itCursor();
    }

    /* ================================
        Back To Top Button Js Start
    ================================ */
    $windowOn.on('scroll', function() {
        var windowScrollTop = $(this).scrollTop();
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();

        if (windowScrollTop + windowHeight >= documentHeight - 10) {
            $("#back-top").addClass("show");
        } else {
            $("#back-top").removeClass("show");
        }
    });

    $documentOn.on('click', '#back-top', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    /* ================================
       Search Popup Toggle Js Start
    ================================ */

    // if ($(".search-toggler").length) {
    //     $(".search-toggler").on("click", function(e) {
    //         e.preventDefault();
    //         $(".search-popup").toggleClass("active");
    //         $("body").toggleClass("locked");
    //     });
    // }
	
    /* ================================
       Smooth Scroller And Title Animation Js Start
    ================================ */
    /* ScrollSmoother disabled — breaks layout after custom header/sections */
    if (false && $('#smooth-wrapper').length && $('#smooth-content').length) {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

        gsap.config({
            nullTargetWarn: false,
        });

        let smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            effects: false,
            smoothTouch: 0.1,
            normalizeScroll: false,
            ignoreMobileResize: true,
        });
    }

     /* ================================
       Sticky Js Start
    ================================ */


   // GSAP title animation
    if (document.querySelectorAll(".gt_title_anim").length > 0) {
        if ($('.gt_title_anim').length > 0) {
        let splitTitleLines = gsap.utils.toArray(".gt_title_anim");
        splitTitleLines.forEach(splitTextLine => {
            const tl = gsap.timeline({
            scrollTrigger: {
                trigger: splitTextLine,
                start: 'top 90%',
                end: 'bottom 60%',
                scrub: false,
                markers: false,
                toggleActions: 'play none none reverse'
            }
            });

            const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
            gsap.set(splitTextLine, { perspective: 400 });
            itemSplitted.split({ type: "lines" })
            tl.from(itemSplitted.lines, {
            duration: 1,
            delay: 0.3,
            opacity: 0,
            rotationX: -80,
            force3D: true,
            transformOrigin: "top center -50",
            stagger: 0.1
            });
        });
        }
    }


  if ($('.full-img-wrap3').length > 0) {
        // Check window width
        if (window.innerWidth > 1399) {
            ScrollTrigger.create({
                trigger: ".full-img-wrap3",
                start: "top 0",
                end: "bottom 0%",
                pin: ".full-img3",
                pinSpacing: false,
            });
        }
    }


    // ScrollTrigger register করতে ভুলবেন না
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".tp_fade_anim").forEach((item) => {
        let tp_fade_offset = item.getAttribute("data-fade-offset") || 40,
            tp_duration_value = item.getAttribute("data-duration") || 0.75,
            tp_fade_direction = item.getAttribute("data-fade-from") || "bottom",
            tp_onscroll_value = item.getAttribute("data-on-scroll") || 1,
            tp_delay_value = item.getAttribute("data-delay") || 0.15,
            tp_ease_value = item.getAttribute("data-ease") || "power2.out";

        let tp_anim_setting = {
            opacity: 0,
            ease: tp_ease_value,
            duration: tp_duration_value,
            delay: tp_delay_value,
            x: (tp_fade_direction == "left" ? -tp_fade_offset : (tp_fade_direction == "right" ? tp_fade_offset : 0)),
            y: (tp_fade_direction == "top" ? -tp_fade_offset : (tp_fade_direction == "bottom" ? tp_fade_offset : 0)),
        };

        // Scroll এ animate হবে
        if (tp_onscroll_value == 1) {
            tp_anim_setting.scrollTrigger = {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reset",
            };
        }

        gsap.from(item, tp_anim_setting);
    });


    gsap.registerPlugin(ScrollTrigger);

    (function () {
    const goFullsItems = document.querySelectorAll(".go_fulls");
    if (!goFullsItems.length) return;

    goFullsItems.forEach((item) => {
        const ctx = gsap.context(() => {
        const img = item.querySelector("img");
        if (!img) return;

        gsap.set(img, {
            position: "relative",
            left: "50%",
            xPercent: -50,
            width: 450,
            display: "block",
        });

        gsap.to(img, {
            width: "100vw",
            ease: "none",
            scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom center", // gallery section clash avoid
            scrub: true,
            },
        });
        }, item);
    });
    })();

    (function () {
    const goFullseItems = document.querySelectorAll(".go_fullse");
    if (!goFullseItems.length) return;

    goFullseItems.forEach((item) => {
        const ctx = gsap.context(() => {
        const img = item.querySelector("img");
        if (!img) return;

        gsap.set(img, {
            position: "relative",
            left: "50%",
            xPercent: -50,
            width: 450,
            display: "block",
        });

        gsap.to(img, {
            width: "70vw",
            ease: "none",
            scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom center", // gallery section clash avoid
            scrub: true,
            },
        });
        }, item);
    });
    })();


    (function () {
        const goFullItems = document.querySelectorAll(".go_full");
        if (!goFullItems.length) return;

        goFullItems.forEach((item) => {
            const img = item.querySelector("img");
            if (!img) return;

            gsap.set(img, {
                position: "relative",
                left: "50%",
                xPercent: -50,
                width: 450, 
                display: "block",
            });

            gsap.to(img, {
                width: "100vw",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "bottom top", 
                    scrub: true,
                    invalidateOnRefresh: true, 
                    anticipatePin: 1, 
                },
            });
        });
    })();

    // =====================
    // BEACH-CARD WRAPPER PIN
    // =====================
    
    if (document.querySelector(".gallery")) {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1199px)", () => {
            const galleries = document.querySelectorAll(".gallery");
            const wrapper = document.querySelector(".beach-card-wrapper");

            if (!galleries.length || !wrapper) return;

            const triggers = [];

            galleries.forEach((gallery, index) => {
        const isLast = index === galleries.length - 1;

        const st = gsap.to(gallery, {
            scale: isLast ? 1 : 0.85,
            opacity: isLast ? 1 : 0,
            ease: "none",
            scrollTrigger: {
                id: "gallery-" + index,
                trigger: gallery,
                // "top top" এর বদলে "top 10%" বা "top 0" দিয়ে দেখুন
                start: "top 0%", 
                end: "bottom 80%",
                scrub: true,
                pin: true,
                // গ্যাপ দূর করতে এটি খুবই কার্যকরী
                pinSpacing: false, 
                endTrigger: wrapper,
                invalidateOnRefresh: true, 
            },
        });
        triggers.push(st.scrollTrigger);
    });

            // খুব গুরুত্বপূর্ণ: ওপরের অ্যানিমেশন শেষ হওয়ার পর এটি রিফ্রেশ করবে
            ScrollTrigger.refresh();

            return () => {
                triggers.forEach(t => t.kill());
            };
        });
    }

        // প্রথমে ensure GSAP + ScrollTrigger loaded
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".star-shape img", {
            rotation: 360, 
            ease: "none",
            scrollTrigger: {
                trigger: ".star-shape",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        /* Image Reveal Animation */
    if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

    $(".service-inner-box-item").hover(
        function () {
            $(".service-inner-box-item").removeClass("active");
            $(this).addClass("active");
        }
    );

    
    }); // End Document Ready Function

    //yacht-text animation 
    document.addEventListener("DOMContentLoaded", () => {
    const text = document.querySelector(".yacht-text");
    if (!text) return;

    const letters = text.textContent.split("");
    text.innerHTML = "";

    letters.forEach(letter => {
        const span = document.createElement("span");
        span.textContent = letter;
        text.appendChild(span);
    });

    const spans = text.querySelectorAll("span");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                spans.forEach((span, i) => {
                    setTimeout(() => span.classList.add("show"), i * 150);
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(text);
    });

    // Whole Page scroll Animation
    document.addEventListener('DOMContentLoaded', () => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(({ isIntersecting, target }) => {
                target.classList.toggle('show', isIntersecting);
            });
        });

        const hiddenElements = document.querySelectorAll(
            '.fade_up, .fade_down, .zoom_in, .zoom_out, .fade_right, .fade_left, .flip_left, .flip_right, .flip_up, .flip_down'
        );

        hiddenElements.forEach((el) => observer.observe(el));

    });

   

     /* ================================
       Preloader Js Start
    ================================ */
    $(window).on("load", function () {

       if ($('.preloader--three').length) {
        const loading = $('.preloader--three');
        const mask = $('.mask');
        const maskAnimation = () => {
          const tl = gsap.timeline();
          const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
          const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

          gsap.set(mask, { autoAlpha: 1 });

          tl.to(".path", {
            duration: 0.8,
            attr: { d: start },
            ease: "power2.in"
          })
            .to(".path", {
              duration: 0.4,
              attr: { d: end },
              ease: "power2.out",
              onComplete: () => {
                loading.hide();
                mask.hide();
              }
            })
            .from(".hero-section.three", {
              y: 50,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out"
            }, "-=0.2");
          return tl;
        };

        gsap.timeline().add(maskAnimation());
      }

    });

    
  })(jQuery); // End jQuery

