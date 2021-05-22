import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import SavedItem from './SavedItem'

const Saved = ({ saved, navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            {
                saved.length ? <FlatList
                    data={saved.slice(0, 20)} renderItem={({ item, index }) => <SavedItem
                        suburb={item}
                        navigation={navigation}
                    />}
                    keyExtractor={item => item.Id.toString()}
                    showsVerticalScrollIndicator={false}
                /> : <View><Text>Nothing Found</Text></View>
            }
        </View>
    )
}

export default Saved

const styles = StyleSheet.create({})

