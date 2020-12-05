import React, { useCallback, useEffect } from 'react';
import {View, StyleSheet, Text, Button, ScrollView, Image} from 'react-native';
import {MEALS} from '../data/dummy-data';
import DefaultText from '../components/DefaultText'
import {useSelector, useDispatch} from 'react-redux';
import {toggleFavourite} from '../store/actions/meals';

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};

const MealDetailScreen = props => {
    const mId = props.route.params?.mealId;
    const availableMeals = useSelector(state => state.meals.meals);
    const currentMealIsFavourite = useSelector(state => state.meals.favouriteMeals.some(meal => meal.id === mId));
    const selectedMeal = availableMeals.find(meal => meal.id === mId);
    const dispatch = useDispatch();
    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(selectedMeal.id));
    }, [dispatch, mId]);
    useEffect(() => {
        props.navigation.setParams({toggleFav : toggleFavouriteHandler});
    }, [toggleFavouriteHandler]);
    useEffect(() => {
        props.navigation.setParams({isFav: currentMealIsFavourite})
    }, [currentMealIsFavourite]);
    return(
        <ScrollView style={styles.screen}>
            <Image source={{uri : selectedMeal.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                    <DefaultText>{selectedMeal.duration}m</DefaultText>
                    <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                    <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map((ingredient) => <ListItem key={ingredient}>{ingredient}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map((step) => <ListItem key={step}>{step}</ListItem>)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({ 
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    image:{
        width: '100%',
        height: 200
    }, 
    details:{
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    listItem:{
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;