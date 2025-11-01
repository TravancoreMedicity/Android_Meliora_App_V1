//import liraries
import React, { memo } from "react";
import { RefreshControl, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import NotAssignedCard from "./NotAssignedCard";
import NoNewTicketCmp from "./NoNewTicketCmp";

// create a component
const FlashListNotAssign = ({ notAssigned }) => {
  const legth = Object.keys(notAssigned)?.length;

  return (
    <FlashList
      data={notAssigned ?? []}
      keyboardShouldPersistTaps="always"
      renderItem={({ item }) => <NotAssignedCard data={item} />}
      estimatedItemSize={legth || 5}
      ListEmptyComponent={<NoNewTicketCmp />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(Assigned) => Assigned.complaint_slno}
      contentContainerStyle={{ paddingBottom: 110 }}
      // estimatedListSize={
      //     {
      //         height: 300,
      //         width: windowWidth - 30
      //     }
      // }
      // onLoad={() => setLoading(false)}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refresh}
      //     onRefresh={() => {
      //       queryClient.invalidateQueries({
      //         queryKey: ["peningTicketList"],
      //         exact: true,
      //         refetchType: "active",
      //       });
      //     }}
      //   />
      // }
      ItemSeparatorComponent={() => (
        <View style={{ height: 20, width: "100%" }} />
      )}
    />
  );
};

//make this component available to the app
export default memo(FlashListNotAssign);
