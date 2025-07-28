//import liraries
import React, { memo } from "react";
import { RefreshControl, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import NoNewTicketCmp from "./NoNewTicketCmp";
// import NotAssignedCard from './NotAssignedCard';

// create a component
const FlashListCmp = ({ Assigned, FlashRenderCmp }) => {
  const legth = Object.keys(Assigned)?.length;
  return (
    <FlashList
      data={Assigned ?? []}
      keyboardShouldPersistTaps="always"
      renderItem={({ item }) => <FlashRenderCmp data={item} />}
      estimatedItemSize={legth || 5}
      showsVerticalScrollIndicator={false}
      keyExtractor={(Assigned) => Assigned.complaint_slno}
      ListEmptyComponent={<NoNewTicketCmp />}
      ItemSeparatorComponent={() => (
        <View style={{ height: 20, width: "100%" }} />
      )}
      contentContainerStyle={{ paddingBottom: 110 }}
      // estimatedListSize={
      //     {
      //         height: (windowHeight * 70 / 100),
      //         width: windowWidth
      //     }
      // }
      // onLoad={() => setLoading(false)}
      // refreshControl={
      //     <RefreshControl
      //         refreshing={refresh}
      //         onRefresh={() => setCount(count + 1)}
      //     />
      // }
    />
  );
};

//make this component available to the app
export default memo(FlashListCmp);
