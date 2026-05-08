import { View, Text, Button } from 'react-native'
import { TeaserCard } from '../components/TeaserCard'

export default function TeaserMixtapes({ navigation }) {
  return (
    <View style={{ padding: 24 }}>
      <TeaserCard title="Mixtape Builder" subtitle="Compile your best tracks and drop your Yard Tape." />
      <Button title="Next" onPress={() => navigation.navigate('TeaserProducers')} />
    </View>
  )
}
