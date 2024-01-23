import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { AuthPage } from "./pages/Auth/Auth";
import { ChatPage } from "./pages/Chat/Chat";
import {MessagingPage} from "./pages/Message/Message";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth">
              <Stack.Screen name="Auth" component={AuthPage} />
              <Stack.Screen name="Chat" component={ChatPage} />
              <Stack.Screen name='Messaging' component={MessagingPage} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
