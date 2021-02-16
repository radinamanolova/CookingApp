import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import MealItem from './MealItem';

const MealList = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  const renderMealItem = itemData => {
    const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);

    return (
      <MealItem
        title={ itemData.item.title }
        imageUrl={ itemData.item.imageUrl }
        duration={ itemData.item.duration }
        servings={ itemData.item.servings }
        onSelectMeal={ () => {
          props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: isFavorite
            }
          });
        } }
      />
    );
  };

  return (
    <View style={ styles.list }>
      <FlatList
        data={ props.listData }
        renderItem={ renderMealItem }
        style={ { width: '100%' } }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MealList;