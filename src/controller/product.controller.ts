import { Request, Response } from "express";
import { createProductInput, deleteProductInput, getProductInput, updateProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../service/product.service";

export const createProductHandler = async (req: Request<{}, {}, createProductInput['body']>, res: Response) => {
    const userId = res.locals.user._id;

    const body = req.body;

    const product = await createProduct({...body, user: userId});

    return res.status(201).send(product);
}

export const updateProductHandler = async (req: Request<updateProductInput['params']>, res: Response) => {
    const userId = res.locals.user._id;

    const productId = req.params.productId;
    const update = req.body;

    const product = await getProduct({_id: productId, user: userId});

    if (!product) {
        return res.status(404).send('Product not found');
    }

    if (product.user.toString() !== userId.toString()) {
        return res.status(403).send('Forbidden');
    }

    const updatedProduct = await updateProduct({_id: productId, user: userId}, update, {new: true});

    return res.status(200).send(updatedProduct);
}

export const getProductHandler = async (req: Request<getProductInput['params']>, res: Response) => {
    const productId = req.params.productId;
    const product = await getProduct({productId});

    if (!product) {
        return res.status(404).send('Product not found');
    }

    return res.status(200).send(product);
}

export const deleteProductHandler = async (req: Request<deleteProductInput['params']>, res: Response) => {
    const userId = res.locals.user._id;

    const productId = req.params.productId;

    const product = await getProduct({_id: productId, user: userId});

    if (!product) {
        return res.status(404).send('Product not found');
    }

    if (product.user.toString() !== userId.toString()) {
        return res.status(403).send('Forbidden');
    }

    await deleteProduct({_id: productId});

    return res.sendStatus(204);
}