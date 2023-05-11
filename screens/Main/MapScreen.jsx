import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, {Marker} from "react-native-maps";

const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.location;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude
          }}
        />
      </MapView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
   
  mapView: {
    flex: 1,
    width: '100%',
    height: '100%',
    }
});

export default MapScreen;