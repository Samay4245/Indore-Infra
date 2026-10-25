const express = require('express');
const router = express.Router();
const db = require('../config/db');
const nodemailer = require('nodemailer');
const authMiddleware = require('../middleware/authMiddleware');

const dotenv = require('dotenv');

// Nodemailer transport setup for Gmail SMTP
const createTransporter = (emailUser, emailPass) => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

// POST /api/enquiries — Submit a new enquiry
router.post('/', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      project_type,
      location,
      budget,
      description
    } = req.body;

    // Validate required fields
    if (!name || !phone || !project_type || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields: name, phone, project_type, description'
      });
    }

    const sql = `
      INSERT INTO enquiries
      (name, phone, email, project_type, location, budget, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      name,
      phone,
      email || null,
      project_type,
      location || null,
      budget || null,
      description
    ]);

    console.log(`[Enquiry] New enquiry inserted - ID: ${result.insertId}, Name: ${name}, Phone: ${phone}`);

    // Send email notification to admin
    try {
      dotenv.config({ override: true });
      const emailUser = (process.env.EMAIL_USER || process.env.SMTP_USER || '').trim();
      const rawPass = process.env.EMAIL_PASS || process.env.SMTP_PASSWORD || '';
      const emailPass = rawPass.replace(/["'\s]/g, '');
      const adminEmail = (process.env.ADMIN_EMAIL || 'indoreinfra09@gmail.com').trim();

      if (!emailUser || !emailPass || emailPass.includes('YOUR_')) {
        console.warn('[Enquiry] Email notification skipped: A valid EMAIL_USER and EMAIL_PASS must be configured in backend/.env');
      } else {
        const customerEmail = email && typeof email === 'string' && email.trim() ? email.trim() : null;

        const mailOptions = {
          from: `"INDORE INFRA CONSTRUCTION" <${emailUser}>`,
          to: adminEmail,
          replyTo: customerEmail || undefined,
          subject: `New Website Enquiry: ${name} - INDORE INFRA CONSTRUCTION`,
          text: `
New Website Enquiry Received - INDORE INFRA CONSTRUCTION
==================================================

Customer Details:
--------------------------------------------------
Customer Name:       ${name}
Phone Number:        ${phone}
Email Address:       ${customerEmail || 'Not Provided'}
Location:            ${location || 'Not Provided'}
Project Type:        ${project_type}
Budget:              ${budget || 'Not Decided'}

Project Description:
--------------------------------------------------
${description}

--------------------------------------------------
Enquiry ID:          #${result.insertId}
Submitted At:        ${new Date().toLocaleString()}

Please log in to the INDORE INFRA CONSTRUCTION Admin Panel to manage this enquiry.
          `.trim(),
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
              <div style="background-color: #1e3a8a; padding: 16px 20px; border-radius: 6px 6px 0 0; color: #ffffff;">
                <h2 style="margin: 0; font-size: 20px;">🏗️ INDORE INFRA CONSTRUCTION</h2>
                <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">New Customer Enquiry Received</p>
              </div>

              <div style="padding: 20px;">
                <p style="font-size: 15px; color: #334155; margin-top: 0;">
                  You have received a new customer enquiry from the website contact form:
                </p>

                <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
                  <tr style="background-color: #f8fafc;">
                    <td style="padding: 10px 12px; font-weight: bold; width: 35%; border: 1px solid #e2e8f0; color: #475569;">Customer Name</td>
                    <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 12px; font-weight: bold; border: 1px solid #e2e8f0; color: #475569;">Phone Number</td>
                    <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${phone}</a></td>
                  </tr>
                  <tr style="background-color: #f8fafc;">
                    <td style="padding: 10px 12px; font-weight: bold; border: 1px solid #e2e8f0; color: #475569;">Email Address</td>
                    <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${customerEmail ? `<a href="mailto:${customerEmail}" style="color: #2563eb; text-decoration: none;">${customerEmail}</a>` : 'Not Provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 12px; font-weight: bold; border: 1px solid #e2e8f0; color: #475569;">Location</td>
                    <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${location || 'Not Provided'}</td>
                  </tr>
                  <tr style="background-color: #f8fafc;">
                    <td style="padding: 10px 12px; font-weight: bold; border: 1px solid #e2e8f0; color: #475569;">Project Type</td>
                    <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${project_type}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 12px; font-weight: bold; border: 1px solid #e2e8f0; color: #475569;">Budget</td>
                    <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${budget || 'Not Decided'}</td>
                  </tr>
                  <tr style="background-color: #f8fafc;">
                    <td style="padding: 10px 12px; font-weight: bold; vertical-align: top; border: 1px solid #e2e8f0; color: #475569;">Project Description</td>
                    <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; white-space: pre-line;">${description}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 12px; font-weight: bold; border: 1px solid #e2e8f0; color: #475569;">Enquiry ID</td>
                    <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">#${result.insertId}</td>
                  </tr>
                </table>

                <p style="font-size: 13px; color: #64748b; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                  💡 You can reply directly to this email to contact the customer (if an email was provided).
                </p>
              </div>
            </div>
          `
        };

        const transporter = createTransporter(emailUser, emailPass);
        await transporter.sendMail(mailOptions);
        console.log(`[Enquiry] Email notification sent successfully to ${adminEmail}`);
      }
    } catch (emailError) {
      console.error('[Enquiry Email Error] Failed to send email notification:', emailError.message);
      // Preserves enquiry saved in MySQL; does not fail customer's submission
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiryId: result.insertId
    });

  } catch (error) {
    console.error('[Enquiry Error]', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again later.'
    });
  }
});

// Admin Routes (Protected)

// GET /api/enquiries - Get all enquiries (Admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [enquiries] = await db.execute('SELECT * FROM enquiries ORDER BY created_at DESC');
    res.json({ success: true, enquiries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/enquiries/stats - Get enquiry stats (Admin)
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const [totalRes] = await db.execute('SELECT COUNT(*) as count FROM enquiries');
    const [newRes] = await db.execute('SELECT COUNT(*) as count FROM enquiries WHERE status = "New"');
    const [contactedRes] = await db.execute('SELECT COUNT(*) as count FROM enquiries WHERE status = "Contacted"');
    const [inProgressRes] = await db.execute('SELECT COUNT(*) as count FROM enquiries WHERE status = "In Progress"');
    const [closedRes] = await db.execute('SELECT COUNT(*) as count FROM enquiries WHERE status = "Closed"');

    res.json({
      success: true,
      stats: {
        total: totalRes[0].count,
        new: newRes[0].count,
        contacted: contactedRes[0].count,
        inProgress: inProgressRes[0].count,
        closed: closedRes[0].count
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/enquiries/:id - Get single enquiry
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const [enquiries] = await db.execute('SELECT * FROM enquiries WHERE id = ?', [req.params.id]);
    if (enquiries.length === 0) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, enquiry: enquiries[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/enquiries/:id/status - Update enquiry status & notes
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const allowed = ['New', 'Contacted', 'In Progress', 'Closed'];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    if (status && notes !== undefined) {
      await db.execute('UPDATE enquiries SET status = ?, notes = ? WHERE id = ?', [status, notes, req.params.id]);
    } else if (status) {
      await db.execute('UPDATE enquiries SET status = ? WHERE id = ?', [status, req.params.id]);
    } else if (notes !== undefined) {
      await db.execute('UPDATE enquiries SET notes = ? WHERE id = ?', [notes, req.params.id]);
    }

    res.json({ success: true, message: 'Enquiry updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/enquiries/:id - Delete enquiry
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await db.execute('DELETE FROM enquiries WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
