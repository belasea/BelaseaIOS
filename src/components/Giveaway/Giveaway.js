import React from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

const Giveaway = ({offer = {}}) => {
  const {width} = useWindowDimensions();
  const source = {
    html: offer?.description || '',
  };

  return (
    <View style={styles.mainContent}>
      <View style={styles.liveOfferContent}>
        <Text style={styles.liveOfferTitle}>{offer?.title || 'No Title'}</Text>
        <View>
          <RenderHtml
            contentWidth={width}
            source={source}
            baseStyle={{color: 'black'}}
          />
        </View>
      </View>
      <View style={styles.offerImage}>
        {offer.image ? (
          <Image
            source={{uri: offer?.image}}
            style={styles.liveOfferCardImage}
          />
        ) : (
          <Text />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    marginTop: 5,
    backgroundColor: '#FFF',
    borderRadius: 7,
    elevation: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  liveOfferContent: {
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    overflow: 'hidden',
    color: '#000',
  },
  liveOfferTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#000',
  },
  offerImage: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },

  liveOfferCardImage: {
    width: 340,
    height: 250,
  },
  expireDate: {
    marginTop: 7,
    textAlign: 'right',
    marginBottom: 10,
    fontWeight: 'bold',
    paddingRight: 10,
  },

  liveOfferLike: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  liveOfferLikeLeft: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  liveOfferIcon: {
    marginRight: 20,
  },
  liveOfferLikeRight: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  liveOfferInputBox: {
    padding: 10,
    height: 50,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'gray',
  },
  liveOfferShowComment: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
  },
  liveOfferSaveComment: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  showComment: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    paddingBottom: 10,
  },
  liveOfferCommentButton: {
    marginTop: 5,
    padding: 6,
    backgroundColor: '#F9C65D',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#A88342',
  },
});
export default Giveaway;
