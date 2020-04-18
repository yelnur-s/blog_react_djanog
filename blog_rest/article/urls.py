from django.urls import path
from . import views
urlpatterns = [
    path('articles', views.ArticleViews.as_view()),
    path('articles/<int:pk>', views.DeleteArticleView.as_view()),
    path('tags', views.TagView.as_view()),
    path('categories', views.CategoryView.as_view()),
]

