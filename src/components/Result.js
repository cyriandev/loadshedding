import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Result = ({ navigation, suburb }) => {

    const add = async () => {


        // try {
        //     const jsonValue = JSON.stringify(value)
        //     await AsyncStorage.setItem('@storage_Key', jsonValue)
        // } catch (e) {
        //     // saving error
        // }


        console.log(JSON.stringify(suburb));

    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Schedule', {
                id: suburb.Id,
                total: suburb.Total,
                province: suburb.ProvinceName,
                title: suburb.Name,
                subtitle: `${suburb.MunicipalityName}, ${suburb.ProvinceName}`
            })}>
                <View style={styles.suburb}>
                    <Text style={styles.suburbName}>{suburb.Name}</Text>
                    <Text>{suburb.MunicipalityName}, {suburb.ProvinceName}</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={add}>
                <Text style={styles.addbtn}>
                    Add
                </Text>
            </TouchableNativeFeedback>
        </View>

    )
}

export default Result

const styles = StyleSheet.create({
    suburb: {
        flex: 1,
        marginVertical: 5,
        padding: 10
    },

    suburbName: {
        fontSize: 20,
        fontWeight: '700'
    },
    addbtn: {
        padding: 20,
        backgroundColor: 'red',
        margin: 1
    }
})
