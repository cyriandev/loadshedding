import React, { useEffect, useContext } from 'react'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableNativeFeedback, Button } from 'react-native';
import EskomsContext from '../context/eskom/eskomsContext';
import Saved from '../components/Saved';
import HomeHeader from '../components/HomeHeader';
import Status from '../components/Status';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const eskomsContext = useContext(EskomsContext);
    const {
        storage,
        storage_loading,
        getStorageData,
    } = eskomsContext;

    useEffect(() => {
        getStorageData();
    }, [])



    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <HomeHeader navigation={navigation} />
            <Status />
            <View style={{ flex: 1, marginTop: 20 }}>
                <Text style={{ marginBottom: 20 }}>Watchlist</Text>
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
    }
});
