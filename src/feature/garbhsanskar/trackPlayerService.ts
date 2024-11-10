import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';
import {Gayatri} from '../../assets';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();

    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '0',
      url: 'https://s3.ap-south-1.amazonaws.com/everheal.website.public/Chants/Mahamrityunjaya+Mantra_+Mix+3+Times.mp3',
      title: 'Fluidity',
      artist: 'tobylane',
    },
    {
      id: '1',
      url: 'https://s3.ap-south-1.amazonaws.com/everheal.website.public/Chants/Mahamrityunjaya+Mantra_+Mix+7+Times.mp3',
      title: 'Gayatri',
      artist: 'tobylane',
    },
    {
      id: '2',
      url: 'https://s3.ap-south-1.amazonaws.com/everheal.website.public/Chants/Mahamrityunjaya+Mantra_+Mix+11+Times.mp3',
      title: 'hanuman',
      artist: 'tobylane',
    },
    {
      id: '3',
      url: 'https://s3.ap-south-1.amazonaws.com/everheal.website.public/Chants/Mahamrityunjaya+Mantra_+Mix+21+Times.mp3',
      title: 'god',
      artist: 'tobylane',
    },
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Off);
}

module.exports = async function playbackService() {
  // TODO: Attach remote event handlers
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
};
