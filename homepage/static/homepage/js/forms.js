/* Handles contact form submission and passes the AJAX request to Django.
 *
**/
$(function() {
    // Listen for contact form submissions
    $('#contact-form').on('submit', function (event) {
        // Prevent redirection by Django
        event.preventDefault();

        // clear old response in case user previously sent a message
        $('#contact-form-message').text('');

        // Get and send form data
        var data = $(this).serializeArray();
        sendEmail(data, $(this).attr('action'), handleFormResponse);
    });

    // Post a request to make the email based on contact form data
    function sendEmail(data, url, callback) {
        $.ajax({
            data: data,
            type: 'POST',
            url: url,
            success: callback,
            error: callback
        });
    };

    function handleFormResponse(message) {
        $('#contact-form-message').text(message);
    };

    //////////////////////////
    // CSRF cookie handling //
    //////////////////////////
    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});
