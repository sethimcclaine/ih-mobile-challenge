import { ListItem as LItem } from '@rneui/themed';
import React from 'react';

interface childrenComponent {
  children: React.ReactNode;
}

export const ListItem = LItem;

interface listItemContentProps extends childrenComponent {
  long?: boolean;
}
export const ListItemContent = ({ children, long }: listItemContentProps) => (
  <LItem.Content
    style={{
      marginTop: long ? undefined : -12,
      marginBottom: long ? undefined : -12,
    }}
  >
    {children}
  </LItem.Content>
);

export const ListItemFilmTitle = ({ children }: childrenComponent) => (
  <LItem.Title
    style={{
      fontWeight: 'bold',
      fontSize: 18,
    }}
  >
    {children}
  </LItem.Title>
);
export const ListItemTitle = ({ children }: childrenComponent) => (
  <LItem.Title style={{}}>{children}</LItem.Title>
);

export const ListItemSubtitle = ({ children }: childrenComponent) => (
  <LItem.Subtitle>{children}</LItem.Subtitle>
);
