import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    return NextResponse.json({
      status: 'success',
      message: 'MongoDB connection successful!',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'MongoDB connection failed',
        error: error.message 
      },
      { status: 500 }
    );
  }
}