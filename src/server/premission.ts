import { getProductCount } from "./db/products";
import { getUserSubscription } from "./db/subScriptions"

export async function canRemoveBranding(userId: string | null) {
if ( userId == null) {
    return false
}
const tier = await getUserSubscription(userId)
return tier.canRemoveBranding;

} 


export async function canCustomizeBanner(userId: string | null) {
if ( userId == null) {
    return false
}
const tier = await getUserSubscription(userId)
return tier.canCustomizeBanner; 

} 


export async function canAccessAnalytics(userId: string | null) {
if ( userId == null) {
    return false
}
const tier = await getUserSubscription(userId)
return tier.canAccessAnalytics; 

} 


export async function canCreateProduct(userId: string | null ) { 

    if ( userId == null) {
    return false
}
const tier = await getUserSubscription(userId)

const productCount  = await getProductCount(userId)
return  productCount <  tier.maxNumberOfProducts  
}
