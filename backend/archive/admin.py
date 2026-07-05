from django.contrib import admin
from archive.models import Category, Post


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.action(description='Promote selected reports to published posts')
def promote_to_post(modeladmin, request, queryset):
    queryset.update(is_user_report=False)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'slug', 'custom_slug', 'seo_keywords', 'title', 'category', 'division', 'author_name', 'date', 'created_at')
    list_filter = ('category', 'division', 'date')
    search_fields = ('title', 'description', 'location_text', 'author_name', 'slug', 'custom_slug', 'seo_keywords')
    list_per_page = 25
    date_hierarchy = 'date'
    ordering = ('-date', '-created_at')
    readonly_fields = ('slug',)
    actions = [promote_to_post]
