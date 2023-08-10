import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  // This service needs to be registered for the module to work
  // but it will be used later in the "Receiving Events" section
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-jump-forward', async (event) => {
    let position = await TrackPlayer.getPosition();
    console.log(position)
    let newPosition = position + 15;
    await TrackPlayer.seekTo(newPosition);
});

  TrackPlayer.addEventListener('remote-jump-backward', async (event) => {
    let position = await TrackPlayer.getPosition();
    let newPosition = position - 15;
    await TrackPlayer.seekTo(newPosition);
  });

  TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious());

  TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());


};