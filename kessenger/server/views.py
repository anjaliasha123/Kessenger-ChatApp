from django.db.models import Count
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.validators import ValidationError

from .models import Server
from .schema import server_list_docs
from .serializers import ServerSerializer


class ServerListViewSet(viewsets.ViewSet):
    """
    A ViewSet for listing servers based on various filtering criteria.

    Attributes:
        queryset (QuerySet): The base queryset containing all Server objects.

    Methods:
        list(request):
            Handles GET requests to retrieve a filtered list of servers based on
            query parameters.

            Query Parameters:
                - category (str, optional): Filters servers by their category name.
                - qty (int, optional): Limits the number of servers returned.
                - by_user (bool, optional): If true, filters servers by the current authenticated user.
                - by_serverid (int, optional): Filters by a specific server ID.
                - with_num_members (bool, optional): If true, annotates each server with the number of members.

            Raises:
                - AuthenticationFailed: If `by_user` or `by_serverid` is requested by an unauthenticated user.
                - ValidationError: If the specified `by_serverid` does not exist or a ValueError occurs.

            Returns:
                Response: A JSON response containing the serialized server data.

            Example:
                GET /servers/?category=gaming&qty=10&by_user=true&with_num_members=true

            Note:
                - The `num_members` annotation is added only when `with_num_members` is true.
                - Querysets are modified in place with filters applied sequentially based on the
                  presence of query parameters.
    """

    queryset = Server.objects.all()

    @server_list_docs
    def list(self, request):
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"

        # if by_user or by_serverid and not request.user.is_authenticated:
        #     raise AuthenticationFailed()
        if category:
            self.queryset = self.queryset.filter(category__name=category)
        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(owner=user_id)
            else:
                raise AuthenticationFailed()
        if by_serverid:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()
            try:
                self.queryset = self.queryset.filter(id=by_serverid)
                if not self.queryset.exists():
                    raise ValidationError(
                        detail=f"Server with id {by_serverid} does not exit"
                    )
            except ValueError:
                raise ValidationError(detail=f"Value Error")
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))
        if qty:
            self.queryset = self.queryset[: int(qty)]

        serializer = ServerSerializer(
            self.queryset, many=True, context={"num_members": with_num_members}
        )
        return Response(serializer.data)
