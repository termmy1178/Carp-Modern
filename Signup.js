import React from "react";
import { StyleSheet, Text, TextInput, View, Image, Button, Alert, TouchableOpacity } from "react-native";

const App = ({ navigation }) => {

    const [Username, setuser] = React.useState('');
    const [Password, setpass] = React.useState('');

    const getsignup = () => {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch(`http://203.154.91.133/Member/create?username=${Username}&password=${Password}`, requestOptions)
        // .then(response => response.json())
        .then(function (response) {
            return response.json()
          })
        .then(result => {navigation.navigate('Page1'),console.log(result)})
        .catch(error => console.log('error', error));
    }

    return (
        <View style={{ flex: 3, backgroundColor: "#FCE2E5" }}>

            <View style={{ flex: 1, }}>
                <Image source={logo}
                    style={{ left: 45 }} />
            </View>

            <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom:20}}>
                <Text style={{ fontSize: 40, color: '#000', fontWeight: "bold" }}>Create an Account</Text>
            </View>

            <View style={{ flex: 0.6,top:30}}>
                <TextInput
                    style={styles.input}
                    onChangeText={setuser}
                    value={Username}
                    placeholder="UserName"
                    keyboardType='default'
                    backgroundColor="white"
                />
                <TextInput
                    style={styles.input1}
                    onChangeText={setpass}
                    value={Password}
                    placeholder="Password"
                    keyboardType='numeric'
                    backgroundColor="white"
                />
            </View>
            <View style={{ flex: 0.7}}>
                <TouchableOpacity onPress={() => {
                    getsignup()
                }}>
                    <Text style={{ fontSize: 30, left: 50, fontWeight: "bold", bottom: 10 ,color:'#000'}}>Sign UP -</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
};

const logo = {
    uri: 'https://www.img.in.th/images/043865bfed96aec77b3c2cdc4e177772.png',
    width: 300,
    height: 300,
};

const styles = StyleSheet.create({
    input: {
        bottom:60,
        height: 40,
        margin: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
    },
    input1: {
        bottom: 150,
        height: 40,
        margin: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
    },
    input2: {
        bottom: 240,
        height: 40,
        margin: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
    },

});

export default App;
