import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ScheduleItem from './ScheduleItem'
import Constants from 'expo-constants';

const Schedules = ({ schedule }) => {
    return (
        <View style={styles.container}>
            {schedule.length ? <FlatList
                data={schedule} renderItem={({ item, index }) => <ScheduleItem key={index} item={item} />}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            /> : <Text>We regret that we could not find an Eskom schedule</Text>
            }
        </View>
    )
}

export default Schedules

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
    }
})
