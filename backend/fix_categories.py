import os
import django
import sys

# Ensure the correct path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from archive.models import Category, Post

def main():
    # 1. Rename "খুন" to "হত্যাকান্ড"
    try:
        khun_cat = Category.objects.get(name="খুন")
        khun_cat.name = "হত্যাকান্ড"
        khun_cat.save()
        print("Renamed 'খুন' to 'হত্যাকান্ড'.")
    except Category.DoesNotExist:
        print("Category 'খুন' not found.")
    except Category.MultipleObjectsReturned:
        print("Multiple 'খুন' categories found, merging...")
        khun_cats = list(Category.objects.filter(name="খুন"))
        first_khun = khun_cats[0]
        first_khun.name = "হত্যাকান্ড"
        first_khun.save()
        for extra in khun_cats[1:]:
            Post.objects.filter(category=extra).update(category=first_khun)
            extra.delete()

    # 2. Merge all duplicates (case-insensitive if needed, but exact matches first)
    all_names = Category.objects.values_list('name', flat=True).distinct()
    for name in all_names:
        cats = list(Category.objects.filter(name=name))
        if len(cats) > 1:
            first_cat = cats[0]
            for extra in cats[1:]:
                Post.objects.filter(category=extra).update(category=first_cat)
                extra.delete()
            print(f"Merged duplicate categories for '{name}'.")

    # Double check if "হত্যাকান্ড" still has duplicates (e.g., if one was "খুন" and renamed)
    cats = list(Category.objects.filter(name="হত্যাকান্ড"))
    if len(cats) > 1:
        first_cat = cats[0]
        for extra in cats[1:]:
            Post.objects.filter(category=extra).update(category=first_cat)
            extra.delete()
        print("Merged duplicate 'হত্যাকান্ড' categories.")
        
    print("Database fix completed.")

if __name__ == '__main__':
    main()
