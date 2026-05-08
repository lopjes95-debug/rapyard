import { View, Text, Button } from 'react-native'
import { TeaserCard } from '../components/TeaserCard'

export default function TeaserBattles({ navigation }) {
  return (
    <View style={{ padding: 24 }}>
      <TeaserCard title="Battle Arena" subtitle="1v1 battles. Live voting. Rank up and earn your spot." />
      <Button title="Next" onPress={() => navigation.navigate('TeaserMixtapes')} />
    </View>
  )
}
