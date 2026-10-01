import { productConfig as source } from '@product-config';
import type { ProductConfig } from '@/types/product';

/**
 * Runtime-facing product configuration. Values live in `.impeccable/config/product.config.ts`;
 * this module only widens them to the `ProductConfig` contract the app is written against.
 */
export const productConfig: ProductConfig = source;
