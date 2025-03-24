//import liraries
import React, { memo, useState, lazy, useMemo, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux'
import _ from 'underscore';
import { getNotAssignedCount, getTicketCount } from '../../../Redux/ReduxSlice/ticketMagmntSlice';
import { styles } from './Style/Style';
import { secondLevelCount } from '../../../Redux/ReduxSlice/ticketMagmentDeptSlice';
import { getSuperVisor } from '../../../Redux/ReduxSlice/LoginSLice';

const DashCountTile = lazy(() => import('./DashCountTile'));

// create a component
const DashBoardView = ({ navigation }) => {

    const superId = useSelector(getSuperVisor)
    const [newTicket, setNewTicket] = useState(0);
    const [secondLvl, setSecondLvl] = useState(0);
    const [ticktCount, setTicktCount] = useState({
        assigned: 0,
        assit: 0,
        onHold: 0,
        forVerify: 0,
        completed: 0,
        pending: 0,
        superPending: 0
    })

    const tickectCount = useSelector(getTicketCount)
    const notAssignedCount = useSelector(getNotAssignedCount)
    const secondListCount = useSelector(secondLevelCount)

    //FOR ASSIGN THE NOT ASSIGNED TICKET COUNT
    useEffect(() => {
        setNewTicket(notAssignedCount)
        setSecondLvl(secondListCount)
    }, [notAssignedCount, secondListCount])
    //FOT ASSIGN THE ALL TICKET COUNT OTHER THAN NOT ASSIGN
    const tiktCountFrmDb = useMemo(() => tickectCount, [tickectCount])

    useEffect(() => {
        tiktCountFrmDb?.map((val) => {
            if (val.countype === "AC")
                setTicktCount({ ...ticktCount, ...ticktCount.assigned = val.total })
            if (val.countype === "AA")
                setTicktCount({ ...ticktCount, ...ticktCount.assit = val.total })
            if (val.countype === 'HC')
                setTicktCount({ ...ticktCount, ...ticktCount.onHold = val.total })
            if (val.countype === 'PC')
                setTicktCount({ ...ticktCount, ...ticktCount.pending = val.total })
            if (val.countype === 'RC')
                setTicktCount({ ...ticktCount, ...ticktCount.forVerify = val.total })
            if (val.countype === 'CC')
                setTicktCount({ ...ticktCount, ...ticktCount.completed = val.total })
            if (val.countype === 'SP')
                setTicktCount({ ...ticktCount, ...ticktCount.superPending = val.total })
        })

    }, [tiktCountFrmDb])

    const { assigned, assit, completed, forVerify, onHold, pending, superPending } = ticktCount

    return (
        <ScrollView
            horizontal={true}
            fadingEdgeLength={10}
            showsHorizontalScrollIndicator={false}
            style={styles.dbvContainer}
        >
            <DashCountTile navigation={navigation} escalated={0} id={1} name='New Ticket' count={newTicket} />
            <DashCountTile navigation={navigation} escalated={0} id={2} name='Assigned' count={assigned} />
            <DashCountTile navigation={navigation} escalated={0} id={3} name='Assistance' count={assit} />
            <DashCountTile navigation={navigation} escalated={0} id={4} name='OnHold' count={onHold} />
            {/* <DashCountTile navigation={navigation} escalated={0} id={5} name='Pending' count={pending} /> */}
            {
                superId === 1 && <DashCountTile navigation={navigation} escalated={0} id={5} name='For Verify' count={secondLvl} />
            }
            <DashCountTile navigation={navigation} escalated={0} id={6} name='On Progress' count={pending} />
        </ScrollView>
    );
};

//make this component available to the app
export default memo(DashBoardView);
