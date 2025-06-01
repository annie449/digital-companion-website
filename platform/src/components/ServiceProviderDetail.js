import React, { useContext, useState, useEffect } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import { SelfCareContext } from '../context/SelfCareContext';
import './ServiceProviderDetail.css';

function ServiceProviderDetail({ providerId }) {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const { saveResource } = useContext(SelfCareContext);
  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  
  // Mock service providers data (would be fetched from API in production)
  const mockServiceProviders = [
    {
      id: 'service-001',
      name: 'Smith & Partners Legal Services',
      category: 'legal',
      description: 'Specializing in probate and estate administration with compassionate service.',
      longDescription: 'Smith & Partners Legal Services has been providing expert legal assistance for probate and estate administration for over 25 years. Our team of compassionate solicitors understands the challenges faced during bereavement and offers personalized guidance through the legal process. We specialize in will execution, inheritance tax planning, estate disputes, and asset distribution.',
      location: 'London',
      address: '123 High Street, London, EC1V 7BD',
      rating: 4.8,
      reviewCount: 124,
      verified: true,
      contact: {
        phone: '020-1234-5678',
        email: 'info@smithpartners.co.uk',
        website: 'https://www.smithpartners.co.uk'
      },
      services: [
        'Probate Application',
        'Estate Administration',
        'Will Execution',
        'Inheritance Tax Planning',
        'Estate Disputes',
        'Asset Distribution'
      ],
      qualifications: [
        'Solicitors Regulation Authority Registered',
        'Law Society Accredited',
        'STEP (Society of Trust and Estate Practitioners) Members'
      ]
    },
    {
      id: 'service-002',
      name: 'Grief Support Network',
      category: 'grief',
      description: 'Professional counseling and support groups for those experiencing loss.',
      longDescription: 'Grief Support Network provides professional counseling and group support for individuals navigating the journey of grief and loss. Our network of certified grief counselors offers both one-on-one sessions and facilitated group meetings in a safe, compassionate environment. We believe in a holistic approach to grief support that acknowledges the emotional, physical, and spiritual dimensions of the grieving process.',
      location: 'London',
      address: '45 Comfort Lane, London, NW1 6QL',
      rating: 4.9,
      reviewCount: 89,
      verified: true,
      contact: {
        phone: '020-2345-6789',
        email: 'support@griefsupport.org',
        website: 'https://www.griefsupport.org'
      },
      services: [
        'Individual Grief Counseling',
        'Group Support Sessions',
        'Online Support Communities',
        'Grief Education Workshops',
        'Family Support Services',
        'Referrals to Specialized Services'
      ],
      qualifications: [
        'British Association for Counselling and Psychotherapy Accredited',
        'Certified Grief Counselors',
        'National Counselling Society Registered'
      ]
    },
    {
      id: 'service-003',
      name: 'Financial Futures Advisory',
      category: 'financial',
      description: 'Specialized financial planning and advice for estate management and inheritance.',
      longDescription: 'Financial Futures Advisory provides expert financial guidance specifically tailored for estate management, inheritance planning, and post-bereavement financial reorganization. Our team of certified financial advisors understands the unique challenges that arise when managing finances after a loss. We offer clear, compassionate advice to help you make informed decisions during difficult times.',
      location: 'Manchester',
      address: '78 Prosperity Road, Manchester, M1 5QR',
      rating: 4.7,
      reviewCount: 56,
      verified: true,
      contact: {
        phone: '0161-345-6789',
        email: 'info@financialfutures.co.uk',
        website: 'https://www.financialfutures.co.uk'
      },
      services: [
        'Estate Financial Planning',
        'Inheritance Tax Advice',
        'Investment Management',
        'Pension Review',
        'Insurance Assessment',
        'Long-term Financial Planning'
      ],
      qualifications: [
        'Financial Conduct Authority Regulated',
        'Chartered Financial Planners',
        'Certified Financial Planners (CFP)'
      ]
    },
    {
      id: 'service-004',
      name: 'Peaceful Transitions Funeral Services',
      category: 'funeral',
      description: 'Compassionate funeral planning and services with personalized options.',
      longDescription: 'Peaceful Transitions offers compassionate, personalized funeral and memorial services designed to honor and celebrate the unique life of your loved one. Our experienced team guides you through every aspect of planning, from traditional services to contemporary celebrations of life. We handle all details with dignity and respect, allowing you to focus on your personal journey of remembrance and healing.',
      location: 'Birmingham',
      address: '210 Serenity Avenue, Birmingham, B1 2JT',
      rating: 4.9,
      reviewCount: 112,
      verified: true,
      contact: {
        phone: '0121-456-7890',
        email: 'care@peacefultransitions.co.uk',
        website: 'https://www.peacefultransitions.co.uk'
      },
      services: [
        'Traditional Funeral Services',
        'Contemporary Celebrations of Life',
        'Pre-planning Services',
        'Cremation Services',
        'Memorial Design',
        'Grief Support Referrals'
      ],
      qualifications: [
        'National Association of Funeral Directors Member',
        'The Good Funeral Guide Recommended',
        'National Society of Allied and Independent Funeral Directors'
      ]
    },
    {
      id: 'service-005',
      name: 'Estate Solutions',
      category: 'estate',
      description: 'Comprehensive estate administration and property management services.',
      longDescription: 'Estate Solutions provides comprehensive estate administration and property management services to simplify the complex process of managing a loved one's estate. Our team handles everything from property clearance and maintenance to asset valuation and distribution. We work closely with legal and financial advisors to ensure all aspects of estate administration are handled efficiently and with respect.',
      location: 'London',
      address: '33 Legacy Court, London, E14 9TS',
      rating: 4.6,
      reviewCount: 78,
      verified: false,
      contact: {
        phone: '020-3456-7891',
        email: 'info@estatesolutions.co.uk',
        website: 'https://www.estatesolutions.co.uk'
      },
      services: [
        'Property Clearance',
        'Asset Inventory and Valuation',
        'Property Maintenance',
        'Estate Sale Management',
        'Document Organization',
        'Coordination with Legal Services'
      ],
      qualifications: [
        'Property Ombudsman Registered',
        'Association of Professional Inventory Providers',
        'National Association of Estate Agents'
      ]
    },
    {
      id: 'service-006',
      name: 'Compassionate Legal Aid',
      category: 'legal',
      description: 'Affordable legal assistance for probate and inheritance matters.',
      longDescription: 'Compassionate Legal Aid offers accessible, affordable legal assistance for probate and inheritance matters, ensuring that everyone has access to quality legal support during difficult times. Our team of solicitors and legal advisors provides clear guidance through the probate process, helping to minimize stress and confusion. We offer flexible payment options and transparent pricing to accommodate various financial situations.',
      location: 'Manchester',
      address: '56 Justice Way, Manchester, M4 2PL',
      rating: 4.5,
      reviewCount: 42,
      verified: true,
      contact: {
        phone: '0161-567-8901',
        email: 'help@compassionatelegal.org',
        website: 'https://www.compassionatelegal.org'
      },
      services: [
        'Probate Application Assistance',
        'Will Interpretation',
        'Inheritance Disputes',
        'Deed of Variation',
        'Power of Attorney',
        'Fixed-Fee Legal Services'
      ],
      qualifications: [
        'Legal Aid Agency Registered',
        'Solicitors Regulation Authority Approved',
        'Law Society Accredited'
      ]
    }
  ];
  
  // Mock reviews data
  const mockReviews = [
    {
      id: 'review-001',
      providerId: 'service-001',
      author: 'Sarah J.',
      rating: 5,
      date: '2025-04-15',
      content: 'Smith & Partners guided me through the probate process with exceptional care and professionalism. They made a difficult time much easier to navigate.'
    },
    {
      id: 'review-002',
      providerId: 'service-001',
      author: 'Michael T.',
      rating: 4,
      date: '2025-03-22',
      content: 'Very knowledgeable team who explained everything clearly. The process took a bit longer than expected, but overall I was satisfied with their service.'
    },
    {
      id: 'review-003',
      providerId: 'service-002',
      author: 'Emma L.',
      rating: 5,
      date: '2025-05-10',
      content: 'The support group sessions were incredibly helpful during my grief journey. The counselors are compassionate and truly understand the complexities of loss.'
    },
    {
      id: 'review-004',
      providerId: 'service-002',
      author: 'David R.',
      rating: 5,
      date: '2025-04-05',
      content: 'I cannot recommend Grief Support Network enough. Their one-on-one counseling helped me process my grief in a healthy way. Truly life-changing.'
    }
  ];
  
  // Fetch provider and reviews data
  useEffect(() => {
    // In a real application, this would be an API call
    const foundProvider = mockServiceProviders.find(p => p.id === providerId);
    setProvider(foundProvider);
    
    if (foundProvider) {
      const providerReviews = mockReviews.filter(r => r.providerId === providerId);
      setReviews(providerReviews);
    }
  }, [providerId]);
  
  const handleSaveProvider = () => {
    saveResource(providerId);
    setIsSaved(true);
    // Show confirmation toast or message
  };
  
  const handleBack = () => {
    navigateTo('services');
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (!provider) {
    return <div className="loading-provider">Loading provider details...</div>;
  }
  
  // Service category mapping
  const categoryLabels = {
    'legal': 'Legal Services',
    'financial': 'Financial Advisors',
    'grief': 'Grief Support',
    'funeral': 'Funeral Services',
    'estate': 'Estate Administration'
  };
  
  return (
    <div className="service-provider-detail">
      <div className="provider-detail-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Services
        </button>
        <button 
          className={`save-provider-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSaveProvider}
          disabled={isSaved}
        >
          {isSaved ? 'Saved to Resources' : 'Save to Resources'}
        </button>
      </div>
      
      <div className="provider-main-info">
        <div className="provider-header-section">
          <h1 className="provider-name">{provider.name}</h1>
          {provider.verified && (
            <div className="verified-badge-large">✓ Verified Provider</div>
          )}
        </div>
        
        <div className="provider-category-large">{categoryLabels[provider.category]}</div>
        
        <div className="provider-rating-large">
          <span className="rating-stars">{'★'.repeat(Math.floor(provider.rating))}</span>
          <span className="rating-value">{provider.rating}</span>
          <span className="review-count">({provider.reviewCount} reviews)</span>
        </div>
      </div>
      
      <div className="provider-content-grid">
        <div className="provider-main-content">
          <div className="provider-section">
            <h2>About</h2>
            <p className="provider-long-description">{provider.longDescription}</p>
          </div>
          
          <div className="provider-section">
            <h2>Services Offered</h2>
            <ul className="services-list">
              {provider.services.map((service, index) => (
                <li key={index} className="service-item">{service}</li>
              ))}
            </ul>
          </div>
          
          <div className="provider-section">
            <h2>Qualifications</h2>
            <ul className="qualifications-list">
              {provider.qualifications.map((qualification, index) => (
                <li key={index} className="qualification-item">{qualification}</li>
              ))}
            </ul>
          </div>
          
          <div className="provider-section">
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="review-author">{review.author}</div>
                      <div className="review-date">{formatDate(review.date)}</div>
                    </div>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                    <p className="review-content">{review.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reviews">No reviews available for this provider yet.</p>
            )}
          </div>
        </div>
        
        <div className="provider-sidebar">
          <div className="contact-card">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <div className="contact-label">Address:</div>
              <div className="contact-value">{provider.address}</div>
            </div>
            <div className="contact-item">
              <div className="contact-label">Phone:</div>
              <div className="contact-value">{provider.contact.phone}</div>
            </div>
            <div className="contact-item">
              <div className="contact-label">Email:</div>
              <div className="contact-value">{provider.contact.email}</div>
            </div>
            <div className="contact-item">
              <div className="contact-label">Website:</div>
              <div className="contact-value">
                <a href={provider.contact.website} target="_blank" rel="noopener noreferrer">
                  {provider.contact.website.replace('https://', '')}
                </a>
              </div>
            </div>
            
            <div className="contact-actions">
              <button className="contact-btn phone-btn">
                Call Provider
              </button>
              <button className="contact-btn email-btn">
                Send Email
              </button>
              <button className="contact-btn website-btn">
                Visit Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceProviderDetail;
