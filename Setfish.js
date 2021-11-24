import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, Switch, TouchableOpacity, Alert, } from 'react-native'
import { BottomSheet, ThemeProvider, ListItem, Avatar } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import MQTT from 'sp-react-native-mqtt';
import { Dimensions } from "react-native";
import { CheckBox } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-crop-picker';

const App = ({ navigation }) => {

    // const [image,Setimage]=React.useState("");

    function goToPicker() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log('image console ==>', image);
            // Setimage(image)

        })
    }
    const getimage = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
          fetch("http://203.154.91.133/Images/Create/Images", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    // useEffect(() => {
    //     getimage()
    // });

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
                    <TouchableOpacity 
                    onPress={() => getimage}
                    
                    style={{ position: 'absolute', }}>
                        <View>
                            <Text style={{ fontSize: 25, left: 10, top: 10, fontWeight: "bold", }}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: 330, height: 400, backgroundColor: 'white', margin: 30, borderRadius: 30, top: 50, borderColor: 'back', borderWidth: 2 }}>
                <Text style={{ fontSize: 20, left: 20, top: 10, fontWeight: "bold", }}>สายพันธ์ุปลา</Text>
                <View style={{ top: 20 }}>
                    <RNPickerSelect

                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Showa Sanshoku', value: 'Showa Sanshoku' },
                            { label: 'Kohoku', value: 'Kohoku' },
                            { label: 'Taiaho Sanke', value: 'Taiaho Sanke' },
                            { label: 'Utsuri Mono', value: 'Utsuri Mono' },
                            { label: 'Asagi Shusui', value: 'Asagi Shusui' },
                            { label: 'Bekko', value: 'Bekko' },
                            { label: 'Koromo', value: 'Koromo' },
                            { label: 'Hikari Moyo', value: 'Hikari Moyo' },
                            { label: 'Ogon', value: 'Ogon' },
                            { label: 'Hikari Utsuri', value: 'Hikari Utsuri' },
                            { label: 'Tancho', value: 'Tancho' },
                            { label: 'Kinginrin', value: 'Kinginrin' },
                            { label: 'Kawari Mono', value: 'Kawari Mono' },
                        ]}
                    />
                </View>
                <Text style={{ fontSize: 20, left: 20, top: 20, fontWeight: "bold", }}>สี</Text>
                <View style={{ top: 20 }}>
                    <RNPickerSelect

                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'light yellow', value: 'light yellow' },
                            { label: 'medium yellow', value: 'medium yellow' },
                            { label: 'dark yellow', value: 'dark yellow' },
                            { label: 'gold', value: 'gold' },
                            { label: 'light orange', value: 'light orange' },
                            { label: 'medium orange', value: 'medium orange' },
                            { label: 'dark orange', value: 'dark orange' },
                            { label: 'light red', value: 'light red' },
                            { label: 'medium red', value: 'medium red' },
                            { label: 'dark red', value: 'dark red' },
                        ]}
                    />
                </View>
                <Text style={{ fontSize: 20, left: 20, top: 20, fontWeight: "bold", }}>ความชัดของลวดลาย</Text>
                <View style={{ top: 20 }}>
                    <RNPickerSelect

                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: '1', value: '1' },
                            { label: '2', value: '2' },
                            { label: '3', value: '3' },
                            { label: '4', value: '4' },
                            { label: '5', value: '5' },
                            { label: '6', value: '6' },
                            { label: '7', value: '7' },
                            { label: '8', value: '8' },
                            { label: '9', value: '9' },
                            { label: '10', value: '10' },
                        ]}
                    />
                </View>
                <Text style={{ fontSize: 20, left: 20, top: 20, fontWeight: "bold", }}>ความชัดของสีดำ</Text>
                <View style={{ top: 20 }}>
                    <RNPickerSelect

                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'light color', value: 'light color' },
                            { label: 'neutral color', value: 'neutral color' },
                            { label: 'dark color', value: 'dark color' },

                        ]}
                    />
                </View>
            </View>
            <View style={{ width: 330, height: 150, backgroundColor: 'white', margin: 30, borderRadius: 30, top: 0, borderColor: 'back', borderWidth: 2 }}>
                <View style={{ width: 140, height: 150 }}>
                    <View style={{ position: 'absolute', width: 130, height: 120, left: 95,top:15 }}>
                        <TouchableOpacity 
                        onPress={() => 

                            goToPicker()
                        } 
                        style={{ width: 50, left: 23, top: 37, left: 47 }}>
                            <Image
                                style={{ width: 30, height: 40, left: 0 }}
                                source={{ uri: 'https://www.img.in.th/images/d719704197a874185ff76913fee3d2eb.png' }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
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