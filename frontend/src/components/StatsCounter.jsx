'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useCountUp } from 'react-countup';
import { fetchPublicStats, fetchCategories } from '../api';

function toSafeNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) && num >= 0 ? num : 0;
}

function normalizeStats(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, toSafeNumber(value)])
  );
}

function buildCategoryMap(categories) {
  if (!Array.isArray(categories)) {
    return {};
  }

  return categories.reduce((acc, category) => {
    if (!category || typeof category !== 'object') {
      return acc;
    }

    const name = typeof category.name === 'string' ? category.name.trim() : '';
    const id = category.id;

    if (name && (typeof id === 'string' || typeof id === 'number')) {
      acc[name] = id;
    }

    return acc;
  }, {});
}

function AnimatedCount({ value, className }) {
  const mounted = typeof window !== 'undefined';
  const spanRef = useRef(null);
  const hasStartedRef = useRef(false);
  const safeValue = toSafeNumber(value);

  const { start, update, reset } = useCountUp({
    ref: spanRef,
    start: 0,
    end: safeValue,
    duration: 2.5,
    separator: ',',
    startOnMount: false,
    enableReinitialize: false,
    useEasing: true,
    useGrouping: true,
  });

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      start();
      return;
    }

    update(safeValue);
  }, [mounted, safeValue, start, update]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <span ref={spanRef} className={className} suppressHydrationWarning>
      {safeValue.toLocaleString('en-US')}
    </span>
  );
}

function StatCard({ label, value, linkTo, hasLink }) {
  const content = (
    <>
      <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold font-sans tracking-tight text-white group-hover:text-[#E50914] transition-colors duration-300 leading-none">
        <AnimatedCount
          value={value}
          className="inline-block tabular-nums min-w-[2ch]"
        />
        +
      </h3>
      <p className="text-[#E50914] mt-1 text-sm sm:text-base md:text-xl font-semibold group-hover:text-white transition-colors duration-300">
        {label}
      </p>
    </>
  );

  if (hasLink && linkTo) {
    return (
      <Link href={linkTo} className="block cursor-pointer group">
        {content}
      </Link>
    );
  }

  return <div className="block">{content}</div>;
}

function StatsCounterContent({ initialCounts = {}, initialCategories = [] }) {
  const [counts, setCounts] = useState(initialCounts);
  const [categoryMap, setCategoryMap] = useState(buildCategoryMap(initialCategories));
  const hasInitialData =
    (initialCounts && Object.keys(initialCounts).length > 0) ||
    (Array.isArray(initialCategories) && initialCategories.length > 0);
  const [loading, setLoading] = useState(!hasInitialData);
  const [errorMessage, setErrorMessage] = useState('');
  const mounted = typeof window !== 'undefined';

  useEffect(() => {
    if (hasInitialData) {
      setLoading(false);
      return;
    }

    let active = true;

    const load = async () => {
      const [statsResult, categoriesResult] = await Promise.allSettled([
        fetchPublicStats(),
        fetchCategories(),
      ]);

      if (!active) {
        return;
      }

      if (statsResult.status === 'fulfilled') {
        setCounts(normalizeStats(statsResult.value));
      } else {
        setCounts({});
        console.error('Error fetching public stats:', statsResult.reason);
      }

      if (categoriesResult.status === 'fulfilled') {
        setCategoryMap(buildCategoryMap(categoriesResult.value));
      } else {
        setCategoryMap({});
        console.error('Error fetching categories:', categoriesResult.reason);
      }

      if (statsResult.status === 'rejected' || categoriesResult.status === 'rejected') {
        setErrorMessage('পরিসংখ্যান সাময়িক অনুপলব্ধ।');
      } else {
        setErrorMessage('');
      }

      setLoading(false);
    };

    load().catch((err) => {
      if (!active) {
        return;
      }

      console.error('Unexpected StatsCounter failure:', err);
      setCounts({});
      setCategoryMap({});
      setErrorMessage('পরিসংখ্যান সাময়িক অনুপলব্ধ।');
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [hasInitialData, initialCounts, initialCategories]);

  const totalNews = useMemo(() => {
    if (Object.prototype.hasOwnProperty.call(counts, 'total_posts')) {
      return toSafeNumber(counts.total_posts);
    }
    if (Object.prototype.hasOwnProperty.call(counts, 'total')) {
      return toSafeNumber(counts.total);
    }

    // Fallback: sum up only category counts, excluding metadata keys
    return Object.entries(counts).reduce((sum, [key, value]) => {
      if (['total_posts', 'total_categories', 'total', 'counts'].includes(key)) {
        return sum;
      }
      return sum + toSafeNumber(value);
    }, 0);
  }, [counts]);

  const murderCount = useMemo(() => toSafeNumber(counts['খুন']), [counts]);
  const rapeCount = useMemo(() => toSafeNumber(counts['ধর্ষণ']), [counts]);

  if (loading) {
    return (
      <div className="flex justify-center py-6 md:py-10">
        <div className="h-8 w-8 md:h-10 md:w-10 animate-spin rounded-full border-4 border-neutral-700 border-t-[#E50914]" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-3 md:mt-10 px-3 md:px-4 flex justify-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 bg-black text-white px-4 py-4 md:px-10 md:py-8 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-neutral-900 w-full md:w-auto">
        <div className="text-center w-full md:w-auto border-b md:border-b-0 md:border-r border-neutral-800 pb-3 md:pb-0 md:pr-10">
          <StatCard
            label="খুন"
            value={murderCount}
            linkTo={categoryMap['খুন'] ? `/all-news?category=${categoryMap['খুন']}` : ''}
            hasLink={Boolean(categoryMap['খুন']) && mounted}
          />
        </div>

        <div className="text-center w-full md:w-auto border-b md:border-b-0 md:border-r border-neutral-800 pb-3 md:pb-0 md:pr-10">
          <StatCard
            label="ধর্ষণ"
            value={rapeCount}
            linkTo={categoryMap['ধর্ষণ'] ? `/all-news?category=${categoryMap['ধর্ষণ']}` : ''}
            hasLink={Boolean(categoryMap['ধর্ষণ']) && mounted}
          />
        </div>

        <div className="text-center w-full md:w-auto">
      <Link href="/all-news" className="block cursor-pointer group">
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold font-sans tracking-tight text-white group-hover:text-[#E50914] transition-colors duration-300 leading-none">
              <AnimatedCount
                value={totalNews}
                className="inline-block tabular-nums min-w-[2ch]"
              />
              +
            </h3>
            <p className="text-neutral-300 mt-1 text-sm sm:text-base md:text-xl font-semibold group-hover:text-white transition-colors duration-300">
              সংবাদ আর্কাইভ
            </p>
          </Link>
        </div>
      </div>

      {errorMessage ? (
        <span className="sr-only" aria-live="polite">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

class StatsCounterBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('StatsCounter boundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-4xl mx-auto mt-3 md:mt-10 px-3 md:px-4 flex justify-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 bg-black text-white px-4 py-4 md:px-10 md:py-8 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-neutral-900 w-full md:w-auto">
            <div className="text-center w-full">
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold font-sans tracking-tight text-white leading-none">
                0+
              </h3>
              <p className="text-neutral-300 mt-1 text-sm sm:text-base md:text-xl font-semibold">
                পরিসংখ্যান সাময়িক অনুপলব্ধ
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function StatsCounter(props = {}) {
  return (
    <StatsCounterBoundary>
      <StatsCounterContent {...props} />
    </StatsCounterBoundary>
  );
}
