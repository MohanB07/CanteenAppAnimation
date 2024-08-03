import {
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/manrope';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Colours from '../util/Colours';


function AnimationScreen( ){
  
  const moveAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [animationComplete, setAnimationComplete] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = '"One stop shop for PSG canteen"';
 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(moveAnim, {
        toValue: -100, // Adjust the value based on the screen size and your requirement
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.3,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnimationComplete(true);
    });
  }, [moveAnim, scaleAnim]);


  useEffect(() => {
    if (animationComplete) {
      let currentText = '';
      let index = 0;
      const intervalId = setInterval(() => {
        currentText += fullText[index];
        setDisplayedText(currentText);
        index++;
        if (index >= fullText.length) {
          clearInterval(intervalId);
        }
      }, 20); // Adjust the speed of the typing effect here
    }
  }, [animationComplete]);


  let [fontsLoaded] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  

  if(fontsLoaded){

  
    return (
        <View style={styles.container}>
        <View style={styles.welcome}>
          <View>
          <Animated.View
              style={[
                styles.animatedView,
                {
                  transform: [
                    { translateY: moveAnim },
                    { scale: scaleAnim },
                  ],
                },
              ]}
            >
              <LottieView  autoPlay
                  loop={true}
                  style={styles.gifStyle}source={require('../assets/animations/loadFood.json') }  />
          </Animated.View>
          {animationComplete && 
              <View style={styles.textContainer}>
                <Text style={styles.titleTextStyle}>PSG Food Zone</Text>
                <View style={styles.innerTextContainer}>
                  <Text style={styles.contentTextStyle}>{displayedText}</Text>  
                </View>
              </View>
            }
          </View>
        </View>
      </View>
      );
    }

}

export default AnimationScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:Colours.WhiteBlue200,
      justifyContent: 'center',
      
    },
    welcome: {
      alignItems:'center',
      justifyContent:'center',
      //borderWidth:2,
    },
    animatedView: {
    width: 300,
    height: 300,
    //borderWidth:2,
  
  },
  gifStyle: {
    flex:1,
    
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle:{
    marginTop:20,
    fontFamily:'Manrope_500Medium',
    fontSize:32,
    fontWeight:'bold',
    color:Colours.DarkBlue100,
    //borderWidth:2,
  },
  contentTextStyle:{
    fontStyle:'italic',
    fontFamily:'Manrope_200ExtraLight',
    fontWeight:'condensed',
    textAlign:'center',
    color:Colours.DarkBlue100,
    fontSize:13,
  },
  innerTextContainer:{
    marginTop:20,
    width:'85%',
    
    
    //borderWidth:2,
  }
  });
  
  