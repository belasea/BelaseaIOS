import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader/loader';

const UserProfileScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.userProfile}>
          <View style={styles.userProfileImageWrap}>
            <FontAwesome name="user-o" size={65} color="black" />
          </View>
          <View style={styles.userProfileWrapper}>
            <Text style={styles.userProfileTitle}>More Details</Text>
          </View>

          <ScrollView>
            {/*Personal Information this will use after authentication */}
            {/* <TouchableOpacity onPress={() => navigation.navigate("PersonalInformationStack")}>
                <View style={styles.userProfileContent}>
                    <View style={styles.profileIcon}>
                        <Text>
                            <FontAwesome name="user-o" size={20} color="black"/>
                        </Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileInfoTitle}>Personal Information</Text>
                    </View>
                    <View style={styles.profileRightArrow}>
                        <Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black"/>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity> */}

            {/*Tracking My Parcel*/}
            <TouchableOpacity
              onPress={() => navigation.navigate('TrackingMyParcelStack')}>
              <View style={styles.userProfileContent}>
                <View style={styles.profileIcon}>
                  <Text>
                    <MaterialIcons
                      name="local-shipping"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileInfoTitle}>
                    Tracking My Parcel
                  </Text>
                </View>
                <View style={styles.profileRightArrow}>
                  <Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/*Order History*/}
            <TouchableOpacity
              onPress={() => navigation.navigate('PurchaseHistoryStack')}>
              <View style={styles.userProfileContent}>
                <View style={styles.profileIcon}>
                  <Text>
                    <MaterialIcons name="history" size={24} color="black" />
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileInfoTitle}>Purchase History</Text>
                </View>
                <View style={styles.profileRightArrow}>
                  <Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/*Return Policy*/}
            <TouchableOpacity
              onPress={() => navigation.navigate('ReturnPolicyStack')}>
              <View style={styles.userProfileContent}>
                <View style={styles.profileIcon}>
                  <Text>
                    <MaterialIcons name="read-more" size={24} color="black" />
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileInfoTitle}>Return Policy</Text>
                </View>
                <View style={styles.profileRightArrow}>
                  <Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/*Security & Privacy*/}
            <TouchableOpacity
              onPress={() => navigation.navigate('SecurityPrivacyStack')}>
              <View style={styles.userProfileContent}>
                <View style={styles.profileIcon}>
                  <Text>
                    <MaterialIcons name="read-more" size={24} color="black" />
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileInfoTitle}>
                    Security & Privacy
                  </Text>
                </View>
                <View style={styles.profileRightArrow}>
                  <Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/*Terms & Conditions*/}
            <TouchableOpacity
              onPress={() => navigation.navigate('TermsAndConditionStack')}>
              <View style={styles.userProfileContent}>
                <View style={styles.profileIcon}>
                  <Text>
                    <MaterialIcons name="read-more" size={24} color="black" />
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileInfoTitle}>
                    Terms & Conditions
                  </Text>
                </View>
                <View style={styles.profileRightArrow}>
                  <Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/*Support or Contact Us*/}
            <TouchableOpacity
              onPress={() => navigation.navigate('ContactStack')}>
              <View style={styles.userProfileContent}>
                <View style={styles.profileIcon}>
                  <Text>
                    <AntDesign name="contacts" size={24} color="black" />
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileInfoTitle}>Contact Us</Text>
                </View>
                <View style={styles.profileRightArrow}>
                  <Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/*About Us*/}
            <TouchableOpacity onPress={() => navigation.navigate('AboutStack')}>
              <View style={styles.userProfileContent}>
                <View style={styles.profileIcon}>
                  <Text>
                    <MaterialIcons name="read-more" size={24} color="black" />
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileInfoTitle}>About Us</Text>
                </View>
                <View style={styles.profileRightArrow}>
                  <Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/*Settings this will use after authentication */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('SettingStack')}>
              <View style={styles.userProfileContent}>
                <View style={styles.profileIcon}>
                  <Text>
                    <AntDesign name="setting" size={24} color="black" />
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileInfoTitle}>Settings</Text>
                </View>
                <View style={styles.profileRightArrow}>
                  <Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity> */}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userProfile: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: '0%',
      },
      android: {
        marginBottom: 0,
      },
    }),
  },
  userProfileImageWrap: {
    justifyCenter: 'center',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccccca',
  },
  userProfileTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userProfileContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 7,
  },
  profileIcon: {
    flex: 1,
    justifyCenter: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 5,

    ...Platform.select({
      ios: {
        marginBottom: 20,
      },
      android: {
        marginBottom: 10,
      },
    }),
  },
  profileInfoTitle: {
    fontSize: 16,
  },
  profileRightArrow: {
    flex: 1,
    justifyCenter: 'center',
    alignItems: 'center',
  },
  logoutWrap: {
    flex: 1,
    margin: 20,
    paddingTop: 10,
    marginBottom: 40,
  },
  logout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  logoutTitle: {
    fontWeight: 'bold',
  },

  userProfileWrapper: {
    borderBottomColor: '#ccccca',
    borderBottomWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
    marginRight: 10,
    paddingBottom: 10,
    borderColor: '#ccccca',
  },
});
export default UserProfileScreen;
