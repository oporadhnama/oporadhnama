from django.contrib import admin
from archive.models import Category, Post


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'division', 'date', 'created_at')
    list_filter = ('category', 'division', 'date')
    search_fields = ('title', 'description', 'location_text')
    list_per_page = 25
    date_hierarchy = 'date'
    ordering = ('-date', '-created_at')
