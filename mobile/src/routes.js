import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './pages/components/SplashScreen';

import AuthActions from './store/actions/auth';
import Navigation from './services/navigation';

const AppStack = createStackNavigator();

function Routes() {
  const [start, setStart] = useState('');

  const authActions = AuthActions();

  const { generateStateInitial, getIsLoading, updateIsLoading } = authActions;

  useEffect(() => {
    async function handleStart() {
      const isLoading = await getIsLoading();

      if (isLoading === undefined) {
        await generateStateInitial();

        return;
      }

      await updateIsLoading(false);

      setStart(isLoading);
    }
    handleStart();
  }, []);

  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        {start === '' ? (
          <AppStack.Screen name="SplashScreen" component={SplashScreen} />
        ) : (
          <AppStack.Screen
            name="navigation"
            component={Navigation}
            initialParams={{ redirect: 'start' }}
          />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
