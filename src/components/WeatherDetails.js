import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const WeatherDetails = ({ currentWeather, unitsSystem
}) => {
    const {
        main: { feels_like, humidity, pressure },
        wind: { speed },
    } = currentWeather

    const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`

    return (
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>

                <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: '#dbdbdb' }}>
                    <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="temperature-low" size={25} color='#FF304F' />
                        <View style={styles.weatherDetailsItems}>
                            <Text>Feels like:</Text>
                            <Text style={styles.textSecondary}>{feels_like}°</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="water" size={30} color='#FF304F' />
                        <View style={styles.weatherDetailsItems}>
                            <Text>Humidity:</Text>
                            <Text style={styles.textSecondary}>{humidity}%</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ ...styles.weatherDetailsRow, borderTopWidth: 1, borderTopColor: '#dbdbdb' }}>
                <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: '#dbdbdb' }}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="weather-windy" size={30} color='#FF304F' />
                        <View style={styles.weatherDetailsItems}>
                            <Text>Wind Speed:</Text>
                            <Text style={styles.textSecondary}>{windSpeed}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="speedometer" size={30} color='#FF304F' />
                        <View style={styles.weatherDetailsItems}>
                            <Text>Pressure:</Text>
                            <Text style={styles.textSecondary}>{pressure}hPa</Text>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto',
        margin: 15,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 10,
    },

    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    weatherDetailsBox: {
        padding: 20,
        width: '50%',
    },

    weatherDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    textSecondary: {
        fontSize: 18,
        color: '#002651',
        fontWeight: '700',
        margin: 7,
    },
})

export default WeatherDetails