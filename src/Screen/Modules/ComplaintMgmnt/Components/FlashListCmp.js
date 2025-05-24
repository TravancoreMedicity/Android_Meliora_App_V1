//import liraries
import React, { memo } from "react";
import { RefreshControl, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import NoNewTicketCmp from "./NoNewTicketCmp";
// import NotAssignedCard from './NotAssignedCard';

// create a component
const FlashListCmp = ({ Assigned, FlashRenderCmp }) => {
  return (
    <FlashList
      data={Assigned}
      renderItem={({ item }) => <FlashRenderCmp data={item} />}
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
      keyExtractor={(Assigned, index) => index}
      ListEmptyComponent={<NoNewTicketCmp />}
      ItemSeparatorComponent={() => (
        <View style={{ height: 20, width: "100%" }} />
      )}
      contentContainerStyle={{ paddingBottom: 50 }}
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
