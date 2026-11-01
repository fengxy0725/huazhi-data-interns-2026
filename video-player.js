'use strict';

(() => {
  const player = document.querySelector('.film-player');
  const video = player.querySelector('video');
  const controls = player.querySelector('.film-controls');
  const play = controls.querySelector('[data-film-play]');
  const seek = controls.querySelector('[data-film-seek]');
  const time = controls.querySelector('[data-film-time]');
  const mute = controls.querySelector('[data-film-mute]');
  const full = controls.querySelector('[data-film-full]');
  const status = player.querySelector('.film-status');

  function formatTime(seconds) {
    const s = Math.floor(seconds);
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }

  function updateTime() {
    const ready = Number.isFinite(video.duration) && video.duration > 0;
    const elapsed = formatTime(video.currentTime);
    time.textContent = ready ? elapsed + ' / ' + formatTime(video.duration) : elapsed;
    seek.disabled = !ready;
    if (ready) {
      seek.max = video.duration;
      seek.value = video.currentTime;
      seek.setAttribute('aria-valuetext', time.textContent);
    }
  }

  function showMessage(text) {
    status.textContent = text;
    status.hidden = false;
  }

  async function togglePlay() {
    if (!video.paused) {
      video.pause();
      return;
    }
    try {
      status.hidden = true;
      if (video.error) video.load();
      await video.play();
    } catch (error) {
      if (error.name !== 'AbortError') showMessage('视频暂时无法播放，请稍后再次点播放。');
    }
  }

  video.addEventListener('play', () => { play.textContent = '暂停'; status.hidden = true; });
  video.addEventListener('pause', () => { play.textContent = '播放'; });
  video.addEventListener('ended', () => { play.textContent = '重播'; });
  video.addEventListener('error', () => showMessage('视频加载失败，点播放可重试。'));
  for (const event of ['durationchange', 'loadedmetadata', 'timeupdate']) video.addEventListener(event, updateTime);
  play.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  seek.addEventListener('input', () => { video.currentTime = Number(seek.value); });
  mute.addEventListener('click', () => { video.muted = !video.muted; });
  video.addEventListener('volumechange', () => { mute.textContent = video.muted ? '取消静音' : '静音'; });

  if (document.fullscreenEnabled && player.requestFullscreen) {
    full.hidden = false;
    full.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement === player) await document.exitFullscreen();
        else await player.requestFullscreen();
      } catch {
        showMessage('当前浏览器未允许全屏，可以继续在页内播放。');
      }
    });
    document.addEventListener('fullscreenchange', () => {
      full.textContent = document.fullscreenElement === player ? '退出全屏' : '全屏';
    });
  } else if (typeof video.webkitEnterFullscreen === 'function') {
    full.hidden = false;
    full.addEventListener('click', () => {
      try { video.webkitEnterFullscreen(); }
      catch { showMessage('请先播放视频，再进入全屏。'); }
    });
  }

  updateTime();
  video.controls = false;
  controls.hidden = false;
})();
