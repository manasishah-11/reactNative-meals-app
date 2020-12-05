import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {View, StyleSheet, Text, Switch, Platform} from 'react-native';
import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';
import { CommonActions } from '@react-navigation/native';
import CustomHeaderButton from '../components/HeaderButtons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/meals';

const FilterSwitch = props => {
    return(
        <View style={styles.filtersContainer}>
            <DefaultText>{props.filter}</DefaultText>
            <Switch
                value={props.state}
                onValueChange={props.onChange}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                trackColor={{true: Colors.primaryColor, false: '#ccc'}} 
            />            
        </View>
    );
};

const FiltersScreen = props => {
    const {navigation, route} = props;
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    // useEffect(() => {
    //     navigation.setParams({glutenFree: isGlutenFree, lactoseFree: isLactoseFree, vegan: isVegan, vegetarian: isVegetarian});
    // }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, navigation]);
    const dispatch = useDispatch()
    const saveFilters = useCallback(() => {
        const appliedFilter = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilter));
    }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);
    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters, navigation]);
    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch filter='Gluten-free' state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch filter='Lactose-free' state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch filter='Vegan' state={isVegan} onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch filter='Vegetarian' state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems: 'center'
    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filtersContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    }
});

export default FiltersScreen;