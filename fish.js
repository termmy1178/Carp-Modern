import React, { Component, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Switch, TouchableOpacity, Alert, } from 'react-native'
import { BottomSheet, ThemeProvider, ListItem, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';


const App = ({ navigation }) => {

    function goToPicker() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log('image console ==>', image);
        })
    }
    
    const [isVisible, setIsVisible] = React.useState(false);
    const list = [
        {
            title: 'PageHome',
            containerStyle: { backgroundColor: '#4169E1', height: 55 },
            titleStyle: { color: 'white' },
            onPress: () => navigation.navigate('PageHome'),
            img: "https://www.img.in.th/images/ce00e78e286295e1eae5eed38ac95ae9.png",
        },
        {
            title: 'Growth track',
            containerStyle: { backgroundColor: '#576B9E' },
            titleStyle: { color: 'white' },
            onPress: () => navigation.navigate('GrapGrowthtrack'),
            img: "https://www.img.in.th/images/d9d0fe4aff82d642695c46771f5c7ac5.png",
        },
        {
            title: 'Food',
            containerStyle: { backgroundColor: '#4682B4' },
            titleStyle: { color: 'white' },
            onPress: () => navigation.navigate('GraphFood'),
            img: "https://www.img.in.th/images/fbc6e93ad110301fe742791cb803f9f8.png",
        },
        {
            title: 'Temperature',
            containerStyle: { backgroundColor: '#00BFFF' },
            titleStyle: { color: '#000' },
            onPress: () => navigation.navigate('GraphTemperature'),
            img: "https://www.img.in.th/images/426bbd610d1e502464e16d4cd2784e72.png",
        },
        {
            title: 'Oxygen & PH',
            containerStyle: { backgroundColor: '#00FFFF' },
            titleStyle: { color: '#000' },
            onPress: () => navigation.navigate('OxPh'),
            img: "https://www.img.in.th/images/6f4d2b7f2e473e5df1f62c85dcf4c49d.png",
        },
        {
            title: 'Fish detail',
            containerStyle: { backgroundColor: '#66FFFF' },
            titleStyle: { color: '#000' },
            onPress: () => navigation.navigate('fish'),
            img: "https://www.img.in.th/images/9a2a9612a8fd84e31064ec39e4945b71.png",
        },
        {
            title: 'Overview',
            containerStyle: { backgroundColor: '#99FFFF' },
            titleStyle: { color: '#000' },
            onPress: () => navigation.navigate('Overview'),
            img: "https://www.img.in.th/images/043c8b7112bab990cb4f92d5a23dcb33.png",
        },
        {
            title: 'Logout',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => navigation.navigate('Page1'),
        },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: '#660000' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];
    return (
        <View style={{ flex: 1, backgroundColor: "#FCE2E5", flexDirection: 'row' }}>
            <View>
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <Image
                        style={{ width: 40, height: 50, top: 10, left: 10 }}
                        source={{ uri: 'https://www.img.in.th/images/cec2ca19c4f622606706b195bed3542e.png' }}
                    />
                </TouchableOpacity>
                <BottomSheet
                    isVisible={isVisible}
                    containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                >
                    {list.map((l, i) => (
                        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                            <ListItem.Content>
                                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                            </ListItem.Content>
                            <Avatar
                                size="small"
                                source={{ uri: l.img }}
                                title="img"
                                onPress={() => console.log('Freature => Pop image')}
                            />
                        </ListItem>
                    ))}
                </BottomSheet>
                <View style={{ width: 330, height: 150, backgroundColor: 'white', margin: 30, borderRadius: 30, top: 10, borderColor: 'back', borderWidth: 2 }}>
                    <View style={{ width: 140, height: 150 }}>
                        <View style={{ position: 'absolute', width: 130, height: 120, left: 15, borderRadius: 30, top: 10, borderColor: 'back', borderWidth: 2 }}>
                            
                        </View>
                    </View>
                    <View style={{ width: 180, height: 75, bottom: 150, left: 140 }}>
                        <View style={{ width: 130, height: 30, borderColor: 'back', borderWidth: 2, left: 20, top: 30, borderRadius: 20 }}>
                            <Text style={{ left: 10, top: 3 }}>สายพันธ์ปลา</Text>
                        </View>
                    </View>
                    <View style={{ width: 90, height: 75, bottom: 150, left: 140 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('graphfish')} style={{ top: 10, width: 50, left: 40 }}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={{ uri: 'https://www.img.in.th/images/d9d0fe4aff82d642695c46771f5c7ac5.png' }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 90, height: 75, bottom: 225, left: 230 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Setfish')} style={{ width: 50, left: 23, top: 10 }}>
                            <Image
                                style={{ width: 30, height: 40, left: 0 }}
                                source={{ uri: 'https://www.img.in.th/images/d719704197a874185ff76913fee3d2eb.png' }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: 330, height: 150, backgroundColor: 'white', margin: 30, borderRadius: 30, top: -30, borderColor: 'back', borderWidth: 2 }}>
                    <View style={{ width: 140, height: 150 }}>
                        <View style={{ position: 'absolute', width: 130, height: 120, left: 15, borderRadius: 30, top: 10, borderColor: 'back', borderWidth: 2 }}>
                            
                        </View>
                    </View>
                    <View style={{ width: 180, height: 75, bottom: 150, left: 140 }}>
                        <View style={{ width: 130, height: 30, borderColor: 'back', borderWidth: 2, left: 20, top: 30, borderRadius: 20 }}>
                            <Text style={{ left: 10, top: 3 }}>สายพันธ์ปลา</Text>
                        </View>
                    </View>
                    <View style={{ width: 90, height: 75, bottom: 150, left: 140 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('graphfish')} style={{ top: 10, width: 50, left: 40 }}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={{ uri: 'https://www.img.in.th/images/d9d0fe4aff82d642695c46771f5c7ac5.png' }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 90, height: 75, bottom: 225, left: 230 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Setfish')} style={{ width: 50, left: 23, top: 10 }}>
                            <Image
                                style={{ width: 30, height: 40, left: 0 }}
                                source={{ uri: 'https://www.img.in.th/images/d719704197a874185ff76913fee3d2eb.png' }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: 330, height: 150, backgroundColor: 'white', margin: 30, borderRadius: 30, top: -70, borderColor: 'back', borderWidth: 2 }}>
                    <View style={{ width: 140, height: 150 }}>
                        <View style={{ position: 'absolute', width: 130, height: 120, left: 15, borderRadius: 30, top: 10, borderColor: 'back', borderWidth: 2 }}>
                            
                        </View>
                    </View>
                    <View style={{ width: 180, height: 75, bottom: 150, left: 140 }}>
                        <View style={{ width: 130, height: 30, borderColor: 'back', borderWidth: 2, left: 20, top: 30, borderRadius: 20 }}>
                            <Text style={{ left: 10, top: 3 }}>สายพันธ์ปลา</Text>
                        </View>
                    </View>
                    <View style={{ width: 90, height: 75, bottom: 150, left: 140 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('graphfish')} style={{ top: 10, width: 50, left: 40 }}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={{ uri: 'https://www.img.in.th/images/d9d0fe4aff82d642695c46771f5c7ac5.png' }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 90, height: 75, bottom: 225, left: 230 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Setfish')} style={{ width: 50, left: 23, top: 10 }}>
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