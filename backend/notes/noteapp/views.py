from django.shortcuts import render
from noteapp.serializers import NoteSerializer
from noteapp.models import Note
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(["GET", "POST"])
def notes(request):
    if request.method == "GET":
        notes = Note.object.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
