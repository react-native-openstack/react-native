import React from 'react';
import {RecoilRoot} from 'recoil';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from '@/ui/navigation/RootNavigation';

function App() {
  return (
    <GestureHandlerRootView>
      <RecoilRoot>
        <RootNavigation />
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}

export default App;
