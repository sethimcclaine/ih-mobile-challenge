import {
  // FlatList,
  SafeAreaView,
  ScrollView,
  // TouchableHighlight,
  useColorScheme,
} from 'react-native';
// import { ListItem } from '@rneui/themed';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useAppContext } from '../context/appContext';
import { useAllFilms } from '../hooks/queries';
// import { dataType } from '../Types';
import AllFilmsList from '../components/FilmList';

// import { AllPeopleQueryResult, Person } from '../__generated__/graphql';

interface HomeViewProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const HomeView = ({ navigation }: HomeViewProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {
    data,
    // loading
  } = useAllFilms();
  // const { setSelectedId, setSelectedType } = useAppContext();
  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}
      >
        <AllFilmsList navigation={navigation} data={data?.allFilms?.edges} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeView;
