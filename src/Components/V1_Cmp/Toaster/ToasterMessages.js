import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Toast } from "toastify-react-native";

// Standalone Custom Toast component

const CustomSuccess = ({ text1 = "Success", text2 }) => (
  <View style={styles.toastContainer}>
    <FontAwesome5 name="thumbs-up" size={24} color="#fff" style={styles.icon} />
    <View style={{ flex: 1 }}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  </View>
);

const CustomError = ({ text1 = "Error", text2 }) => (
  <View style={styles.toastContainer}>
    <FontAwesome5
      name="times-circle"
      size={24}
      color="#fff"
      style={styles.icon}
    />
    <View style={{ flex: 1 }}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  </View>
);

const CustomInfo = ({ text1 = "Info", text2 }) => (
  <View style={styles.toastContainer}>
    <FontAwesome5
      name="info-circle"
      size={24}
      color="#fff"
      style={styles.icon}
    />
    <View style={{ flex: 1 }}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  </View>
);

const CustomWarning = ({ text1 = "Warning", text2 }) => (
  <View style={styles.toastContainer}>
    <FontAwesome5
      name="exclamation-triangle"
      size={24}
      color="#fff"
      style={styles.icon}
    />
    <View style={{ flex: 1 }}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  </View>
);

const toastConfig = {
  successToast: (props) => <CustomSuccess {...props} />,
  errorToast: (props) => <CustomError {...props} />,
  infoToast: (props) => <CustomInfo {...props} />,
  warnToast: (props) => <CustomWarning {...props} />,
};

const ShowToastMessage = (type, text1, text2) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};

// ✅ Main Component
const ToasterMessages = () => {
  return (
    <View>
      <Text>ToasterMessages Ready</Text>
    </View>
  );
};

export { toastConfig, ShowToastMessage };
export default ToasterMessages;

// ✅ Styles
const styles = StyleSheet.create({
  toastContainer: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "rgb(124,81,161)",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 8,
  },
  text1: {
    color: "#fff",
    fontWeight: "bold",
  },
  text2: {
    color: "#ccc",
  },
});
