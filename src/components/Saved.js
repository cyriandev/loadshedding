import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import SavedItem from './SavedItem'
import { MaterialIcons } from '@expo/vector-icons';

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
                /> : <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>
                    <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                        <TouchableNativeFeedback onPress={() => navigation.navigate('Search')} background={TouchableNativeFeedback.Ripple('#bdbdbd')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                                <MaterialIcons name="playlist-add" size={30} color="black" />
                                <Text style={{ marginLeft: 5, fontSize: 20 }}>Add Area</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            }
        </View>
    )
}

export default Saved

const styles = StyleSheet.create({})

