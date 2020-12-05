import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const DefaultText = props => {
	return(
		<View>
            <Text style={styles.text}>{props.children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
    text:{
        fontFamily: 'open-sans'
    }
});

export default DefaultText;