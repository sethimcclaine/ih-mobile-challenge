import { TouchableHighlight } from 'react-native';
import { dataType } from '../Types';
import { useAppContext } from '../context/appContext';
import { Person } from '../__generated__/graphql';
import { ListItem, ListItemContent, ListItemTitle } from './ListItem';

interface ListProps {
  data: Person[];
}
export default ({ data }: ListProps) => {
  const { setSelectedId, setSelectedType } = useAppContext();
  return (
    <>
      {(data || []).map(({ name, id }) => (
        <ListItem
          key={id}
          Component={TouchableHighlight}
          onPress={() => {
            setSelectedId(id);
            setSelectedType(dataType.PERSON);
          }}
        >
          <ListItemContent>
            <ListItemTitle>{name}</ListItemTitle>
          </ListItemContent>
        </ListItem>
      ))}
    </>
  );
};
