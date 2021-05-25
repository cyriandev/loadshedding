import React from 'react'
import { FlatList, StyleSheet, Text, View, Linking, TouchableNativeFeedback } from 'react-native'
import ScheduleItem from './ScheduleItem';
import { Ionicons } from '@expo/vector-icons';

const Schedules = ({ schedule, title, province }) => {
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
                    <Ionicons name="warning-outline" size={50} color="black" />
                    <Text style={{ fontSize: 20, marginTop: 20, textAlign: 'center', color: '#000', fontWeight: '700' }}>We regret that we could not find a schedule for {title}</Text>
                    <Text style={{ fontSize: 15, marginTop: 20, textAlign: 'center', color: 'grey' }}>If you're a direct municipal customer, view municipal loadsheding schedules by clicking below</Text>
                    <TouchableNativeFeedback onPress={() => Linking.openURL(`https://www.eskom.co.za/CustomerCare/Towns/Pages/${province.replace(/\s+/g, '-')}.aspx`)} background={TouchableNativeFeedback.Ripple('#bdbdbd')}>
                        <View style={{ fontSize: 15, marginTop: 20, textAlign: 'center', backgroundColor: '#0bb783', padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: '#fff' }}>View municipal loadsheding schedules</Text>
                        </View>
                    </TouchableNativeFeedback>
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
        paddingTop: 20,
    }
})
// replace(/-/g, " ")