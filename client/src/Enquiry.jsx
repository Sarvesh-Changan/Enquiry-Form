// Import necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Checkbox, Label, Textarea, TextInput, Spinner } from "flowbite-react";
import { EnquiryList } from "./enquiry/EnquiryList";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2/dist/sweetalert2.js'

const Enquiry = () => {
  // State Management
  // Store list of all enquiries
  const [enquiryList, setEnquiryList] = useState([]);
  // Track loading state for form submission
  const [isLoading, setIsLoading] = useState(false);
  // Form data state with initial empty values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "" // _id is present when editing an existing enquiry
  });

  // Validate phone number format (must be exactly 10 digits)
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // Handle form submission for both create and update operations
  const saveEnquiry = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Validate phone number before submission
    if (!validatePhone(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setIsLoading(true); // Start loading state
    try {
      if (formData._id) {
        // Update existing enquiry
        const res = await axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        });
        
        if (res.data) {
          toast.success("Enquiry Updated Successfully");
          // Reset form after successful update
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: ""
          });
          getAllEnquiry(); // Refresh the list
        }
      } else {
        // Create new enquiry
        const res = await axios.post("http://localhost:8020/api/website/enquiry/insert", formData);
        if (res.data) {
          toast.success("Enquiry Saved Successfully");
          // Reset form after successful creation
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          getAllEnquiry(); // Refresh the list
        }
      }
    } catch (error) {
      // Handle API errors with user-friendly message
      toast.error(error.response?.data?.message || "An error occurred while saving the enquiry");
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  // Fetch all enquiries from the server
  const getAllEnquiry = async () => {
    try {
      const res = await axios.get("http://localhost:8020/api/website/enquiry/view");
      const finalData = res.data;
      if (finalData.status === 1) {
        setEnquiryList(finalData.enquiryList);
      } else {
        toast.error("Failed to fetch enquiries");
      }
    } catch (error) {
      toast.error("Error loading enquiries");
      setEnquiryList([]); // Reset list on error
    }
  };

  // Handle form input changes
  const getValue = (e) => {
    const { name, value } = e.target;
    // Update form data while preserving other fields
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Load enquiries when component mounts
  useEffect(() => {
    getAllEnquiry();
  }, []);

  return (
    <div>
      {/* Toast container for notifications */}
      <ToastContainer />
      
      {/* Main heading - responsive size */}
      <h1 className="text-[28px] md:text-[40px] text-center py-4 md:py-6 mb-2 md:mb-4 font-bold">
        User Enquiry
      </h1>

      {/* Main layout grid - stacks on mobile, side-by-side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-[30%_auto] gap-4 md:gap-10 px-4 md:px-8">
        {/* Enquiry Form Section */}
        <div className="bg-gray-200 p-3 md:p-4 rounded-lg">
          <h2 className="text-[18px] md:text-[20px] font-bold mb-2">Enquiry Form</h2>
          <form onSubmit={saveEnquiry} noValidate>
            {/* Name Field */}
            <div className="py-3">
              <Label htmlFor="name" value="Your Name" />
              <TextInput
                id="name"
                type="text"
                onChange={getValue}
                value={formData.name}
                name="name"
                placeholder="Enter your name"
                required
                minLength={2}
              />
            </div>

            {/* Email Field */}
            <div className="py-3">
              <Label htmlFor="email" value="Your Email" />
              <TextInput
                id="email"
                type="email"
                onChange={getValue}
                value={formData.email}
                name="email"
                placeholder="Enter your Email"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="py-3">
              <Label htmlFor="phone" value="Your Phone" />
              <TextInput
                id="phone"
                type="tel"
                onChange={getValue}
                value={formData.phone}
                name="phone"
                placeholder="Enter your phone (10 digits)"
                required
                pattern="[0-9]{10}"
              />
            </div>

            {/* Message Field */}
            <div className="py-3">
              <Label htmlFor="message" value="Your Message" />
              <Textarea
                id="message"
                name="message"
                onChange={getValue}
                value={formData.message}
                placeholder="Message..."
                required
                rows={4}
              />
            </div>

            {/* Submit Button - Shows spinner when loading */}
            <div className="py-3">
              <Button 
                type="submit" 
                className='w-[100%]'
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Spinner size="sm" /> Processing...</>
                ) : (
                  formData._id ? 'Update' : 'Save'
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Enquiry List Component */}
        <EnquiryList 
          data={enquiryList} 
          getAllEnquiry={getAllEnquiry} 
          Swal={Swal} 
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default Enquiry;