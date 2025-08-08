// Main JavaScript for Bubbles Media Website

$(document).ready(function() {
    // Mobile Menu Toggle
    $('.mobile-menu-toggle').on('click', function() {
        $('.nav-menu').toggleClass('active');
    });

    // Dropdown Menu for Mobile
    $('.dropdown > a').on('click', function(e) {
        if ($(window).width() < 992) {
            e.preventDefault();
            $(this).siblings('.dropdown-menu').toggleClass('active');
        }
    });

    // Sticky Header
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('sticky');
        } else {
            $('#header').removeClass('sticky');
        }
    });

    // Smooth Scrolling for Anchor Links
    $('a[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
                return false;
            }
        }
    });

    // Testimonial Carousel
    $('.testimonial-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Client Logo Carousel
    $('.logo-carousel').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    // Live Chat Widget Toggle
    $('.chat-toggle').on('click', function() {
        $('.chat-container').fadeToggle();
    });

    $('.chat-close').on('click', function() {
        $('.chat-container').fadeOut();
    });

    // Chat Input Functionality
    $('.chat-input button').on('click', function() {
        sendMessage();
    });

    $('.chat-input input').on('keypress', function(e) {
        if (e.which === 13) {
            sendMessage();
        }
    });

    function sendMessage() {
        var message = $('.chat-input input').val().trim();
        if (message !== '') {
            // Add user message
            $('.chat-messages').append('<div class="message user"><p>' + message + '</p></div>');
            $('.chat-input input').val('');
            
            // Scroll to bottom of chat
            $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
            
            // Simulate agent response (in a real app, this would be handled by a backend)
            setTimeout(function() {
                $('.chat-messages').append('<div class="message agent"><p>Thank you for your message. One of our agents will respond shortly.</p></div>');
                $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
            }, 1000);
        }
    }

    // Form Validation and Submission
    $('#home-contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var message = $('#message').val().trim();
        var isValid = true;
        
        if (name === '') {
            isValid = false;
            $('#name').addClass('error');
        } else {
            $('#name').removeClass('error');
        }
        
        if (email === '' || !isValidEmail(email)) {
            isValid = false;
            $('#email').addClass('error');
        } else {
            $('#email').removeClass('error');
        }
        
        if (message === '') {
            isValid = false;
            $('#message').addClass('error');
        } else {
            $('#message').removeClass('error');
        }
        
        if (isValid) {
            // In a real application, you would send this data to your server
            // For demo purposes, we'll just show a success message
            $(this).html('<div class="success-message"><i class="fas fa-check-circle"></i><p>Thank you for your message! We will get back to you soon.</p></div>');
            
            // Reset form after 5 seconds
            setTimeout(function() {
                $('#home-contact-form').trigger('reset');
                $('#home-contact-form').html(`
                    <div class="form-group">
                        <input type="text" id="name" name="name" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="phone" name="phone" placeholder="Your Phone Number">
                    </div>
                    <div class="form-group">
                        <select id="service" name="service">
                            <option value="" disabled selected>Select Service</option>
                            <option value="seo">SEO Services</option>
                            <option value="sem">SEM / Google Ads</option>
                            <option value="social">Social Media Marketing</option>
                            <option value="content">Content Marketing</option>
                            <option value="website">Website Design</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block">Send Message</button>
                    </div>
                `);
            }, 5000);
        }
    });
    
    // Newsletter Form Submission
    $('#newsletter-form').on('submit', function(e) {
        e.preventDefault();
        
        var email = $('#newsletter-email').val().trim();
        
        if (email === '' || !isValidEmail(email)) {
            $('#newsletter-email').addClass('error');
        } else {
            $('#newsletter-email').removeClass('error');
            // In a real application, you would send this data to your server
            // For demo purposes, we'll just show a success message
            $(this).html('<p class="success-message"><i class="fas fa-check-circle"></i> Thank you for subscribing!</p>');
            
            // Reset form after 3 seconds
            setTimeout(function() {
                $('#newsletter-form').trigger('reset');
                $('#newsletter-form').html(`
                    <div class="form-group">
                        <input type="email" id="newsletter-email" placeholder="Your Email" required>
                        <button type="submit" class="btn btn-primary">Subscribe</button>
                    </div>
                `);
            }, 3000);
        }
    });
    
    // Helper function to validate email
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add error class styling
    $('<style>.error { border-color: #FF6584 !important; box-shadow: 0 0 0 3px rgba(255, 101, 132, 0.1) !important; } .success-message { text-align: center; color: #4CAF50; padding: 20px; } .success-message i { font-size: 48px; margin-bottom: 15px; }</style>').appendTo('head');

    // Case Studies Filter Functionality
    $('.filter-btn').on('click', function() {
        var filter = $(this).data('filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter case studies
        if (filter === 'all') {
            $('.case-study-card').fadeIn();
        } else {
            $('.case-study-card').hide();
            $('.case-study-card[data-category*="' + filter + '"]').fadeIn();
        }
    });

    // Case Study Modal Functionality
    $('.view-case-study').on('click', function(e) {
        e.preventDefault();
        var modalId = $(this).attr('href');
        $(modalId).fadeIn();
        $('body').addClass('modal-open');
    });

    $('.modal-close').on('click', function() {
        $('.case-study-modal').fadeOut();
        $('body').removeClass('modal-open');
    });

    // Close modal when clicking outside
    $('.case-study-modal').on('click', function(e) {
        if (e.target === this) {
            $(this).fadeOut();
            $('body').removeClass('modal-open');
        }
    });

    // Close modal with Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('.case-study-modal').is(':visible')) {
            $('.case-study-modal').fadeOut();
            $('body').removeClass('modal-open');
        }
    });

    // Add modal-open class styling
    $('<style>.modal-open { overflow: hidden; }</style>').appendTo('head');

    // Google Analytics Integration (Replace UA-XXXXX-Y with your actual tracking ID)
    // In a real application, you would add your Google Analytics tracking code here
    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-XXXXX-Y');
    */
});