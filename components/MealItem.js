import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TouchableNativeFeedback, ImageBackground } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import DefaultText from './DefaultText';

const MealItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={ styles.mealItem }>
      <TouchableCmp style={ { flex: 1 } } onPress={ props.onSelectMeal }>
        <View>
          <View style={ { ...styles.mealRow, ...styles.mealHeader } }>
            <ImageBackground source={ { uri: props.imageUrl } } style={ styles.bgImage }>
              <View style={ styles.titleContainer }>
                <Text style={ styles.title } numberOfLines={ 1 }>{ props.title }</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={ { ...styles.mealRow, ...styles.mealDetail } }>
            <View style={ styles.mealDetailContainer }>
              <Ionicons name="time" size={ 20 } color={ Colors.title } />
              <DefaultText style={ styles.mealDetailText }>{ props.duration }m</DefaultText>
            </View>
            <View style={ styles.mealDetailContainer }>
              <MaterialIcons name="restaurant" size={ 20 } color={ Colors.title } />
              <DefaultText style={ styles.mealDetailText }>{ props.servings }</DefaultText>
            </View>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 5
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: Colors.title,
    textAlign: 'center'
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '80%'
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '20%'
  },
  mealDetailContainer: {
    flexDirection: 'row'
  },
  mealDetailText: {
    color: Colors.title,
    marginHorizontal: 5
  }
});

export default MealItem;