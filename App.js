import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const WEATHER_API_KEY = '305d4ae58ea5524f3f738cbd5c15c574';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

import { PRIMARY_COLOR, SECONDARY_COLOR } from './src/utils';
import WeatherInfo from './src/components/WeatherInfo';
import WeatherDetails from './src/components/WeatherDetails';
import UnitsPicker from './src/components/UnitsPicker';
import ReloadIcon from './src/components/ReloadIcon';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status != 'granted') {
        setErrorMessage('Acess to location is needed to run the app!')
        return
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
      Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      const { latitude, longitude } = location.coords
      Alert.alert(`Latitude: ${latitude}, Longitude: ${longitude}`)

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      const response = await fetch(weatherUrl)
      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }

    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});