let currentAudio: HTMLAudioElement | null = null;

export function playSound(src: string) {
  try {
    // stop previous audio so NO overlap happens
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(src);
    audio.volume = 1;

    currentAudio = audio;

    audio.play().catch(() => {});
  } catch (e) {
    console.log("Audio error:", src);
  }
}

export function stopAllSounds() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}