import { View, Text, Button } from 'react-native'
import { TeaserCard } from '../components/TeaserCard'

export default function TeaserProducers({ navigation }) {
  return (
    <View style={{ padding: 24 }}>
      <TeaserCard title="Producers" subtitle="Discover beats, collaborate, and build your sound." />
      <Button title="Next" onPress={() => navigation.navigate('TeaserRappers')} />
    </View>
  )
}
