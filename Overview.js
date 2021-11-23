import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Switch, Button, TouchableOpacity, Alert } from 'react-native'
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
import CircleSlider from "react-native-circle-slider";
import { ScrollView } from 'react-native-gesture-handler';

const App = ({ navigation }) => {
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
    const data = {
        labels: ["06.00", "11.00", "16.00", "21.00",],
        legend: ["L1", "L2", "L3"],
        datasets: [
            {
                data: [
                    3.25, 4, 3.5, 3.7
                ]
            }
        ],
    }


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
                <Text style={{ fontSize: 30, fontWeight: "bold", color: 'blue', left: 25 }}>OVERVIEW</Text>

            </View>
            <ScrollView>
            <View style={{ top: 10, margin: 10 }}>
                <LineChart
                    data={{
                        labels: ["06.00", "09.00", "13.00", "15.00", "18.00"],
                        datasets: [
                            {
                                data: [
                                    25, 26, 29, 31, 26
                                ]
                            }
                        ]
                    }}
                    width={(Dimensions.get("window").width) - 20} // from react-native
                    height={220}
                    //yAxisLabel="$"
                    yAxisSuffix=" cm"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundGradientFrom: "#9999FF",
                        backgroundGradientTo: "#9999FF",
                        decimalPlaces: 1, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,

                        },
                        propsForDots: {
                            r: "5",
                            strokeWidth: "2",
                            stroke: "white"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                <Text style={{ fontSize: 25, left: 120, bottom: 0, fontWeight: 'bold' ,color:'#9999FF'}}>Temperature</Text>
                <BarChart
                    data={data}
                    width={(Dimensions.get("window").width) - 20} // from react-native
                    height={220}
                    //yAxisLabel="$"
                    yAxisSuffix="g"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{

                        backgroundGradientFrom: "#87CEEB",
                        backgroundGradientTo: "#87CEEB",
                        fillShadowGradient: `rgba(1, 122, 205, 1)`,
                        fillShadowGradientOpacity: 1,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                <Text style={{ fontSize: 25, left: 160, bottom: 0, fontWeight: 'bold' ,color:'#87CEEB'}}>FOOD</Text>
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
                        backgroundGradientFrom: "#CC99CC",
                        backgroundGradientTo: "#CC99CC",
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
                <Text style={{ fontSize: 25, left: 150, bottom: 0, fontWeight: 'bold' ,color:'#CC99CC'}}>OXYGEN</Text>
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
                        backgroundGradientFrom: "#33FFCC",
                        backgroundGradientTo: "#33FFCC",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,

                        },
                        propsForDots: {
                            r: "5",
                            strokeWidth: "2",
                            stroke: "#000"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                <Text style={{ fontSize: 25, left: 180, bottom: 0, fontWeight: 'bold' ,color:'#87CEEB'}}>PH</Text>
                <LineChart
                        data={{
                            labels: ["03.00", "03.30", "04.02", "04.30", "05.00", "08.07", "10.04"],
                            datasets: [
                                {
                                    data: [
                                        0.5, 0.9, 1.2, 1.8, 2.5, 2.8, 2.88
                                    ],
                                }
                            ]
                        }}
                        width={(Dimensions.get("window").width) - 20} // from react-native
                        height={220}
                        //yAxisLabel="$"
                        yAxisSuffix="cm"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundGradientFrom: "#FFF8DC",
                            backgroundGradientTo: "#FFF8DC",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,

                            },
                            propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: "white"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    <Text style={{ fontSize: 25, left: 160, bottom: 0, fontWeight: 'bold' ,color:'#000'}}>Weight</Text>
                    <LineChart
                        data={{
                            labels: ["03.00", "03.30", "04.02", "04.30", "05.00", "08.07", "10.04"],
                            datasets: [
                                {
                                    data: [
                                        0.5, 0.9, 1.2, 1.8, 2.5, 2.8, 2.88
                                    ],
                                    data: [
                                        40, 40.3, 42, 43, 46, 47, 48
                                    ]
                                }
                            ]
                        }}
                        width={(Dimensions.get("window").width) - 20} // from react-native
                        height={220}
                        //yAxisLabel="$"
                        yAxisSuffix="cm"
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
                                stroke: "white"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    <Text style={{ fontSize: 25, left: 160, bottom: 0, fontWeight: 'bold' ,color:'#9999FF'}}>Length</Text>
            </View>
            <View style={{ top: 30, margin: 10 }}>

            </View>
            </ScrollView>
        </View>
    );
}
export default App
