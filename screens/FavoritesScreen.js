import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';
import CustomHeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';

const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={ styles.screen }>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    );
  }
  return (
    <MealList listData={ favMeals } navigation={ props.navigation } />
  );
};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favorite Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
        <Item title="Menu" iconName="menu" onPress={ () => {
          navData.navigation.toggleDrawer();
        } } />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavoritesScreen;