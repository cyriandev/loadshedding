import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

const Home = ({ navigation }) => {
    const [status, setStatus] = useState(0);

    useEffect(() => {
        Getstatus();
    }, [])


    const Getstatus = async () => {
        try {
            const res = await axios.get('https://loadshedding.eskom.co.za/LoadShedding/GetStatus');
            setStatus(res.data);
        } catch (err) {
            console.log("something went wrong: ", err);
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Text>Not LoadSheding {status}</Text>
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
        margin: 10
    }
});
