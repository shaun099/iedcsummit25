import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

/**
 * Submit sponsor form data to Supabase
 * @param {Object} formData - The form data to submit
 * @returns {Promise<Object>} - The result of the insert operation
 */
export const submitSponsorForm = async (formData) => {
  try {
    // Prepare the data for Supabase
    const updates = {
      organization_name: formData.organizationName,
      contact_name: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      website: formData.website || null,
      partnership_type: formData.partnershipType,
      remarks: formData.remarks || null,
      submitted_at: new Date().toISOString(),
      ip_address: await getClientIpAddress(),
      status: "pending",
    };

    // Insert data into sponsor_submissions table
    const { data, error } = await supabase
      .from("sponsor_submissions")
      .insert([updates])
      .select();

    if (error) {
      console.error("Error submitting form to Supabase:", error);
      return { success: false, error: error.message };
    }

    console.log("Form submitted successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error in submitSponsorForm:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get client IP address (for tracking purposes)
 * @returns {Promise<string>} - The client's IP address
 */
async function getClientIpAddress() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn("Could not fetch IP address:", error);
    return "unknown";
  }
}
