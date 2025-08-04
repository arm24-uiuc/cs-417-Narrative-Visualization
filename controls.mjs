export function setupControls({
  playButton,
  resetButton,
  onPlayPause,
  onReset,
}) {
  playButton.addEventListener("click", onPlayPause);
  resetButton.addEventListener("click", onReset);
}
