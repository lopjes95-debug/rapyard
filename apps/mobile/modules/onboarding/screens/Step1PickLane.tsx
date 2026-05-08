import { View, Text, Button } from 'react-native'
import { LaneCard } from '../components/LaneCard'
import { useOnboardingState } from '../hooks/useOnboardingState'

export default function Step1PickLane({ navigation }) {
  const { lane, setLane } = useOnboardingState()

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ opacity: 0.6 }}>STEP 1 OF 3</Text>
      <Text style={{ fontSize: 32, fontWeight: '800', marginBottom: 6 }}>Pick Your Lane</Text>
      <Text style={{ opacity: 0.7, marginBottom: 24 }}>Who are you in the Yard</Text>

      <LaneCard title="Rapper" description="Spit bars, drop tracks, run battles" selected={lane === 'rapper'} onPress={() => setLane('rapper')} />
      <LaneCard title="Producer" description="Build beats, sell heat, run the sound" selected={lane === 'producer'} onPress={() => setLane('producer')} />
      <LaneCard title="Listener" description="Discover talent, cast votes, feel the energy" selected={lane === 'listener'} onPress={() => setLane('listener')} />

      <Button title="Continue" onPress={() => navigation.navigate('Step2')} disabled={!lane} />
    </View>
  )
}
