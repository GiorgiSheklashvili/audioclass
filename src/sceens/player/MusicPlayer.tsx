import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  AppKilledPlaybackBehavior
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  PlayerScreenRouteProp,
} from '../../navigation/Navigation';
// import songs from './data';

type PlayerScreenProps = {
  route: PlayerScreenRouteProp;
};

const {width, height} = Dimensions.get('window');
const songs1 = [{
  // id: 1,
  // title: '19th Floor',
  // artist: 'Bobby Richards',
  artwork: "http://104.248.33.22/pub/media/catalog/product/n/a/napoleon_4.jpg",
  // url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
}]
const COMPACT_AUDIO_CAPABILITIES = [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious, Capability.Stop];
const AUDIO_CAPABILITIES = [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious, Capability.Stop, Capability.JumpForward, Capability.JumpBackward];


const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log(currentTrack, playBackState, State.Playing);

  if (currentTrack != null) {
    if (playBackState == State.Paused || playBackState == State.Ready) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

export const MusicPlayer = ({ route} : PlayerScreenProps ) => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  //   custom states
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState(null);
  // custom referecnces
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  interface SongData {
    url: string;
    id: string;
    title: string;
    artist: string;
    artwork: string;
  }
  const [songs, setSongs] = useState([{url: route?.params?.file, id: route?.params?.id, title: route?.params?.title,
    artist: route?.params?.artist, artwork: route?.params?.artwork,
  }]);

  //   changing the track on complete
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artwork, artist} = track;
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off';
    }

    if (repeatMode == 'track') {
      return 'repeat-once';
    }

    if (repeatMode == 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }

    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }

    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  const setupPlayer = async (linksArray) => {
    try {
      // if(!initializedPlayer){
      //   await TrackPlayer.setupPlayer();
      //   setInitializedPlayer(true);
      // }
      await TrackPlayer.updateOptions({
        android: {
          // This is the default behavior
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.PausePlayback
      },
        capabilities: AUDIO_CAPABILITIES,
        compactCapabilities: COMPACT_AUDIO_CAPABILITIES,
        notificationCapabilities: AUDIO_CAPABILITIES,
      });
      await TrackPlayer.reset();
      console.log(linksArray);
      await TrackPlayer.add(linksArray);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    setupPlayer([{url: route?.params?.file, id: route?.params?.id, title: route?.params?.title,
      artist: route?.params?.artist, artwork: route?.params?.artwork,
    }]);
    scrollX.addListener(({value}) => {
      //   console.log(`ScrollX : ${value} | Device Width : ${width} `);

      const index = Math.round(value / width);
      skipTo(index);
      setsongIndex(index);

      //   console.log(`Index : ${index}`);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSongs = ({item, index}) => {
    return (
      <Animated.View style={style.mainWrapper}>
        <View style={[style.imageWrapper, style.elevation]}>
          {trackArtwork!=null && 
          <Image
            source={{uri: trackArtwork}}
            style={style.musicImage}
          />
          }
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
       {/* music player section */}
       <View style={style.mainContainer}>
        {/* Image */}
        <Animated.FlatList
        ref={songSlider}
        renderItem={renderSongs}
        data={songs}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {useNativeDriver: true},
        )}
      />

        {/* Title & Artist Name */}
        <View>
          <Text style={[style.songContent, style.songTitle]}>
            {/* {songs[songIndex].title} */ trackTitle}
          </Text>
          <Text style={[style.songContent, style.songArtist]}>
            {/* {songs[songIndex].artist} */ trackArtist}
          </Text>
        </View>

        {/* songslider */}
        <View>
          <Slider
            style={style.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />

          {/* Progress Durations */}
          <View style={style.progressLevelDuraiton}>
            <Text style={style.progressLabelText}>
              {new Date(progress.position * 1000)
                .toLocaleTimeString()
                .substring(3)}
            </Text>
            <Text style={style.progressLabelText}>
              {new Date((progress.duration - progress.position) * 1000)
                .toLocaleTimeString()
                .substring(3)}
            </Text>
          </View>
        </View>

        {/* music control */}
        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Icon name="play-skip-back-outline" size={35} color="#FFD369" />
            {/* <PlayIcon /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Icon
              name={
                playBackState === State.Playing
                  ? 'pause-circle-outline'
                  : 'play-circle-outline'
              }
              size={75}
              color="#FFD369"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Icon
              name="play-skip-forward-outline"
              size={35}
              color="#FFD369"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* bottom section */}
      <View style={style.bottomSection}>
        <View style={style.bottomIconContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="heart-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              size={30}
              color={repeatMode !== 'off' ? '#FFD369' : '#888888'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Icon name="share-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Icon name="ellipsis-horizontal" size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    borderTopColor: '#393E46',
    borderWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },

  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  elevation: {
    elevation: 5,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
});