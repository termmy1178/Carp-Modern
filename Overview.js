import React, { Component, useState, useEffect } from 'react'
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
import MQTT from 'sp-react-native-mqtt';
import { ScrollView } from 'react-native-gesture-handler';

const App = ({ navigation }) => {

    const [listDateTimeTemp, setListDateTimeTemp] = useState([0]);
    const [datamqttTemp, setDataTemp] = useState([0]);

    const [listDateTimeFood, setListDateTimeFood] = useState([0]);
    const [datamqttFood, setDataFood] = useState([0]);

    const [listDateTimeOx, setListDateTimeOx] = useState([0]);
    const [datamqttOx, setDataOx] = useState([0]);

    const [listDateTimepH, setListDateTimepH] = useState([0]);
    const [datamqttpH, setDatapH] = useState([0]);

    const [listDateTimeWeight, setListDateTimeWeight] = useState([0]);
    const [datamqttWeight, setDataWeight] = useState([0]);

    const [listDateTimeLength, setListDateTimeLength] = useState([0]);
    const [datamqttLength, setDataLength] = useState([0]);

    const insertDataToListTemp = (msg, date) => {
        console.log('date: ' + date);
        setDataTemp(datamqtt => [...datamqtt, msg]);
        setListDateTimeTemp(listDateTime => [...listDateTime, date]);
        console.log('datamqtt: ' + datamqttTemp + '  date: ' + listDateTimeTemp)
    };
    const insertDataToListFood = (msg, date) => {
        console.log('date: ' + date);
        setDataFood(datamqtt => [...datamqtt, msg]);
        setListDateTimeFood(listDateTime => [...listDateTime, date]);
        console.log('datamqtt: ' + datamqttFood + '  date: ' + listDateTimeFood)
    };
    const insertDataToListOx = (msg, date) => {
        console.log('date: ' + date);
        setDataOx(datamqtt => [...datamqtt, msg]);
        setListDateTimeOx(listDateTime => [...listDateTime, date]);
        console.log('datamqtt: ' + datamqttOx + '  date: ' + listDateTimeOx)
    };
    const insertDataToListPH = (msg, date) => {
        console.log('date: ' + date);
        setDatapH(datamqtt => [...datamqtt, msg]);
        setListDateTimepH(listDateTime => [...listDateTime, date]);
        console.log('datamqtt: ' + datamqttpH + '  date: ' + listDateTimepH)
    };
    const insertDataToListWeight = (msg, date) => {
        console.log('date: ' + date);
        setDataWeight(datamqtt => [...datamqtt, msg]);
        setListDateTimeWeight(listDateTime => [...listDateTime, date]);
        console.log('datamqtt: ' + datamqttWeight + '  date: ' + listDateTimeWeight)
    };
    const insertDataToListLength = (msg, date) => {
        console.log('date: ' + date);
        setDataLength(datamqtt => [...datamqtt, msg]);
        setListDateTimeLength(listDateTime => [...listDateTime, date]);
        console.log('datamqtt: ' + datamqttLength + '  date: ' + listDateTimeLength)
    };

    const currentTime = () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        return date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
    };

    const pubsubmqtt = () => {
        MQTT.createClient({
            uri: 'mqtt://203.154.91.133:1883',
            clientId: 'your_client_id'
        }).then(function (client) {

            client.on('closed', function () {
                console.log('mqtt.event.closed');
            });

            client.on('error', function (msg) {
                console.log('mqtt.event.error', msg);
            });

            client.on('message', function (msg) {
                console.log('mqtt.event.message', msg);
                console.log('msg.topic: ' + msg.topic)
                if (msg.topic == "/dataWeight") {
                    insertDataToListWeight(msg.data, currentTime());
                    console.log(msg.data + currentTime())
                    client.publish('/Weight', `{"Weight":${msg.data},"datetime":${currentTime()}}`, 0, false);
                }
                if (msg.topic == "/datalength") {
                    insertDataToListLength(msg.data, currentTime());
                    console.log(msg.data + currentTime())
                    client.publish('/Length', `{"Length":${msg.data},"datetime":${currentTime()}}`, 0, false);
                }
                if (msg.topic == "/dataOx") {
                    insertDataToListOx(msg.data, currentTime());
                    console.log(msg.data + currentTime())
                    client.publish('/oxe', `{"Ox":${msg.data},"datetime":${currentTime()}}`, 0, false);
                }
                if (msg.topic == "/datapH") {
                    insertDataToListPH(msg.data, currentTime());
                    console.log(msg.data + currentTime())
                    client.publish('/pH', `{"pH":${msg.data},"datetime":${currentTime()}}`, 0, false);
                }
                if (msg.topic == "/dataFood") {
                    insertDataToListFood(msg.data, currentTime());
                    console.log('+++++++++'+msg.data + currentTime())
                    console.log(datamqttFood)
                    console.log(listDateTimeFood)
                    client.publish('/Food', `{"Food":${msg.data},"datetime":${currentTime()}}`, 0, false);
                }
                if (msg.topic == "/datatemp") {
                    insertDataToListTemp(msg.data, currentTime());
                    console.log(msg.data + currentTime())
                    client.publish('/Temp', `{"Temp":${msg.data},"datetime":${currentTime()}}`, 0, false);
                  }
            });

            client.on('connect', function (msg) {
                console.log('connected');
                client.subscribe('/datalength', 0);
                client.subscribe('/dataWeight', 0);
                client.subscribe('/Length', 0);
                client.subscribe('/Weight', 0);
                client.subscribe('/dataOx', 0);
                client.subscribe('/datapH', 0);
                client.subscribe('/oxe', 0);
                client.subscribe('/datatemp', 0);
                client.subscribe('/Temp', 0);
                client.subscribe('/dataFood', 0);
                client.subscribe('/Food', 0);
                // client.publish('/oxe', `{"Ox":${msg.data},"datetime":${currentTime()}}`, 0, false);
                // client.publish('/data', "test", 0, false);
            });

            client.connect();
        }).catch(function (err) {
            console.log(err);
        });
    }
    useEffect(() => {
        pubsubmqtt();
        setInterval(() => {
            currentTime();
        }, 1000);

        const dataInterval = setInterval(() => {
        }, 1 * 1000);
    
    
        return () => {
          clearInterval(dataInterval)
        };
      });

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
        labels: listDateTimeFood,
        datasets: [
            {
                data: datamqttFood
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
                            labels: listDateTimeTemp,
                            datasets: [
                                {
                                    data: datamqttTemp
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
                    <Text style={{ fontSize: 25, left: 120, bottom: 0, fontWeight: 'bold', color: '#9999FF' }}>Temperature</Text>
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
                    <Text style={{ fontSize: 25, left: 160, bottom: 0, fontWeight: 'bold', color: '#87CEEB' }}>FOOD</Text>
                    <LineChart
                        data={{
                            labels: listDateTimeOx,
                            datasets: [
                                {
                                    data: datamqttOx
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
                    <Text style={{ fontSize: 25, left: 150, bottom: 0, fontWeight: 'bold', color: '#CC99CC' }}>OXYGEN</Text>
                    <LineChart
                        data={{
                            labels: listDateTimepH,
                            datasets: [
                                {
                                    data: datamqttpH
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
                    <Text style={{ fontSize: 25, left: 180, bottom: 0, fontWeight: 'bold', color: '#87CEEB' }}>PH</Text>
                    <LineChart
                        data={{
                            labels: listDateTimeWeight,
                            datasets: [
                                {
                                    data: datamqttWeight
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
                    <Text style={{ fontSize: 25, left: 160, bottom: 0, fontWeight: 'bold', color: '#000' }}>Weight</Text>
                    <LineChart
                        data={{
                            labels: listDateTimeLength,
                            datasets: [
                                {
                                    data: datamqttLength
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
                    <Text style={{ fontSize: 25, left: 160, bottom: 0, fontWeight: 'bold', color: '#9999FF' }}>Length</Text>
                </View>
                <View style={{ top: 30, margin: 10 }}>

                </View>
            </ScrollView>
        </View>
    );
}
export default App
