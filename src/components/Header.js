import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const Header = ({ children, title, navigation }) => {
    return (
        <View style={styles.header}>
            <View style={{
                borderRadius: 20, overflow: 'hidden',
                backgroundColor: '#e3e3e3',
                marginRight: 10,
            }}>
                <TouchableNativeFeedback onPress={() => navigation.goBack()} background={TouchableNativeFeedback.Ripple('#fff')}>
                    <View style={styles.close}>
                        <Ionicons name="ios-chevron-back" size={30} color="grey" />
                    </View>
                </TouchableNativeFeedback>
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1
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
        paddingVertical: 20,
        // backgroundColor: '#fff'
    }
    ,
    close: {
        paddingHorizontal: 6,
        paddingVertical: 5,
        borderRadius: 25
    },
    title: {
        fontSize: 18,
        fontWeight: '700'
    }
})
