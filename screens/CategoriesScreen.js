import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/HeaderButton';
import { CATEGORIES } from '../data/data';


const CategoriesScreen = props => {
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={ itemData.item.title }
        color={ itemData.item.color }
        onSelect={ () => {
          props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id
            }
          });
        } }
      />
    );
  };

  return (
    <FlatList
      data={ CATEGORIES }
      renderItem={ renderGridItem }
      numColumns={ 2 }
    />
  );
};

CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
        <Item title="Menu" iconName="menu" onPress={ () => {
          navData.navigation.toggleDrawer();
        } } />
      </HeaderButtons>
    )
  };
};

export default CategoriesScreen;