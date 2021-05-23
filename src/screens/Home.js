import React, { useEffect, useContext } from 'react'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import EskomContext from '../context/eskom/eskomsContext';
import Saved from '../components/Saved';
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
    const eskomContext = useContext(EskomContext);
    const {
        getStatus,
        status,
        storage,
        status_loading,
        storage_loading,
        getStorageData,
    } = eskomContext;

    useEffect(() => {
        getStatus();
        getStorageData();
    }, [])



    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.heading}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="logo-electron" size={35} color="black" />
                    <Text style={{
                        fontSize: 30,
                        fontWeight: '700',
                        marginLeft: 6
                    }}>Welcome</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                    <TouchableNativeFeedback onPress={() => navigation.navigate('Search')}>
                        <Text>
                            <Ionicons name="ios-search-outline" size={35} color="black" style={{ margin: 5 }} />
                        </Text>
                    </TouchableNativeFeedback>
                </View>
            </View>
            <View>
                <Text style={styles.title}>Status</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {status_loading ? <Text>Loading...</Text> :
                        status && <View style={{ paddingVertical: 10 }}>{status === 1 ?
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <Ionicons name="ios-flash-outline" size={24} color="black" />
                                <Text style={[styles.status, { color: 'green' }]}>No Loadsheding</Text>

                            </View>
                            :
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="ios-flash-off-outline" size={24} color="black" />
                                <Text style={[styles.status, { color: 'red' }]}>Loadsheding</Text>
                            </View>
                        }</View>
                    }

                    <View>
                        <TouchableNativeFeedback onPress={() => getStatus()}>
                            <Text>
                                <Ionicons name="ios-refresh-outline" size={35} color="black" />
                            </Text>
                        </TouchableNativeFeedback>
                    </View>

                </View>
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
                {storage_loading ? <View><ActivityIndicator size="large" color="#bdbdbd" /></View> :
                    <Saved saved={storage} navigation={navigation} />
                }
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        padding: 10
    },
    title: {
        fontSize: 25,
        fontWeight: '700'
    },
    status: {
        fontSize: 20,
        alignItems: 'center',
        marginLeft: 5
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20
    }
});
