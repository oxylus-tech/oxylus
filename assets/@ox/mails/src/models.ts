import {models} from 'ox'
import {Owned} from '@ox/auth/models'
import {File} from '@ox/files/models'


export class MailAccount extends Owned {
    static entity = "mailAccounts"
    static meta = new models.Meta({
        app: "ox_mails",
        model: "mailaccount",
        url: "ox/mails/account/",
        title: "name",
    })

    static Encryption = models.Enum('mailaccount.encryption', {
        NONE: 0,
        TLS: 1,
        SSL: 2,
    })

    static fields() {
        return {
            ...super.fields(),
            name: this.string(),
            mail_header: this.string(),
            mail_signature: this.string(),
            mail_subscription_footer: this.string(),

            // ---- smtp
            smtp_host: this.string(),
            smtp_port: this.number(587),
            smtp_username: this.string(),
            smtp_password: this.string(),
            smtp_encryption: this.number(),

            // ---- imap
            imap_host: this.string(),
            imap_port: this.number(),
            imap_username: this.string(),
            imap_password: this.string(),
            imap_ssl: this.boolean(),
            imap_folder: this.string("INBOX"),
        }
    }
}


export class SendMail extends Owned {
    static entity = "sendMails"
    static meta = new models.Meta({
        app: "ox_mails",
        model: "sendmail",
        url: "ox/mails/sendmail/",
        title: "subject",
    })

    static State = models.Enum("sendmail.state", {
        DRAFT: 0,
        SENDING: 1,
        SENT: 2,
        ERROR: 3,
    })

    static fields() {
        return {
            ...super.fields(),
            account: this.string(),
            template: this.string(),
            is_template: this.boolean(),
            contacts: this.attr(null),
            contact_lists: this.attr(null),
            state: this.number(),
            updated: this.string(),
            created: this.string(),
            subject: this.string(),
            content: this.string(),
            attachments: this.attr(null),
            $account: this.belongsTo(MailAccount, "account"),
            $template: this.belongsTo(SendMail, "template"),
            $attachments: this.hasManyBy(File, "attachments"),
        }
    }
}
