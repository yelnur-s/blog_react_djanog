from django.contrib import admin
from .models import Article, Tag, Category

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_on')
    search_fields = ['title', 'description']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ['name']

class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ['name']

admin.site.register(Article, ArticleAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Category, CategoryAdmin)
# Register your models here.
