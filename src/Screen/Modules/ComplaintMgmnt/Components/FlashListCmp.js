//import liraries
import React, { memo } from 'react';
import { RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import NoNewTicketCmp from './NoNewTicketCmp';
// import NotAssignedCard from './NotAssignedCard';

// create a component
const FlashListCmp = ({ Assigned, setCount, refresh, count, FlashRenderCmp, setLoading }) => {
    const legth = Object.keys(Assigned).length
    return (
        <FlashList
            data={Assigned}
            renderItem={({ item }) => <FlashRenderCmp data={item} />}
            estimatedItemSize={100}
            ListEmptyComponent={<NoNewTicketCmp legth={legth} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(Assigned, index) => index}
            // estimatedListSize={
            //     {
            //         height: (windowHeight * 70 / 100),
            //         width: windowWidth
            //     }
            // }
            onLoad={() => setLoading(false)}
            refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={() => setCount(count + 1)}
                />
            }
        />
    );
};

//make this component available to the app
export default memo(FlashListCmp);
