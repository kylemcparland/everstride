import Avatar from "@/components/Avatar"
import { fetchUserByName } from "../helpers/userHelpers"
import { fetchEquippedHat, fetchEquippedShirt, fetchUserColour } from "../helpers/equippedItemHelpers"


const equipmentTest = async () => {

  const user = await fetchUserByName("Ben Hallam")
  const hat = await fetchEquippedHat(user.id)
  const shirt = await fetchEquippedShirt(user.id)
  

  return (
    <div>
      <Avatar 
      hat={hat}
      shirt={shirt}
      />
    </div>
  )
}

export default equipmentTest;