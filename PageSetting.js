import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Switch, Button, TouchableOpacity, Alert, TextInput } from 'react-native'
import MQTT from 'sp-react-native-mqtt';

const App = ({ navigation }) => {

  // const [text, onChangeText] = React.useState("");
  // const [text1, fish] = React.useState("");
  // const [text2, weight] = React.useState("");
  // const [text3, PH] = React.useState("");
  // const [text4, Ox] = React.useState("");

  const [Time,Settime]=React.useState("");
  const [FishNumber,Setfish]=React.useState("");
  const [Fishweight,Setweight]=React.useState("");
  
  const getcal = () =>{
  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  
  fetch(`http://203.154.91.133/Food/Calculate?nbfish=${FishNumber}&weightfish=${Fishweight}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result),
      navigation.navigate('PageHome')
    })
    .catch(error => console.log('error', error));
}


  const [Sw1, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => {
    console.log(Sw1)
    setIsEnabled(previousState => !previousState);
  }
  const [Sw2, setIsEnabled1] = React.useState(false);
  const Swith1 = () => {
    console.log(Sw2)
    setIsEnabled1(previousState => !previousState);
  }

  const pubsubmqtt = (Time,FishNumber,Fishweight) => {
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
        insertDataToList(msg.data, currentTime());
      });

      client.on('connect', function () {
        console.log('connected');
        client.subscribe('/data', 0);
        //client.publish('/Setting', `${Time} ${FishNumber} ${Fishweight}`, 0, false);
        client.publish('/Setting', `{"Time":${Time},"FishNumber":${FishNumber},"Fishweight":${Fishweight}}`, 0, false);
        // client.publish('/data', "test", 0, false);
      });

      client.connect();
    }).catch(function (err) {
      console.log(err);
    });
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#FCE2E5", }}>
      <View style={{ flex: 0.1, height: 50, }}>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 25, height: 55, width: 400, backgroundColor: '#ddd', }}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('PageHome')} style={{ position: 'absolute', }}>
              <Text style={{ fontSize: 25, left: 20, top: 10, fontWeight: "bold", }}>Cancle</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 25, height: 55, width: 100, left: 300 }}>
          <TouchableOpacity onPress={() => {
            console.log(Time)
            pubsubmqtt(Time)
            getcal()}} style={{ position: 'absolute',}} >
            <View>
              <Text style={{ fontSize: 25, left: 10, top: 10, fontWeight: "bold", }}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ top: 50, flexDirection: 'row', flex: 0.1, height: 50, }}>
        <Text style={{ fontSize: 25, left: 20, top: 10, fontWeight: "bold", }}>Time</Text>
        <View style={{ position: 'absolute', right: 20, top: 10, width: 100, height: 40, borderRadius: 40, borderColor: "#000", borderWidth: 2, }}>
          <TextInput
            style={{ left: 25, top: 3 }}
            onChangeText={Settime}
            value={Time}
            placeholder="00:00"
            keyboardType='numeric'
          />
        </View>


      </View>
      <View style={{ flex: 0.7, top: 50, height: 50, }}>
        <View style={{ flexDirection: 'column', top: 10, height: 250, backgroundColor: '#ddd' }}>
          <Text style={{ fontSize: 20, left: 20, top: 20, fontWeight: "bold", }}>จำนวนปลา</Text>
          <Text style={{ fontSize: 20, left: 20, top: 50, fontWeight: "bold", }}>น้ำหนักปลาเฉลี่ยต่อตัว</Text>
          <Text style={{ fontSize: 20, left: 20, top: 80, fontWeight: "bold", }}>อาหารเร่งน้ำหนัก</Text>
          <Text style={{ fontSize: 20, left: 20, top: 110, fontWeight: "bold", }}>อาหารเร่งสี</Text>

          <View style={{ position: 'absolute', right: 20, top: 13, width: 100, height: 40, borderRadius: 40, borderColor: "#000", borderWidth: 2, }}>
            <TextInput
              style={{ left: 35, top: 3 }}
              onChangeText={Setfish}
              value={FishNumber}
              placeholder="00"
              keyboardType='numeric'
            />
          </View>
          <View style={{ position: 'absolute', right: 20, top: 70, width: 100, height: 40, borderRadius: 40, borderColor: "#000", borderWidth: 2, }}>
            <TextInput
              style={{ left: 35, top: 3 }}
              onChangeText={Setweight}
              value={Fishweight}
              placeholder="00 kg"
              keyboardType='numeric'
            />
          </View>

          <View style={{ top: 30, right: 35, }}>
            <Switch
              trackColor={{ false: "#767577", true: "#64FF23" }}
              thumbColor={Sw1 ? "#fff" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={Sw1}
            />
          </View>
          <View style={{ top: 60, right: 35, }}>
            <Switch
              trackColor={{ false: "#767577", true: "#64FF23" }}
              thumbColor={Sw2 ? "#fff" : "#f4f3f4"}
              onValueChange={Swith1}
              value={Sw2}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
export default App