//import liraries
import React from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import NoNewTicketCmp from "./NoNewTicketCmp";
// import NotAssignedCard from './NotAssignedCard';

// create a component
const FlashListCmp = ({ Assigned, FlashRenderCmp }) => {
  const length = Object.keys(Assigned ?? {})?.length ?? 5;
  return (
    <FlashList
      data={Array.isArray(Assigned) ? Assigned : []}
      keyboardShouldPersistTaps="always"
      renderItem={({ item }) => <FlashRenderCmp data={item} />}
      estimatedItemSize={length || 5}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.complaint_slno?.toString()}
      ListEmptyComponent={<NoNewTicketCmp />}
      ItemSeparatorComponent={() => (
        <View style={{ height: 20, width: "100%" }} />
      )}
      contentContainerStyle={{ paddingBottom: 110 }}
    />
  );
};

//make this component available to the app
export default React.memo(FlashListCmp);
