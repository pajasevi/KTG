$(function() { // runs after DOM has loaded

  $(window).resize(function () { KTG.resizeToCover(); });
  $(window).trigger('resize');


  if(Modernizr.video && !KTG.isMobile() && $.cookie('no-video') != 'true') {

    $.cookie('no-video', 'false', { path: '/' });

    KTG.videos = {
        introVideo : videojs('introVideo'),
        czBlinkOnVideo : videojs('czBlinkOnVideo'),
        czBlinkOffVideo : videojs('czBlinkOffVideo'),
        enBlinkOnVideo : videojs('enBlinkOnVideo'),
        enBlinkOffVideo : videojs('enBlinkOffVideo'),
        czParkVideo : videojs('czParkVideo'),
        enParkVideo : videojs('enParkVideo')
    }

    KTG.VideoController = function() {
      var states = {
        "intro": ["idle"],
        "czBlinkOn" : ["czBlinkOff"],
        "czBlinkOff" : ["idle"],
        "enBlinkOn" : ["enBlinkOff"],
        "enBlinkOff" : ["idle"],
        "idle" : ["czBlinkOn, enBlinkOn"]
      }
      var line = [];
      var currentState = null;
      var isIdle = function() {
        this.currentState === "idle";
      };

      var handleLine = function() {
        if(this.isIdle()) {
          this.currentState = this.line.pop();
          // pustit video
        }
      }.bind(this);

      return {
        push : function(item) {
          this.line.push(item);
          this.handleLine();
        }
      }
    };

    var videoController = new KTG.VideoController();
    videoController.push("intro");

    KTG.getState = function() {
      return KTG.state;
    }

    KTG.setState = function(state) {
      KTG.state = state;
      console.log(state);
    }

    KTG.sound = document.getElementById('backgroundSound');

    // Functions for sound control

    KTG.muteSound = function() {
        $.each(KTG.videos, function( key, value ) {
            value.muted(true);
            $('.mute-button').removeClass('mute-on').addClass('mute-off');
        });
        KTG.sound.muted = true;
    }

    KTG.unMuteSound = function() {
        $.each(KTG.videos, function( key, value ) {
            value.muted(false);
            $('.mute-button').removeClass('mute-off').addClass('mute-on');
        });
        KTG.sound.muted = false;
    }

    KTG.checkMute = function() {
        if($.cookie('muted') == 'true') {
            KTG.muteSound();
        }
    }

    KTG.setState("off");

    // Intro video

    KTG.videos.introVideo.play();
    KTG.checkMute();

    KTG.videos.introVideo.on('ended', function() {
      KTG.appendFirst();
      KTG.sound.play()
    });

    // User hover events

    $(document).on('mousemove', function (event) {
      var target = $(event.target);

      if (target.hasClass('lang-link cz') && KTG.getState() == "off") { // hover on CZ car
        KTG.setState("cz-blink-on");
        $('#czBlinkOnVideo').show( function() {
          KTG.videos.czBlinkOnVideo.play();
        });
      }

      if (target.hasClass('lang-link en') && KTG.getState() == "off") { // hover on EN car
        KTG.setState("en-blink-on");
        $('#enBlinkOnVideo').show( function() {
          KTG.videos.enBlinkOnVideo.play();
        });
      }

      if(target.hasClass('first-ended no-controls') && KTG.getState() == "cz-blink-off") {
        KTG.videos.czBlinkOffVideo.play();
      }

      if(target.hasClass('first-ended no-controls') && KTG.getState() == "en-blink-off") {
        KTG.videos.enBlinkOffVideo.play();
      }
    });


    // CZ blink videos

    KTG.videos.czBlinkOnVideo.on('ended', function() {
      KTG.setState("cz-blink-off");
      $('#czBlinkOnVideo').hide();
      $('#czBlinkOffVideo').show();
      KTG.videos.czParkVideo.currentTime(1);
    });

    KTG.videos.czBlinkOffVideo.on('ended', function() {
      KTG.setState("off");
      $('#czBlinkOffVideo').hide( function() {
          KTG.videos.czBlinkOnVideo.currentTime( 0 );
          KTG.videos.czBlinkOffVideo.currentTime( 0 );
          KTG.videos.czParkVideo.currentTime(0);
      });
    });

    // EN blink videos

    KTG.videos.enBlinkOnVideo.on('ended', function() {
      KTG.setState("en-blink-off");
      $('#enBlinkOnVideo').hide();
      $('#enBlinkOffVideo').show();
      KTG.videos.enParkVideo.currentTime(1);
    });

    KTG.videos.enBlinkOffVideo.on('ended', function() {
      KTG.setState("off");
      $('#enBlinkOffVideo').hide( function() {
          KTG.videos.enBlinkOnVideo.currentTime( 0 );
          KTG.videos.enBlinkOffVideo.currentTime( 0 );
          KTG.videos.enParkVideo.currentTime(0);
      });
    });

    // Parking videos on click

    $('.lang-link.cz').on('click', function( event ) {
      event.preventDefault();
      $('#czParkVideo').show( function() {
          KTG.videos.czParkVideo.play();
          KTG.hideFirst();
          KTG.setState("park-video");
      });
    });

    $('.lang-link.en').on('click', function( event ) {
      event.preventDefault();
      $('#enParkVideo').show( function() {
          KTG.videos.enParkVideo.play();
          KTG.hideFirst();
          KTG.setState("park-video");
      });
    });

    // Parking videos events

    KTG.videos.czParkVideo.on('ended', function() {
      window.location.href += "cz/";
    });

    KTG.videos.enParkVideo.on('ended', function() {
      window.location.href += "en/";
    });

  }
  else {
    $('#video-wrap').remove();
    $('html').addClass('video-declined');
    $('.mute-button').remove();
    KTG.videoDeclined = true;
    KTG.appendFirst();
    $.cookie('no-video', 'true', { path: '/' });

    $('.lang-link.cz').on('click', function( event ) {
      event.preventDefault();
      window.location.href += "cz/";
    });

    $('.lang-link.en').on('click', function( event ) {
      event.preventDefault();
      window.location.href += "en/";
    });

    $('.lang-link.cz').on('mouseover', function( event ) {
      $('html').addClass('cz');
    });

    $('.lang-link.cz').on('mouseout', function( event ) {
      $('html').removeClass('cz');
    });

    $('.lang-link.en').on('mouseover', function( event ) {
      $('html').addClass('en');
    });

    $('.lang-link.en').on('mouseout', function( event ) {
      $('html').removeClass('en');
    });
  }


  // User Events

  $('.video-switcher.off').on('click', function() {
    $.cookie('no-video', 'true', { path: '/' });
    window.location.reload();
  });

  $('.video-switcher.on').on('click', function() {
    $.removeCookie('no-video', { path: '/' });
    window.location.reload();
  });

  // CZ tooltip hover

  $('.lang-link.cz').on('mouseover', function() {
      $('.tooltip.cz').animate({
          opacity: 1,
          top: "-=10"
      }, 300);
  });

  $('.lang-link.cz').on('mouseout', function() {
      $('.tooltip.cz').animate({
          opacity: 0,
          top: "+=10"
      }, 300);
  });

  // EN tooltip hover

  $('.lang-link.en').on('mouseover', function() {
      $('.tooltip.en').animate({
          opacity: 1,
          top: "-=10"
      }, 300);
  });

  $('.lang-link.en').on('mouseout', function() {
      $('.tooltip.en').animate({
          opacity: 0,
          top: "+=10"
      }, 300);
  });

  // Mute all sounds
  $('.mute-button').on('click', function( event ) {
      event.preventDefault();

      if( $(this).hasClass('mute-on') ) {
          KTG.muteSound();
          $.cookie('muted', 'true');
      }
      else {
          KTG.unMuteSound();
          $.cookie('muted', 'false');
      }
  });

});
