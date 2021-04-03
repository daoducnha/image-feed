import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Text, View, Modal, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

import Feed from './screens/Feed';
import Comments from './screens/Comments';

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';



export default class App extends React.Component {

  state = {
    commentsForItem: {},
    showModal: false,
    selectedItem: null,
  };

  openCommentScreen = id => {
    this.setState({
      showModal: true,
      selectedItem: id,
    });
  };

  closeCommentScreen = () => {
    this.setState({
      showModal: false,
      selectedItem: null
    })
  }

  onSubmitComment = (text) => {
    const { selectedItem, commentsForItem } = this.state;
    const comments = commentsForItem[selectedItem] || [];

    const updated = {
      ...commentsForItem,
      [selectedItem]: [...comments, text],
    };

    this.setState({ commentsForItem: updated });

    try {
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log('Faild to save comment', text, 'for', selectedItem);
    }
  }

  async componentDidMount() {
    try {
      const commentsForItem = await AsyncStorage.getItem(ASYNC_STORAGE_COMMENTS_KEY);
      this.setState({
        commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {},
      })
    } catch (error) {
      console.log('Faild to load comments')
    }
  }

  render() {
    const { commentsForItem, showModal, selectedItem } = this.state;
    return (
      <View style={styles.container}>
        <Feed
          style={styles.feed}
          commentsForItem={commentsForItem}
          onPressComments={this.openCommentScreen}
        />
        <Modal
          visible={showModal}
          animationType='slide'
          onRequestClose={this.closeCommentScreen}
        >
          <Comments
            style={styles.container}
            comments={commentsForItem[selectedItem] || []}
            onClose={this.closeCommentScreen}
            onSubmitComment={this.onSubmitComment}
          />
        </Modal>
      </View>
    );


  }
}

const platformVersion = Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff'
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  },
  comments: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios' || platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  }
});
