import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SectionList, StyleSheet, Text, View } from 'react-native';
import BusInfo from './src/BusInfo';
import { COLOR } from './src/color';
import { busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections } from './src/data';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function App() {

  const sections = getSections(busStop.buses);
  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);

    const [now, setNow] = useState(dayjs());

    useEffect(() => {
      const interval = setInterval(() => {
        const newNow = dayjs();
        setNow(newNow);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, [])

    /**
     * Start
     */
    // undefined ?? null -> null 
    // { ... } ?? null -> { ... }
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;   // 없을 경우 null로 통일
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          // remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    /**
     * End
     */

    return (
      <BusInfo
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}}
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={{ flex: 1, width: '100%' }}
        sections={sections}
        renderSectionHeader={({section: {title} }) => <Text>{title}</Text>}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
