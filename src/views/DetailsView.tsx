import { SafeAreaView, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAppContext } from '../context/appContext';
import { useDataQuery } from '../hooks/queries';
import PersonList from '../components/PersonList';
import { dataType } from '../Types';
import FilmList from '../components/FilmList';
import VehicleList from '../components/VehicleList';
import Text, { variants } from '../components/Text';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@rneui/themed';

const backgroundStyle = {
  backgroundColor: Colors.darker,
};
interface DetailsViewProps {
  navigation: NativeStackNavigationProp<any, any>;
}
export default ({ navigation }: DetailsViewProps) => {
  const { selectedType, selectedId } = useAppContext();
  const { loading, data, error } = useDataQuery(selectedType, selectedId);
  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        style={{
          backgroundColor: Colors.white,
          paddingTop: 8,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        {loading && <Text>Loading</Text>}
        {error && (
          <Text variant={variants.ERROR}> {JSON.stringify(error)} </Text>
        )}

        {![dataType.FILM, dataType.PERSON, dataType.VEHICLE].includes(
          selectedType,
        ) && (
          <>
            {/* help with debugging new data fields */}
            <Text>Not completed yet</Text>
            <Text>{JSON.stringify(data)}</Text>
          </>
        )}
        <Text variant={variants.TITLE}>
          {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
        </Text>

        {[dataType.FILM].includes(selectedType) && (
          <>
            <Text variant={variants.BOLD}>
              Episode {data?.film?.episodeID}: {data?.film?.title}
            </Text>
            <Text>Release date: {data?.film?.releaseDate}</Text>
            <Text>Directed by: {data?.film?.director}</Text>
            <Text
              style={{
                marginBottom: 16,
              }}
            >
              Produced by: {data?.film?.producers}
            </Text>
            <Button
              color="#a9a9a9"
              onPress={() => {
                navigation.navigate('Crawl');
              }}
            >
              View Opening Crawl
            </Button>
          </>
        )}
        {[dataType.PERSON].includes(selectedType) && (
          <>
            <Text>{data?.person?.name}</Text>
            <Text>Born: {data?.person?.birthYear}</Text>
            <Text>Gender: {data?.person?.gender}</Text>
            <Text>Eye Color: {data?.person?.eyeColor}</Text>
            <Text>Hair Color: {data?.person?.hairColor}</Text>
            <Text>Skin Color: {data?.person?.skinColor}</Text>
            <Text>Height: {data?.person?.height}</Text>
            <Text>Mass: {data?.person?.mass}</Text>
            <Text>Species: {data?.person?.species?.name}</Text>
            <Text>Home World: {data?.person?.homeworld?.name}</Text>
          </>
        )}
        {[dataType.VEHICLE].includes(selectedType) && (
          <>
            <Text>Name: {data?.vehicle?.name}</Text>
            <Text>Model: {data?.vehicle?.model}</Text>
            <Text>Class: {data?.vehicle?.vehicleClass}</Text>
            <Text>Consumables: {data?.vehicle?.consumables}</Text>
            <Text>Cost: {data?.vehicle?.costInCredits}</Text>
            <Text>Crew: {data?.vehicle?.crew}</Text>
            <Text>Length: {data?.vehicle?.length}</Text>
            <Text>Manufactures: {data?.vehicle?.manufacturers}</Text>
            <Text>Max Speed: {data?.vehicle?.maxAtmospheringSpeed}</Text>
            <Text>Passengers: {data?.vehicle?.passengers}</Text>
            <Text>Capacity: {data?.vehicle?.cargoCapacity}</Text>
          </>
        )}
        {[dataType.FILM].includes(selectedType) && (
          <>
            <Text
              style={{
                marginTop: 16,
              }}
            >
              Characters:
            </Text>
            <PersonList
              data={data?.[selectedType]?.characterConnection.characters}
            />
          </>
        )}
        {[dataType.PERSON, dataType.VEHICLE].includes(selectedType) && (
          <>
            <Text
              style={{
                marginTop: 16,
              }}
            >
              Films:
            </Text>
            <FilmList data={data?.[selectedType]?.filmConnection?.films} />
          </>
        )}
        {[dataType.FILM, dataType.PERSON].includes(selectedType) &&
          (data?.[selectedType]?.vehicleConnection?.vehicles || []).length >
            0 && (
            <>
              <Text
                style={{
                  marginTop: 16,
                }}
              >
                Vehicles
              </Text>
              <VehicleList
                data={data?.[selectedType]?.vehicleConnection?.vehicles}
              />
            </>
          )}
        <Text>{''}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
