import React, { useState, useEffect } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import { fetchPosts, fetchCategories } from '../api';



export default function AllNews() {

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);



  const [searchParams, setSearchParams] = useSearchParams();

  const division = searchParams.get('division') || '';

  const date = searchParams.get('date') || '';

  const categoryId = searchParams.get('category') || '';



  const divisions = [

    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা',

    'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ',

  ];



  useEffect(() => {

    fetchCategories()

      .then(setCategories)

      .catch(() => setCategories([]));

  }, []);



  const updateSearchParam = (key, value) => {

    const params = new URLSearchParams(searchParams);

    if (value) params.set(key, value);

    else params.delete(key);

    setSearchParams(params);

  };



  const handleLoadMore = async () => {

    if (loadingMore || !hasMore) return;



    setLoadingMore(true);

    try {

      const nextPage = page + 1;

      const offset = (nextPage - 1) * 100;

      const limit = 100;



      let params = new URLSearchParams(searchParams);

      params.set('limit', limit);

      params.set('offset', offset);



      const data = await fetchPosts(params.toString());

      setPosts(prev => [...prev, ...data.results]);

      setHasMore(!!data.next);

      setPage(nextPage);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoadingMore(false);

    }

  };



  useEffect(() => {

    setLoading(true);

    setError(null);

    setPage(1);

    setHasMore(true);



    fetchPosts(searchParams.toString())

      .then(data => {

        setPosts(data.results);

        setHasMore(!!data.next);

        setLoading(false);

      })

      .catch(err => {

        setError(err.message);

        setLoading(false);

      });

  }, [searchParams]);



  return (

    <div className="min-h-screen bg-black text-white pt-28 px-6 w-full max-w-6xl mx-auto">

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">

        সকল <span className="text-[#E50914]">সংবাদ</span>

      </h1>



      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10 p-5 bg-neutral-900/60 rounded-xl border border-neutral-800">

        <div className="flex flex-col gap-1">

          <label className="text-neutral-400 text-xs font-medium">ক্যাটেগরি</label>

          <select

            value={categoryId}

            onChange={(e) => updateSearchParam('category', e.target.value)}

            className="bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#E50914] transition-colors min-w-[180px] cursor-pointer"

          >

            <option value="">সব ক্যাটেগরি</option>

            {categories.map(category => (

              <option key={category.id} value={category.id}>{category.name}</option>

            ))}

          </select>

        </div>



        <div className="flex flex-col gap-1">

          <label className="text-neutral-400 text-xs font-medium">বিভাগ</label>

          <select

            value={division}

            onChange={(e) => updateSearchParam('division', e.target.value)}

            className="bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#E50914] transition-colors min-w-[180px] cursor-pointer"

          >

            <option value="">সকল বিভাগ</option>

            {divisions.map(div => (

              <option key={div} value={div}>{div}</option>

            ))}

          </select>

        </div>



        <div className="flex flex-col gap-1">

          <label className="text-neutral-400 text-xs font-medium">তারিখ</label>

          <input

            type="date"

            value={date}

            onChange={(e) => updateSearchParam('date', e.target.value)}

            className="bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#E50914] transition-colors min-w-[180px] cursor-pointer"

          />

        </div>



        {(categoryId || division || date) && (

          <button

            onClick={() => setSearchParams(new URLSearchParams())}

            className="mt-auto bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/30 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#E50914]/20 transition-colors"

          >

            ফিল্টার মুছুন

          </button>

        )}

      </div>



      {loading && (

        <div className="flex justify-center py-20">

          <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>

        </div>

      )}



      {error && (

        <p className="text-center text-red-400 py-10">{error}</p>

      )}



      {!loading && !error && posts.length === 0 && (

        <p className="text-center text-neutral-500 py-10">কোনো সংবাদ পাওয়া যায়নি।</p>

      )}



      {!loading && !error && posts.length > 0 && (

        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

             {posts.map(post => (

               <Link

                 key={post.id}

                 to={`/news/${post.id}`}

                 className="bg-neutral-900/60 rounded-xl p-6 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"

               >

                 <span className="self-start text-[10px] font-bold uppercase tracking-wider text-[#E50914] bg-[#E50914]/10 px-2 py-0.5 rounded mb-3">

                   {post.category_name}

                 </span>

                 <h3 className="text-white font-bold text-base leading-snug line-clamp-2 mb-2">

                   {post.title}

                 </h3>

                 <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">

                   {post.description}

                 </p>

                 <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-800">

                   <span className="text-neutral-500 text-xs">{post.date}</span>

                   <span className="text-[#E50914] text-xs font-bold hover:underline">

                     বিস্তারিত পড়ুন →

                   </span>

                 </div>

               </Link>

             ))}

          </div>



          {loadingMore && (

            <div className="flex justify-center py-8 mt-8">

              <div className="w-8 h-8 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>

            </div>

          )}



          {hasMore && !loadingMore && (

            <div className="flex justify-center py-8 mt-8">

              <button

                onClick={handleLoadMore}

                className="bg-[#E50914] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"

              >

                আরও দেখুন

              </button>

            </div>

          )}

        </>

      )}

    </div>

  );

} 

