"""
*Application*: `ox_mails`

This application integrates mail and mail account managements into Oxylus.
Currently it only allows to send mails, not fetching them: the goal is
first to provide support for other apps to send mails.

It provides different models:

    - MailAccount: an Owned model used to specify an email account (currently only SMTP);
    - BaseMail: an abstract model for mails that can be subclassed by other apps for their
    own purposes.
    - Mail: a concrete model for mails that implements a mail;

"""
