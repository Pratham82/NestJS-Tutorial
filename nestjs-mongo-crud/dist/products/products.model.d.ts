import * as mongoose from 'mongoose';
export declare const ProductSchema: mongoose.Schema<mongoose.Document<any>, mongoose.Model<mongoose.Document<any>>, undefined>;
export interface Product extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;
}
