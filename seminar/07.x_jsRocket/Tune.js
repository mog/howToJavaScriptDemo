var Tune = function () {
    "use strict";

    var _audio,
        _url,
        _requestPlay = false,
        _loaded = false,
        _isPaused = true,
        _volume = 1,
        _eventHandler = {
            "play" :function () {},
            "ended":function () {}
        };

    function play() {
        
        _requestPlay = true;

        if (_audio && _loaded) {
            
            _audio.volume = _volume;

            _isPaused = false;

            _audio.play();

            _eventHandler.play();
            _eventHandler.play = function(){};
        }
    }

    function onReady() {

        _audio.removeEventListener('canplaythrough', onReady);

        _loaded = true;

        if (_requestPlay === true) {
            play();
        }
    }

    function create(url) {

        _url = url;

        _audio = new Audio();

        //safari returns nothing on this, all the other 'probably'
        if(_audio.canPlayType('audio/ogg; codecs="vorbis"') == "probably")
            _url += 'ogg';
        else
            _url += 'mp3';

        _audio.src = _url;

        _audio.addEventListener('canplaythrough', onReady);
        _audio.addEventListener('timeupdate', function () {
            if (_audio.currentTime >= _audio.duration) {
                _eventHandler.ended();
            }
        }, false);

        _audio.load();
    }

    function pause() {

        if (_audio) {
            _audio.pause();
            _isPaused = true;
        }
    }

    function position(newPosition) {

        if (_audio) {

            if (newPosition &&  newPosition <= duration()) {
                _audio.currentTime = newPosition;
            }

            return _audio.currentTime;
        }

        return 0;
    }

    function duration() {

        if (_audio) {
            return _audio.duration;
        } else {
            return NaN;
        }
    }

    function setEvent(name, fn) {
        _eventHandler[name] = fn;
    }

    return { create:create,
        on         :setEvent,
        play       :play,
        pause      :pause,
        get position(){return (_audio ? _audio.currentTime : 0);},
        set position(seconds){ if(_audio && (seconds <= _audio.duration)){_audio.currentTime = seconds;}},
        get duration(){return ( _audio ? _audio.duration : NaN);},
        get isPaused(){return _isPaused;},
        get volume(){return _volume;},
        set volume(newVolume){_volume = newVolume;if(_audio) {_audio.volume = _volume;}},
    };
};