// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client'

const GET_LOCATIONS = gql`
  query Classes($level: IntFilter) {
    classes {
      name
      spellcasting {
        spellcasting_ability {
          name
        }
      }
      spells(level: $level) {
        name
        desc
      }
      class_levels {
        spellcasting {
          cantrips_known
          spell_slots_level_1
          spell_slots_level_2
          spell_slots_level_3
          spell_slots_level_4
          spell_slots_level_5
          spell_slots_level_6
          spell_slots_level_7
          spell_slots_level_8
          spell_slots_level_9
          spells_known
        }
      }
    }
  }
`
function DisplaySpells() {
  const { loading, error, data } = useQuery(GET_LOCATIONS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return data.classes.map(({ name, spellcasting, spells }) => (
    <div key={name}>
      <h3>{name}</h3>
      <b>Spellcasting:</b>
      {spellcasting?.spellcasting_ability.name}
      <br />
      <b>Spells</b>
      {spells.map(({ name, desc }, index) => (
        <div key={index}>
          <b>{name}</b>
          <p>{desc}</p>
        </div>
      ))}
      <br />
    </div>
  ))
}

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplaySpells />
    </div>
  )
}
