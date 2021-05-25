import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import EskomsContext from '../context/eskom/eskomsContext';

const Status = () => {
    const eskomsContext = useContext(EskomsContext);
    const {
        getStatus,
        status,
        status_loading,
    } = eskomsContext;

    useEffect(() => {
        getStatus();
    }, [])

    return (
        <View>
            <Text style={styles.title}>Status</Text>
            <Text style={{ color: 'grey' }}>National power status</Text>

            <View style={[styles.statusContainer, { backgroundColor: (status - 1) <= 0 ? '#0bb783' : 'tomato', }]}>
                {status_loading ? <Text style={{ color: '#fff' }}>Loading...</Text> :
                    status && <View style={{ paddingVertical: 10 }}>{(status - 1) <= 0 ?
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Ionicons name="ios-flash-outline" size={24} color="white" />
                            <Text style={[styles.status, { color: 'white' }]}>No Loadshedding</Text>

                        </View>
                        :
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="ios-flash-off-outline" size={24} color="white" />
                            <View>
                                <Text style={[styles.status, { color: 'white' }]}>Loadshedding</Text>
                                <Text style={[styles.status, { color: 'white' }]}>Stage {(status - 1)}</Text>
                            </View>
                        </View>
                    }</View>
                }
                <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                    <TouchableNativeFeedback onPress={() => getStatus()} background={TouchableNativeFeedback.Ripple('#fff')}>
                        <View style={{ padding: 10, borderRadius: 5 }}>
                            <Ionicons name="ios-refresh-outline" size={30} color="#fff" />
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </View>
        </View>
    )
}

export default Status

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: '700'
    },
    status: {
        fontSize: 20,
        alignItems: 'center',
        marginLeft: 5
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    }
})
