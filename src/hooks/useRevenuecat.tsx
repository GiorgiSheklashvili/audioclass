import { useEffect, useState } from "react"; 
import { Platform } from "react-native"; 
import Purchases, { CustomerInfo, PurchasesOffering } from "react-native-purchases";


// const APIKeys = { apple: "appl_uRHu0KbySNJDCbnEqdhNxDkMFo", google: "goog_COqTiYcFnojfUtsHSHjXWsNxIhb" }; 

const typesOfMembership = { monthly: "proMonthly", yearly: "proYearly" }
 
function useRevenueCat() {
    const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null); 
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null); 
    const isProMember = 
        customerInfo?.activeSubscriptions.includes(typesOfMembership.monthly) || 
        customerInfo?.activeSubscriptions.includes(typesOfMembership.yearly);

        useEffect(() => {
            const fetchData = async () => {
            // Purchases.setDebugLogsEnabled(true); 

            // if (Platform.OS == "android") { 
            //     await Purchases.configure({ apiKey: APIKeys.google})
            // } else {
            //     await Purchases.configure({ apiKey: APIKeys.apple })
            // }
            const offerings = await Purchases.getOfferings(); 
            const localCustomerInfo = await Purchases.getCustomerInfo();
            setCustomerInfo(localCustomerInfo);
            setCurrentOffering(offerings.current);
        };
            fetchData().catch(console.error)
        }, []); 
        
        useEffect(() => {
        const customerInfoUpdated = (purchaserInfo: CustomerInfo) => { 
            console.log('shemovida useRevenuecat addCustomerInfoUpdateListenershi');
            setCustomerInfo(purchaserInfo); 
        }; 
        Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
    }, []);
    
    return {currentOffering, customerInfo, isProMember };
    
}
export default useRevenueCat; 
