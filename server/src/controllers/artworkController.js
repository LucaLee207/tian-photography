import { createArtworkService, deleteArtworkService, getAllArtworksService, getArtworkByIdService, updateArtworkService, orderArtworksService } from "../model/artworkModel.js";

const handleResponse = (res, status, message, data=null) => {
    res.status(status).json({
        status,
        message, 
        data,
    });
};

export const createArtwork = async (req, res, next) =>{
    const {position, url, category, fileName, width, height} = req.body;
    try {
        const newArtwork = await createArtworkService(position, url, category, fileName, width, height);
        handleResponse(res, 201, "Artwork created successfully", newArtwork);
    } catch (err) {
        next(err);
    };
};

export const getAllArtworks = async (req, res, next) =>{
    try {
        const newArtwork = await getAllArtworksService();
        handleResponse(res, 200, "All artworks fetched successfully", newArtwork);
    } catch (err) {
        next(err);
    };
};
export const getArtworkById = async (req, res, next) =>{
    try {
        const artwork = await getArtworkByIdService(req.params.id);
        if (!artwork) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "Artwork fetched successfully", artwork);
    } catch (err) {
        next(err);
    };
};
// export const updateArtwork = async (req, res, next) =>{
//     const { url} = req.body;
//     try {
//         const updatedArtwork = await updateArtworkService(req.params.id, url);
//         handleResponse(res, 200, "Artwork updated successfully", updatedArtwork);
//     } catch (err) {
//         next(err);
//     };
// };

export const deleteArtwork = async (req, res, next) =>{
    try {
        const findArtwork = await getArtworkByIdService(req.params.id);
        if (!findArtwork) return handleResponse(res, 404, "Artwork not found");
        const deletedArtwork = await deleteArtworkService(req.params.id);
        handleResponse(res, 200, "Artwork deleted successfully", deletedArtwork);
    } catch (err) {
        next(err);
    };
};

export const orderArtworks = async (req, res, next) =>{
    try {
        const orderedArtworks = await orderArtworksService(req.body);
        handleResponse(res, 200, "Artwork order updated successfully", orderedArtworks);
    } catch (err) {
        next(err);
    };
};