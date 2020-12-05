import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import {Button, Platform} from 'react-native';
import CustomHeaderButton from '../components/HeaderButtons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const StackMeal = createStackNavigator();
const MealsNavigator = props => {
    return(
        //<NavigationContainer>
            <StackMeal.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor: 'white'
                    },
                    headerTintColor: Colors.primaryColor,
                    headerTitleStyle:{
                        fontFamily: 'open-sans-bold'
                    },
                    headerBackTitleStyle:{
                        fontFamily:'open-sans'
                    } 
                }}
            >
                <StackMeal.Screen 
                    name="Categories" 
                    component={CategoriesScreen}
                    options={({navigation}) => ({
                        title: 'Meal Categories',
                        headerLeft : () => (
                            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                <Item title='Menu' iconName='ios-menu' onPress={() => {
                                    navigation.dispatch(DrawerActions.toggleDrawer())
                                }} />
                            </HeaderButtons>
                        )
                    })}
                />
                <StackMeal.Screen 
                    name="CategoryMeal" 
                    component={CategoryMealScreen}
                    options={({route}) => (
                        {
                            title: route.params.categoryTitle
                        }
                    )}
                />
                <StackMeal.Screen 
                    name="MealDetail" 
                    component={MealDetailScreen}
                    options={({route}) => (
                        {
                            headerTitle: route.params.mealTitle,
                            headerRight: () => (
                                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                    <Item 
                                        title='Favourite' 
                                        iconName={route.params.isFav ? 'ios-star' : 'ios-star-outline'} 
                                        onPress={route.params?.toggleFav} 
                                    />
                                </HeaderButtons>
                            )
                        }
                    )}
                />
            </StackMeal.Navigator>
        //</NavigationContainer>
    );
};

const StackFav = createStackNavigator();
const FavNavigator = props => {
    return(
        //<NavigationContainer>
            <StackFav.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor: 'white'
                    },
                    headerTintColor: Colors.primaryColor,
                    headerTitleStyle:{
                        fontFamily: 'open-sans-bold'
                    },
                    headerBackTitleStyle:{
                        fontFamily:'open-sans'
                    } 
                }}
            >
                <StackFav.Screen 
                    name="Favourites" 
                    component={FavouritesScreen}
                    options={({navigation}) => ({
                        title: 'Your Favourites',
                        headerLeft : () => (
                            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                <Item title='Menu' iconName='ios-menu' onPress={() => {
                                    navigation.dispatch(DrawerActions.toggleDrawer())
                                }} />
                            </HeaderButtons>
                        )
                    })}
                />
                <StackFav.Screen 
                    name="MealDetail" 
                    component={MealDetailScreen}
                    options={({route}) => ({
                        title: route.params.mealTitle,
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                <Item 
                                    title='Favourite' 
                                    iconName={route.params.isFav ? 'ios-star' : 'ios-star-outline'} 
                                    onPress={route.params?.toggleFav} 
                                />
                            </HeaderButtons>
                        )
                    })}
                />
            </StackFav.Navigator>
        //</NavigationContainer>
    );
};

const Tab = createBottomTabNavigator();
const MealsFavTabNavigator = props => {
    return (
        //<NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: Colors.accentColor,
                    labelStyle:{
                        fontFamily: 'open-sans-bold'
                    }
                }} 
            >
                <Tab.Screen 
                    name="Meals" 
                    component={MealsNavigator}
                    options={{
                        tabBarIcon: ({color}) => {
                            return(
                                <Ionicons name='ios-restaurant' size={25} color={color} />
                            );
                        },
                        tabBarLabel: 'Meals'
                    }} 
                />
                <Tab.Screen 
                    name="Favourites" 
                    component={FavNavigator}
                    options={{
                        tabBarIcon: ({color}) => {
                            return(
                                <Ionicons name='ios-star' size={25} color={color} />
                            );
                        }
                    }}  
                />
            </Tab.Navigator>
        //</NavigationContainer>
    );
};

const StackFilter = createStackNavigator();
const FilterNavigator = props => {
    return(//<NavigationContainer>
        <StackFilter.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: 'white'
                },
                headerTintColor: Colors.primaryColor,
                headerTitleStyle:{
                    fontFamily: 'open-sans-bold'
                },
                headerBackTitleStyle:{
                    fontFamily:'open-sans'
                } 
            }}
        >
            <StackFilter.Screen 
                name="Filters" 
                component={FiltersScreen}
                options={({route, navigation}) => ({
                    headerLeft : () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item title='Menu' iconName='ios-menu' onPress={() => {
                                navigation.dispatch(DrawerActions.toggleDrawer())
                            }} />
                        </HeaderButtons>
                    ),
                    headerRight : () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item title='Save' iconName='ios-save' onPress={route.params?.save} />
                        </HeaderButtons>
                    )
                })}
            />
        </StackFilter.Navigator>
    //</NavigationContainer>
    );
};

const Drawer = createDrawerNavigator();
const MainNavigator = props => {
    return(<NavigationContainer>
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: Colors.accentColor,
                labelStyle:{
                    fontFamily:'open-sans-bold'
                }
            }}
        >
            <Drawer.Screen
                name="MealsFav"
                component={MealsFavTabNavigator}
                options={({navigation,route}) => ({
                    drawerLabel:'Meals'
                })}
            />
            <Drawer.Screen
                name="Filters"
                component={FilterNavigator}
            />
        </Drawer.Navigator>
    </NavigationContainer>
    );
}

export default MainNavigator;