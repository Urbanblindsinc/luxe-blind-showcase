
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegion } from "@/hooks/use-region";

const PrivacyPolicy = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const { phones } = useRegion();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        {/* Header */}
        <div className="relative py-16 bg-secondary overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="heading-lg mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              This Privacy Policy outlines how Urban Blinds collects, uses, and protects your personal information.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              At Urban Blinds, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul>
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
            
            <h2>Cookie Policy</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you browse websites. We use cookies to:
            </p>
            <ul>
              <li>Make our website work as you'd expect</li>
              <li>Remember your settings during and between visits</li>
              <li>Improve the speed/security of the site</li>
              <li>Allow you to share pages with social networks like Facebook</li>
              <li>Continuously improve our website for you</li>
            </ul>
            
            <h2>Your Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul>
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>By email: urban.blinds.inc@gmail.com</li>
              <li>By phone: {phones.primary}</li>
              <li>By mail: 5690 14th Ave, Markham, ON L3S 3K5</li>
            </ul>
            
            <p className="text-muted-foreground mt-12">Last Updated: May 2024</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
