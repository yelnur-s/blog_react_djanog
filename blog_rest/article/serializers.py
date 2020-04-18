from rest_framework import serializers
from .models import Category, Article, Tag
from myauth.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ('id', 'name')


class TagSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tag
		fields = ('id', 'name')

class ArticleSerializer(serializers.ModelSerializer):
	category = CategorySerializer(read_only=True)
	tags = TagSerializer(read_only=True, many=True)
	author = UserSerializer(read_only=True)
	class Meta:
		model = Article
		fields = ('id', 'title', 'description', 'created_on', 'category', 'tags', 'author', 'image')