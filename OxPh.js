import React, { Component, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Switch, Button, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { BottomSheet, ThemeProvider, ListItem, Avatar } from 'react-native-elements';
import { Dimensions } from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const App = ({ navigation }) => {

    const [Ox, setox] = React.useState(0);
    const [PH, setph] = React.useState(0);

    const getox = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://203.154.91.133/Show/OX", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.statusox)
                setox(result.statusox)
            })
            .catch(error => console.log('error', error));
    }

    const getph = () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
    
        fetch("http://203.154.91.133/Show/PH", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result.statusph)
            setph(result.statusph)
          })
          .catch(error => console.log('error', error));
      }
    

    useEffect(() => {
        const dataInterval = setInterval(() => {
            getph()
            getox()
        }, 1 * 1000);


        return () => {
            clearInterval(dataInterval)
        };
    });

    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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

    const screenWidth = Dimensions.get("window").width;


    return (
        <View style={{ flex: 1, backgroundColor: "#FCE2E5", }}>
            <View >
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
            </View>
            <View style={{ position: 'absolute', flexDirection: 'row', left: 120, top: 15 }}>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: 'blue' }}>Oxygen</Text>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: 'blue' }}> & PH</Text>

            </View>
            <ScrollView>
                <View style={{ top: 30, margin: 10 }}>
                    <LineChart
                        data={{
                            labels: ["00.00", "03.00", "06.00", "09.00", "13.00", "15.00", "18.00"],
                            datasets: [
                                {
                                    data: [
                                        5, 8, 6, 5, 7, 9, 8
                                    ]
                                }
                            ]
                        }}
                        width={(Dimensions.get("window").width) - 20} // from react-native
                        height={220}
                        //yAxisLabel="$"
                        yAxisSuffix=" Ox"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundGradientFrom: "#9999FF",
                            backgroundGradientTo: "#9999FF",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,

                            },
                            propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: "#1E90FF"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
                <View style={{ top: 30, margin: 10 }}>
                    <LineChart
                        data={{
                            labels: ["00.00", "03.00", "06.00", "09.00", "13.00", "15.00", "18.00"],
                            datasets: [
                                {
                                    data: [
                                        5, 6, 8, 6, 7, 9, 7
                                    ]
                                }
                            ]
                        }}
                        width={(Dimensions.get("window").width) - 20} // from react-native
                        height={220}
                        //yAxisLabel="$"
                        yAxisSuffix=" PH"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundGradientFrom: "#87CEEB",
                            backgroundGradientTo: "#87CEEB",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,

                            },
                            propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: "#1E90FF"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
                <View style={{ width: 190, height: 180, margin: 10 }}>
                    <Image
                        style={{ width: 170, height: 140, left: 0, top: 50 }}
                        source={{ uri: 'https://www.img.in.th/images/fd686e101557a716470de9e06edf87f8.png' }}

                    />
                    <Text style={{ fontSize: 25, left: 57, bottom: 35, fontWeight: 'bold' }}>{Ox}</Text>
                </View>
                <View style={{ width: 190, height: 180, bottom: 190, left: 200 }}>
                    <Image
                        style={{ width: 170, height: 140, left: 0, top: 50 }}
                        source={{ uri: 'https://www.img.in.th/images/b98c1b8e74c344e5d8efb8c4c55c57ef.png' }}
                    />
                    <Text style={{ fontSize: 25, left: 57, bottom: 35, fontWeight: 'bold' }}>{PH}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 25, left: 55, bottom: 170, fontWeight: 'bold', color: '#87CEEB' }}>Oxygen</Text>
                    <Text style={{ fontSize: 25, left: 270, bottom: 200, fontWeight: 'bold', color: '#9999FF' }}>PH</Text>
                </View>
            </ScrollView>
        </View>
    );
}
export default App