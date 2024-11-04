import React from 'react';
import {StyleSheet} from 'react-native';

export const globalStyle = StyleSheet.create({
  headerColor: {
    backgroundColor: '#183153',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '31%',
    borderRadius: 7,
    elevation: 4,
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 7,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#FFF',
    width: '100%',
    height: 43,
    paddingTop: 10,
    fontSize: 13,
    textAlign: 'center',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    // borderBottomWidth:2,
    // marginLeft:12,
    // marginRight:12,
    // borderBottomColor:"green",
    marginBottom: 5,
  },

  addToCartButton: {
    padding: 7,
    backgroundColor: '#F9C65D',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#A88342',
  },

  noDataContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataTitle: {
    fontWeight: 'bold',
  },

  sectionSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#1b3c60',
    height: 40,
    borderRadius: 15,
    margin: 10,
    textAlign: 'center',
  },
  searchStyleInput: {
    flex: 1,
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginLeft: 10,
  },
  searchIcon: {
    width: 30,
  },

  orderColor: {
    backgroundColor: '#E04F54',
  },
});
