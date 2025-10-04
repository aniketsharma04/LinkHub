import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Link from '@/lib/models/Link';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const userData = getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const links = await Link.find({ user_id: userData.userId })
      .sort({ position: 1 })
      .lean();

    return NextResponse.json({
      links: links.map(link => ({
        id: link._id,
        profile_id: link.user_id,
        title: link.title,
        url: link.url,
        position: link.position,
        is_active: link.is_active,
        icon: link.icon,
        created_at: link.created_at,
      })),
    });
  } catch (error: any) {
    console.error('Get links error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const userData = getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { title, url, position, is_active = true, icon = '' } = await request.json();

    // Validation
    if (!title || !url) {
      return NextResponse.json(
        { error: 'Title and URL are required' },
        { status: 400 }
      );
    }

    if (!/^https?:\/\/.+/.test(url)) {
      return NextResponse.json(
        { error: 'URL must be a valid HTTP or HTTPS URL' },
        { status: 400 }
      );
    }

    // Get current max position if position not provided
    let linkPosition = position;
    if (typeof linkPosition !== 'number') {
      const maxLink = await Link.findOne({ user_id: userData.userId })
        .sort({ position: -1 })
        .select('position');
      linkPosition = maxLink ? maxLink.position + 1 : 0;
    }

    // Create new link
    const link = new Link({
      user_id: userData.userId,
      title,
      url,
      position: linkPosition,
      is_active,
      icon,
    });

    await link.save();

    return NextResponse.json({
      message: 'Link created successfully',
      link: {
        id: link._id,
        profile_id: link.user_id,
        title: link.title,
        url: link.url,
        position: link.position,
        is_active: link.is_active,
        icon: link.icon,
        created_at: link.created_at,
      },
    });
  } catch (error: any) {
    console.error('Create link error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}