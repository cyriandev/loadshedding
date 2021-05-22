import React, { useContext, useEffect, useState } from 'react'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import Results from '../components/Results';
import EskomContext from '../context/eskom/eskomsContext';


const Search = ({ navigation }) => {
    const [term, setTerm] = useState('');
    const eskomContext = useContext(EskomContext);
    const {
        getResults,
        results,
        search_loading,
        // getStorageData,
        // storage
    } = eskomContext;

    useEffect(() => {
        getResults(term)
    }, [term]);

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
                {search_loading ? <View><ActivityIndicator size="large" color="#bdbdbd" /></View> :
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
        padding: 10
    },
    input: {
        marginVertical: 20,
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10
    },
});