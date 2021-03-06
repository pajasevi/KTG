$(function() { // runs after DOM has loaded
  $(window).resize(function () { KTG.resizeToCover(); });
  $(window).trigger('resize');

  if(Modernizr.video && !KTG.isMobile() && $.cookie('no-video') != 'true') {
    $.cookie('no-video', 'false', { path: '/' });

    var videos = {
      introVideo: videojs('introVideo'),
      czBlinkOnVideo: videojs('czBlinkOnVideo'),
      czBlinkOffVideo: videojs('czBlinkOffVideo'),
      enBlinkOnVideo: videojs('enBlinkOnVideo'),
      enBlinkOffVideo: videojs('enBlinkOffVideo'),
      czParkVideo: videojs('czParkVideo'),
      enParkVideo: videojs('enParkVideo')
    }

    KTG.sound = document.getElementById('backgroundSound');

    // Functions for sound control

    KTG.muteSound = function() {
        $.each(videos, function( key, value ) {
            value.muted(true);
            $('.mute-button').removeClass('mute-on').addClass('mute-off');
        });
        KTG.sound.muted = true;
    }

    KTG.unMuteSound = function() {
        $.each(videos, function( key, value ) {
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

    KTG.VideoController = function() {

      videos.czBlinkOnVideo.on('ended', function() {
        $('#czBlinkOnVideo').hide();
        $('#czBlinkOffVideo').show();
        videos.czParkVideo.currentTime(1);
      });

      videos.czBlinkOffVideo.on('ended', function() {
        videos.czBlinkOnVideo.currentTime(0);
        $('#czBlinkOffVideo').hide(0, function() {
          videos.czBlinkOffVideo.currentTime(0);
          videos.czParkVideo.currentTime(0);
        });
      });

      videos.enBlinkOnVideo.on('ended', function() {
        $('#enBlinkOnVideo').hide();
        $('#enBlinkOffVideo').show();
        videos.enParkVideo.currentTime(1);
      });

      videos.enBlinkOffVideo.on('ended', function() {
        videos.enBlinkOnVideo.currentTime(0);
        $('#enBlinkOffVideo').hide(0, function() {
          videos.enBlinkOffVideo.currentTime(0);
          videos.enParkVideo.currentTime(0);
        });
      });

      videos.introVideo.on('ended', function() {
        KTG.appendFirst();
        KTG.sound.play();
      });

      videos.czParkVideo.on('ended', function() {
        window.location.href += "cz/";
        $('#czParkVideo').hide();
        KTG.appendFirst();
      });

      videos.enParkVideo.on('ended', function() {
        window.location.href += "en/";
        $('#enParkVideo').hide();
        KTG.appendFirst();
      });

      var queue = [];
      var state = "idle";
      var lastVideoState = null;

      var getState = function() {
        return state;
      }

      var setState = function(newState) {
        state = newState;
        if(newState === "idle") {
          processQueue();
        }
      }

      var isIdle = function() {
        return getState() === "idle";
      };

      var processQueue = function() {
        oldState = getState();

        queue = arrayUnique(queue);
        queue = removeFullStates(queue);

        newState = queue.shift();

        if(!newState) return;

        if(videos[newState]) {
          videos[newState].one('ended', function() {
            setState('idle');
          });

          $("#" + newState).show(0, function() {
            videos[newState].play();
            lastVideoState = newState;
          });
        }
        setState(newState);
      };

      var arrayUnique = function(a) {
        return a.reduce(function(p, c) {
          if (p.indexOf(c) < 0) p.push(c);
          return p;
        }, []);
      };

      var removeFullStates = function(a) {
        if(a[0] && a[1]) {
          if((a[0].indexOf('OnVideo') >= 0) && (a[1].indexOf('OffVideo') >= 0)) {
            a.shift();
            a.shift();
          }
        }
        return a;
      }

      var enqueue = function(item) {
        queue.push(item);
        queue = arrayUnique(queue);
        queue = removeFullStates(queue);
        if(isIdle()) {
          processQueue();
        }
      }

      return {
        "enqueue": enqueue,
        "videos": videos
      }
    };

    var videoController = new KTG.VideoController();

    videoController.enqueue("introVideo");

    $('.lang-link.cz').on('mouseenter', function() {
      videoController.enqueue("czBlinkOnVideo");
    });

    $('.lang-link.cz').on('mouseleave', function() {
      videoController.enqueue("czBlinkOffVideo");
    });

    $('.lang-link.en').on('mouseenter', function() {
      videoController.enqueue("enBlinkOnVideo");
    });

    $('.lang-link.en').on('mouseleave', function() {
      videoController.enqueue("enBlinkOffVideo");
    });

    $('.lang-link.cz').on('click', function( event ) {
      event.preventDefault();
      videos.czParkVideo.currentTime(1);
      videoController.enqueue('czParkVideo');
      KTG.hideFirst();
    });

    $('.lang-link.en').on('click', function( event ) {
      event.preventDefault();
      videos.enParkVideo.currentTime(1);
      videoController.enqueue('enParkVideo');
      KTG.hideFirst();
    });

    KTG.checkMute();
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
