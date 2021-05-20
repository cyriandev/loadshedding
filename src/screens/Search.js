import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import Results from '../components/Results';

const Search = ({ navigation }) => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        find(term)
    }, [term]);


    const find = async (term) => {
        if (term.length >= 3) {
            setLoading(true)
            try {
                const res = await axios.get(`https://loadshedding.eskom.co.za/LoadShedding/FindSuburbs?searchText=${term}&maxResults=300`);
                setResults(res.data);
                setLoading(false)
            } catch (err) {
                console.log("something went wrong: ", err);
            }
        }

    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Search suburb</Text>
            <TextInput
                style={styles.input}
                onChangeText={term => setTerm(term)}
                placeholder="useless placeholder"
                value={term}
            />


            <View style={{ flex: 1 }}>
                {loading ? <View><ActivityIndicator size="large" color="#bdbdbd" /></View> :
                    (term.length >= 3) && <Results navigation={navigation} results={results} />
                }
            </View>

        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        margin: 10
    },
    input: {
        marginVertical: 20,
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10
    },
});

// https://loadshedding.eskom.co.za/LoadShedding/GetStatus?_=1621424179385
// https://loadshedding.eskom.co.za/LoadShedding/FindSuburbs?searchText=mankweng&maxResults=300&_=1621424179639
// https://loadshedding.eskom.co.za/LoadShedding/FindSuburbs?searchText=mankweng&maxResults=300&_=1621424264328
// https://loadshedding.eskom.co.za/LoadShedding/GetScheduleM/1042073/1/_/1?_=1621424264661
// https://loadshedding.eskom.co.za/LoadShedding/GetScheduleM/45132/1/Limpopo/1350