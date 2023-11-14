import { TouchableHighlight } from 'react-native';
import { dataType } from '../Types';
import { useAppContext } from '../context/appContext';
import { Film } from '../__generated__/graphql';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ListItem,
  ListItemContent,
  ListItemFilmTitle,
  ListItemSubtitle,
  ListItemTitle,
} from './ListItem';

interface ListProps {
  navigation?: NativeStackNavigationProp<any, any>;
  data: Film[];
}
export default ({ navigation, data }: ListProps) => {
  const { setSelectedId, setSelectedType } = useAppContext();
  return (
    <>
      {/* @ts-ignore */}
      {(data || []).map((chunk: any) => {
        const node = (chunk.node || chunk) as Film;
        return (
          <ListItem
            key={node?.id}
            Component={TouchableHighlight}
            onPress={() => {
              setSelectedId(node?.id);
              setSelectedType(dataType.FILM);
              if (navigation) {
                navigation.navigate('Details');
              }
            }}
          >
            <ListItemContent long={!!navigation}>
              {navigation ? (
                <ListItemFilmTitle>
                  Episode {node?.episodeID}: {node?.title}
                </ListItemFilmTitle>
              ) : (
                <ListItemTitle>
                  Episode {node?.episodeID}: {node?.title}
                </ListItemTitle>
              )}

              {node?.releaseDate && (
                <ListItemSubtitle>
                  Release date: {node?.releaseDate}
                </ListItemSubtitle>
              )}
              {node?.director && (
                <ListItemSubtitle>
                  Directed by: {node?.director}
                </ListItemSubtitle>
              )}
              {node?.producers && (
                <ListItemSubtitle>
                  Produced by: {node?.producers.join(' | ')}
                </ListItemSubtitle>
              )}
            </ListItemContent>
          </ListItem>
        );
      })}
    </>
  );
};
