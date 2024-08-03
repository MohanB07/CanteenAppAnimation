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
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PsgButton from '../components/PsgButton';
import { useGlobalContext } from '../context/globalContext';
import Colours from '../util/Colours';

const HomeScreen = () => {
  let [fontsLoaded] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  const Navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [collegeID, setCollegeID] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useGlobalContext();

  const handleLogin = async () => {
    await Navigation.navigate('Dummy');
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const savedCollegeID = await AsyncStorage.getItem('collegeID');
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedCollegeID && savedPassword) {
          const valid = await login(savedCollegeID, savedPassword);
          if (valid === true) {
            handleLogin();
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkSession();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };


  const validateLogin = async () => {
    const valid = await login(collegeID, password);
    if (valid === true) {
      await AsyncStorage.setItem('collegeID', collegeID);
      await AsyncStorage.setItem('password', password);
      handleLogin();
    } else if (valid === 'invalidPWD') {
      
    } else {
      
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colours.WhiteBlue200} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled={false}
        >
          <ImageBackground
            source={require('../assets/images/psg.jpg')}
            style={styles.backgroundContainer}
            imageStyle={styles.backgroundImage}
          >
            <View style={styles.contentContainer}>
              <View style={styles.cardTransparentContainer}></View>
              <View style={styles.cardOpaqueContainer}>
                <Text style={styles.cardTitleText}>Log into Food Zone</Text>
                <View style={styles.loginBox}>
                  <TextInput
                    style={styles.loginText}
                    placeholder="college ID"
                    value={collegeID}
                    onChangeText={setCollegeID}
                  />
                  <TextInput
                    style={styles.loginText}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
                <PsgButton title="Login" onPress={validateLogin} />
                <Text style={styles.miniText}>
                  Not a registered user?{' '}
                  <Text style={styles.signup} onPress={toggleModal}>
                    Sign up
                  </Text>{' '}
                  now!
                </Text>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Ionicons name="close-circle-outline" size={32} style={styles.closeButtonText} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Sign Up</Text>
            <View style={styles.modalContent}>
              <View style={styles.signupBox}>
                <TextInput
                  style={styles.loginText}
                  placeholder="college ID"
                  value={collegeID}
                  onChangeText={setCollegeID}
                />
                <TextInput
                  style={styles.loginText}
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={validateLogin}>
                  <PsgButton
                    style={{ backgroundColor: 'white' }}
                    textStyle={{ color: Colours.DarkBlue100, fontWeight: 'bold', fontSize: 20 }}
                    title="Sign Up"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colours.WhiteBlue200,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingBottom: '8%',
  },
  backgroundContainer: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.8,
  },
  cardTransparentContainer: {
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '93%',
    opacity: 0.5,
    paddingVertical: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  cardOpaqueContainer: {
    position: 'absolute',
    top: '26%',
    left: '2%',
    right: '2%',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardTitleText: {
    color: Colours.DarkBlue100,
    fontFamily: 'Manrope_500Medium',
    fontSize: 28,
  },
  loginBox: {
    width: '85%',
  },
  loginText: {
    marginTop: '10%',
    paddingHorizontal: '5%',
    height: 55,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: Colours.White300,
    borderColor: '#000000',
    width: '100%',
  },
  signup: {
    color: Colours.LinkRed,
    textDecorationLine: 'underline',
  },
  miniText: {
    color: Colours.DarkBlue100,
    paddingTop: '2%',
    fontWeight: 'bold',
  },
  modalContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colours.WhiteBlue200,
    top: '20%',
    borderRadius: 30,
    margin: 10,
  },
  modalContent: {
    backgroundColor: Colours.DarkBlue100,
    borderRadius: 30,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Manrope_500Medium',
    color: Colours.DarkBlue100,
    marginBottom: 20,
  },
  signupBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 50,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: Colours.DarkBlue100,
  },
});
