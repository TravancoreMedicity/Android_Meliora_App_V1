import React, { memo } from "react";
import { RefreshControl, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import OnHoldCmp from "./OnHoldCmp";
import NoNewTicketCmp from "./NoNewTicketCmp";

const FlashListOnholdListCmp = ({ onHooldTickets }) => {
  const legth = Object.keys(onHooldTickets)?.length ?? 5;
  return (
    <FlashList
      data={onHooldTickets ?? []}
      keyboardShouldPersistTaps="always"
      renderItem={({ item }) => <OnHoldCmp data={item} />}
      estimatedItemSize={legth || 5}
      ListEmptyComponent={<NoNewTicketCmp />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(Assigned) => Assigned.complaint_slno}
      contentContainerStyle={{ paddingBottom: 110 }}
      ItemSeparatorComponent={() => (
        <View style={{ height: 20, width: "100%" }} />
      )}
    />
  );
};

export default memo(FlashListOnholdListCmp);
