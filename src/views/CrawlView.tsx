import Text from '../components/Text';
import { useAppContext } from '../context/appContext';
import { useDataQuery } from '../hooks/queries';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { View } from 'react-native';
import { useEffect, useState } from 'react';

const backgroundStyle = {
  backgroundColor: Colors.darker,
};

export default () => {
  const { selectedType, selectedId } = useAppContext();
  const { data } = useDataQuery(selectedType, selectedId);
  const [textHeight, setTextHeight] = useState(0);
  const [top, setTop] = useState(-99999);

  useEffect(() => {
    if (textHeight !== 0) {
      setTimeout(() => {
        if (top > -textHeight - 100) {
          setTop(top - 3);
        } else {
          setTop(Math.ceil(textHeight) + 100);
        }
      }, 40);
    }
  }, [textHeight, top]);
  return data?.film?.openingCrawl ? (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          backgroundColor: Colors.black,
          paddingLeft: 8,
          paddingRight: 8,
          height: '100%',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            color: Colors.white,
            marginTop: top,
          }}
          onLayout={(event) => {
            if (textHeight === 0) {
              setTextHeight(event.nativeEvent.layout.height);
            }
          }}
        >
          {data?.film?.openingCrawl}
          {/* It is a period of civil war. Rebel spaceships, striking from a hidden
          base, have won their first victory against the evil Galactic Empire.
          {'\n\n'} During the battle, Rebel spies managed to steal secret plans
          to the Empire's ultimate weapon, the DEATH STAR, an armored space
          station with enough power to destroy an entire planet. {'\n\n'}
          Pursued by the Empire's sinister agents, Princess Leia races home
          aboard her starship, custodian of the stolen plans that can save her
          people and restore freedom to the galaxy.... */}
        </Text>
      </View>
    </SafeAreaView>
  ) : (
    <></>
  );
};
