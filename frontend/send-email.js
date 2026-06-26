import emailjs from '@emailjs/browser';

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { templateParams } = JSON.parse(event.body);
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  // Use the PRIVATE key here, securely from an environment variable
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  try {
    // This is a conceptual example. The actual emailjs call might differ.
    // You might need a different library (`@emailjs/nodejs`) for server-side execution.
    await emailjs.send(serviceId, templateId, templateParams, { publicKey, privateKey });
    return { statusCode: 200, body: 'Email sent successfully!' };
  } catch (error) {
    return { statusCode: 500, body: `Error: ${error.message}` };
  }
};