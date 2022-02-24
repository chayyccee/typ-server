import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { Omit } from 'lodash';
import ProductModel, { ProductDocument } from "../models/product.model";

export const createProduct = async(input: DocumentDefinition<Omit<ProductDocument, 'createdAt' | 'updatedAt'>>) => {
    return ProductModel.create(input)
}

export const getProduct = async(query: FilterQuery<ProductDocument>, options: QueryOptions ={lean: true}) => {
    return ProductModel.findOne(query, {}, options);
}

export const updateProduct = async(
    query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions
) => {
    return ProductModel.updateOne(query, update, options);
}

export const deleteProduct = async(query: FilterQuery<ProductDocument>) => {
    return ProductModel.deleteOne(query);
}
