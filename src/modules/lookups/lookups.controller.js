import { BED_TYPES_AR } from '../../../database/BedTypes.data.js';
import { chaletModel } from '../chalet/chalet.model.js';
import { cityModel } from '../city/city.model.js';
import { villageModel } from '../village/village.model.js';


export const getBedTypes = async (req, res, next) =>{
    return res.status(200).json({
        success: true,
        data: BED_TYPES_AR
    })
}

export const getStats = async (req, res, next) => {
    try {
        const [chaletsCount, citiesCount, villagesCount] = await Promise.all([
            chaletModel.countDocuments(),
            cityModel.countDocuments(),
            villageModel.countDocuments()
        ]);
        return res.status(200).json({
            success: true,
            data: { chalets: chaletsCount, cities: citiesCount, villages: villagesCount }
        });
    } catch (err) {
        next(err);
    }
};


export const getLookups = async (req, res, next) => {
    try {
        const [cities, villages, chalets] = await Promise.all([
            cityModel.find().select('_id name'),
            villageModel.find().select('_id name'),
            chaletModel.find().select('_id name')
        ]);
        return res.status(200).json({
            success: true,
            data: { cities, villages, chalets }
        });
    } catch (err) {
        next(err);
    }
}