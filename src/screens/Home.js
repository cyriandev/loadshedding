import React, { useEffect, useContext } from 'react'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import EskomContext from '../context/eskom/eskomsContext';
import Saved from '../components/Saved';

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
            <View>
                <Text style={styles.title}>Status</Text>
                {status_loading ? <Text>Loading...</Text> :
                    status && <View style={{ paddingVertical: 10 }}>{status === 1 ? <Text style={[styles.status, { color: 'green' }]}>No Loadsheding</Text> : <Text style={[styles.status, { color: 'red' }]}>Loadsheding</Text>}</View>
                }
            </View>
            <View style={{ flex: 1 }}>
                {storage_loading ? <View><ActivityIndicator size="large" color="#bdbdbd" /></View> :
                    <Saved saved={storage} navigation={navigation} />
                }
            </View>

            <Button title="find suburb" onPress={() => navigation.navigate('Search')} />
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
        fontSize: 30,
        fontWeight: '700'
    },
    status: {
        fontSize: 20
    }
});
