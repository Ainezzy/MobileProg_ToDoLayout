import ParallaxScrollView from '@/components/ParallaxScrollView';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';


export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}
      headerImage={
        <Text style={styles.headerText}>
          TO DO LIST
        </Text>
      }
      >

              
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#292929',
    display: 'flex',

  }
});
