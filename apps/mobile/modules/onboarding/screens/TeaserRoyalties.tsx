import { View, Text, Button } from 'react-native'
import { TeaserCard } from '../components/TeaserCard'

export default function TeaserRoyalties({ navigation }) {
  return (
    <View style={{ padding: 24 }}>
      <TeaserCard title="Royalties" subtitle="Earn from plays, battles, and mixtape performance." />
      <Button title="Enter the Yard" onPress={() => navigation.replace('Home')} />
    </View>
  )
}
