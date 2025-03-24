//import liraries
import React, { memo } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { bgColor, buttonColor, fontColor } from "../Constant/Colors";

// create a component
const CustomModal = ({ setModal, modalState, modalMessage }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalState}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.boxOne}>
          <Text style={styles.modalMesgeText}>{modalMessage}</Text>
        </View>
        <View style={styles.boxTwo}>
          <Pressable
            style={styles.modealButton}
            onPress={() => setModal(false)}
          >
            <Text style={styles.modalBtnText}>Close !</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgColor.ligthBluish,
    marginHorizontal: "10%",
    marginVertical: "70%",
    elevation: 10,
    borderRadius: 15,
    padding: 10,
  },
  modealButton: {
    backgroundColor: buttonColor.main,
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  boxOne: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
  },
  boxTwo: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  modalBtnText: {
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    color: fontColor.main,
  },
  modalMesgeText: {
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    color: fontColor.mainBlue,
  },
});

//make this component available to the app
export default memo(CustomModal);
