import { promises as fs } from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';
import { checkAdminSession } from '@/actions/admin';
import { AdminDashboardClient } from './admin-client';
import { supabase } from '@/lib/supabase';

type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  interest: string;
  message?: string;
  createdAt: string;
};

type Subscriber = {
  email: string;
  createdAt: string;
};

async function readJSONFile<T>(filePath: string): Promise<T[]> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (err) {
    return [];
  }
}

export default async function AdminPage() {
  const isAuthorized = await checkAdminSession();

  if (!isAuthorized) {
    redirect('/admin/login');
  }

  let contacts: Contact[] = [];
  let subscribers: Subscriber[] = [];

  if (supabase) {
    try {
      const { data: contactsData, error: contactsErr } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!contactsErr && contactsData) {
        contacts = contactsData.map((c: any) => ({
          firstName: c.first_name,
          lastName: c.last_name || '',
          email: c.email,
          interest: c.interest,
          message: c.message || '',
          createdAt: c.created_at,
        }));
      }

      const { data: subscribersData, error: subscribersErr } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (!subscribersErr && subscribersData) {
        subscribers = subscribersData.map((s: any) => ({
          email: s.email,
          createdAt: s.created_at,
        }));
      }
    } catch (err) {
      console.error('Failed to load from Supabase:', err);
    }
  }

  // Fallback to local file logging if Supabase loads empty lists or is unconfigured
  if (contacts.length === 0 && subscribers.length === 0) {
    const dataDir = path.join(process.cwd(), 'data');
    const contactsPath = path.join(dataDir, 'contacts.json');
    const subscribersPath = path.join(dataDir, 'subscribers.json');

    contacts = await readJSONFile<Contact>(contactsPath);
    subscribers = await readJSONFile<Subscriber>(subscribersPath);
  }

  return (
    <AdminDashboardClient
      initialContacts={contacts}
      initialSubscribers={subscribers}
    />
  );
}
