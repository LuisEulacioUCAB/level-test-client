import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Extends props.
 *
 * @param {ButtonProps} Props - Button props.
 */
interface CustomButtonsPros extends ButtonProps {
  isLoading?: boolean | undefined;
}

export const Loading: React.FC = () => (
  <Box marginRight={2} display="flex" alignItems="center">
    <CircularProgress size={18} color="primary" />
  </Box>
);

export const ButtonDefault: React.FC<CustomButtonsPros> = ({
  children,
  size = 'large',
  isLoading,
  disabled,
  ...rest
}) => (
  <Button
    {...rest}
    disabled={isLoading || disabled}
    disableElevation
    size={size}>
    {isLoading && <Loading />}
    {children}
  </Button>
);
