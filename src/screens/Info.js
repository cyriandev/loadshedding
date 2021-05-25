import React, { useContext, useEffect } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking, TouchableNativeFeedback } from 'react-native'
import Header from '../components/Header'
import Constants from 'expo-constants';
import History from '../../assets/Load-shedding-744x401.png';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import EskomContext from '../context/eskom/eskomsContext';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const Info = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Info" >
                <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                        <TouchableNativeFeedback onPress={() => navigation.navigate('Tweets')} background={TouchableNativeFeedback.Ripple('#e3e3e3')}>
                            <View style={{ borderRadius: 5 }}>

                                <Ionicons name="ios-logo-twitter" size={30} color="#1D9BF0" style={{ margin: 5 }} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </Header>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View>
                    <Text>{process.env.TWITTER_TOKEN}</Text>
                </View>
                <View style={{ backgroundColor: '#fff' }}>
                    <Text style={styles.title}>Load Shed Statistics</Text>
                    <Image
                        style={{ width: '100%', height: Height / 2, resizeMode: 'contain' }}

                        source={History}
                    />
                </View>

                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.title}>Tips on How to prepare before Loadshedding.</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Ionicons name="alert" size={24} color="grey" />
                        <Text style={styles.tip}>
                            Check your loadshedding schedule regularly so you can have enough time to prepare.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Ionicons name="ios-phone-portrait-outline" size={24} color="grey" />
                        <Text style={styles.tip}>
                            Always keep your phone charged when you have electricity.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <MaterialCommunityIcons name="stove" size={24} color="grey" />
                        <Text style={styles.tip}>
                            Remember to switch off electric appliences before or during loadshedding like TVs, Ovens etc. to avoid damage from electrical surge.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <MaterialCommunityIcons name="bottle-soda-classic-outline" size={24} color="grey" />
                        <Text style={styles.tip}>
                            Keep  bottles of frozen water in your freezer to keep items cold when power goes off.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Ionicons name="sunny-outline" size={24} color="grey" />
                        <Text style={styles.tip}>
                            Always have a tourch or  candles nearby to use when the power goes off.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Ionicons name="ios-restaurant-outline" size={24} color="grey" />
                        <Text style={styles.tip}>
                            Prepare meals in advance to avoid frastration.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <AntDesign name="iconfontdesktop" size={24} color="grey" />
                        <Text style={styles.tip}>
                            Make it a priority to back up all your data when the power is on. This will save you from loosing your unsaved work.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Ionicons name="warning-outline" size={24} color="gray" />
                        <Text style={styles.tip}>
                            Make use of electrical surge protection, electric surge is one oft the biggest courses of damage to appliances.
                        </Text>
                    </View>

                </View>
                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.title}>About</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Ionicons name="ios-heart" size={20} color="tomato" />
                        <Text style={styles.tip}>
                            Thank you for using {Constants.manifest.name} app
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => Linking.openURL(`https://loadsheding.cyriandev.co.za/terms`)}>
                        <Text style={{ color: 'grey', paddingVertical: 10 }}>Terms & service</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>App Version</Text>
                        <Text style={{ color: 'grey', marginLeft: 5 }}>
                            {Constants.manifest.version}
                        </Text>
                    </View>



                </View>
            </ScrollView>
        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        padding: 10
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 4
    },
    tip: {
        color: 'grey',
        marginLeft: 10
    }
})
