// Import necessary dependencies
import React, { useState } from "react";
import { Table, Spinner } from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";

// EnquiryList Component - Displays a table of enquiries with edit and delete functionality
export function EnquiryList({ data, getAllEnquiry, Swal, setFormData }) {
  // State Management
  const [isDeleting, setIsDeleting] = useState(false); // Track delete operation state
  const [deletingId, setDeletingId] = useState(null); // Track which item is being deleted
  const [isEditing, setIsEditing] = useState(false); // Track edit operation state

  // Handle deletion of an enquiry
  const deleteRow = async (delId) => {
    try {
      // Show confirmation dialog before deleting
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        // Set loading state for the specific item
        setIsDeleting(true);
        setDeletingId(delId);
        
        // Make API call to delete the enquiry
        const res = await axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delId}`);
        
        if (res.data) {
          toast.success("Enquiry Deleted Successfully");
          await getAllEnquiry(); // Refresh the list
          Swal.fire("Deleted!", "Your enquiry has been deleted.", "success");
        }
      }
    } catch (error) {
      // Handle API errors
      toast.error(error.response?.data?.message || "Error deleting enquiry");
      Swal.fire("Error!", "Failed to delete the enquiry.", "error");
    } finally {
      // Reset loading states
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  // Handle editing of an enquiry
  const editRow = async (editId) => {
    try {
      setIsEditing(true);
      // Fetch the specific enquiry details
      const res = await axios.get(`http://localhost:8020/api/website/enquiry/single/${editId}`);
      const { data } = res;
      
      if (data && data.enquiry) {
        setFormData(data.enquiry); // Update form with enquiry data
        // Scroll to form for better UX
        document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        toast.error("Enquiry not found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error loading enquiry details");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-gray-200 p-3 md:p-4 rounded-lg">
      <h2 className="text-[18px] md:text-[20px] font-bold mb-2">Enquiry List</h2>
      
      {/* Table wrapper with horizontal scroll for mobile */}
      <div className="overflow-x-auto">
        <Table striped className="min-w-full">
          {/* Table Header */}
          <Table.Head className="text-xs md:text-sm">
            <Table.HeadCell className="px-2 md:px-4">Sr no.</Table.HeadCell>
            <Table.HeadCell className="px-2 md:px-4">Name</Table.HeadCell>
            {/* Hidden on mobile screens */}
            <Table.HeadCell className="hidden md:table-cell">Email</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">Phone</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">Message</Table.HeadCell>
            <Table.HeadCell className="px-2 md:px-4">
              <span>Actions</span>
            </Table.HeadCell>
          </Table.Head>

          {/* Table Body */}
          <Table.Body className="divide-y text-xs md:text-sm">
            {data.length >= 1 ? (
              // Map through enquiries if data exists
              data.map((items, index) => (
                <Table.Row
                  key={items._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="px-2 md:px-4">{index + 1}</Table.Cell>
                  <Table.Cell className="px-2 md:px-4">{items.name}</Table.Cell>
                  <Table.Cell className="hidden md:table-cell">{items.email}</Table.Cell>
                  <Table.Cell className="hidden md:table-cell">{items.phone}</Table.Cell>
                  {/* Truncate long messages */}
                  <Table.Cell className="hidden md:table-cell">
                    {items.message.length > 50 
                      ? `${items.message.substring(0, 50)}...` 
                      : items.message}
                  </Table.Cell>
                  {/* Action Buttons */}
                  <Table.Cell className="px-2 md:px-4">
                    <div className="flex flex-col md:flex-row gap-2">
                      {/* Delete Button with loading state */}
                      <button
                        onClick={() => deleteRow(items._id)}
                        disabled={isDeleting}
                        className={`bg-red-500 hover:bg-red-600 text-white p-1.5 md:p-2 rounded-md text-xs md:text-sm flex items-center justify-center ${
                          isDeleting && deletingId === items._id ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isDeleting && deletingId === items._id ? (
                          <><Spinner size="sm" /> Deleting...</>
                        ) : (
                          'Delete'
                        )}
                      </button>
                      {/* Edit Button with loading state */}
                      <button
                        onClick={() => editRow(items._id)}
                        disabled={isEditing}
                        className={`bg-blue-500 hover:bg-blue-600 text-white p-1.5 md:p-2 rounded-md text-xs md:text-sm flex items-center justify-center ${
                          isEditing ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isEditing ? (
                          <><Spinner size="sm" /> Loading...</>
                        ) : (
                          'Edit'
                        )}
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              // Show when no data is available
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell colSpan="6" className="text-center py-4">
                  No data found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
