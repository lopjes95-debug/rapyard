import { View, Text, Button } from 'react-native'
import { TeaserCard } from '../components/TeaserCard'

export default function TeaserRappers({ navigation }) {
  return (
    <View style={{ padding: 24 }}>
      <TeaserCard title="Rappers" subtitle="Spit bars, join cyphers, and rise through the ranks." />
      <Button title="Next" onPress={() => navigation.navigate('TeaserRoyalties')} />
    </View>
  )
}
