import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const Header = ({ children, title, navigation }) => {
    return (
        <View style={styles.header}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View style={styles.close}>
                    <Ionicons name="ios-chevron-back" size={32} color="black" />
                </View>
            </TouchableWithoutFeedback>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Text style={styles.title}>{title}</Text>
                {children}
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    }
    ,
    close: {
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        fontWeight: '700'
    }
})
