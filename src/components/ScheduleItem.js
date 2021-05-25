import React from 'react'
import moment from 'moment'
import { StyleSheet, Text, View } from 'react-native'

const ScheduleItem = ({ item, index }) => {
    return (
        <View style={styles.datentime}>
            <View>
                {(index === 0 || index === 1) ? <Text style={styles.day}>{moment(item.date.toString(), 'dd, D MMM').calendar({
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]'
                })}</Text> : null}
                <Text style={[styles.date, {
                    fontSize: (index === 0 || index === 1) ? 15 : 17,
                    color: (index === 0 || index === 1) ? "grey" : "#000",
                    fontWeight: (index === 0 || index === 1) ? "500" : "700",
                }]}>{item.date.toString()}  </Text>
            </View>
            <View>{item.times ? item.times.match(/.{13}/g).map((time, index) => <Text key={index} style={{ marginVertical: 3, fontSize: 15, fontWeight: '500' }}>{time}</Text>) : <Text>---------- - ----------</Text>}</View>
        </View>
    )
}

export default ScheduleItem

const styles = StyleSheet.create({
    datentime: {
        backgroundColor: '#e3e3e3',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        fontSize: 17,
        fontWeight: '700'
    },
    day: {
        fontSize: 20,
        fontWeight: '700'
    }
})
