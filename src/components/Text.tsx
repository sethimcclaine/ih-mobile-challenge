import { Text, TextProps } from '@rneui/themed';
import React from 'react';

export enum variants {
  TITLE = 'title',
  STANDARD = 'standard',
  BOLD = 'bold',
  ERROR = 'error',
}

interface textProps extends TextProps {
  variant?: variants;
  children: React.ReactNode;
}

const VARIANTS = {
  [variants.TITLE]: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  [variants.BOLD]: {
    fontWeight: 'bold',
  },
  [variants.ERROR]: {
    color: 'red',
  },
} as { [key in variants]: any };

//NOTE: passing `style` will overwrite `variant` if both are presented

export default ({ variant, children, ...props }: textProps) => (
  <Text
    style={{
      ...VARIANTS[variant || variants.STANDARD],
    }}
    {...props}
  >
    {children}
  </Text>
);
