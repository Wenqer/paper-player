(function () {
  'use strict'

  Polymer({
    ready: function() {
      this.tracks = [
        {
          title: 'Linus Young - Home',
          src: 'http://cs7-4v4.vk.me/p18/6102920be909b4.mp3'
        },
        {
          title: 'Linus Young - Crystal Ball',
          src: 'http://cs7-3v4.vk.me/p18/33a06f5f4a8fe9.mp3'
        }
      ]

      this.player = this.$.playerContainer
      this.current = this.tracks[0]
      this.played = !this.player.paused
    },
    setTrack: function(e, d, s) {
      this.current = s.templateInstance.model.track
      return this.play()
    },
    seekTo: function(e, d, s) {
      this.player.currentTime = s.value
    },
    togglePlay: function() {
      this.played ? this.pause() : this.play()
    },
    trackEnded: function() {
      var pos = this.tracks.indexOf(this.current) + 1
      pos = this.tracks[pos] ? pos : 0
      this.current = this.tracks[pos]
      this.play()
    },
    durationChange: function() {
      this.trackDuration = this.player.duration
    },
    timeUpdate: function() {
      this.currentTrackDurration = this.player.currentTime
    },
    progressUpdate: function() {
      var buf = this.player.buffered,
        len = buf.length
      if (len) {
        this.downloaded = buf.end(len - 1)
      }
    },
    toTime: function(val) {
      var m = Math.round(val / 60),
        s = Math.round(val % 60)
      if (s < 10) s = '0' + s
      return [m, s].join(':')
    },
    printJson: {
      toDOM: function(value) {
        return value && JSON.stringify(value, null, '\t')
      },
      toModel: function(value) {
        return value && JSON.parse(value)
      }
    },
    play: function() {
      this.async(function() {
        this.player.play()
      })
      this.played = true
      return this
    },
    pause: function() {
      this.player.pause()
      this.played = false
      return this
    }
  })

})()
