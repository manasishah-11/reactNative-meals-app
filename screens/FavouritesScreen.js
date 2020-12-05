import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MealList from '../components/MealList';
import {MEALS} from '../data/dummy-data';
import {useSelector} from 'react-redux';
import DefaultText from '../components/DefaultText';

const FavouritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favouriteMeals);
    if(favMeals.length === 0 || !favMeals){
        return(
            <View style={styles.content}>
                <DefaultText>No Favourites added yet!</DefaultText>
            </View>
        );
    }
    else{
        return(
            <MealList listData={favMeals} navigation={props.navigation}/>
        );
    }
};

const styles = StyleSheet.create({
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavouritesScreen;