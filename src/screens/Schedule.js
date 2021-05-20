import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants';
import Cheerio from 'cheerio';
import { Picker } from '@react-native-picker/picker';
import Schedules from '../components/Schedules';

const Schedule = ({ route }) => {
    const { id, total, province, title, subtitle } = route.params;
    const [schedule, setschedule] = useState([])
    const [stage, setStage] = useState(1);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        Getschedule();
    }, [id, total, province, stage])

    const Getschedule = async () => {
        setschedule([]);
        try {
            setLoading(true)
            const res = await fetch(`https://loadshedding.eskom.co.za/LoadShedding/GetScheduleM/${id}/${stage}/${province}/${id}`);
            // setschedule1(res.data);
            const htmlString = await res.text();
            const $ = Cheerio.load(htmlString);
            $('.scheduleDay').map((index, item) => {
                setschedule(schedule => [...schedule, {
                    date: $('.dayMonth', item).text().trim(),
                    times: $('a', item).text()
                }])
            })
            setLoading(false)
        } catch (err) {
            console.log("something went wrong: ", err);
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <Text>{title}</Text>
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
                {loading ? <View><ActivityIndicator size="large" color="#bdbdbd" /></View> :
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
        margin: 10
    }
})
