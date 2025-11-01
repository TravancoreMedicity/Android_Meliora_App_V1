import React from "react";
import { RefreshControl, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import OnHoldCmp from "./OnHoldCmp";
import NoNewTicketCmp from "./NoNewTicketCmp";

const FlashListOnholdListCmp = ({ onHooldTickets }) => {
  const legth = Object.keys(onHooldTickets ?? {})?.length ?? 5;
  return (
    <FlashList
      data={Array.isArray(onHooldTickets) ? onHooldTickets : []}
      keyboardShouldPersistTaps="always"
      renderItem={({ item }) => <OnHoldCmp data={item} />}
      estimatedItemSize={legth || 5}
      ListEmptyComponent={() => <NoNewTicketCmp /> || <Text>No Tickets</Text>}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.complaint_slno?.toString()}
      contentContainerStyle={{ paddingBottom: 110 }}
      ItemSeparatorComponent={() => (
        <View style={{ height: 20, width: "100%" }} />
      )}
    />
  );
};

export default React.memo(FlashListOnholdListCmp);
