import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import EskomContext from '../context/eskom/eskomsContext';
import { Ionicons } from '@expo/vector-icons';

const SavedItem = ({ suburb, navigation }) => {

    const eskomContext = useContext(EskomContext);
    const {
        add,
        storage
    } = eskomContext;

    const remove = () => {
        const newItems = storage.filter(item => item.Id !== suburb.Id);
        add(newItems);
    }
    return (
        <View style={styles.saved}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Schedule', {
                id: suburb.Id,
                total: suburb.Total,
                province: suburb.ProvinceName,
                title: suburb.Name,
                subtitle: `${suburb.MunicipalityName}, ${suburb.ProvinceName}`
            })}
                background={TouchableNativeFeedback.Ripple('#fff')}
            >
                <View style={{
                    flex: 1,
                    padding: 15,
                }}>
                    <Text style={styles.title}>{suburb.Name}</Text>
                    <Text style={{ color: 'grey' }}>{suburb.MunicipalityName}, {suburb.ProvinceName}</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={remove} background={TouchableNativeFeedback.Ripple('tomato')}>
                <View style={styles.rmbtn}>
                    <Ionicons name="ios-trash-outline" size={24} color="grey" />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default SavedItem

const styles = StyleSheet.create({
    saved: {
        backgroundColor: "#e3e3e3",
        marginVertical: 3,
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rmbtn: {
        padding: 25,

    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    }
})
