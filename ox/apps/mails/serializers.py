from caps.serializers import OwnedSerializer
from rest_framework import serializers

from ox.core.serializers import RelatedField
from ox.apps.files.models import File
from ox.apps.content.serializers import RichTextField, StripCharField

from . import models


__all__ = (
    "MailAccountSerializer",
    "MailSerializer",
)


class MailAccountSerializer(OwnedSerializer):
    class Meta:
        model = models.MailAccount
        fields = "__all__"
        extra_kwargs = {
            "smtp_password": {"write_only": True, "required": False, "allow_null": True},
            # "imap_password": {"write_only": True, "required": False, "allow_null": True},
        }

    def validate(self, data):
        if "smtp_password" in data and data.get("smtp_password") is None:
            del data["smtp_password"]
        # if "imap_password" in data and data.get("imap_password") is None:
        #    del data["imap_password"]
        return super().validate(data)


class BaseMailSerializer(OwnedSerializer):
    # TODO: filter owner for account and attachments

    account = RelatedField(queryset=models.MailAccount.objects.all(), allow_null=True, required=False)
    # contacts = RelatedField(many=True, queryset=models.Contact.objects.all(), required=False)
    # contact_lists = RelatedField(many=True, queryset=models.ContactList.objects.all(), required=False)
    subject = StripCharField()
    content = RichTextField(required=False, allow_blank=True)

    attachments = RelatedField(many=True, queryset=File.objects.all(), required=False)

    class Meta:
        fields = "__all__"
        read_only_fields = ("state",)


class MailSerializer(BaseMailSerializer):
    recipients = serializers.ListField(child=serializers.CharField())

    class Meta(BaseMailSerializer):
        model = models.Mail
