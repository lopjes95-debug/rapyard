import { View, Text, Button } from 'react-native'
import { MicVisualizer } from '../components/MicVisualizer'
import { useMicCheck } from '../hooks/useMicCheck'
import { useOnboardingState } from '../hooks/useOnboardingState'

export default function Step3MicCheck({ navigation }) {
  const active = useMicCheck()
  const { setMicReady } = useOnboardingState()

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ opacity: 0.6 }}>STEP 3 OF 3</Text>
      <Text style={{ fontSize: 32, fontWeight: '800', marginBottom: 6 }}>Mic Check</Text>
      <Text style={{ opacity: 0.7, marginBottom: 24 }}>Make sure you're heard in the Yard</Text>

      <MicVisualizer active={active} />

      <Text style={{ color: active ? '#00FF7F' : '#666', marginBottom: 24 }}>
        {active ? 'Mic is hot' : 'Listening...'}
      </Text>

      <Button
        title="Continue"
        onPress={() => {
          setMicReady(true)
          navigation.navigate('TeaserBattles')
        }}
      />
    </View>
  )
}
