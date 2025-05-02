import { villageModel } from "../../../database/models/village.model.js";
import { chaletModel } from "../../../database/models/chalet.model.js";
import { removeImage } from "../services/removefile.js"

import path from 'path';


// Delete all villages and chalets under a specific city ID
export const deleteVillagesAndChaletsByCityId = async (cityId) => {
    // Remove villages and their images
    const villages = await villageModel.find({ city: cityId });
    for (const v of villages) {
      await removeImage('village', path.basename(v.img));
      await villageModel.findByIdAndDelete(v._id);
    }
  
    // Remove chalets and their images
    const chalets = await chaletModel.find({ city: cityId });
    for (const c of chalets) {
      await removeImage('chalet', path.basename(c.mainImg));
      c.imgs.forEach(fn => removeImage('chalet', path.basename(fn)));
      await chaletModel.findByIdAndDelete(c._id);
    }
  };
  
  // Delete all chalets under a specific village ID
  export const deleteChaletsByVillageId = async (villageId) => {
    const chalets = await chaletModel.find({ village: villageId });
    for (const c of chalets) {
      await removeImage('chalet', path.basename(c.mainImg));
      c.imgs.forEach(fn => removeImage('chalet', path.basename(fn)));
      await chaletModel.findByIdAndDelete(c._id);
    }
  };
  