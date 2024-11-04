import React, {useState, useEffect, useRef} from 'react';
import {View, Image, FlatList, StyleSheet, Dimensions} from 'react-native';
import {BASE_URL} from '../../api/api';
const defaultSliderImage = require('../../assets/slider/natureRepublic.png');

const Slide = ({image}) => {
  return <Image source={{uri: image}} style={styles.slideImage} />;
};

const Home = () => {
  const [sliders, setSliders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Function to fetch sliders
    const fetchSliders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/sliders/`);
        const data = await response.json();
        if (data.success) {
          setSliders(data.data);
        } else {
          console.error('Failed to fetch sliders data');
        }
      } catch (error) {
        console.error('Error fetching sliders data:', error);
      }
    };

    fetchSliders();
  }, []);

  useEffect(() => {
    const startAutoScroll = () => {
      const interval = setInterval(scrollToNextSlide, 3000); // Updated interval to 3 seconds
      setAutoScrollInterval(interval);
    };

    startAutoScroll();

    return () => {
      clearInterval(autoScrollInterval);
    };
  }, [currentIndex]);

  const scrollToNextSlide = () => {
    if (sliders.length > 0) {
      const nextIndex = (currentIndex + 1) % sliders.length;
      flatListRef.current.scrollToIndex({index: nextIndex});
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <View style={styles.container}>
      {sliders.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={sliders}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Slide image={item.small_device_url} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => {
            const contentOffset = event.nativeEvent.contentOffset.x;
            const index = Math.round(
              contentOffset / Dimensions.get('window').width,
            );
            setCurrentIndex(index);
          }}
        />
      ) : (
        <Image source={defaultSliderImage} style={styles.slideImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: Dimensions.get('window').width,
    height: 300,
    marginBottom: 7,
  },
  currentIndexText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default Home;
