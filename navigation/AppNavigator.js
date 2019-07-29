import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { MainNavigator, AuthNavigator, LoadingNavigator } from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      // Authenticate,
      AuthLoading: LoadingNavigator,
      Signin: AuthNavigator,
      Main: MainNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
