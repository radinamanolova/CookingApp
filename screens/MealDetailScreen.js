import React, { useEffect, useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import DefaultText from '../components/DefaultText';
import CustomHeaderButton from '../components/HeaderButton';
import { toggleFavorite } from '../store/actions/meals';
import Colors from '../constants/Colors';

const ListItem = props => {
  return (
    <View style={ styles.listItem }>
      <DefaultText>{ props.children }</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  const currentMealIsFav = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFav });
  }, [currentMealIsFav]);

  return (
    <ScrollView>
      <Image source={ { uri: selectedMeal.imageUrl } } style={ styles.image } />
      <View style={ styles.details }>
        <View style={ styles.mealDetailContainer }>
          <Ionicons name="time" size={ 20 } color={ Colors.title } />
          <DefaultText style={ styles.mealDetailText }>{ selectedMeal.duration }m</DefaultText>
        </View>
        <View style={ styles.mealDetailContainer }>
          <MaterialIcons name="restaurant" size={ 20 } color={ Colors.title } />
          <DefaultText style={ styles.mealDetailText }>{ selectedMeal.servings }</DefaultText>
        </View>
      </View>
      <View style={ styles.tagContainer }>
        <DefaultText style={ styles.tagTitle }>{ selectedMeal.isGlutenFree ? 'Glutten-Free' : '' }</DefaultText>
        <DefaultText style={ styles.tagTitle }>{ selectedMeal.isVegan ? 'Vegan' : '' }</DefaultText>
        <DefaultText style={ styles.tagTitle }>{ selectedMeal.isVegetarian ? 'Vegetarian' : '' }</DefaultText>
        <DefaultText style={ styles.tagTitle }>{ selectedMeal.isLactoseFree ? 'Lactose-Free' : '' }</DefaultText>
      </View>
      <Text style={ styles.title }>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ ingredient }>{ ingredient }</ListItem>
      )) }
      <Text style={ styles.title }>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={ step }>{ step }</ListItem>
      )) }
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
        <Item
          title="Favorite"
          iconName={ isFavorite ? 'heart' : 'heart-outline' }
          onPress={ toggleFavorite }
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: Colors.accent,
    marginBottom: 15
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  },
  mealDetailContainer: {
    flexDirection: 'row'
  },
  mealDetailText: {
    color: Colors.title,
    marginHorizontal: 5
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15
  },
  tagTitle: {
    color: Colors.tag
  }
});

export default MealDetailScreen;