from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Article, Category, Tag
from .serializers import ArticleSerializer, CategorySerializer, TagSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAdminUser, AllowAny, SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly



class ProfileArticleViews(APIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, request, format=None):
        articles = Article.objects.filter(author=request.user.id).prefetch_related('tags')
        serializer = self.serializer_class(articles, many=True)
        return Response(serializer.data)

class ArticleViews(APIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, request, format=None):
        articles = Article.objects.all().prefetch_related('tags')
        serializer = self.serializer_class(articles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            article = Article(title=serializer.validated_data.get("title"),
             description=serializer.validated_data.get("description"), 
                category=Category.objects.get(pk=request.POST["category"]), author=request.user, image=request.data.get("image"))
            article.save()
            print(request.POST.getlist("tags"))
            tags = Tag.objects.filter(pk__in=request.POST.getlist("tags"))
            for tag in tags:
                article.tags.add(tag)

            response_serializer = self.serializer_class(article)
            return Response(response_serializer.data)
        else:
            return Response({"msg": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, format=None):
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data.get("title"))
            print(serializer.validated_data.get("id"))
            article = Article.objects.get(pk=request.POST["id"])
            article.title=serializer.validated_data.get("title")
            article.description=serializer.validated_data.get("description") 
            article.category=Category.objects.get(pk=request.POST["category"])
        
            article.save()
            article.tags.clear()
            tags = Tag.objects.filter(pk__in=request.POST.getlist("tags"))
            for tag in tags:
                article.tags.add(tag)

            response_serializer = self.serializer_class(article)
            return Response(response_serializer.data)
        else:
            return Response({"msg": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




class DetailsArticleView(APIView):
    permission_classes = (IsAuthenticated,)
    def delete(self, request, pk, format=None):
        Article.objects.get(pk=pk).delete()
        return Response({"success": "1 article deleted"}, status=200)

    def get(self, request, pk, format=None):
        article = Article.objects.get(pk=pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)



   


class CategoryView(APIView):
    #  permission_classes = (,)
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class TagView(APIView):
    #  permission_classes = (,)
    def get(self, request, format=None):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)

# Create your views here.

# def articleList(request):
#     categories = Category.objects.all()
#     articles = Article.objects.all().prefetch_related('tags')
#     return render(request, 'index.html', {"articles": articles, "categories": categories})


# def articleCatList(request, pk):
#     categories = Category.objects.all()
#     articles = Article.objects.filter(category_id=pk).prefetch_related('tags')
#     return render(request, 'index.html', {"articles": articles, "categories": categories})
 
# def newArticle(request):
#     form = ArticleForm()
#     return render(request, 'new_article.html', {"form": form})


# def addArticle(request):
#     form = ArticleForm(request.POST, request.FILES)
#     if form.is_valid():
#         article = form.save(commit=False)
#         article.author = request.user
#         article.save()
#         return HttpResponseRedirect('/')
    
#     return render(request, 'new_article.html', {"form": form})


# def deleteArticle(request, pk): 
#     Article.objects.get(pk=pk).delete()
#     return HttpResponseRedirect('/')

# def editFormArticle(request, pk):
#     article = Article.objects.get(pk=pk)
#     form = ArticleForm(instance=article)
#     return render(request, 'edit_article.html', {"form": form, "pk":pk})


# def editArticle(request, pk):
#     article = Article.objects.get(pk=pk)
#     form = ArticleForm(request.POST, instance=article)
#     if form.is_valid():
#         form.save()
#         return HttpResponseRedirect('/')
    
#     return render(request, 'new_article.html', {"form": form})


