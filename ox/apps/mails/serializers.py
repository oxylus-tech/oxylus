from caps.serializers import OwnedSerializer

from ox.core.serializers import RelatedField
from ox.apps.contacts.models import Person
from ox.apps.content.serializers import RichTextField, StripCharField

from . import models


__all__ = (
    "MailAccountSerializer",
    "MailTemplateSerializer",
    "OutMailSerializer",
)


class MailAccountSerializer(OwnedSerializer):
    class Meta:
        model = models.MailAccount
        fields = "__all__"
        extra_kwargs = {"smtp_password": {"write_only": True}, "imap_password": {"write_only": True}}


class MailTemplateSerializer(OwnedSerializer):
    account = RelatedField(queryset=models.MailAccount.objects.all())
    subject = StripCharField()
    content = RichTextField()

    class Meta:
        model = models.MailTemplate
        fields = "__all__"


class OutMailSerializer(OwnedSerializer):
    template = RelatedField(queryset=models.MailTemplate.objects.all())
    contacts = RelatedField(many=True, queryset=Person.objects.all())
    subject = StripCharField()
    content = RichTextField()

    class Meta:
        model = models.OutMail
        fields = "__all__"
