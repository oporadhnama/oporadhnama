"""Setup script: Create supreme admin from env, seed categories, and insert 10 demo posts."""
import os
import sys
import io
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Ensure UTF-8 output for Render logs
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

import django
django.setup()

from django.contrib.auth.models import User
from archive.models import Category, Post, ActivityLog

# --- 1. Get Credentials from Environment Variables ---
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "").strip()
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "").strip()
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "")

if not ADMIN_USERNAME or not ADMIN_EMAIL or not ADMIN_PASSWORD:
    raise RuntimeError(
        "CRITICAL ERROR: Set ADMIN_USERNAME, ADMIN_EMAIL, and ADMIN_PASSWORD in Render Environment Variables before running setup_admin.py."
    )

# --- 2. Create or Update Supreme Admin ---
user, created = User.objects.get_or_create(
    username=ADMIN_USERNAME,
    defaults={
        'email': ADMIN_EMAIL,
        'is_staff': True,
        'is_superuser': True,
    }
)
user.email = ADMIN_EMAIL
user.is_staff = True
user.is_superuser = True
user.set_password(ADMIN_PASSWORD)
user.save()
print(f"Supreme Admin {'created' if created else 'updated'}: {ADMIN_USERNAME}")

# Remove old hardcoded 'admin' or 'oporadhnama' user if they exist and are not the current admin
old_admin = User.objects.filter(username='admin').first()
if old_admin and old_admin.username != ADMIN_USERNAME:
    old_admin.delete()
    print("Old 'admin' user removed.")

# --- 3. Seed Categories ---
category_names = ['হত্যাকান্ড', 'ধর্ষণ', 'চাঁদাবাজি', 'দুর্নীতি', 'অন্যান্য']
cats = {}
for name in category_names:
    cat, c = Category.objects.get_or_create(name=name)
    cats[name] = cat
    print(f"Category '{name}': {'new' if c else 'exists'}")

# --- 4. Insert 10 Demo Posts (If Database is Empty) ---
demo_posts = [
    {
        'title': 'রাজধানীতে গুলিতে যুবক নিহত, পুলিশ তদন্ত শুরু',
        'description': 'ঢাকার মিরপুর এলাকায় গত রাতে পরিচয় না জানা দুর্বৃত্তদের গুলিতে একজন যুবক নিহত হয়েছেন। পুলিশ ঘটনাস্থল থেকে ৩টি খালি কার্তুজ উদ্ধার করেছে। নিহত ব্যক্তি স্থানীয় একটি গার্মেন্টস ফ্যাক্টরিতে কর্মরত ছিলেন। তদন্ত চলছে।',
        'category': 'হত্যাকান্ড',
        'division': 'ঢাকা',
        'location_text': 'মিরপুর-১০, ঢাকা',
        'date': datetime.date(2026, 6, 8),
    },
    {
        'title': 'চট্টগ্রামে জমি বিরোধে চাচাতো ভাইকে কুপিয়ে হত্যা',
        'description': 'চট্টগ্রামের পটিয়া উপজেলায় দীর্ঘদিনের জমি বিরোধকে কেন্দ্র করে চাচাতো ভাইকে দা দিয়ে কুপিয়ে হত্যা করা হয়েছে। স্থানীয়রা জানান, দুই পরিবারের মধ্যে দীর্ঘদিন ধরে জমি নিয়ে বিরোধ চলছিল। পুলিশ আসামি আটক করেছে।',
        'category': 'হত্যাকান্ড',
        'division': 'চট্টগ্রাম',
        'location_text': 'পটিয়া, চট্টগ্রাম',
        'date': datetime.date(2026, 6, 5),
    },
    {
        'title': 'সিলেটে স্কুল ছাত্রীকে নির্যাতনের অভিযোগে শিক্ষক গ্রেফতার',
        'description': 'সিলেটের একটি বেসরকারি স্কুলে ৮ম শ্রেণীর ছাত্রীকে যৌন নির্যাতনের অভিযোগে ওই স্কুলের একজন শিক্ষককে গ্রেফতার করেছে পুলিশ। ভুক্তভোগীর পরিবার জানান, কয়েক মাস ধরে এই নির্যাতন চলছিল। মামলা দায়ের করা হয়েছে।',
        'category': 'ধর্ষণ',
        'division': 'সিলেট',
        'location_text': 'সিলেট সদর',
        'date': datetime.date(2026, 6, 7),
    },
    {
        'title': 'রাজশাহীতে গৃহকর্মীকে নির্যাতনের দায়ে গৃহকর্তা আটক',
        'description': 'রাজশাহী মহানগরীতে এক গৃহকর্মীকে ধর্ষণের অভিযোগে গৃহকর্তাকে আটক করেছে র‍্যাব। ভুক্তভোগী মহিলা ওয়ান স্টপ ক্রাইসিস সেন্টারে চিকিৎসাধীন। র‍্যাব সূত্রে জানা যায়, আসামী পূর্বেও এ ধরনের অপরাধে জড়িত ছিল।',
        'category': 'ধর্ষণ',
        'division': 'রাজশাহী',
        'location_text': 'বোয়ালিয়া, রাজশাহী',
        'date': datetime.date(2026, 6, 4),
    },
    {
        'title': 'গাজীপুরে গার্মেন্টস মালিকদের কাছ থেকে চাঁদা আদায়ের রিং বাস্ট',
        'description': 'গাজীপুরের টঙ্গী শিল্প এলাকায় গার্মেন্টস কারখানা মালিকদের কাছ থেকে নিয়মিত চাঁদা আদায় করা একটি চক্র ভেঙে দিয়েছে পুলিশ। ৫ জনকে গ্রেফতার করা হয়েছে। তাদের কাছ থেকে ১২ লাখ টাকা নগদ এবং অস্ত্র উদ্ধার করা হয়েছে।',
        'category': 'চাঁদাবাজি',
        'division': 'ঢাকা',
        'location_text': 'টঙ্গী, গাজীপুর',
        'date': datetime.date(2026, 6, 9),
    },
    {
        'title': 'খুলনায় ট্রাক চালকদের কাছ থেকে চাঁদা আদায়, ৩ জন আটক',
        'description': 'খুলনার রূপসা ঘাটে ট্রাক চালকদের কাছ থেকে জোরপূর্বক চাঁদা আদায়ের অভিযোগে ৩ জনকে হাতেনাতে আটক করেছে পুলিশ। চালকরা জানান, প্রতিটি ট্রিপে ৫০০ থেকে ২০০০ টাকা পর্যন্ত দিতে বাধ্য করা হতো।',
        'category': 'চাঁদাবাজি',
        'division': 'খুলনা',
        'location_text': 'রূপসা, খুলনা',
        'date': datetime.date(2026, 6, 3),
    },
    {
        'title': 'সরকারি হাসপাতালে ওষুধ কেলেঙ্কারি, ৩ কর্মকর্তা বরখাস্ত',
        'description': 'বরিশাল শের-ই-বাংলা মেডিকেল কলেজ হাসপাতালে ওষুধ কেলেঙ্কারির ঘটনায় ৩ জন কর্মকর্তাকে বরখাস্ত করা হয়েছে। তদন্তে জানা যায়, রোগীদের জন্য বরাদ্দ ওষুধ বাইরে বিক্রি করা হচ্ছিল। দুদক তদন্ত শুরু করেছে।',
        'category': 'দুর্নীতি',
        'division': 'বরিশাল',
        'location_text': 'বরিশাল সদর',
        'date': datetime.date(2026, 6, 6),
    },
    {
        'title': 'ময়মনসিংহে সেতু নির্মাণে ১৫ কোটি টাকার দুর্নীতি উদঘাটন',
        'description': 'ময়মনসিংহের ত্রিশাল উপজেলায় একটি সেতু নির্মাণ প্রকল্পে প্রায় ১৫ কোটি টাকার দুর্নীতির প্রমাণ পেয়েছে দুদক। নিম্নমানের উপকরণ ব্যবহার করে বিল উত্তোলন করা হয়েছিল। সংশ্লিষ্ট ঠিকাদার ও প্রকৌশলীর বিরুদ্ধে মামলা হয়েছে।',
        'category': 'দুর্নীতি',
        'division': 'ময়মনসিংহ',
        'location_text': 'ত্রিশাল, ময়মনসিংহ',
        'date': datetime.date(2026, 6, 2),
    },
    {
        'title': 'রংপুরে ভূমিদস্যুদের দৌরাত্ম্য, কৃষক পরিবার উচ্ছেদ',
        'description': 'রংপুরের গঙ্গাচড়া উপজেলায় প্রভাবশালী ভূমিদস্যুদের হুমকিতে একটি কৃষক পরিবার তাদের বসতভিটা থেকে উচ্ছেদ হয়েছে। স্থানীয় প্রশাসনে অভিযোগ করেও কোনো ফল না পাওয়ায় তারা রাস্তায় অবস্থান নিয়েছেন।',
        'category': 'অন্যান্য',
        'division': 'রংপুর',
        'location_text': 'গঙ্গাচড়া, রংপুর',
        'date': datetime.date(2026, 6, 10),
    },
    {
        'title': 'বরগুনায় শিশু পাচার চক্রের ৪ সদস্য গ্রেফতার',
        'description': 'বরগুনা জেলায় শিশু পাচার চক্রের ৪ সদস্যকে গ্রেফতার করেছে পুলিশের গোয়েন্দা শাখা। তাদের কাছ থেকে ২ জন শিশুকে উদ্ধার করা হয়েছে। পুলিশ জানায়, এই চক্র বিভিন্ন জেলা থেকে শিশু সংগ্রহ করে ভারতে পাচার করত।',
        'category': 'অন্যান্য',
        'division': 'বরিশাল',
        'location_text': 'বরগুনা সদর',
        'date': datetime.date(2026, 6, 1),
    },
]

existing_count = Post.objects.count()
if existing_count == 0:
    for p in demo_posts:
        Post.objects.create(
            title=p['title'],
            description=p['description'],
            category=cats[p['category']],
            division=p['division'],
            location_text=p['location_text'],
            date=p['date'],
        )
    print("\n10 demo posts created!")
    
    # Log the seeding
    ActivityLog.objects.create(
        user=user,
        action='post_created',
        target_label='System Seed',
        details='10 demo posts seeded across all 5 categories',
    )
else:
    print(f"\nSkipping demo posts ({existing_count} posts already exist).")

print(f"\nTotal posts: {Post.objects.count()}")
print(f"Total categories: {Category.objects.count()}")
print("Setup complete!")
