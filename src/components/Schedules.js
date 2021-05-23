import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ScheduleItem from './ScheduleItem';
import { Entypo } from '@expo/vector-icons';

const Schedules = ({ schedule }) => {
    return (
        <View style={styles.container}>
            {schedule.length ? <FlatList
                data={schedule} renderItem={({ item, index }) => <ScheduleItem key={index} item={item} index={index} />}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            /> :
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>
                    <Entypo name="emoji-sad" size={60} color="#bdbdbd" />
                    <Text style={{ fontSize: 20, marginTop: 20 }}>We regret that we could not find a schedule from Eskom</Text>

                </View>
            }
        </View>
    )
}

export default Schedules

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    }
})
