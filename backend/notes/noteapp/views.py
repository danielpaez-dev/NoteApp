from django.shortcuts import render
from noteapp.serializers import NoteSerializer
from noteapp.models import Note
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def notes(request):
    if request.method == "GET":
        notes = Note.objects.filter(user=request.user).order_by("updated")
        print("Notas filtradas:", notes)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        print(f"Usuario autenticado (auth0_id): {request.user.auth0_id}")  # Debug
        print(f"Datos recibidos: {request.data}")  # Debug
        data = request.data.copy()
        serializer = NoteSerializer(
            data=request.data,
            context={"request": request},
        )
        if serializer.is_valid():
            serializer.save()
            print("Nota creada exitosamente")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Errores de validación:", serializer.errors)  # Debug
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def note_detail(request, pk):
    try:
        note = Note.objects.get(pk=pk, user=request.user)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = NoteSerializer(note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
