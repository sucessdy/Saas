export async function canRemoveBranding(userId: string | null) {
if ( userId == null) {
    return false
}
const tier = await getUserSubscription(userId)

} 