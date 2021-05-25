import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, FlatList, Linking, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import Constants from 'expo-constants';
import EskomContext from '../context/eskom/eskomsContext';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Tweet from '../components/Tweet';

const Tweets = ({ navigation }) => {
    const eskomContext = useContext(EskomContext);
    const {
        tweets_loading,
        tweets,
        getTweets
    } = eskomContext;

    useEffect(() => {
        getTweets();
    }, [])
    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Tweets" >
                <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                        <TouchableNativeFeedback onPress={() => getTweets()} background={TouchableNativeFeedback.Ripple('#e3e3e3')}>
                            <View style={{ borderRadius: 5 }}>

                                <Ionicons name="ios-refresh-outline" size={30} color="grey" style={{ margin: 5 }} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </Header>
            {tweets_loading ? <Text>Loading...</Text> :
                tweets.includes.users && <View style={{ paddingVertical: 10 }}>
                    <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/Eskom_SA`)}>
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>{tweets.includes.users[0].name}</Text>
                        <Text style={{ color: 'grey' }}>@{tweets.includes.users[0].username}</Text>
                    </TouchableOpacity>
                </View>
            }

            <View style={{ flex: 1 }}>
                {tweets_loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color="#bdbdbd" /></View> :
                    tweets.data && <FlatList
                        data={tweets.data} renderItem={({ item, index }) => <Tweet key={index} tweet={item} />}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />


                }

            </View>
        </View>
    )
}

export default Tweets

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        padding: 10
    }
})
