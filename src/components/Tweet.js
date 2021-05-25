import React from 'react'
import moment from 'moment'
import { Linking, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

const Tweet = ({ tweet }) => {
    return (
        <TouchableNativeFeedback onPress={() => Linking.openURL(`https://twitter.com/Eskom_SA/status/${tweet.id}`)}
            background={TouchableNativeFeedback.Ripple('#fff')}
        >
            <View style={styles.tweet}>
                <Text style={{ paddingVertical: 5, fontWeight: '700' }}>{moment(tweet.created_at).format('LLL')}</Text>
                <Text>{tweet.text}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default Tweet

const styles = StyleSheet.create({
    tweet: {
        marginVertical: 10,
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        padding: 10
    }
})
