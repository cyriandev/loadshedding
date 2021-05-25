import React, { useContext, useEffect, useRef, useState } from 'react'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, TextInput, View, TouchableNativeFeedback } from 'react-native';
import Results from '../components/Results';
import EskomContext from '../context/eskom/eskomsContext';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';


const Search = ({ navigation }) => {
    const search = useRef();
    const [term, setTerm] = useState('');
    const [focused, setFocused] = useState(false);
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
            <Header navigation={navigation} title="Search Area" />

            <View style={styles.inputWrapper}>
                <Ionicons name="ios-search-outline" size={24} color="grey" style={{ margin: 5 }} />
                <View style={{ flex: 1 }}>
                    <TextInput
                        ref={search}
                        style={styles.input}
                        onChangeText={term => setTerm(term)}
                        placeholder='e.g. "mankweng", "jane furse"'
                        value={term}
                        autoFocus
                        onBlur={() => setFocused(false)}
                        onFocus={() => setFocused(true)}
                    />
                </View>
                {focused ?
                    <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                        <TouchableNativeFeedback onPress={() => {
                            setTerm('')
                            search.current.blur()
                        }}
                            background={TouchableNativeFeedback.Ripple('tomato')}
                        >
                            <View style={{ padding: 2, backgroundColor: '#e3e3e3', borderRadius: 5 }}>
                                <Ionicons name="ios-close-outline" size={32} color="grey" />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    : null

                }
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
                {search_loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color="#bdbdbd" /></View> :
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
        height: 40,
        borderWidth: 0,
        paddingHorizontal: 5
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 4,
        backgroundColor: '#e3e3e3'
    }
});