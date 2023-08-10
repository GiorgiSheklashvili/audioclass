import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PaywallScreenRouteProp } from '../navigation/Navigation';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import Purchases from 'react-native-purchases';
import useRevenueCat from '../hooks/useRevenuecat';

type PaywallScreenProps = {
  route: PaywallScreenRouteProp;
};

useEffect(() => {
  const fetchData = async () => {
    try{
      const offerings = await Purchases.getOfferings();
    } catch(e) {
      console.log(e);
    }
  }
  fetchData().catch(console.error);
}, [])


export const PaywallScreen = ({ route }: PaywallScreenProps) => {
    const [premium, setPremium] = useState(true);  
    const navigation = useNavigation();
    const { currentOffering } = useRevenueCat();
    if (!currentOffering){
      return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E5962D" />
      </View>
      );
    }

    const handleAnnualPurchase = async () => {
      if(!currentOffering?.annual) return;
      try{
        const purchaserInfo = await Purchases.purchasePackage(currentOffering.annual);
        console.log(purchaserInfo);
        console.log("Annual sub purchased >>", purchaserInfo.customerInfo.entitlements.active);

        if(purchaserInfo.customerInfo.entitlements.active.pro){
          navigation.goBack();
        }
      } catch(error){
        console.log(error);
      }
    }

    const handleMonthlyPurchase = async () => {
      if(!currentOffering?.monthly) return;
      try{
        const purchaserInfo = await Purchases.purchasePackage(currentOffering.monthly);
        console.log(purchaserInfo);
        console.log("Monthly sub purchased >>", purchaserInfo.customerInfo.entitlements.active);

        if(purchaserInfo.customerInfo.entitlements.active.pro){
          navigation.goBack();
        }
      } catch(error){
        console.log(error);
      }
    }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Upgrade
        </Text>
        <Text style={styles.headerSubtitle}>
          Upgrade to Pro to Access all the Courses
        </Text>
      </View>

      {/* content */}
      <View style={styles.contentContainer}>
        <View style={styles.contentRow}>
          <View style={styles.contentIcon}>
            <Icon name="md-key" size={32} color="#E5962D" />
          </View>
          <View style={styles.contentTextContainer}>
            <Text style={styles.contentTitle}>
              Access to all courses
            </Text>
            <Text style={styles.contentSubtitle}>
              Upgrade to premium version of the app and enjoy all the courses available only to pro users.
            </Text>
          </View>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.contentIcon}>
            <Icon name="md-person-add-outline" size={32} color="#E5962D" /> 
          </View>
          <View style={styles.contentTextContainer}>
            <Text style={styles.contentTitle}>
              Helpline 24/7
            </Text> 
            <Text style={styles.contentSubtitle}>
              Get unlimited access to our support team and get help anytime you need.
            </Text> 
          </View>
        </View>

        <View style={styles.logoContainer}> 
          <MaterialCommunityIcons name="trophy-award" size={150} color="#E5962D" />
        </View> 
        
        <TouchableOpacity onPress={navigation.goBack} style={styles.closeButton} >
          <Icon name="md-close-circle-sharp" size={32} color="#E5962D" />
        </TouchableOpacity>

        {/* Monthly Subscribe */} 
        <TouchableOpacity style={styles.subscribeButton} onPress={handleMonthlyPurchase}> 
          <Text style={styles.subscribeButtonText}> {currentOffering.monthly?.product.priceString} per month </Text> 
        </TouchableOpacity> 

        {/* Annual Subscribe */} 
        <TouchableOpacity style={styles.subscribeButton} onPress={handleAnnualPurchase}> 
          <Text style={styles.subscribeButtonText}> {currentOffering.annual?.product.priceString} per year </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2F44',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1A2F44',
    padding: 2.5,
  },
  headerContainer: {
    margin: 10,
    marginTop: 20,
    marginBottom: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  contentContainer: {
    margin: 10,
    marginTop: 20,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentIcon: {
    flex: 1,
  },
  contentTextContainer: {
    flex: 9,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  contentSubtitle: {
    fontSize: 14,
    fontWeight: '300',
    color: 'white',
  },
  logoContainer: {
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -90,
    right: 0,
    padding: 5,
  },
  subscribeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 30,
    color: '#E5962D',
    paddingTop: 1.25,
    paddingBottom: 1.25,
    paddingLeft: 2.5,
    paddingRight: 2.5,
    marginLeft: 2.5,
    marginRight: 2.5,
    backgroundColor: "#E5962D",
  },
  subscribeButtonText: {
    marginBottom: 0.25, 
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  monthlySubscribeButton: {
    backgroundColor: '#E5962D',
  },
  yearlySubscribeButton: {
    backgroundColor: '#3C3C3C',
  },
});
