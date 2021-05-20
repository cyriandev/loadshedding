import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ScheduleItem = ({ item }) => {
    return (
        <View style={styles.datentime}>
            <Text>{item.date.toString()}</Text>
            <View>{item.times ? item.times.match(/.{13}/g).map((time, index) => <Text key={index}>{time}</Text>) : <Text>no load sheading</Text>}</View>
        </View>
    )
}

export default ScheduleItem

const styles = StyleSheet.create({
    datentime: {
        backgroundColor: 'grey',
        paddingVertical: 10,
        margin: 5
    }
})
