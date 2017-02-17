$(function () {
  function updateSignUpButton() {
    $btn = $('.btn-signup')

    if ($btn.hasClass('green')) {
      $btn.removeClass('green');
      $btn.text('Sign up to launch awesome games')
      return
    }

    $btn.addClass('green');
    $btn.text('Sign up to play awesome games')
  }

  $('.btn-signup').click(function(e) {
    e.preventDefault();
    var email = $('[name=email]').val().trim();
    var isDeveloper = isDev();

    if (!validateEmail(email)) {
      alert('Invalid email');
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
        console.log(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

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
})
