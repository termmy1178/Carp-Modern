import React from "react";
import { StyleSheet, Text, TextInput, View, Image, Button, Alert, } from "react-native";

const UselessTextInput = ({ navigation }) => {

  const [login1, setlogin] = React.useState(0);
  const [Username, setuser] = React.useState('');
  const [Password, setpass] = React.useState('');

  // const obj = JSON.parse(json);
  const getlogin = () => {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    // console.log(typeof(response));   

    fetch(`http://203.154.91.133/Member/login?username=${Username}&password=${Password}`, requestOptions)
      .then(function (response) {
        return response.json() // แปลงข้อมูลที่ได้เป็น json
      })
      .then(function (data) {
        console.log(data.ret);
        // setlogin(data.ret)
        if (data.ret == 0) {
          console.log(data.msg)
          navigation.navigate('PageHome')
        } else {
          console.log("fail")
          alert('Login Fail')
        }
      })
      .catch(error => {
        alert('Username Fail')
        console.log('[error]', error)});
  }



  return (
    <View style={{ flex: 1, backgroundColor: "#FCE2E5" }}>

      <View style={{ bottom: 30, }}>
        <Image source={logo}
          style={{ borderRadius: 20 }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: 'space-between', }}>
        <Text style={{ position: 'absolute', fontSize: 40, top: -60, left: 60, color: '#751032', fontWeight: "bold" }}>CARP</Text>
        <Text style={{ position: 'absolute', fontSize: 40, top: -60, left: 165, color: '#707070', fontWeight: "bold" }}>-</Text>
        <Text style={{ position: 'absolute', fontSize: 40, top: -60, left: 180, color: '#DF1D26', fontWeight: "bold" }}>MODERN</Text>
      </View>

      <View style={{ flex: 1, bottom: 200 }}>
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
          secureTextEntry={true}
        />
      </View>

      <View style={{ bottom: 20, width: 140, height: 40, left: 210, }}>
        <Button style={styles.bt1}
          onPress={() => {
            getlogin()
            // navigation.navigate('PageHome')
          }}
            // navigation.navigate('PageHome')
          
          // value={login1}
          title="Login"
          color="#751032"
        />
      </View>

      <View style={{ bottom: 60, width: 140, height: 40, left: 30 }}>
        <Button
          onPress={() => navigation.navigate('Signup')}
          title="Sign Up"
          color="#DF1D26"
        />
      </View>

    </View>

  );
};
const logo = {
  uri: 'https://www.img.in.th/images/6c2a4e223df6da6f2bd4adf36fe645fc.png',
  width: 400,
  height: 400,
};


const styles = StyleSheet.create({
  input: {
    top: 100,
    height: 40,
    margin: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  input1: {
    top: 10,
    height: 40,
    margin: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  bt1: {
    borderRadius: 50,
  }

});

export default UselessTextInput;
