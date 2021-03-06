import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import Schedules from '../components/Schedules';
import EskomContext from '../context/eskom/eskomsContext';
import Header from '../components/Header';

const Schedule = ({ route, navigation }) => {
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
            <Header navigation={navigation} title="Schedule" />
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={{ color: 'grey' }}>{subtitle}</Text>
            </View>
            <View style={styles.select}>
                <Picker
                    selectedValue={stage}
                    onValueChange={(value) =>
                        setStage(value)
                    }
                    style={{
                        height: 40,
                        color: 'gray'
                    }}

                >
                    <Picker.Item label="Stage 1, Up to 1000 MW to be shed" value="1" />
                    <Picker.Item label="Stage 2, Up to 2000 MW to be shed" value="2" />
                    <Picker.Item label="Stage 3, Up to 3000 MW to be shed" value="3" />
                    <Picker.Item label="Stage 4, Up to 4000 MW to be shed" value="4" />
                </Picker>
            </View>
            <View style={{ flex: 1 }}>
                {schedule_loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color="#bdbdbd" /></View> :
                    <Schedules schedule={schedule} title={title} province={province} />
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
    },
    select: {
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#e3e3e3'
    }
})
