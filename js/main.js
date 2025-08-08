// Main JavaScript for Bubbles Media Website

$(document).ready(function() {
    // Check if chatbot elements exist
    if ($('.chat-toggle').length > 0) {
        console.log('Chatbot elements found');
        // Ensure chatbot is visible
        $('.live-chat-widget').css({
            'z-index': '9999',
            'position': 'fixed',
            'bottom': '30px',
            'right': '30px'
        });
        $('.chat-toggle').css({
            'display': 'block',
            'visibility': 'visible',
            'background': 'red !important',
            'border': '3px solid yellow !important'
        });
        console.log('Chatbot styling applied');
    } else {
        console.log('Chatbot elements not found');
    }
    
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
    if ($('.testimonial-carousel').length > 0) {
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
    }

    // Client Logo Carousel
    if ($('.logo-carousel').length > 0) {
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
    }

    // Live Chat Widget Toggle
    if ($('.chat-toggle').length > 0) {
        console.log('Attaching chat toggle event');
        $('.chat-toggle').on('click', function() {
            console.log('Chat toggle clicked');
            $('.chat-container').fadeToggle().addClass('show');
            $('.chat-badge').hide(); // Hide badge when chat is opened
        });
    } else {
        console.log('Chat toggle not found');
    }

    if ($('.chat-close').length > 0) {
        console.log('Attaching chat close event');
        $('.chat-close').on('click', function() {
            console.log('Chat close clicked');
            $('.chat-container').fadeOut().removeClass('show');
        });
    } else {
        console.log('Chat close not found');
    }

    // Quick Response Buttons
    if ($('.quick-response-btn').length > 0) {
        console.log('Attaching quick response events');
        $('.quick-response-btn').on('click', function() {
            console.log('Quick response clicked:', $(this).data('message'));
            var message = $(this).data('message');
            $('.chat-input input').val(message);
            sendMessage();
        });
    } else {
        console.log('Quick response buttons not found');
    }

    // Chat Input Functionality
    if ($('.send-btn').length > 0) {
        console.log('Attaching send button event');
        $('.send-btn').on('click', function() {
            console.log('Send button clicked');
            sendMessage();
        });
    } else {
        console.log('Send button not found');
    }

    if ($('.chat-input input').length > 0) {
        console.log('Attaching chat input event');
        $('.chat-input input').on('keypress', function(e) {
            if (e.which === 13) {
                console.log('Enter key pressed');
                sendMessage();
            }
        });
    } else {
        console.log('Chat input not found');
    }

    function sendMessage() {
        console.log('sendMessage function called');
        var message = $('.chat-input input').val().trim();
        console.log('Message:', message);
        if (message !== '') {
            // Add user message
            var userMessage = `
                <div class="message user">
                    <div class="message-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="message-content">
                        <p>${message}</p>
                        <span class="message-time">${getCurrentTime()}</span>
                    </div>
                </div>
            `;
            $('.chat-messages').append(userMessage);
            $('.chat-input input').val('');
            
            // Scroll to bottom of chat
            $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
            
            // Simulate agent response based on message content
            setTimeout(function() {
                var agentResponse = getAgentResponse(message);
                var agentMessage = `
                    <div class="message agent">
                        <div class="message-avatar">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <div class="message-content">
                            <p>${agentResponse}</p>
                            <span class="message-time">${getCurrentTime()}</span>
                        </div>
                    </div>
                `;
                $('.chat-messages').append(agentMessage);
                $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
            }, 1000);
        }
    }

    function getCurrentTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    function getAgentResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('seo') || message.includes('search') || message.includes('optimization')) {
            return "Great! Our SEO services include keyword research, on-page optimization, technical SEO, and content strategy. We've helped businesses increase organic traffic by 200%+ on average. Would you like to schedule a free consultation?";
        } else if (message.includes('pricing') || message.includes('cost') || message.includes('price')) {
            return "Our pricing varies based on your specific needs and goals. We offer flexible packages starting from ₹15,000/month. Would you like to discuss your requirements? You can call us at +91 9390314113 for a detailed quote.";
        } else if (message.includes('schedule') || message.includes('call') || message.includes('meeting')) {
            return "Perfect! I can help you schedule a call. Our team is available Mon-Fri, 9AM-6PM. You can call us directly at +91 9390314113 or email us at info@bubblesmedia.com. What time works best for you?";
        } else if (message.includes('social media') || message.includes('facebook') || message.includes('instagram')) {
            return "Our social media marketing services include content creation, community management, paid advertising, and analytics. We help brands build meaningful connections with their audience. Would you like to see some case studies?";
        } else if (message.includes('website') || message.includes('design') || message.includes('development')) {
            return "We create stunning, responsive websites that convert visitors into customers. Our designs are modern, user-friendly, and optimized for performance. Would you like to see our portfolio?";
        } else if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
            return "You can reach us at:\n📞 Phone: +91 9390314113\n📧 Email: info@bubblesmedia.com\n📍 Location: Hyderabad, Telangana\n⏰ Hours: Mon-Fri, 9AM-6PM";
        } else {
            return "Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to call us at +91 9390314113 or email us at info@bubblesmedia.com for immediate assistance.";
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