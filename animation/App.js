import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { GlobalProvider } from './context/globalContext';
import AnimationScreen from './screens/AnimationScreen';
import DummyScreen from './screens/DummyScreen';
import HomeScreen from './screens/HomeScreen';

const Stack= createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <GlobalProvider>
        <NavigationContainer>
          {isLoading ? <AnimationScreen /> : <Stack.Navigator
        screenOptions={{ headerShown: false }}>

        <Stack.Screen name="FirstPage" component={HomeScreen} />
        <Stack.Screen name="Dummy" component={DummyScreen} />
        

        </Stack.Navigator>}
      
        </NavigationContainer>
    </GlobalProvider>
    
  );
}