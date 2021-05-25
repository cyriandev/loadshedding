import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const HomeHeader = ({ navigation }) => {
    return (
        <View style={styles.heading}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="logo-electron" size={35} color="grey" />
                <Text style={{
                    fontSize: 30,
                    fontWeight: '700',
                    marginLeft: 6
                }}>Welcome</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Search')} background={TouchableNativeFeedback.Ripple('#e3e3e3')}>
                        <View style={{ borderRadius: 5 }}>
                            <Ionicons name="ios-search-outline" size={30} color="grey" style={{ margin: 5 }} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Info')} background={TouchableNativeFeedback.Ripple('#e3e3e3')}>
                        <View style={{ borderRadius: 5 }}>

                            <Ionicons name="alert-circle-outline" size={30} color="grey" style={{ margin: 5 }} />
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20
    }
})
