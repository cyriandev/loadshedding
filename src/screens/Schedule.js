import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants';
import Cheerio from 'cheerio';
import { Picker } from '@react-native-picker/picker';
import Schedules from '../components/Schedules';
import EskomContext from '../context/eskom/eskomsContext';

const Schedule = ({ route }) => {
    const { id, total, province, title, subtitle } = route.params;
    const [stage, setStage] = useState(1);
    const eskomContext = useContext(EskomContext);
    const {
        getSchedule,
        schedule,
        schedule_loading,
    } = eskomContext;

    useEffect(() => {
        getSchedule({ id, stage, province, total });
    }, [id, total, province, stage])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text>{subtitle}</Text>
            </View>
            <Picker
                selectedValue={stage}
                onValueChange={(value) =>
                    setStage(value)
                }>
                <Picker.Item label="Stage 1, Up to 1000 MW to be shed" value="1" />
                <Picker.Item label="Stage 2, Up to 2000 MW to be shed" value="2" />
                <Picker.Item label="Stage 3, Up to 3000 MW to be shed" value="3" />
                <Picker.Item label="Stage 4, Up to 4000 MW to be shed" value="4" />
            </Picker>
            <View style={{ flex: 1 }}>
                {schedule_loading ? <View><ActivityIndicator size="large" color="#bdbdbd" /></View> :
                    <Schedules schedule={schedule} />
                }
            </View>
        </View>
    )
}

export default Schedule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        padding: 10
    },
    title: {
        fontSize: 30,
        fontWeight: '700'
    }
})
