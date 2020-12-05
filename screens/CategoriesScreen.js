import React from 'react';
import {View, StyleSheet, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import {CATEGORIES} from '../data/dummy-data';
import Colors from '../constants/Colors'; 
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = props => {
    const renderGridITem = (itemData) => {
        return (
            <CategoryGridTile title={itemData.item.title} id={itemData.item.id} color={itemData.item.color} onSelect={() => {
                props.navigation.navigate('CategoryMeal', {categoryId: itemData.item.id, categoryTitle: itemData.item.title})
            }} />
        );
    };
    return(
        <FlatList keyExtractor={(item, index) => item.id} numColumns={2} data={CATEGORIES} renderItem={renderGridITem} />
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoriesScreen;