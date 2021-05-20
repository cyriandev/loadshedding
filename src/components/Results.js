import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Result from './Result';

const Results = ({ navigation, results }) => {
    return (
        <>
            {
                results.length ? <FlatList
                    data={results} renderItem={({ item, index }) => <Result
                        key={index}
                        suburb={item}
                        navigation={navigation}
                    />}
                    keyExtractor={item => item.Id.toString()}
                    showsVerticalScrollIndicator={false}
                /> : <View><Text>Nothing Found</Text></View>
            }
        </>
    )
}

const styles = StyleSheet.create({


});

export default Results