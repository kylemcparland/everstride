import AvatarEditor from 'components/AvatarEditor.js'
import { fetchItemsByType } from 'app/helpers/itemHelpers.js';

export default async function AvatarEditorPage() {
  const allHats = await fetchItemsByType('hat');
  console.log(allHats)
  const allShirts = await fetchItemsByType('shirt');
  const allPants = await fetchItemsByType('pants');
  const allBoots = await fetchItemsByType('boots');
  const allWeapons = await fetchItemsByType('weapon');


  return (
    <div>
      <AvatarEditor
        hats={allHats}
        shirts={allShirts}
        pants={allPants}
        boots={allBoots}
        weapons={allWeapons}
      />
    </div>
  );
}