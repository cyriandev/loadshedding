import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Result from './Result';

const Results = ({ navigation, results }) => {

    return (
        <>
            {
                results.length ? <FlatList
                    data={results.slice(0, 20)} renderItem={({ item, index }) => <Result
                        key={index}
                        suburb={item}
                        navigation={navigation}
                    />}
                    keyExtractor={item => item.Id.toString()}
                    showsVerticalScrollIndicator={false}
                /> : <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>
                    <Text style={{ fontSize: 20 }}>Nothing Found</Text>

                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({


});

export default Results
