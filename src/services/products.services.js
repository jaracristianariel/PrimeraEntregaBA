import { prodModel } from "../model/products.model.js";


export const getProductsService = async ({ limit = 5, page = 1, sort, query }) => {
    try {
        page = page == 0 ? 1 : page;
        page = Number(page);
        limit = Number(limit);
        const s = (page - 1) * limit;
        const sortOrderOp = { "asc": 1, "desc": -1 };
        sort = sortOrderOp[sort] || null;

        try {
            if (query)
                query = JSON.parse(decodeURIComponent(query))
        } catch (error) {
            console.log("first")
            query = {}
        }

        const qProductos = prodModel.find(query).limit(limit).skip(s).lean();
        if (sort !== null) 
            qProductos.sort({price: sort});

        const [productos, totalDoc] = await Promise.all([qProductos, prodModel.countDocuments(query)]);
        const totalPages = Math.ceil(totalDoc/limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const prevPage = hasPrevPage ? page -1 : null;
        const nextPage = hasNextPage ? page +1 : null;
        
        return {
            status: "success/error",
            totalDoc,
            limit,
            query:JSON.stringify(query),
            totalPages,
            hasNextPage,
            hasPrevPage,
            prevPage,
            nextPage,
            payload: productos,
            page,
            prevLink: "",
            nextLink: "",
        }        
    } catch (error) {
        console.log("getProductsService", error);
        throw error;
    }
}
export const getProducByIdService = async (pid) => {
    try {
        return await prodModel.findById(pid);
    } catch (error) {
        console.log("getProducByIdService error", error);
        throw error;
    }
}
export const addProductService = async ({title, description, code, price, status, stock, category, thumbnails}) => {
    try {
        return await prodModel.create({title, description, code, price, status, stock, category, thumbnails})
    } catch (error) {
        console.log("addProductService error", error);
        throw error;
    }
}
export const updateProductService = async (pid, rest) => {
    try {
        return await prodModel.findByIdAndUpdate(pid, {...rest}, {new:true});
    } catch (error) {
        console.log("updateProductService error", error);
        throw error;
    }
}
export const deleteProductService = async (pid) => {
    try {
        return await prodModel.findByIdAndDelete(pid);
    } catch (error) {
        console.log("deleteProductService error", error);
        throw error;
    }
}