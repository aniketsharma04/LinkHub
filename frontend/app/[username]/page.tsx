import { notFound } from 'next/navigation';
import ProfileView from '@/components/profile-view';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import Link from '@/lib/models/Link';

export default async function ProfilePage({ params }: { params: { username: string } }) {
  try {
    await connectDB();
    
    // Find user by username
    const user = await User.findOne({ username: params.username.toLowerCase() }).select('-password').lean();
    if (!user) {
      notFound();
    }

    // Get active links
    const links = await Link.find({ 
      user_id: (user as any)._id, 
      is_active: true 
    })
    .sort({ position: 1 })
    .lean();

    const profile = {
      id: (user as any)._id.toString(),
      username: (user as any).username,
      display_name: (user as any).display_name,
      bio: (user as any).bio,
      avatar_url: (user as any).avatar_url,
      theme_color: (user as any).theme_color,
      created_at: (user as any).created_at?.toISOString() || '',
      updated_at: (user as any).updated_at?.toISOString() || '',
    };

    const formattedLinks = links.map((link: any) => ({
      id: link._id.toString(),
      profile_id: link.user_id.toString(),
      title: link.title,
      url: link.url,
      position: link.position,
      is_active: link.is_active,
      icon: link.icon,
      created_at: link.created_at?.toISOString() || '',
    }));

    return <ProfileView profile={profile} links={formattedLinks} />;
  } catch (error) {
    console.error('Error fetching profile:', error);
    notFound();
  }
}
