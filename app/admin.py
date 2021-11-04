from django.contrib import admin
from .models import Category
from .models import Subcategory
from .models import Question

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','category')
admin.site.register(Category,CategoryAdmin)

class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('id','category','subcategory')
admin.site.register(Subcategory,SubcategoryAdmin)

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id','category','subcategory','question_link','answer_link')
admin.site.register(Question,QuestionAdmin)

