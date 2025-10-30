//import liraries
import React, { memo } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

// create a component
const CustomModal = ({ setModalVisible, modalVisible, modalMessage }) => {
  const hideDialog = () => setModalVisible(false);

  return (
    <View>
      <Portal>
        <Dialog visible={modalVisible} onDismiss={setModalVisible}>
          <Dialog.Title
            style={{ color: "rgb(217,75,155)", fontFamily: "Roboto_500Medium" }}
          >
            Message
          </Dialog.Title>
          <Dialog.Content>
            <Text
              variant="bodyMedium"
              style={{
                color: "rgb(217,75,155)",
                fontFamily: "Roboto_500Medium",
              }}
            >
              {modalMessage}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={hideDialog}
              style={{
                width: "50%",
              }}
              mode="elevated"
              rippleColor="rgb(248, 148, 203)"
              buttonColor="rgba(217,75,155,0.7)"
              textColor="white"
            >
              ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

//make this component available to the app
export default memo(CustomModal);
