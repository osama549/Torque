$(document).ready(function () {

gsap.registerPlugin(ScrollTrigger);

    // Disable scrolling while loader is active
    $("body").css("overflow", "hidden");

    // Hide all animated elements initially (including Seven Ways section items)
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
        ".services-section .service-card"
    ], {
        autoAlpha: 0
    });

    // Master Timeline
    const masterTl = gsap.timeline({
        onComplete: function () {
            $("body").css("overflow", "auto");
            ScrollTrigger.refresh();
        }
    });

    // Loader Animation
    masterTl.to(".page-loader", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut"
    })

    // Hero & Navbar Animation
    .add(() => {

        gsap.set([
            ".top-announcement-bar",
            ".navbar-brand",
            ".navbar-nav .nav-item",
            ".d-none.d-lg-flex"
        ], {
            visibility: "visible"
        });

        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        tl.fromTo(".top-announcement-bar",
            { y: -30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 }
        )
        .fromTo(".navbar-brand, .navbar-nav .nav-item, .d-none.d-lg-flex",
            { y: -50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 },
            "-=0.4"
        )
      
       

    });

    // Counter Animation
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
                once: true
            },
            onUpdate: function () {
                $counter.text(obj.val.toFixed(decimals));
            }
        });
    });

    // Why Torque Animation
    const whyTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".why-torque-section",
            start: "top 80%",
           toggleActions: "play reverse play reverse"
        },
        defaults: { ease: "power3.out" }
    });

    whyTl.add(() => {
        gsap.set([
            ".why-torque-section .section-subtitle",
            ".why-torque-section .section-heading-1",
            ".why-torque-section .section-heading-2",
            ".why-torque-section .feature-item",
            ".why-torque-section .book-race-btn",
            ".why-torque-section .right-image-col",
            ".ad-banner"
        ], {
            visibility: "visible"
        });
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
    )
    
 

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
    // 1. Headings & Description Smooth Reveal
    .fromTo(".services-section .sub-title, .services-section .main-title, .services-section .desc",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease: "sine.out" }
    )
    // 2. Saaton Cards Smooth Slide-In (No Jerk/No Jump)
    .fromTo(".services-section .service-card",
        { y: 35, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: "sine.out" },
        "-=0.3"
    );


    // Ad Banner Independent Scroll Animation
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
gsap.utils.toArray(".booking-section").forEach((section) => {
  
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
    duration: 1,
    opacity: 0,
    y: 50,
    ease: "power3.out"
  });

  gsap.from(section.querySelectorAll(".booking-left > *"), {
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    stagger: 0.15,
    ease: "power2.out"
  });

  gsap.from(section.querySelector(".booking-right"), {
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
    },
    duration: 1,
    opacity: 0,
    x: 50,
    ease: "power3.out",
    delay: 0.2
  });

});

gsap.from(".membership-header > *", {
  scrollTrigger: {
    trigger: ".membership-section",
    start: "top 80%",
    toggleActions: "play reverse play reverse"
  },
  duration: 0.8,
  opacity: 0,
  y: 30,
  stagger: 0.15,
  ease: "power2.out"
});

gsap.from(".pricing-grid .price-card", {
  scrollTrigger: {
    trigger: ".pricing-grid",
    start: "top 75%",
  },
  duration: 0.9,
  opacity: 0,
  y: 50,
  stagger: 0.2, 
  ease: "power3.out"
});

gsap.from(".membership-footer-note", {
  scrollTrigger: {
    trigger: ".membership-footer-note",
    start: "top 90%",
  },
  duration: 0.8,
  opacity: 0,
  y: 60,
  ease: "power2.out",
  delay: 0.4
});


gsap.utils.toArray(".custom-divider").forEach((divider) => {
    gsap.to(divider, {
        width: "100%",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: divider, 
            start: "top 85%",
           toggleActions: "play reverse play reverse"
        }
    });
});

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-badges", { y: -30, opacity: 0, duration: 1, delay: 1 })
      .from(".hero-title", { y: 50, opacity: 0, duration: 1 }, "-=0.4")
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-desc", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-buttons", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-stats .stat-item", { y: 40, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.4");



// Loop through each "must-watch-section" on the page to prevent conflicts if used multiple times
gsap.utils.toArray(".must-watch-section").forEach((section) => {
  
  // 1. Fade-in and slide-up animation for the entire section when it enters the viewport
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play reverse play reverse" // Play animation once and do not reset on scroll back
    },
    duration: 1,
    opacity: 0,
    y: 40,
    ease: "power3.out"
  });

  // 2. Slide-in animation for the Section Title from the left
  gsap.from(section.querySelector(".section-title"), {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
    duration: 0.8,
    opacity: 0,
    x: -30, 
    ease: "power2.out"
  });

  // 3. Slide-in animation for the Slider Controls/Buttons from the right
  gsap.from(section.querySelector(".slider-btn-wrap"), {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
    duration: 0.8,
    opacity: 0,
    x: 30, 
    ease: "power2.out"
  });

  // 4. Staggered animation for video cards (each card animates sequentially with a slight delay)
  gsap.from(section.querySelectorAll(".video-card"), {
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    stagger: 0.12, // Delay between each card animation
    ease: "power2.out"
  });


  // Testimonial Section Scroll Animation (Repeat on Scroll Up/Down)
const testimonialTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse" // Scroll down pe play, upar jane pe reverse, wapas aane pe dobara play
    }
});

// Pehle elements ki visibility on karein aur phir animation chalayein
testimonialTl.add(() => {
    gsap.set(".testimonial-header, .testimonial-slider-controls, .testimonial-card-wrap", {
        visibility: "visible"
    });
})
// 1. Section Header Animation
.fromTo(".testimonial-header", 
    { y: -30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
)
// 2. Slider Controls (Arrows) Animation
.fromTo(".testimonial-slider-controls", 
    { x: 30, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
    "-=0.4"
)
// 3. Testimonial Cards Staggered Animation
.fromTo(".testimonial-card-wrap", 
    { y: 40, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" },
    "-=0.3"
);

// Seasonal Offers Section Scroll Animation (Repeat on Scroll Up/Down)
const seasonalTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".seasonal-offers-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse" // Scroll down pe play, upar jane pe reverse, wapas aane pe dobara play
    }
});

// Pehle elements ki visibility on karein aur phir animation chalayein
seasonalTl.add(() => {
    gsap.set(".seasonal-offers-section h2, .seasonal-offers-section p, .seasonal-offers-section .subscribe-form", {
        visibility: "visible"
    });
})
// 1. Left Side Headings & Text Animation
.fromTo(".seasonal-offers-section h2", 
    { x: -50, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
)
.fromTo(".seasonal-offers-section p", 
    { x: -30, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
    "-=0.4"
)
// 2. Right Side Subscribe Form Animation
.fromTo(".seasonal-offers-section .subscribe-form", 
    { scale: 0.9, autoAlpha: 0 },
    { scale: 1, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
    "-=0.5"
);

// Footer Section Scroll Animation (Repeat on Scroll Up/Down)
const footerTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".footer-section",
        start: "top 85%",
        toggleActions: "play reverse play reverse" // Scroll up aur down dono pe repeat karne ke liye
    }
});

// Pehle elements ki visibility on karein aur phir animation chalayein
footerTl.add(() => {
    gsap.set(".footer-section .footer-logo, .footer-section .footer-col, .footer-section .footer-bottom", {
        visibility: "visible"
    });
})
// 1. Footer Logo Animation
.fromTo(".footer-section .footer-logo", 
    { y: -30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
)
// 2. Footer Columns Staggered Animation (RACE, MEMBERSHIP, etc.)
.fromTo(".footer-section .footer-col", 
    { y: 40, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
    "-=0.4"
)
// 3. Footer Bottom Copyright Text Animation
.fromTo(".footer-section .footer-bottom", 
    { y: 20, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
    "-=0.3"
);

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
});