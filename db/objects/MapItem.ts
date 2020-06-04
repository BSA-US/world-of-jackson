import {
  Zone,
  Lot,
  Building
} from '~/db/objects'

export const all = [
  ...Zone.all,
  ...Lot.all,
  ...Building.all
]

export default {
  all
}
