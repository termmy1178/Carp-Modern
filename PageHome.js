import React, { Component, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Switch, TouchableOpacity, Alert, } from 'react-native'
import { BottomSheet, ThemeProvider, ListItem, Avatar } from 'react-native-elements';

const App = ({ navigation }) => {
  const [PH, setph] = React.useState(0);
  const [Ox, setox] = React.useState(0);
  const [Temp, settemp] = React.useState(0);
  const [Fw, setFood] = React.useState(0);
  const [Swt1, setswt1] = React.useState(0);

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

  const gettemp = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://203.154.91.133/Show/Temp", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.statustemp)
        settemp(result.statustemp)
      })
      .catch(error => console.log('error', error));
  }

  const getfood = () => { 
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://203.154.91.133/Food/Foodweight", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.weight)
        setFood(result.weight)
      })
      .catch(error => console.log('error', error));
  }



  // const Swt1=()=>{
  //   var requestOptions = {
  //     method: 'POST',
  //     redirect: 'follow'
  //   };

  //   fetch("http://127.0.0.1:8000/Sensor/sw1?status=Swt1", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

  useEffect(() => {
    // getph();
    // getox();
    // gettemp();
    const dataInterval = setInterval(() => {
      getph()
      gettemp()
      getox()
      getfood()
    }, 1 * 1000);


    return () => {
      clearInterval(dataInterval)
    };
  });


  const [Sw1, setIsEnabled] = React.useState(false);
  const toggleSwitch = (value) => {
    console.log(Sw1)
    setIsEnabled(previousState => !previousState);
    if (Sw1 == false) {
      setswt1("Off")
    } else {
      setswt1("On")
    }
  }

  const [Sw2, setIsEnabled1] = React.useState(false);
  const Carpmodern = () => {
    console.log(Sw2)
    setIsEnabled1(previousState => !previousState);
  }
  const [Sw3, setIsEnabled2] = React.useState(false);
  const Carpmodern1 = () => {
    console.log(Sw3)
    setIsEnabled2(previousState => !previousState);
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
    <View style={{ flex: 1, backgroundColor: "#FCE2E5", flexDirection: 'column' }}>
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

      </View>
      <View style={{ flex: 3, height: 50, backgroundColor: "#FCE2E5" }}>
        <View style={{ flexDirection: 'row', marginTop: 50, marginLeft: 60, }}>
          <View style={{ width: 80, height: 100, left: 90 }}>
            <Text style={{ position: 'absolute', top: 70, left: 26, fontWeight: "bold", fontSize: 15 }}>Oxygen</Text>
            <Image
              style={{ width: 130, height: 150, bottom: 60, right: 15 }}
              source={{ uri: 'https://www.img.in.th/images/3c45f9aa13346c56e07a7c48d8820bbf.png' }}
            />
            <Text style={{ bottom: 150, left: 38, fontSize: 20 }}>{Ox}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', }}>
          <View style={{ width: 80, height: 100, left: 60, bottom: 43 }}>
            <Text style={{ position: 'absolute', fontWeight: "bold", fontSize: 15, top: 95, left: 38 }}>PH</Text>
            <Image
              style={{ width: 100, height: 100, }}
              source={{ uri: 'https://www.img.in.th/images/3c45f9aa13346c56e07a7c48d8820bbf.png' }}
            />
            <Text style={{ bottom: 65, left: 42, fontSize: 20 }}>{PH}</Text>
          </View>
          <View style={{ width: 80, height: 100, left: 170, bottom: 45 }}>
            <Text style={{ position: 'absolute', fontWeight: "bold", fontSize: 15, top: 95, left: 30 }}>Temp</Text>
            <Image
              style={{ width: 100, height: 100, }}
              source={{ uri: 'https://www.img.in.th/images/3c45f9aa13346c56e07a7c48d8820bbf.png' }}
            />
            <Text style={{ bottom: 65, left: 40, fontSize: 20 }}>{Temp}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 30 }}>
          <Text style={{ fontSize: 30, color: '#DF1D26', fontWeight: "bold", left: 10, top: 20 }}>Food Weight</Text>
          <View style={{ position: 'absolute', width: 100, height: 35, borderRadius: 40, right: 50, top: 45 }}>
            <Text style={{ left: 38, bottom: 17 ,fontSize:20,fontWeight: "bold"}}>{Fw} g</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 3, height: 50, flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ backgroundColor: "#fff", width: 350, height: 300, flexDirection: 'row', padding: 25, borderRadius: 30, borderColor: "#000", borderWidth: 2 }}>
          <View style={{ flexDirection: 'row', left: 105, }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Setting</Text>
          </View>
          <View style={{ width: 150, height: 200, marginTop: 50, right: 90 }}>
            <View style={{ position: 'absolute', top: 10, width: 160, height: 40, borderRadius: 40, borderColor: "#000", borderWidth: 2, }}>
              <Text style={{ fontSize: 30, left: 20, fontWeight: "bold", }}>00.00</Text>
              <View style={{ width: 30, height: 40, bottom: 137, left: 130 }}>
                <Image
                  style={styles.Imsetting}
                  source={{ uri: 'https://www.img.in.th/images/048dd6b6be8fe143cd91c70879092eea.png' }}
                />
                <TouchableOpacity style={{ width: 40, height: 30, top: 65, right: 20, }} onPress={() => navigation.navigate('PageSetting')} />
              </View>
            </View>
            <View style={{ position: 'absolute', top: 70, width: 160, height: 40, borderRadius: 40, borderColor: "#000", borderWidth: 2, }}></View>
            <Text style={{ fontSize: 30, top: 72, left: 22, fontWeight: "bold", }}>00.00</Text>
            <View style={{ width: 30, height: 40, bottom: 68, left: 132 }}>
              <Image
                style={styles.Imsetting}
                source={{ uri: 'https://www.img.in.th/images/048dd6b6be8fe143cd91c70879092eea.png' }}
              />
              <TouchableOpacity style={{ width: 40, height: 30, top: 63, right: 20, }} onPress={() => navigation.navigate('PageSetting')} />
            </View>
            <View style={{ position: 'absolute', top: 130, width: 160, height: 40, borderRadius: 40, borderColor: "#000", borderWidth: 2, }}></View>
            <Text style={{ fontSize: 30, top: 54, left: 22, fontWeight: "bold", }}>00.00</Text>
            <View style={{ width: 30, height: 40, bottom: 87, left: 132 }}>
              <Image
                style={styles.Imsetting}
                source={{ uri: 'https://www.img.in.th/images/048dd6b6be8fe143cd91c70879092eea.png' }}
              />
              <TouchableOpacity style={{ width: 40, height: 30, top: 62, right: 20, }} onPress={() => navigation.navigate('PageSetting')} />
            </View>
          </View>
          <View style={{ width: 130, height: 200, marginLeft: 20, marginTop: 50, right: 100, backgroundColor: 'white' }}>
            {/* <View style={{ top: 15, right: 35, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}> */}
            <View style={{ top: 15, right: 35, }}>
              <Switch
                trackColor={{ false: "#767577", true: "#64FF23" }}
                thumbColor={Sw1 ? "#fff" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={Sw1}

              />
            </View>
            <View style={{ top: 50, right: 35, }}>
              <Switch
                trackColor={{ false: "#767577", true: "#64FF23" }}
                thumbColor={Sw2 ? "#fff" : "#f4f3f4"}
                onValueChange={Carpmodern}
                value={Sw2}
              />
            </View>
            <View style={{ top: 80, right: 35, }}>
              <Switch
                trackColor={{ false: "#767577", true: "#64FF23" }}
                thumbColor={Sw3 ? "#fff" : "#f4f3f4"}
                onValueChange={Carpmodern1}
                value={Sw3}

              />
            </View>
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