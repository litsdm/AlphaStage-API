$(function () {
    $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 50) {
      $('.screen-main').fadeIn(500);
      $('.navbar-top').addClass('detach');
    }
    else {
      $('.screen-main').fadeOut(500);
      $('.navbar-top').removeClass('detach');
    }
  });

  function updateSignUpButton() {
    $btn = $('.btn-signup')

    if ($btn.hasClass('green')) {
      $btn.removeClass('green');
    }
    else {
      $btn.addClass('green');
    }

    $('.txt-change').fadeOut(200, function() {
      if ($btn.hasClass('green')) {
        $('.txt-change').text('launch awesome games!')
        $('.txt-change').fadeIn(200);
        return
      }

      $('.txt-change').text('play awesome games!')
      $('.txt-change').fadeIn(200);
    });

  }

  $('.btn-signup').click(function(e) {
    e.preventDefault();
    var email = $('[name=email]').val().trim();
    var isDeveloper = isDev();

    if (!validateEmail(email)) {
      swal("Invalid email", "", "error");
      return
    }

    var potentialUser = {
      user: {
        email: email,
        isDeveloper: isDeveloper
      }
    }

    $.ajax({
      type: 'POST',
      url: '/register',
      data: JSON.stringify(potentialUser),
      contentType: 'application/json',
      success: function(data) {
        swal("Thank you for subscribing!", "Your mail has been added to our list!", "success");
      },
      error: function(err) {
        swal("There was an error!", err, "error");
      }
    });
  });

  function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function isDev() {
    $btn = $('.btn-signup')
    if ($btn.hasClass('green')) {
      return false
    }

    return true
  }

  $('.dev-select').click(function (e) {
    e.preventDefault();
    var $target = $('.dev-select');
    var $playerSelect = $('.player-select');

    if ($target.hasClass('active')) {
      return
    }

    $target.addClass('active');
    $playerSelect.removeClass('active');

    updateSignUpButton();
  })

  $('.player-select').click(function (e) {
    e.preventDefault();
    var $target = $('.player-select');
    var $devSelect = $('.dev-select');

    if ($target.hasClass('active')) {
      return
    }

    $target.addClass('active');
    $devSelect.removeClass('active');

    updateSignUpButton();
  })

  $('.videoplay-btn').click(function(e) {
    e.preventDefault();
    $('#video-modal').modal();
  })

  Typed.new("#text-change", {
		strings: ["Get feedback", "Grow your community", "Build better games"],
		typeSpeed: 25,
    loop: true
	});

  $('.btn-download').click(function(e) {
    e.preventDefault();

    $('#downloadModal').modal();
  })
})
