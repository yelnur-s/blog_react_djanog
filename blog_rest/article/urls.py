from django.urls import path
from . import views
urlpatterns = [
    path('articles', views.ArticleViews.as_view()),
    path('articles/<int:pk>', views.DetailsArticleView.as_view()),
    path('tags', views.TagView.as_view()),
    path('categories', views.CategoryView.as_view()),
    path('articles/user/articles', views.ProfileArticleViews.as_view()),
]

