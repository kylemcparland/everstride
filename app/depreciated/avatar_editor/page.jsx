import AvatarEditor from 'components/AvatarEditor.js'
import NavBar from '@/components/NavBar';
import { fetchItemsByType } from 'app/helpers/itemHelpers.js';

export default async function AvatarEditorPage() {
  const allHats = await fetchItemsByType('hat');
  const allShirts = await fetchItemsByType('shirt');
  const allPants = await fetchItemsByType('pants');
  const allBoots = await fetchItemsByType('boots');
  const allWeapons = await fetchItemsByType('weapon');

  return (
    <div>
      <NavBar />
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