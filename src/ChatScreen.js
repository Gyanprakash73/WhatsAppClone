import React, {useRef} from 'react';
import {
  Text,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import chats from './Data/chats';

const {width, height} = Dimensions.get('window');
const CHATDATA = chats;

const ChatScreen = ({navigation}) => {
  const scroll = useRef(new Animated.Value(0)).current;

  const renderForeground = () => {
    return (
      <View style={styles.foregroundView}>
        <Text style={styles.headerText}>WhatsApp</Text>
        <View style={styles.headerRightView}>
          <EvilIcons
            name="search"
            size={30}
            color={'#fff'}
            style={styles.headerSearchIcon}
          />
          <Entypo name="dots-three-vertical" size={19} color={'#fff'} />
        </View>
      </View>
    );
  };

  const renderContent = label => (
    <View style={styles.content}>
      <Text>{label}</Text>
    </View>
  );

  const renderChats = () => (
    <View style={styles.chatMainView}>
      <FlatList
        data={CHATDATA}
        renderItem={chatItemView}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const chatItemView = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.chatView}
        onPress={() => navigation.navigate('ChatDetailsScreen')}
        activeOpacity={0.9}>
        <Image source={{uri: item.profilePic}} style={styles.chatProfilePic} />
        <View style={styles.chatRightView}>
          <View style={styles.chatRightTopView}>
            <Text style={styles.chatNameText}>{item.name}</Text>
            <Text style={styles.chatLstMesTime}>{item.lst_mes_time}</Text>
          </View>
          <Text style={styles.chatLstMesText}>{item.lst_mes}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#075E54'} />
      <StickyParallaxHeader
        foreground={renderForeground()}
        parallaxHeight={50}
        headerHeight={30}
        headerSize={() => {}}
        onEndReached={() => {}}
        // initialPage={1}
        scrollEvent={Animated.event(
          [{nativeEvent: {contentOffset: {y: scroll}}}],
          {useNativeDriver: false},
        )}
        tabs={[
          {
            title: '.',
            content: renderContent('CAMERA TAB'),
            icon: <FontAwesome name="camera" size={22} color={'#fff'} />,
          },
          {
            title: 'Chats',
            content: renderChats(),
          },
          {
            title: 'Status',
            content: renderContent('STATUS TAB'),
          },
          {
            title: 'Calls',
            content: renderContent('CALLS TAB'),
          },
        ]}
        tabTextStyle={styles.tabText}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabTextContainerActiveStyle={{}}
        tabTextActiveStyle={styles.tabTextActiveStyle}
        tabsContainerBackgroundColor={'#075E54'}
        tabsWrapperStyle={styles.tabsWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  foregroundView: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerText: {fontSize: 20, color: '#fff', marginLeft: 20},
  headerRightView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
  },
  headerSearchIcon: {marginRight: 15},
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  chatMainView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  chatView: {
    width: width,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  chatProfilePic: {
    width: 55,
    height: 55,
    borderRadius: 999,
  },
  chatRightView: {flex: 1},
  chatRightTopView: {flexDirection: 'row', alignItems: 'center', marginLeft: 8},
  chatNameText: {width: width / 3, color: '#000', fontSize: 18},
  chatLstMesTime: {position: 'absolute', right: 0},
  chatLstMesText: {marginLeft: 9},
  tabText: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#bdbbbb',
    fontWeight: 'bold',
  },
  tabTextContainerStyle: {
    marginVertical: 7,
    marginHorizontal: 9,
  },
  tabTextActiveStyle: {
    color:'#fff'
  },
  tabsWrapper: {},
});

export default ChatScreen;
