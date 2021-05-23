import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import EskomContext from '../context/eskom/eskomsContext';
import { Ionicons } from '@expo/vector-icons';

const Result = ({ navigation, suburb }) => {
    const eskomContext = useContext(EskomContext);
    const {
        add,
        getStorageData,
        storage
    } = eskomContext;


    const save = () => {
        getStorageData();
        if (storage) {
            const found = storage.some((item) => item.Id === suburb.Id);
            if (found) {
                navigation.navigate('Home');
            } else {
                add([...storage, suburb]);
                navigation.navigate('Home');
            }
        } else {
            add([suburb]);
            navigation.navigate('Home');
        }
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
            <TouchableNativeFeedback onPress={save}>
                <Text style={styles.addbtn}>
                    <Ionicons name="ios-add-outline" size={25} color="black" />
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
        padding: 15,
        backgroundColor: '#bdbdbd',
        borderRadius: 5,
        margin: 1
    }
})
