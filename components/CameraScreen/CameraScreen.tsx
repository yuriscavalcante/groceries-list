import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";

const CameraScreen = () => {
  const devices = useCameraDevices();
  const device = devices[0];
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return <Text>Permissão para câmera negada</Text>;
  }

  if (device == null) return <Text>Carregando câmera...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 50,
          alignSelf: "center",
          padding: 15,
          backgroundColor: "red",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Capturar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CameraScreen