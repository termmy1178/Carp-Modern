import React, { Component, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Switch, TouchableOpacity, Alert, } from 'react-native'
import { BottomSheet, ThemeProvider, ListItem, Avatar } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import MQTT from 'sp-react-native-mqtt';
import { Dimensions } from "react-native";
const App = ({ navigation }) => {



    return (
        <View style={{ flex: 4, backgroundColor: "#FCE2E5", }}>
            <View style={{ flex: 0.1, }}>
                <View style={{ flexDirection: 'row', position: 'absolute', height: 55, top: 10, width: 400, backgroundColor: '#FCE2E5', }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('PageHome')} style={{ position: 'absolute', }}>
                            <Text style={{ fontSize: 25, left: 20, top: 10, fontWeight: "bold", }}>Cancle</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', height: 55, top: 10, width: 100, left: 300 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('PageHome')} style={{ position: 'absolute', }}>
                        <View>
                            <Text style={{ fontSize: 25, left: 10, top: 10, fontWeight: "bold", }}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: 330, height: 400, backgroundColor: 'white', margin: 30, borderRadius: 30, top: 50, borderColor: 'back', borderWidth: 2 }}>

            </View>
            <View style={{ width: 330, height: 150, backgroundColor: 'white', margin: 30, borderRadius: 30, top: 0, borderColor: 'back', borderWidth: 2 }}>

            </View>


        </View>
    );
}
export default App

const styles = StyleSheet.create({
    Imsetting: {
        width: 30,
        height: 40,
        top: 101,
        right: 16
    },

});