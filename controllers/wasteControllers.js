import Waste from "../models/Waste.js";

export const submitWaste = async (req,res) => {
    try {
        const { category, type, quantity, address, latitude, longitude } = req.body;

        let photoUrl = null;
        if(req.file) {
            photoUrl = `/uploads/${req.file.filename}`;
        }

        const newWaste = new Waste({
            category,
            type,
            quantity,
            photoUrl,
            location: {latitude,longitude},
            address
        });

        await newWaste.save();
        res.status(201).json({success:true, data:newWaste});

    } catch(err) {
        res.status(500).json({success:false, message:err.message});
    }
};

export const getWaste = async (req, res) => {
    try{
        const wastes = (await Waste.find()).toSorted({date:-1});
        res.json({success:true, data:wastes});
    } catch(err) {
        res.status(500).json({success:false, message:err.message});
    }
};