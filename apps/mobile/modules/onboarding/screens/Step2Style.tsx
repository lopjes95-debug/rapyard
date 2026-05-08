import { View, Text, Button } from 'react-native'
import { StyleTag } from '../components/StyleTag'
import { useOnboardingState } from '../hooks/useOnboardingState'

const TAGS = ['Hardcore','Freestyle','Old School','Trap','Boom Bap','Underground','Battle Rap','Drill','Lo-Fi','East Coast','West Coast','UK Rap','Grime','Experimental','Conscious']

export default function Step2Style({ navigation }) {
  const { styles, toggleStyle } = useOnboardingState()

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ opacity: 0.6 }}>STEP 2 OF 3</Text>
      <Text style={{ fontSize: 32, fontWeight: '800', marginBottom: 6 }}>Your Style</Text>
      <Text style={{ opacity: 0.7, marginBottom: 24 }}>Pick the sounds that move you</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {TAGS.map((tag) => (
          <StyleTag key={tag} label={tag} selected={styles.includes(tag)} onPress={() => toggleStyle(tag)} />
        ))}
      </View>

      <Text style={{ opacity: 0.6, marginTop: 12 }}>{styles.length} selected</Text>

      <Button title="Continue" onPress={() => navigation.navigate('Step3')} disabled={styles.length === 0} />
    </View>
  )
}
