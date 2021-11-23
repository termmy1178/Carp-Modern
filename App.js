import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Page1 from "./Screen/Page1"
import PageSetting from "./Screen/PageSetting"
import GraphTemperature from "./Screen/GraphTemperature"
import PageHome from "./Screen/PageHome"
import GraphFood from "./Screen/GraphFood";
import GrapGrowthtrack from "./Screen/GrapGrowthtrack";
import OxPh from "./Screen/OxPh";
import Overview from "./Screen/Overview";
import Signup from "./Screen/Signup"
import fish from "./Screen/fish"
import Setfish from "./Screen/Setfish"
import graphfish from "./Screen/graphfish"


const Stack = createStackNavigator();

function Mystack() {
  return (

    <Stack.Navigator>
      <Stack.Screen name = "Page1" component={Page1} options={{headerShown: false}}/>
      <Stack.Screen name = "PageSetting" component={PageSetting} options={{headerShown: false}}/>
      <Stack.Screen name = "GraphTemperature" component={GraphTemperature} options={{headerShown: false}}/>
      <Stack.Screen name = "PageHome" component={PageHome} options={{headerShown: false}}/>
      <Stack.Screen name = "GraphFood" component={GraphFood} options={{headerShown: false}}/>
      <Stack.Screen name = "GrapGrowthtrack" component={GrapGrowthtrack}options={{headerShown: false}}/>
      <Stack.Screen name = "OxPh" component={OxPh}options={{headerShown: false}}/>
      <Stack.Screen name = "Overview" component={Overview}options={{headerShown: false}}/>
      <Stack.Screen name = "Signup" component={Signup}options={{headerShown: false}}/>
      <Stack.Screen name = "fish" component={fish}options={{headerShown: false}}/>
      <Stack.Screen name = "Setfish" component={Setfish}options={{headerShown: false}}/>
      <Stack.Screen name = "graphfish" component={graphfish}options={{headerShown: false}}/>
    </Stack.Navigator>
    
  )
}

const App = () =>{
  return(
    <NavigationContainer>
      <Mystack/>
    </NavigationContainer>
  )
}

export default App