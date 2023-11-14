import 'react-native-gesture-handler'; // Must be at top**
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from './src/views/HomeView';
import DetailsView from './src/views/DetailsView';
import { AppContextProvider } from './src/context/appContext';
import CrawlView from './src/views/CrawlView';

export default function App() {
  const client = new ApolloClient({
    // uri: 'https://graphql.org/swapi-graphql', // Suggested by documentation
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache(),
  });
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContextProvider>
          <ApolloProvider client={client}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={HomeView}
                  options={{ title: 'Titles' }}
                />
                <Stack.Screen
                  name="Details"
                  component={DetailsView}
                  options={{
                    title: 'Details',
                    // headerLeft: () => (<Button onPress={() => navigation.pop()}>Back</Button>),
                  }}
                />
                <Stack.Screen
                  name="Crawl"
                  component={CrawlView}
                  options={{
                    title: 'Opening Crawl',
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ApolloProvider>
        </AppContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
