import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../utils";

const WeatherInfo = ({ currentWeather }) => {
    const {
        main: { temp },
        weather,
        name,
    } = currentWeather;

    if (weather) {
        return (
            <>
                {weather.map(({ icon, description, main }) => (
                    <View key={icon} style={styles.weatherInfo}>
                        <Text>{name}</Text>
                        <Image style={styles.weatherIcon} source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }} />
                        <Text style={styles.textPrimary}>{temp}°</Text>
                        <Text style={styles.weatherDescription}>{description}</Text>
                        <Text style={styles.textSecondary}>{main}</Text>
                    </View>
                ))}
            </>
        );
    }

    return <View />;
};

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: "center",
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    weatherDescription: {
        textTransform: "capitalize",
    },
    textPrimary: {
        fontSize: 40,
        color: '#FF304F',
    },
    textSecondary: {
        fontSize: 20,
        color: '#002651',
        fontWeight: "500",
        marginTop: 10,
    },
});

export default WeatherInfo;
