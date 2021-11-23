import React, { Component, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Switch, TouchableOpacity, Alert, } from 'react-native'
import { BottomSheet, ThemeProvider, ListItem, Avatar } from 'react-native-elements';

const App = ({ navigation }) => {


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
        <View style={{ flex: 1, backgroundColor: "#E6E2FC", flexDirection: 'row' }}>
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
                <View style={{width:330,height:200,backgroundColor:'white',margin:30,borderRadius:30,top:-20,borderColor:'back',borderWidth:2}}>
                    <View style={{width:250,height:150,backgroundColor:'white',margin:30,borderRadius:30,top:-20,borderColor:'back',borderWidth:2}}>

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