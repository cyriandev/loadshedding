import React, { useEffect, useContext } from 'react'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import EskomContext from '../context/eskom/eskomsContext';

const Home = ({ navigation }) => {
    const eskomContext = useContext(EskomContext);
    const {
        getStatus,
        status,
        status_loading,
    } = eskomContext;

    useEffect(() => {
        getStatus();
    }, [])



    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Text style={styles.title}>Status</Text>
                {status_loading ? <Text>Loading...</Text> :
                    status && <View>{status === 1 ? <Text>No Loadsheding</Text> : <Text>Loadsheding</Text>}</View>
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
    }
});
