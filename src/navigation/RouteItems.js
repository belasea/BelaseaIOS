import React from 'react';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const screens = {
  HomeTab: 'HomeTab',
  HomeStack: 'HomeStack',
  Home: 'Home',

  // OTPStack: 'OTPStack',
  // OTP: 'OTP',

  // WelcomeStack: 'WelcomeStack',
  // Welcome: 'Welcome',

  LoginStack: 'LoginStack',
  Login: 'Login',

  SignupStack: 'SignupStack',
  Signup: 'Signup',

  ForgotPasswordStack: 'ForgotPasswordStack',
  ForgotPassword: 'ForgotPassword',

  BrandStack: 'BrandStack',
  Brand: 'Brand',

  GiveawayStack: 'GiveawayStack',
  Giveaway: 'Giveaway',

  CallStack: 'CallStack',
  Call: 'Call',

  CategoryStack: 'CategoryStack',
  Category: 'Category',

  ProductListByCategoryStack: 'ProductListByCategoryStack',
  ProductListByCategory: 'ProductListByCategory',

  SearchProductStack: 'SearchProductStack',
  SearchProduct: 'SearchProduct',

  ProductDetailStack: 'ProductDetailStack',
  ProductDetail: 'ProductDetail',

  CartStack: 'CartStack',
  Cart: 'Cart',

  CheckoutStack: 'CheckoutStack',
  Checkout: 'Checkout',

  OrderConfirmationStack: 'OrderConfirmationStack',
  OrderConfirmation: 'OrderConfirmation',

  InvoiceStack: 'InvoiceStack',
  Invoice: 'Invoice',

  /*------------------------------------
        User Profile
    -------------------------------------*/
  UserProfileStack: 'UserProfileStack',
  UserProfile: 'UserProfile',

  PersonalInformationStack: 'PersonalInformationStack',
  PersonalInformation: 'PersonalInformation',

  TrackingMyParcelStack: 'TrackingMyParcelStack',
  TrackingMyParcel: 'TrackingMyParcel',

  PurchaseHistoryStack: 'PurchaseHistoryStack',
  PurchaseHistory: 'PurchaseHistory',

  ReturnPolicyStack: 'ReturnPolicyStack',
  ReturnPolicy: 'ReturnPolicy',

  SecurityPrivacyStack: 'SecurityPrivacyStack',
  SecurityPrivacy: 'SecurityPrivacy',

  TermsAndConditionStack: 'TermsAndConditionStack',
  TermsAndCondition: 'TermsAndCondition',

  ContactStack: 'ContactStack',
  Contact: 'Contact',

  AboutStack: 'AboutStack',
  About: 'About',

  SettingStack: 'SettingStack',
  Setting: 'Setting',
};

export const routes = [
  // 1. HomeStack ===================

  {
    name: screens.HomeTab,
    focusedRoute: screens.HomeTab,
    title: 'Home',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <FontAwesome
        name="home"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.HomeStack,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: true,
    icon: focused => (
      <FontAwesome
        name="home"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.Home,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: false,
    icon: focused => (
      <FontAwesome
        name="home"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },

  // 2. OTP SEND =================================
  // {
  //   name: screens.OTPStack,
  //   focusedRoute: screens.OTPStack,
  //   title: 'OTP',
  //   showInTab: false,
  //   showInDrawer: true,
  // },
  // {
  //   name: screens.OTP,
  //   focusedRoute: screens.OTPStack,
  //   title: 'OTP',
  //   showInTab: false,
  //   showInDrawer: false,
  // },

  // 3. Welcome ================================
  // {
  //   name: screens.WelcomeStack,
  //   focusedRoute: screens.WelcomeStack,
  //   title: 'Welcome',
  //   showInTab: false,
  //   showInDrawer: false,
  // },
  // // Tab
  // {
  //   name: screens.Welcome,
  //   focusedRoute: screens.WelcomeStack,
  //   title: 'Welcome',
  //   showInTab: false,
  //   showInDrawer: false,
  // },

  // 3. Login ====================================
  {
    name: screens.LoginStack,
    focusedRoute: screens.LoginStack,
    title: 'Login',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <Ionicons
        name="grid-sharp"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.Login,
    focusedRoute: screens.LoginStack,
    title: 'Login',
    showInTab: false,
    showInDrawer: false,

    icon: focused => (
      <Ionicons
        name="grid-sharp"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },

  // 4. Signup ====================================
  {
    name: screens.SignupStack,
    focusedRoute: screens.SignupStack,
    title: 'Signup',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <Ionicons
        name="grid-sharp"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.Signup,
    focusedRoute: screens.SignupStack,
    title: 'Signup',
    showInTab: false,
    showInDrawer: false,

    icon: focused => (
      <Ionicons
        name="grid-sharp"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },

  // 4. Brand ====================================
  {
    name: screens.ForgotPasswordStack,
    focusedRoute: screens.ForgotPasswordStack,
    title: 'ForgotPassword',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <Ionicons
        name="grid-sharp"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.ForgotPassword,
    focusedRoute: screens.ForgotPasswordStack,
    title: 'ForgotPassword',
    showInTab: false,
    showInDrawer: false,

    icon: focused => (
      <Ionicons
        name="grid-sharp"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },

  // 4. Brand ====================================
  {
    name: screens.BrandStack,
    focusedRoute: screens.BrandStack,
    title: 'Brands',
    showInTab: true,
    showInDrawer: false,
    icon: focused => (
      <Ionicons
        name="grid-sharp"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.Brand,
    focusedRoute: screens.BrandStack,
    title: 'Brands',
    showInTab: false,
    showInDrawer: false,

    icon: focused => (
      <Ionicons
        name="grid-sharp"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },

  // 5. Giveaway ==================================
  {
    name: screens.GiveawayStack,
    focusedRoute: screens.GiveawayStack,
    title: 'Giveaway',
    showInTab: true,
    showInDrawer: false,
    icon: focused => (
      <AntDesign
        name="gift"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.Giveaway,
    focusedRoute: screens.GiveawayStack,
    title: 'Giveaway',
    showInTab: true,
    showInDrawer: false,
    icon: focused => (
      <AntDesign
        name="gift"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },

  // 6. Call ===================================
  {
    name: screens.CallStack,
    focusedRoute: screens.CallStack,
    title: 'Call Us',
    showInTab: true,
    showInDrawer: false,
    icon: focused => (
      <FontAwesome
        name="phone"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.Call,
    focusedRoute: screens.CallStack,
    title: 'Call Us',
    showInTab: true,
    showInDrawer: false,
    icon: focused => (
      <FontAwesome
        name="phone"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },

  // 7. Category ==============================
  {
    name: screens.CategoryStack,
    focusedRoute: screens.CategoryStack,
    title: 'Category',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <MaterialIcons
        name="grid-on"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.Category,
    focusedRoute: screens.CategoryStack,
    title: 'Category',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <MaterialIcons
        name="grid-on"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },

  // 8. ProductList Category =============================
  {
    name: screens.ProductListByCategoryStack,
    focusedRoute: screens.ProductListByCategoryStack,
    title: 'ProductListByCategory',
    showInTab: false,
    showInDrawer: false,
  },
  {
    name: screens.ProductListByCategory,
    focusedRoute: screens.ProductListByCategoryStack,
    title: 'ProductListByCategory',
    showInTab: false,
    showInDrawer: false,
  },

  // 9. SearchProduct Category ===================
  {
    name: screens.SearchProductStack,
    focusedRoute: screens.SearchProductStack,
    title: 'SearchProduct',
    showInTab: false,
    showInDrawer: true,
  },
  {
    name: screens.SearchProduct,
    focusedRoute: screens.SearchProductStack,
    title: 'SearchProduct',
    showInTab: false,
    showInDrawer: false,
  },

  // 10. ProductDetail ===========================
  {
    name: screens.ProductDetailStack,
    focusedRoute: screens.ProductDetailStack,
    title: 'Product Detail',
    showInTab: false,
    showInDrawer: false,
  },
  {
    name: screens.ProductDetail,
    focusedRoute: screens.ProductDetailStack,
    title: 'Product Detail',
    showInTab: false,
    showInDrawer: false,
  },

  // 11. Cart ============================
  {
    name: screens.CartStack,
    focusedRoute: screens.CartStack,
    title: 'Cart',
    showInTab: true,
    showInDrawer: false,
    icon: focused => (
      <FontAwesome
        name="shopping-cart"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  // Tab
  {
    name: screens.Cart,
    focusedRoute: screens.CartStack,
    title: 'Cart',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <FontAwesome
        name="shopping-cart"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },

  // 12. Checkout Process ====================
  {
    name: screens.CheckoutStack,
    focusedRoute: screens.CheckoutStack,
    title: 'Checkout',
    showInTab: false,
    showInDrawer: false,
  },
  {
    name: screens.Checkout,
    focusedRoute: screens.CheckoutStack,
    title: 'Checkout',
    showInTab: false,
    showInDrawer: false,
  },

  // 13. Order ConfirmationStack ======================
  {
    name: screens.OrderConfirmationStack,
    focusedRoute: screens.OrderConfirmationStack,
    title: 'Order Confirmation',
    showInTab: false,
    showInDrawer: false,
  },
  {
    name: screens.OrderConfirmation,
    focusedRoute: screens.OrderConfirmationStack,
    title: 'Order Confirmation',
    showInTab: false,
    showInDrawer: false,
  },

  // 14. InvoiceStack =======================
  {
    name: screens.InvoiceStack,
    focusedRoute: screens.InvoiceStack,
    title: 'Invoice',
    showInTab: false,
    showInDrawer: true,
  },
  {
    name: screens.Invoice,
    focusedRoute: screens.InvoiceStack,
    title: 'Invoice',
    showInTab: false,
    showInDrawer: false,
  },

  // 15. UserProfile ============================
  {
    name: screens.UserProfileStack,
    focusedRoute: screens.UserProfileStack,
    title: 'User Profile',
    showInTab: false,
    showInDrawer: false,
  },
  {
    name: screens.UserProfile,
    focusedRoute: screens.UserProfileStack,
    title: 'User Profile',
    showInTab: false,
    showInDrawer: false,
  },

  // 16. PersonalInformation ============================
  {
    name: screens.PersonalInformationStack,
    focusedRoute: screens.PersonalInformationStack,
    title: 'Personal Information',
    showInTab: false,
    showInDrawer: false,
  },
  // Tab
  {
    name: screens.PersonalInformation,
    focusedRoute: screens.PersonalInformationStack,
    title: 'Personal Information',
    showInTab: false,
    showInDrawer: false,
  },

  // 17. Tracking My Parcel =========================
  {
    name: screens.TrackingMyParcelStack,
    focusedRoute: screens.TrackingMyParcelStack,
    title: 'Tracking My Parcel',
    showInTab: false,
    showInDrawer: false,
  },
  // Tab
  {
    name: screens.TrackingMyParcel,
    focusedRoute: screens.TrackingMyParcelStack,
    title: 'Tracking My Parcel',
    showInTab: false,
    showInDrawer: false,
  },

  // 18. PurchaseHistoryStack ======================
  {
    name: screens.PurchaseHistoryStack,
    focusedRoute: screens.PurchaseHistoryStack,
    title: 'Purchase History',
    showInTab: false,
    showInDrawer: false,
  },
  {
    name: screens.PurchaseHistory,
    focusedRoute: screens.PurchaseHistoryStack,
    title: 'Purchase History',
    showInTab: false,
    showInDrawer: false,
  },

  // 19. ReturnPolicy ============================
  {
    name: screens.ReturnPolicyStack,
    focusedRoute: screens.ReturnPolicyStack,
    title: 'Return Policy',
    showInTab: false,
    showInDrawer: false,
  },
  // Tab
  {
    name: screens.ReturnPolicy,
    focusedRoute: screens.ReturnPolicyStack,
    title: 'Return Policy',
    showInTab: false,
    showInDrawer: false,
  },

  // 20. SecurityPrivacy ===========================
  {
    name: screens.SecurityPrivacyStack,
    focusedRoute: screens.SecurityPrivacyStack,
    title: 'Security Privacy',
    showInTab: false,
    showInDrawer: false,
  },
  // Tab
  {
    name: screens.SecurityPrivacy,
    focusedRoute: screens.SecurityPrivacyStack,
    title: 'Security Privacy',
    showInTab: false,
    showInDrawer: false,
  },

  // 21. Terms & Condition ===========================
  {
    name: screens.TermsAndConditionStack,
    focusedRoute: screens.TermsAndConditionStack,
    title: 'TermsAndCondition',
    showInTab: false,
    showInDrawer: false,
  },
  // Tab
  {
    name: screens.TermsAndCondition,
    focusedRoute: screens.TermsAndConditionStack,
    title: 'TermsAndCondition',
    showInTab: false,
    showInDrawer: false,
  },

  // 22. Contact ============================
  {
    name: screens.ContactStack,
    focusedRoute: screens.ContactStack,
    title: 'Contact',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <MaterialIcons
        name="contact-mail"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.Contact,
    focusedRoute: screens.ContactStack,
    title: 'Contact',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <MaterialIcons
        name="contact-mail"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },

  // 23. AboutUs ===========================
  {
    name: screens.AboutStack,
    focusedRoute: screens.AboutStack,
    title: 'About Us',
    showInTab: false,
    showInDrawer: false,
  },
  {
    name: screens.About,
    focusedRoute: screens.AboutStack,
    title: 'About Us',
    showInTab: false,
    showInDrawer: false,
  },

  // 24. Setting ============================
  {
    name: screens.SettingStack,
    focusedRoute: screens.SettingStack,
    title: 'Setting ',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <AntDesign
        name="setting"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
  {
    name: screens.Setting,
    focusedRoute: screens.SettingStack,
    title: 'Setting',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <AntDesign
        name="setting"
        size={focused ? 20 : 20}
        color={focused ? 'black' : '#969696'}
      />
    ),
  },
];
