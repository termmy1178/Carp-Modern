import React, { Component, useEffect , useState} from 'react'
import { Text, View, StyleSheet, Image, Switch, Button, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native'
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

const App = ({ navigation }) => {

    const [Weight, SetWeight] = React.useState(0);
    const [Weight1, SetWeight1] = React.useState(0);
    const [Length, SetLength] = React.useState(0);
    const [Length1, SetLength1] = React.useState(0);

    const [listDateTimeWeight, setListDateTimeWeight] = useState([0]);
    const [datamqttWeight, setDataWeight] = useState([0]);
    const [listDateTimeLength, setListDateTimeLength] = useState([0]);
    const [datamqttLength, setDataLength] = useState([0]);

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
                if (msg.topic == "/dataTemp") {
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
                // client.publish('/oxe', `{"Ox":${msg.data},"datetime":${currentTime()}}`, 0, false);
                // client.publish('/data', "test", 0, false);
            });

            client.connect();
        }).catch(function (err) {
            console.log(err);
        });
    }

    const getfish = () =>{
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch(`http://203.154.91.133/Food/WeightLenght?weight=${Weight}&lenght=${Length}\n`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    const getw = () =>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://203.154.91.133/Food/get_WeightLenght\n", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            SetWeight1(result.weight)
            console.log(result.lenght)
            SetLength1(result.lenght)
        })
        .catch(error => console.log('error', error));
    }

 
    useEffect(() => {
        pubsubmqtt();
        setInterval(() => {
            currentTime();
        }, 1000);

        const dataInterval = setInterval(() => {
            getw()
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
                <Text style={{ fontSize: 30, fontWeight: "bold", color: 'blue' }}>Growth</Text>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: 'blue' }}> track</Text>

            </View>
            <ScrollView>
                <View style={{ width: 190, height: 180, margin: 10 }}>
                    <Image
                        style={{ width: 170, height: 140, left: 0, top: 50 }}
                        source={{ uri: 'https://www.img.in.th/images/fd686e101557a716470de9e06edf87f8.png' }}

                    />
                    <Text style={{ fontSize: 25, left: 37, bottom: 35, fontWeight: 'bold' }}>{Weight1} G</Text>
                </View>
                <View style={{ width: 190, height: 180, bottom: 190, left: 200 }}>
                    <Image
                        style={{ width: 170, height: 140, left: 0, top: 50 }}
                        source={{ uri: 'https://www.img.in.th/images/b98c1b8e74c344e5d8efb8c4c55c57ef.png' }}
                    />
                    <Text style={{ fontSize: 25, left: 55, bottom: 35, fontWeight: 'bold' }}>{Length1} Cm</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 25, left: 60, bottom: 170, fontWeight: 'bold' }}>Weight</Text>
                    <Text style={{ fontSize: 25, left: 250, bottom: 205, fontWeight: 'bold' }}>Lenght</Text>
                </View>

                <View>
                    <TextInput
                        style={{
                            bottom: 200,
                            height: 40,
                            margin: 50,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 20,
                        }}
                        onChangeText={SetWeight}
                        value={Weight}
                        placeholder="     Enter  Weight"
                        keyboardType='numeric'
                        backgroundColor="white"
                    />
                    <TextInput
                        style={{
                            bottom: 280,
                            height: 40,
                            margin: 50,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 20,
                        }}
                        onChangeText={SetLength}
                        value={Length}
                        placeholder="     Enter  Lenght"
                        keyboardType='numeric'
                        backgroundColor="white"
                    />
                    <View style={{ bottom: 300, width: 140, height: 40, left: 130 }}>
                        <Button
                            onPress={() => {
                                getfish()
                              }}
                            title="add"
                            color='#87CE'
                        />
                    </View>
                </View>

                <View style={{ bottom: 290, margin: 10 }}>

                    <LineChart
                        data={{
                            labels:listDateTimeWeight,
                            datasets: [
                                {
                                    data: datamqttWeight
                                }
                            ]
                        }}
                        width={(Dimensions.get("window").width) - 20} // from react-native
                        height={220}
                        //yAxisLabel="$"
                        yAxisSuffix=" kg"
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
                                stroke: "white"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', left: 150 }}>^ Weight ^</Text>
                </View>
                <View style={{ margin: 10, bottom: 300 }}>
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold', left: 155 }}>^ Length ^</Text>
                </View>
            </ScrollView>
        </View>
    );
}
export default App
