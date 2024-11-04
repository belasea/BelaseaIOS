import React, {useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native';

// contexts
import {CartContext} from '../contexts/CartContext';

// third party
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Stacks
import LoginStackNavigator from './stack-navigators/LoginStackNavigator';
import SignupStackNavigator from './stack-navigators/SignupStackNavigator';

import HomeStackNavigator from './stack-navigators/HomeStackNavigator';
// import OTPStackNavigator from "./stack-navigators/OTPStackNavigator";
// import WelcomeStackNavigator from './stack-navigators/WelcomeStackNavigator'
import BrandStackNavigator from './stack-navigators/BrandStackNavigator';
import GiveawayStackNavigator from './stack-navigators/GiveawayStackNavigator';
import CallStackNavigator from './stack-navigators/CallStackNavigator';
import CategoryStackNavigator from './stack-navigators/CategoryStackNavigator';
import ProductListByCategoryStackNavigator from './stack-navigators/ProductListByCategoryStackNavigator';
import SearchProductStackNavigator from './stack-navigators/SearchProductStackNavigator';
import ProductDetailStackNavigator from './stack-navigators/ProductDetailStackNavigator';
import CartStackNavigator from './stack-navigators/CartStackNavigator';
import CheckoutStackNavigator from './stack-navigators/CheckoutStackNavigator';
import OrderConfirmationStackNavigator from './stack-navigators/OrderConfirmationStackNavigator';
import InvoiceStackNavigator from './stack-navigators/InvoiceStackNavigator';

// UserProfile Stack
import UserProfileStackNavigator from './stack-navigators/UserProfileStackNavigator';
import PersonalInformationStackNavigator from './stack-navigators/PersonalInformationStackNavigator';
import TrackingMyParcelStackNavigator from './stack-navigators/TrackingMyParcelStackNavigator';
import PurchaseHistoryStackNavigator from './stack-navigators/PurchaseHistoryStackNavigator';
import ReturnPolicyStackNavigator from './stack-navigators/ReturnPolicyStackNavigator';
import SecurityPrivacyStackNavigator from './stack-navigators/SecurityPrivacyStackNavigator';
import TermsConditionStackNavigator from './stack-navigators/TermsConditionStackNavigator';
import ContactStackNavigator from './stack-navigators/ContactStackNavigator';
import AboutStackNavigator from './stack-navigators/AboutStackNavigator';
import SettingStackNavigator from './stack-navigators/SettingStackNavigator';

import ForgotPasswordStackNavigator from './stack-navigators/ForgotPasswordStackNavigator';

import {routes, screens} from './RouteItems';
// import {AuthContext} from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();

const tabOptions = ({route}) => {
  const item = routes.find(routeItem => routeItem.name === route.name);
  //   const {isAuthenticate} = useContext(AuthContext);

  if (!item.showInTab) {
    return {
      tabBarButton: () => <View style={{width: 0}} />,
      headerShown: false,
      tabBarStyle: styles.tabContainer,
      title: item.title,
    };
  }

  //   if (!isAuthenticate) {
  //     return {
  //       tabBarIcon: ({focused}) => item.icon(focused),
  //       tabBarLabel: ({focused}) => (
  //         <Text style={focused ? styles.tabBarLabel : styles.tabBarLabelTwo}>
  //           {item.title || ''}
  //         </Text>
  //       ),
  //       headerShown: false,
  //       tabBarStyle: {display: 'none'},
  //       title: item.title,
  //     };
  //   }

  if (!item.showInTab) {
    return {
      tabBarButton: () => <View style={{width: 0}} />,
      headerShown: false,
      tabBarStyle: styles.tabContainer,
      title: item.title,
    };
  }

  return {
    tabBarIcon: ({focused}) => item.icon(focused),
    tabBarLabel: ({focused}) => (
      <Text style={focused ? styles.tabBarLabel : styles.tabBarLabelTwo}>
        {item.title || ''}
      </Text>
    ),
    headerShown: false,
    tabBarStyle: styles.tabContainer,
    title: item.title,
  };
};

const BottomTabNavigator = ({route, navigation}) => {
  const {totalQuantity} = useContext(CartContext);

  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name={screens.HomeStack}
        component={HomeStackNavigator}
        options={{
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen
        name={screens.TrackingMyParcelStack}
        component={TrackingMyParcelStackNavigator}
      />
      <Tab.Screen
        name={screens.PurchaseHistoryStack}
        component={PurchaseHistoryStackNavigator}
      />
      <Tab.Screen name={screens.AboutStack} component={AboutStackNavigator} />
      <Tab.Screen
        name={screens.ReturnPolicyStack}
        component={ReturnPolicyStackNavigator}
      />
      <Tab.Screen
        name={screens.SecurityPrivacyStack}
        component={SecurityPrivacyStackNavigator}
      />
      <Tab.Screen
        name={screens.TermsAndConditionStack}
        component={TermsConditionStackNavigator}
      />
      <Tab.Screen
        name={screens.UserProfileStack}
        component={UserProfileStackNavigator}
      />
      <Tab.Screen
        name={screens.BrandStack}
        component={BrandStackNavigator}
        initialParams={{brandData: 'data'}}
        options={{
          unmountOnBlur: true,
        }}
      />
      {/*Giveaway*/}
      <Tab.Screen
        name={screens.GiveawayStack}
        component={GiveawayStackNavigator}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={screens.CategoryStack}
        component={CategoryStackNavigator}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={screens.ProductListByCategoryStack}
        component={ProductListByCategoryStackNavigator}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={screens.ProductDetailStack}
        component={ProductDetailStackNavigator}
      />

      <Tab.Screen name={screens.CallStack} component={CallStackNavigator} />
      <Tab.Screen
        name={screens.CartStack}
        component={CartStackNavigator}
        options={{
          tabBarBadge: totalQuantity,
          tabBarBadgeStyle: {backgroundColor: '#E04F54'},
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={screens.ContactStack}
        component={ContactStackNavigator}
      />
      <Tab.Screen
        name={screens.CheckoutStack}
        component={CheckoutStackNavigator}
      />
      <Tab.Screen
        name={screens.OrderConfirmationStack}
        component={OrderConfirmationStackNavigator}
      />
      <Tab.Screen
        name={screens.PersonalInformationStack}
        component={PersonalInformationStackNavigator}
      />
      <Tab.Screen
        name={screens.SettingStack}
        component={SettingStackNavigator}
      />
      <Tab.Screen
        name={screens.SearchProductStack}
        component={SearchProductStackNavigator}
      />
      <Tab.Screen
        name={screens.InvoiceStack}
        component={InvoiceStackNavigator}
      />

      <Tab.Screen
        name={screens.LoginStack}
        component={LoginStackNavigator}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />

      <Tab.Screen
        name={screens.SignupStack}
        component={SignupStackNavigator}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />

      <Tab.Screen
        name={screens.ForgotPasswordStack}
        component={ForgotPasswordStackNavigator}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />

      {/* <Tab.Screen
        name={screens.OTPStack}
        component={OTPStackNavigator}
        options={{
          // hide the bottom tab bar on Welcome Screen
          tabBarStyle: {display: 'none'},
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#0C0C0C',
    fontSize: 12,
  },
  tabBarLabelTwo: {
    color: '#969696',
    fontSize: 12,
  },
  tabContainer: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    height: 55,
    backgroundColor: '#FFF',
    paddingBottom: 4,
  },
});

export default BottomTabNavigator;
