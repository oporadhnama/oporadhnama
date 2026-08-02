'use client';

import React from 'react';

function SkeletonFeaturedCard() {
  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[16/9] bg-gray-200 w-full"></div>
      
      {/* Content Skeleton */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        
        <div className="space-y-2 mt-auto">
          <div className="h-3 bg-gray-100 rounded w-full"></div>
          <div className="h-3 bg-gray-100 rounded w-5/6"></div>
          <div className="h-3 bg-gray-100 rounded w-4/6"></div>
        </div>
        
        <div className="mt-6 flex justify-between pt-4 border-t border-gray-100">
          <div className="h-3 bg-gray-100 rounded w-20"></div>
          <div className="h-3 bg-gray-100 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

function SkeletonSideCard() {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-white border border-gray-100 animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-20 bg-gray-200 rounded-lg"></div>
      
      {/* Text Skeleton */}
      <div className="flex flex-col flex-grow justify-center py-1">
        <div className="h-2.5 bg-gray-200 rounded w-16 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-2.5 bg-gray-100 rounded w-20 mt-auto"></div>
      </div>
    </div>
  );
}

function SkeletonGridCard() {
  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="aspect-[16/10] bg-gray-200 w-full"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-4/5 mb-4"></div>
        
        <div className="space-y-2 mt-auto mb-4">
          <div className="h-2.5 bg-gray-100 rounded w-full"></div>
          <div className="h-2.5 bg-gray-100 rounded w-5/6"></div>
        </div>
        
        <div className="flex justify-between pt-3 border-t border-gray-100">
          <div className="h-2.5 bg-gray-200 rounded w-16"></div>
          <div className="h-2.5 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
}

export default function NewsFeedSkeleton() {
  return (
    <section className="newspaper-bg w-full mt-0 relative z-10">
      <div className="newspaper-divider mx-auto max-w-6xl" />

      {/* Category Ribbon Skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3 overflow-hidden animate-pulse">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-9 bg-gray-200 rounded-full w-24 flex-shrink-0"></div>
        ))}
      </div>

      <div className="thin-rule mx-auto max-w-6xl" />

      {/* Featured Section Skeleton */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center gap-3 mb-6 animate-pulse">
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="h-6 bg-gray-200 rounded w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <SkeletonFeaturedCard />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[1, 2, 3].map(i => <SkeletonSideCard key={i} />)}
          </div>
        </div>
      </div>

      <div className="newspaper-divider mx-auto max-w-6xl" />

      {/* Grid Section Skeleton */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center justify-between mb-6 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="h-6 bg-gray-200 rounded w-32" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map(i => <SkeletonGridCard key={i} />)}
        </div>
      </div>
    </section>
  );
}
