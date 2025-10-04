import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import Link from '@/lib/models/Link';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await connectDB();
    
    const { username } = params;

    // Find user by username
    const user = await User.findOne({ username: username.toLowerCase() }).select('-password');
    if (!user) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Get active links
    const links = await Link.find({ 
      user_id: user._id, 
      is_active: true 
    })
    .sort({ position: 1 })
    .lean();

    return NextResponse.json({
      profile: {
        id: user._id,
        username: user.username,
        display_name: user.display_name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        theme_color: user.theme_color,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      links: links.map(link => ({
        id: link._id,
        title: link.title,
        url: link.url,
        position: link.position,
        icon: link.icon,
      })),
    });
  } catch (error: any) {
    console.error('Get public profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}