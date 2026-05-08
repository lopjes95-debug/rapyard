import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

const cinematic = [
  { title: 'The YardGate', subtitle: 'The industrial entrance to the RapYard universe.' },
  { title: 'Cinematic vs Iconic', subtitle: 'A mythic world built with gritty realism.' },
  { title: 'Gate Opens', subtitle: 'Light floods in. The arena wakes.' },
  { title: 'The Cypher Pit', subtitle: 'Where rappers sharpen steel with steel.' },
  { title: 'Beat Stations', subtitle: 'Producers crafting heat and flipping samples.' },
  { title: 'Workshop Zone', subtitle: 'Creators refining tapes and leveling up.' },
  { title: 'The Yard Revealed', subtitle: 'A full industrial arena of creators and fans.' },
  { title: 'The RapYard System', subtitle: 'Battles, Cyphers, Mixtapes, Producers, Royalties.' },
]

export default function IntroGate({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#050505' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 80, paddingBottom: 60 }}>
        <Text style={{ fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: '#777', marginBottom: 8 }}>
          Enter the Yard
        </Text>

        <Text style={{ fontSize: 44, fontWeight: '900', marginBottom: 10 }}>
          The YardGate
        </Text>

        <Text style={{ fontSize: 18, opacity: 0.8, marginBottom: 36 }}>
          A cinematic universe built for creators — gritty, industrial, alive with energy.
        </Text>

        {cinematic.map((item) => (
          <View key={item.title} style={{ backgroundColor: '#111', borderRadius: 18, padding: 22, marginBottom: 20, borderWidth: 1, borderColor: '#222' }}>
            <Text style={{ fontSize: 26, fontWeight: '800', marginBottom: 6 }}>{item.title}</Text>
            <Text style={{ fontSize: 15, opacity: 0.8 }}>{item.subtitle}</Text>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => navigation.replace('Step1')}
          style={{ marginTop: 24, backgroundColor: '#FFD700', borderRadius: 999, paddingVertical: 16, alignItems: 'center' }}
        >
          <Text style={{ color: '#000', fontWeight: '800', fontSize: 16 }}>Choose Your Lane</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('SignIn')} style={{ marginTop: 18, alignItems: 'center' }}>
          <Text style={{ color: '#888', fontSize: 14 }}>Already in the Yard — Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
