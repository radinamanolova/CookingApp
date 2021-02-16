import React from 'react';
import { Platform } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? Colors.title : Colors.primary
};

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen
  },
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator, navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="restaurant" size={ 25 } color={ tabInfo.tintColor } />
        );
      },
      tabBarColor: Colors.primary
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="heart" size={ 25 } color={ tabInfo.tintColor } />
        );
      },
      tabBarColor: Colors.primary
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
      activeColor: Colors.accent,
      shifting: true
    })
    : createBottomTabNavigator(tabScreenConfig, {
      tabBarOptions: {
        labelStyle: {
          fontFamily: 'open-sans'
        },
        activeTintColor: Colors.accent
      }
    });

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
  MealFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accent,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});

export default createAppContainer(MainNavigator);