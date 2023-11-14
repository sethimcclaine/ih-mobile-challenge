import { TouchableHighlight } from 'react-native';
import { dataType } from '../Types';
import { useAppContext } from '../context/appContext';
import { Vehicle } from '../__generated__/graphql';
import { ListItem, ListItemContent, ListItemTitle } from './ListItem';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ListProps {
  // navigation?: NativeStackNavigationProp<any, any>;
  data: Vehicle[];
}
export default ({
  // navigation,
  data,
}: ListProps) => {
  const { setSelectedId, setSelectedType } = useAppContext();
  return (
    <>
      {(data || []).map(({ name, id }) => (
        <ListItem
          key={id}
          Component={TouchableHighlight}
          onPress={() => {
            setSelectedId(id);
            setSelectedType(dataType.VEHICLE);
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
