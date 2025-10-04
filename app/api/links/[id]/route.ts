import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Link from '@/lib/models/Link';
import { getUserFromRequest } from '@/lib/auth';
import mongoose from 'mongoose';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const userData = getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid link ID' },
        { status: 400 }
      );
    }

    const { title, url, position, is_active, icon } = await request.json();

    // Validation
    if (url && !/^https?:\/\/.+/.test(url)) {
      return NextResponse.json(
        { error: 'URL must be a valid HTTP or HTTPS URL' },
        { status: 400 }
      );
    }

    // Find and update link
    const link = await Link.findOneAndUpdate(
      { _id: id, user_id: userData.userId },
      {
        ...(title !== undefined && { title }),
        ...(url !== undefined && { url }),
        ...(position !== undefined && { position }),
        ...(is_active !== undefined && { is_active }),
        ...(icon !== undefined && { icon }),
        updated_at: new Date(),
      },
      { new: true }
    );

    if (!link) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Link updated successfully',
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
    console.error('Update link error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const userData = getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid link ID' },
        { status: 400 }
      );
    }

    // Find and delete link
    const link = await Link.findOneAndDelete({ _id: id, user_id: userData.userId });

    if (!link) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Link deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete link error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}