'use server';

import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

// Zod schemas for input validation
const ContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  interest: z.string().min(1, 'Interest is required'),
  message: z.string().optional(),
});

const SubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Database helper function
async function saveToDatabase(filename: string, record: any) {
  const newRecord = {
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
    ...record,
  };

  if (supabase) {
    try {
      const tableName = filename.replace('.json', '');
      const supabasePayload = tableName === 'contacts' ? {
        id: newRecord.id,
        first_name: newRecord.firstName,
        last_name: newRecord.lastName,
        email: newRecord.email,
        interest: newRecord.interest,
        message: newRecord.message,
      } : {
        id: newRecord.id,
        email: newRecord.email,
      };

      const { error } = await supabase
        .from(tableName)
        .insert([supabasePayload]);

      if (error) {
        console.error(`Supabase write error for ${tableName}:`, error);
        // Fall through to filesystem backup
      } else {
        return newRecord;
      }
    } catch (err) {
      console.error('Supabase integration error:', err);
      // Fall through to filesystem backup
    }
  }

  try {
    const dirPath = path.join(process.cwd(), 'data');
    const filePath = path.join(dirPath, filename);

    // Create the directory if it doesn't exist
    await fs.mkdir(dirPath, { recursive: true });

    // Read existing file data
    let data: any[] = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(fileContent);
    } catch {
      data = [];
    }

    data.push(newRecord);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return newRecord;
  } catch (error) {
    console.error(`Failed to write to JSON db:`, error);
    return null;
  }
}

// Telegram notifier
async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
      signal: AbortSignal.timeout(3000),
    });
  } catch (err) {
    console.error('Failed to notify Telegram bot:', err);
  }
}

// Action 1: Submit Contact Form
export async function submitContactForm(prevState: any, formData: FormData) {
  const rawData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    interest: formData.get('interest'),
    message: formData.get('message'),
  };

  const validatedFields = ContactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
    };
  }

  const { firstName, lastName, email, interest, message } = validatedFields.data;

  // Save to JSON Database
  await saveToDatabase('contacts.json', {
    firstName,
    lastName,
    email,
    interest,
    message,
  });

  // Notify via Telegram
  const tgMessage = `
<b>⚡ NEW LEAD: Trade Boom Contact Form</b>
----------------------------------------
<b>Name:</b> ${firstName} ${lastName || ''}
<b>Email:</b> ${email}
<b>Interest:</b> ${interest}
<b>Message:</b> ${message || 'N/A'}
<b>Timestamp:</b> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
`;
  await notifyTelegram(tgMessage.trim());
  revalidatePath('/admin');

  return {
    success: true,
    message: 'Thank you! Your message has been sent successfully.',
  };
}

// Action 2: Subscribe to Newsletter
export async function subscribeNewsletter(email: string) {
  const validatedFields = SubscribeSchema.safeParse({ email });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || 'Invalid email address.',
    };
  }

  // Save to JSON Database
  await saveToDatabase('subscribers.json', { email });

  // Notify via Telegram
  const tgMessage = `
<b>📧 NEW SUBSCRIBER: Trade Boom Newsletter</b>
----------------------------------------
<b>Email:</b> ${email}
<b>Timestamp:</b> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
`;
  await notifyTelegram(tgMessage.trim());
  revalidatePath('/admin');

  return {
    success: true,
    message: 'Subscribed successfully! Welcome to the newsletter.',
  };
}
