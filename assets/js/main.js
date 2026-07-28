$(document).ready(function () {

gsap.registerPlugin(ScrollTrigger);

// 1. Disable scrolling while loader is active
$("body").css("overflow", "hidden");

// 2. Hide all animated elements initially
gsap.set([
    ".top-announcement-bar",
    ".navbar-brand",
    ".navbar-nav .nav-item",
    ".d-none.d-lg-flex",
    ".why-torque-section .section-subtitle",
    ".why-torque-section .section-heading-1",
    ".why-torque-section .section-heading-2",
    ".why-torque-section .feature-item",
    ".why-torque-section .book-race-btn",
    ".why-torque-section .right-image-col",
    ".ad-banner",
    ".speed-slider-wrap",
    ".services-section .sub-title",
    ".services-section .main-title",
    ".services-section .desc",
    ".services-section .service-card",
    ".booking-section",
    ".booking-left > *",
    ".booking-right",
    ".membership-header > *",
    ".pricing-grid .price-card",
    ".membership-footer-note",
    ".custom-divider",
    ".must-watch-section",
    ".must-watch-section .section-title",
    ".must-watch-section .slider-btn-wrap",
    ".must-watch-section .video-card",
    ".testimonial-header",
    ".testimonial-slider-controls",
    ".testimonial-card-wrap",
    ".seasonal-offers-section h2",
    ".seasonal-offers-section p",
    ".seasonal-offers-section .subscribe-form",
    ".footer-section .footer-logo",
    ".footer-section .footer-col",
    ".footer-section .footer-bottom"
], {
    autoAlpha: 0
});

// ==========================================
// MASTER TIMELINE & LOADER
// ==========================================
const masterTl = gsap.timeline({
    onComplete: function () {
        $("body").css("overflow", "auto");
        ScrollTrigger.refresh();
    }
});

const statsTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".stats-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});

statsTl.add(() => {
    // Section aur andar ke elements ko visible karna
    gsap.set(".stats-section", { visibility: "visible" });
    gsap.set(".stats-section .stat-box", { visibility: "visible" });
})
.fromTo(".stats-section", 
    { y: 40, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
)
.fromTo(".stats-section .stat-box", 
    { y: 30, autoAlpha: 0 },
    { 
        y: 0, 
        autoAlpha: 1, 
        duration: 0.7, 
        stagger: 0.15, 
        ease: "power2.out",
        onComplete: function() {
            // Jab boxes ki animation complete ho jaye, tab counters trigger honge
            triggerStatsCounters();
        }
    },
    "-=0.4"
);

// Counter Function for Stats Section
function triggerStatsCounters() {
    $(".stats-section .counter").each(function () {
        const $counter = $(this);
        
        // Prevent re-triggering if already animated
        if ($counter.hasClass("counted")) return;
        $counter.addClass("counted");

        const target = parseFloat($counter.attr("data-target"));
        const decimals = parseInt($counter.attr("data-decimals")) || 0;
        let obj = { val: 0 };

        gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power1.out",
            onUpdate: function () {
                $counter.text(obj.val.toFixed(decimals));
            }
        });
    });
}

masterTl.to(".page-loader", {
    yPercent: -100,
    duration: 0.8,
    ease: "power4.inOut"
})
.add(() => {
    gsap.set([
        ".top-announcement-bar",
        ".navbar-brand",
        ".navbar-nav .nav-item",
        ".d-none.d-lg-flex"
    ], { visibility: "visible" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".top-announcement-bar",
        { y: -30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 }
    )
    .fromTo(".navbar-brand, .navbar-nav .nav-item, .d-none.d-lg-flex",
        { y: -50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 },
        "-=0.4"
    );
});

// Hero Content Animation
const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
heroTl.fromTo(".hero-badges", { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, delay: 1 })
      .fromTo(".hero-title", { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, "-=0.4")
      .fromTo(".hero-subtitle", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
      .fromTo(".hero-desc", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
      .fromTo(".hero-buttons", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
      .fromTo(".hero-stats .stat-item", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15 }, "-=0.4");


// ==========================================
// COUNTER ANIMATION
// ==========================================
$(".counter").each(function () {
    const $counter = $(this);
    const target = parseFloat($counter.attr("data-target"));
    const decimals = parseInt($counter.attr("data-decimals")) || 0;
    let obj = { val: 0 };

    gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
            trigger: $counter[0],
            start: "top 85%",
            toggleActions: "play none none none"
        },
        onUpdate: function () {
            $counter.text(obj.val.toFixed(decimals));
        }
    });
});


// ==========================================
// WHY TORQUE ANIMATION
// ==========================================
const whyTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".why-torque-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    },
    defaults: { ease: "power3.out" }
});

whyTl.add(() => {
    gsap.set(".why-torque-section .section-subtitle, .why-torque-section .section-heading-1, .why-torque-section .section-heading-2, .why-torque-section .feature-item, .why-torque-section .book-race-btn, .why-torque-section .right-image-col", { visibility: "visible" });
})
.fromTo(".why-torque-section .section-subtitle, .why-torque-section .section-heading-1, .why-torque-section .section-heading-2",
    { x: -50, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2 }
)
.fromTo(".why-torque-section .feature-item",
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 },
    "-=0.4"
)
.fromTo(".why-torque-section .book-race-btn",
    { y: 20, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.5 },
    "-=0.3"
)
.fromTo(".why-torque-section .right-image-col",
    { scale: 0.9, autoAlpha: 0 },
    { scale: 1, autoAlpha: 1, duration: 1 },
    "-=0.8"
);


// ==========================================
// SPEED SLIDER WRAP
// ==========================================
gsap.fromTo(".speed-slider-wrap", 
    { y: 50, autoAlpha: 0 },
    {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".speed-slider-wrap",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        }
    }
);


// ==========================================
// SERVICES SECTION ("SEVEN WAYS") ANIMATION
// ==========================================
const servicesTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".services-section",
        start: "top 75%",
        toggleActions: "play reverse play reverse"
    }
});

servicesTl.add(() => {
    $(".services-section .sub-title, .services-section .main-title, .services-section .desc, .services-section .service-card").css("visibility", "visible");
})
.fromTo(".services-section .sub-title, .services-section .main-title, .services-section .desc",
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease: "sine.out" }
)
.fromTo(".services-section .service-card",
    { y: 35, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: "sine.out" },
    "-=0.3"
);


// ==========================================
// AD BANNER ANIMATION
// ==========================================
gsap.fromTo(".ad-banner", 
    { scale: 0.9, autoAlpha: 0 },
    {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".ad-banner",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        }
    }
);


// ==========================================
// BOOKING SECTION
// ==========================================
gsap.utils.toArray(".booking-section").forEach((section) => {
    const bookingTl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        }
    });

    bookingTl.add(() => {
        $(section).css("visibility", "visible");
        $(section).find(".booking-left > *, .booking-right").css("visibility", "visible");
    })
    .fromTo(section, 
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(section.querySelectorAll(".booking-left > *"), 
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.5"
    )
    .fromTo(section.querySelector(".booking-right"), 
        { x: 50, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
    );
});


// ==========================================
// MEMBERSHIP & PRICING SECTION
// ==========================================
const membershipTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".membership-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});

membershipTl.add(() => {
    gsap.set(".membership-header > *, .pricing-grid .price-card, .membership-footer-note", { visibility: "visible" });
})
.fromTo(".membership-header > *", 
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
)
.fromTo(".pricing-grid .price-card", 
    { y: 50, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.2, ease: "power3.out" },
    "-=0.4"
)
.fromTo(".membership-footer-note", 
    { y: 60, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
    "-=0.4"
);


// ==========================================
// CUSTOM DIVIDERS
// ==========================================
gsap.utils.toArray(".custom-divider").forEach((divider) => {
    gsap.fromTo(divider, 
        { width: "0%", autoAlpha: 0 },
        {
            width: "100%",
            autoAlpha: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: divider, 
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            }
        }
    );
});


// ==========================================
// MUST WATCH SECTION
// ==========================================
gsap.utils.toArray(".must-watch-section").forEach((section) => {
    const watchTl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        }
    });

    watchTl.add(() => {
        gsap.set(section, { visibility: "visible" });
        gsap.set(section.querySelectorAll(".section-title, .slider-btn-wrap, .video-card"), { visibility: "visible" });
    })
    .fromTo(section, 
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(section.querySelector(".section-title"), 
        { x: -30, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
    )
    .fromTo(section.querySelector(".slider-btn-wrap"), 
        { x: 30, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8"
    )
    .fromTo(section.querySelectorAll(".video-card"), 
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12, ease: "power2.out" },
        "-=0.6"
    );
});


// ==========================================
// TESTIMONIAL SECTION
// ==========================================
const testimonialTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});

testimonialTl.add(() => {
    gsap.set(".testimonial-header, .testimonial-slider-controls, .testimonial-card-wrap", { visibility: "visible" });
})
.fromTo(".testimonial-header", 
    { y: -30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
)
.fromTo(".testimonial-slider-controls", 
    { x: 30, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
    "-=0.4"
)
.fromTo(".testimonial-card-wrap", 
    { y: 40, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" },
    "-=0.3"
);


// ==========================================
// SEASONAL OFFERS SECTION
// ==========================================
const seasonalTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".seasonal-offers-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});

seasonalTl.add(() => {
    gsap.set(".seasonal-offers-section h2, .seasonal-offers-section p, .seasonal-offers-section .subscribe-form", { visibility: "visible" });
})
.fromTo(".seasonal-offers-section h2", 
    { x: -50, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
)
.fromTo(".seasonal-offers-section p", 
    { x: -30, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
    "-=0.4"
)
.fromTo(".seasonal-offers-section .subscribe-form", 
    { scale: 0.9, autoAlpha: 0 },
    { scale: 1, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
    "-=0.5"
);


// ==========================================
// FOOTER SECTION
// ==========================================
const footerTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".footer-section",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

footerTl.add(() => {
    gsap.set(".footer-section .footer-logo, .footer-section .footer-col, .footer-section .footer-bottom", { visibility: "visible" });
})
.fromTo(".footer-section .footer-logo", 
    { y: -30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
)
.fromTo(".footer-section .footer-col", 
    { y: 40, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
    "-=0.4"
)
.fromTo(".footer-section .footer-bottom", 
    { y: 20, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
    "-=0.3"
);





    // Generic click handler for option buttons inside groups
  $("#service-options, #package-options, #date-options, #time-options").on("click", ".opt-btn", function() {
    const $btn = $(this);
    const $parentGroup = $btn.parent();
    
    // Toggle active class within the group
    $parentGroup.find(".opt-btn").removeClass("active");
    $btn.addClass("active");
    
    // Update summary values based on selection
    if ($parentGroup.attr("id") === "service-options") {
      $("#sum-service").text($btn.data("value"));
    } else if ($parentGroup.attr("id") === "package-options") {
      $("#sum-package").text($btn.data("value"));
      
      // Update dynamic pricing
      const price = parseInt($btn.data("price")) || 0;
      const formattedPrice = "RS. " + price.toLocaleString("en-US");
      $("#sum-total").text(formattedPrice);
    } else if ($parentGroup.attr("id") === "date-options") {
      $("#sum-date").text($btn.data("value"));
    } else if ($parentGroup.attr("id") === "time-options") {
      $("#sum-time").text($btn.data("value"));
    }
  });

    // Slick Slider Initialization
    $('.speed-slider').slick({
        speed: 15000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 992,
                settings: { slidesToShow: 1, }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, }
            }
        ]
    });

    $('.must-watch-slider').slick({
        infinite: false,
        slidesToShow: 4.5, 
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.custom-prev'),
        nextArrow: $('.custom-next'),
        dots: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3.5
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2.2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1.2
                }
            }
        ]
    });

    // Fancybox Initialization for video popups
    Fancybox.bind("[data-fancybox]", {
       
    });


$('.testimonial-slider').slick({
        infinite: true,
        slidesToShow: 3,        // Desktop view mein 3 cards aik sath dikhenge
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.testi-prev'),
        nextArrow: $('.testi-next'),
        dots: false,
        responsive: [
            {
                breakpoint: 992, // Tablet view
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768, // Mobile view
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('#menuToggle').on('click', function() {
        $(this).toggleClass('active');
        $('.navbar-collapse').toggleClass('show');
    });

    function initServicesSlider() {
        if ($(window).width() <= 767) {
            if (!$('.services-slider').hasClass('slick-initialized')) {
                $('.services-slider').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    prevArrow: $('.custom-prevs'),
                    nextArrow: $('.custom-nexts'),
                    dots: false,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    pauseOnHover: true,   // Mouse hover par rokne ke liye
                    pauseOnFocus: true,   // Focus par rokne ke liye
                    pauseOnDotsHover: true
                });
            }
            $('.services-slider').on('touchstart', function() {
                $(this).slick('slickPause');
            });
        } else {
            if ($('.services-slider').hasClass('slick-initialized')) {
                $('.services-slider').slick('unslick');
            }
        }
    }

    // Initialize on load
    initServicesSlider();

    // Re-initialize on window resize
    $(window).resize(function() {
        initServicesSlider();
    });
});