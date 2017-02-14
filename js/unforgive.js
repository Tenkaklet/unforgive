$(function () {


  $('.nav li a').click(function() {
      $('.collapse').toggleClass('in');
  });

  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var height = $(window).height();
    $('.top-header, .icons').css({
        'opacity': ((height - scrollTop) / height)
    });
});




  

  var lightbox = $('#slides a').simpleLightbox();

  $('.navbar-right a.link').on('click', function(event) {
      event.preventDefault();

      var hash = this.hash;
      $('html, body').animate({
          scrollTop: $(hash).offset().top
      }, 800, function (){

      });
  });

  var relax = new Rellax('.rellax');


  // Mailchimp

  var subform = $('#mc-embedded-subscribe-form');
  var mailStatus = $('.status');
  var messages = {
      success: "Thank you! You're E-mail has been sent",
      failure: "Sorry please try again..."
  };
  $(subform).submit(function(event) {
    console.log(subform);
      if (event) event.preventDefault(); {
          sendForm(subform);
      }
      function sendForm (form) {
          $.ajax({
              type: form.attr('method'),
              url: form.attr('action'),
              data: form.serialize(),
              cache: false,
              dataType: 'json',
              contentType: "application/json; charset=utf-8",

          })
          .done(function(response) {

              mailStatus.text(response.msg);
          })
          .fail(function(data) {
              mailStatus.text(data.msg);

          });

      }
  }); // End Form Submit




  var form = $('.contact-form');

  var formMessages = $('#form-messages');

  $(form).submit(function() {
      // Stop the browser from submitting the form.
      event.preventDefault();

      // Serialize the form data.
      var formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        message: $('#message').val()
      };

      var checker = $('#checker').val();

      if (parseInt(checker) === 3) {
        sendMessage();
      } else {
        formMessages.text("Uh oh, you need to supply the correct to the simple math problem below");
      }

      function sendMessage() {
        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        })
        .fail(function(data) {
          console.log(data);
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
      }

  });


});
