import React from 'react';
import {View, StyleSheet, Text, Button, FlatList} from 'react-native';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';
import MealList from '../components/MealList';
import {useSelector} from 'react-redux';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = props => {
    const catId = props.route.params?.categoryId ?? '';
    const availableMeals = useSelector(state => state.meals.filteredMeals); 
    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);
    if(displayedMeals.length === 0){
        return(
            <View style={styles.content}> 
                <DefaultText>No meals found, maybe check your filters?</DefaultText>
            </View>
        );
    }
    return(
        <MealList listData={displayedMeals} navigation={props.navigation} />
    );
};

const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealScreen;