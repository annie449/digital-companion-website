import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './ContactPage.css';

const ContactPage = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [supportHistory, setSupportHistory] = useState([]);
  
  // Load FAQs and support history on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, this would fetch from an API
        // For now, we'll use static data and AsyncStorage for history
        
        const faqData = [
          {
            id: '1',
            question: 'How do I get started with Digital Companion?',
            answer: 'Getting started with Digital Companion is easy. Simply download our app from the App Store, create an account, and follow the guided setup process. You\'ll be asked a few questions about your situation to help us personalize your experience.'
          },
          {
            id: '2',
            question: 'What features are included in the Basic plan?',
            answer: 'The Basic plan (£19.99/month) includes personalized care planning, document storage (5GB), estate management tools, account closure tools, community forum access, resource library, and email support.'
          },
          {
            id: '3',
            question: 'What features are included in the Complete plan?',
            answer: 'The Complete plan (£29.99/month) includes everything in the Basic plan plus unlimited document storage, advanced estate management, priority support, monthly support group sessions, legal document templates, legacy planning tools, and journal & memory features.'
          },
          {
            id: '4',
            question: 'Is my information secure?',
            answer: 'Yes, security is our top priority. We use bank-level encryption to protect your data, and we never share your information with third parties without your explicit consent. All documents are encrypted both in transit and at rest.'
          },
          {
            id: '5',
            question: 'Can I cancel my subscription at any time?',
            answer: 'Yes, you can cancel your subscription at any time with no cancellation fees. You\'ll continue to have access until the end of your current billing period.'
          },
          {
            id: '6',
            question: 'How do I contact support?',
            answer: 'You can contact our support team by email at annie@digitalcompanion.co.uk or by using the contact form in the app or on our website. We aim to respond to all inquiries promptly.'
          },
          {
            id: '7',
            question: 'Is Digital Companion available in my country?',
            answer: 'Digital Companion is currently available in the United Kingdom, with plans to expand to other countries in the future. While users from other countries can access our emotional support resources, the practical guidance is optimized for UK processes and regulations.'
          },
        ];
        
        setFaqs(faqData);
        
        const storedHistory = await AsyncStorage.getItem('supportHistory');
        if (storedHistory) {
          setSupportHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send data to an API
      // For now, we'll simulate an API call with a timeout
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to support history
      const newTicket = {
        id: Date.now().toString(),
        subject: formData.subject,
        message: formData.message,
        date: new Date().toISOString(),
        status: 'Open',
      };
      
      const updatedHistory = [newTicket, ...supportHistory];
      setSupportHistory(updatedHistory);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('supportHistory', JSON.stringify(updatedHistory));
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
      
      Alert.alert(
        'Message Sent',
        'Thank you for contacting us. We\'ll get back to you as soon as possible.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert(
        'Error',
        'There was a problem sending your message. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const toggleFaqExpansion = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const renderContactTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Get in Touch</Text>
        <Text style={styles.sectionSubtitle}>
          Have questions or need assistance? We're here to help. Fill out the form below and our team will get back to you as soon as possible.
        </Text>
        
        <View style={styles.contactInfo}>
          <View style={styles.contactInfoItem}>
            <Icon name="email-outline" size={24} color="#6B5B95" style={styles.contactInfoIcon} />
            <View>
              <Text style={styles.contactInfoLabel}>Email</Text>
              <Text style={styles.contactInfoValue}>annie@digitalcompanion.co.uk</Text>
            </View>
          </View>
          
          <View style={styles.contactInfoItem}>
            <Icon name="account-group-outline" size={24} color="#6B5B95" style={styles.contactInfoIcon} />
            <View>
              <Text style={styles.contactInfoLabel}>Our Team</Text>
              <Text style={styles.contactInfoValue}>Remote team across the UK</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Name*</Text>
            <TextInput
              style={[styles.formInput, errors.name && styles.inputError]}
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Your full name"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Email*</Text>
            <TextInput
              style={[styles.formInput, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="Your email address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Subject*</Text>
            <TextInput
              style={[styles.formInput, errors.subject && styles.inputError]}
              value={formData.subject}
              onChangeText={(text) => handleInputChange('subject', text)}
              placeholder="What is your inquiry about?"
            />
            {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Message*</Text>
            <TextInput
              style={[styles.formInput, styles.textArea, errors.message && styles.inputError]}
              value={formData.message}
              onChangeText={(text) => handleInputChange('message', text)}
              placeholder="Please provide details about your inquiry"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
          </View>
          
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Send Message</Text>
            )}
          </TouchableOpacity>
          
          {submitSuccess && (
            <Animatable.View 
              animation="fadeIn" 
              style={styles.successMessage}
            >
              <Icon name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.successText}>
                Message sent successfully! We'll get back to you soon.
              </Text>
            </Animatable.View>
          )}
        </View>
      </View>
    </View>
  );

  const renderFaqTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.faqSection}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <Text style={styles.sectionSubtitle}>
          Find answers to common questions about Digital Companion and our services.
        </Text>
        
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={24} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search FAQs..."
            placeholderTextColor="#888"
          />
        </View>
        
        <View style={styles.faqList}>
          {faqs.map((faq) => (
            <TouchableOpacity 
              key={faq.id}
              style={[styles.faqItem, expandedFaq === faq.id && styles.expandedFaqItem]}
              onPress={() => toggleFaqExpansion(faq.id)}
              activeOpacity={0.8}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Icon 
                  name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color="#6B5B95" 
                />
              </View>
              
              {expandedFaq === faq.id && (
                <Animatable.View 
                  animation="fadeIn"
                  duration={300}
                  style={styles.faqAnswer}
                >
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </Animatable.View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.stillHaveQuestions}>
          <Text style={styles.stillHaveQuestionsTitle}>Still Have Questions?</Text>
          <Text style={styles.stillHaveQuestionsText}>
            If you couldn't find the answer to your question, please contact our support team.
          </Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => setActiveTab('contact')}
          >
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSupportTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.supportSection}>
        <Text style={styles.sectionTitle}>Support History</Text>
        <Text style={styles.sectionSubtitle}>
          View and track your previous support requests.
        </Text>
        
        {supportHistory.length > 0 ? (
          <View style={styles.supportHistoryList}>
            {supportHistory.map((ticket) => (
              <View key={ticket.id} style={styles.supportTicket}>
                <View style={styles.ticketHeader}>
                  <Text style={styles.ticketSubject}>{ticket.subject}</Text>
                  <View style={[
                    styles.statusBadge,
                    ticket.status === 'Closed' ? styles.closedBadge : styles.openBadge
                  ]}>
                    <Text style={styles.statusText}>{ticket.status}</Text>
                  </View>
                </View>
                
                <Text style={styles.ticketMessage} numberOfLines={2}>
                  {ticket.message}
                </Text>
                
                <View style={styles.ticketFooter}>
                  <Text style={styles.ticketDate}>
                    {new Date(ticket.date).toLocaleDateString()} at {new Date(ticket.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <TouchableOpacity style={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="ticket-outline" size={60} color="#6B5B95" style={styles.emptyStateIcon} />
            <Text style={styles.emptyStateText}>No support history yet</Text>
            <Text style={styles.emptyStateSubtext}>
              When you contact our support team, your requests will appear here.
            </Text>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={() => setActiveTab('contact')}
            >
              <Text style={styles.emptyStateButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#6B5B95" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact & Support</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Icon name="help-circle-outline" size={24} color="#6B5B95" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'contact' && styles.activeTabButton]}
          onPress={() => setActiveTab('contact')}
        >
          <Icon 
            name="email-outline" 
            size={24} 
            color={activeTab === 'contact' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>
            Contact
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'faq' && styles.activeTabButton]}
          onPress={() => setActiveTab('faq')}
        >
          <Icon 
            name="frequently-asked-questions" 
            size={24} 
            color={activeTab === 'faq' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'support' && styles.activeTabButton]}
          onPress={() => setActiveTab('support')}
        >
          <Icon 
            name="ticket-outline" 
            size={24} 
            color={activeTab === 'support' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'support' && styles.activeTabText]}>
            Support
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {activeTab === 'contact' && renderContactTab()}
        {activeTab === 'faq' && renderFaqTab()}
        {activeTab === 'support' && renderSupportTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  helpButton: {
    padding: 8,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#6B5B95',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  activeTabText: {
    color: '#6B5B95',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  
  // Contact Tab Styles
  contactSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  contactInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactInfoIcon: {
    marginRight: 16,
  },
  contactInfoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  contactInfoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formField: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#f44336',
  },
  errorText: {
    color: '#f44336',
    fontSize: 14,
    marginTop: 4,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6B5B95',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: '#a99fc2',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  successText: {
    color: '#4CAF50',
    fontSize: 14,
    marginLeft: 8,
  },
  
  // FAQ Tab Styles
  faqSection: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  faqList: {
    marginBottom: 24,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  expandedFaqItem: {
    borderColor: '#6B5B95',
    borderWidth: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    paddingRight: 16,
  },
  faqAnswer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  faqAnswerText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  stillHaveQuestions: {
    backgroundColor: '#f0edf6',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stillHaveQuestionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  stillHaveQuestionsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#6B5B95',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Support Tab Styles
  supportSection: {
    marginBottom: 24,
  },
  supportHistoryList: {
    marginBottom: 24,
  },
  supportTicket: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ticketSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    paddingRight: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  openBadge: {
    backgroundColor: '#e3f2fd',
  },
  closedBadge: {
    backgroundColor: '#e8f5e9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  ticketMessage: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  ticketDate: {
    fontSize: 12,
    color: '#888',
  },
  viewDetailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0edf6',
    borderRadius: 4,
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B5B95',
  },
  
  // Empty State Styles
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateIcon: {
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: '#6B5B95',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});

export default ContactPage;
